import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import axios from 'axios';
import { Buffer } from 'buffer';

const SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
const TEMP_CHARACTERISTIC_UUID = 'beb5483e-36e1-4688-b7f5-ea07361b26a8';
const VOLT_CHARACTERISTIC_UUID = 'c3c3f0d5-1ea2-4534-92cb-238a20cf3a2e';
const CURRENT_CHARACTERISTIC_UUID = 'f5b2b2a0-0b6a-46e3-9828-48a50b3884b2';
const SPEED_CHARACTERISTIC_UUID = 'a2e8c208-1a52-4752-a9a7-23c3b53c1533';

const API_URL = 'http://SEU_IP_AQUI:3000/api/sensor-data';

const manager = new BleManager();

const App = () => {
  const [device, setDevice] = useState(null);
  const [currentData, setCurrentData] = useState({});
  const [sessionData, setSessionData] = useState([]);
  const [isCarStopped, setIsCarStopped] = useState(true);
  const isCarStoppedRef = useRef(isCarStopped);
  isCarStoppedRef.current = isCarStopped;

  const findAndConnect = () => {
    manager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.error(error);
        return;
      }

      if (scannedDevice && scannedDevice.name === 'ESP32-TCC') {
        manager.stopDeviceScan();
        scannedDevice.connect()
          .then((connectedDevice) => {
            setDevice(connectedDevice);
            return connectedDevice.discoverAllServicesAndCharacteristics();
          })
          .then((deviceWithServices) => {
            monitorCharacteristics(deviceWithServices);
          })
          .catch((connectError) => {
            console.error('Connection error', connectError);
          });
      }
    });
  };

  const monitorCharacteristics = (deviceToMonitor) => {
    const characteristics = {
      [TEMP_CHARACTERISTIC_UUID]: 'temperature',
      [VOLT_CHARACTERISTIC_UUID]: 'voltage',
      [CURRENT_CHARACTERISTIC_UUID]: 'current',
      [SPEED_CHARACTERISTIC_UUID]: 'speed',
    };

    Object.keys(characteristics).forEach(uuid => {
      deviceToMonitor.monitorCharacteristicForService(
        SERVICE_UUID,
        uuid,
        (error, characteristic) => {
          if (error) {
            console.error('Monitor error', error);
            return;
          }

          const value = Buffer.from(characteristic.value, 'base64').toString('ascii');
          const key = characteristics[uuid];

          setCurrentData(prevData => ({ ...prevData, [key]: parseFloat(value) }));
        }
      );
    });
  };

  const sendSessionData = async () => {
    if (sessionData.length > 0) {
      try {
        await axios.post(API_URL, { data: sessionData });
        setSessionData([]);
      } catch (error) {
        console.error('Error sending session data:', error);
      }
    }
  };

  useEffect(() => {
    if (currentData.temperature && currentData.voltage && currentData.current && currentData.speed !== undefined) {
      setSessionData(prevSession => [...prevSession, { ...currentData, timestamp: new Date() }]);

      const stopped = currentData.speed === 0;
      if (stopped && !isCarStoppedRef.current) {
        sendSessionData();
      }
      setIsCarStopped(stopped);
    }
  }, [currentData]);

  return (
    <View style={styles.container}>
      <Button title="Conectar ao ESP32" onPress={findAndConnect} disabled={device} />
      <Text style={styles.status}>{device ? 'Conectado!' : 'Desconectado'}</Text>

      <View style={styles.dataContainer}>
        <Text>Temperatura: {currentData.temperature?.toFixed(2)} °C</Text>
        <Text>Tensão: {currentData.voltage?.toFixed(2)} V</Text>
        <Text>Corrente: {currentData.current?.toFixed(2)} A</Text>
        <Text>Velocidade: {currentData.speed?.toFixed(2)} km/h</Text>
      </View>

      <Text style={styles.listHeader}>Dados Acumulados na Sessão:</Text>
      <FlatList
        data={sessionData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>
            {`${item.timestamp.toLocaleTimeString()}: ${item.speed?.toFixed(1)} km/h`}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  status: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
  dataContainer: { marginVertical: 20 },
  listHeader: { fontSize: 16, fontWeight: 'bold', marginTop: 20 },
  listItem: { fontSize: 12, borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 5 }
});

export default App;