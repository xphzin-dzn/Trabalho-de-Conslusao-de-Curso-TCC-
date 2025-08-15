import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import api from '../api';

const HomeScreen = ({ route, navigation }) => {
    const { token } = route.params;
    const [sensorData, setSensorData] = useState([]);

    const fetchSensorData = async () => {
        try {
            // Adicionado /api ao endpoint e corrigido o caminho
            const response = await api.get('/api/sensor-data', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSensorData(response.data);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os dados do sensor.');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSensorData();
    }, []);

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>Dados do Sensor</Text>
            <Button title="Atualizar Dados" onPress={fetchSensorData} />
            <FlatList
                data={sensorData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                        {/* Alterado para exibir os dados corretos do backend */}
                        <Text>Velocidade: {item.velocidade}</Text>
                        <Text>Temperatura: {item.temperatura}°C</Text>
                        <Text>Tensão: {item.tensao}V</Text>
                        <Text>Corrente: {item.corrente}A</Text>
                        <Text>Data: {new Date(item.timestamp).toLocaleString()}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default HomeScreen;