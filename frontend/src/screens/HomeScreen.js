import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import api from '../api';

// Componente reutilizável para os cartões de dados
const DataCard = ({ label, value, unit }) => (
    <View style={styles.card}>
        <Text style={styles.cardLabel}>{label}</Text>
        <Text style={styles.cardValue}>{value} <Text style={styles.cardUnit}>{unit}</Text></Text>
    </View>
);

const HomeScreen = ({ route, navigation }) => {
    const token = route.params?.token;
    const [sensorData, setSensorData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchSensorData = async () => {
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            const response = await api.get('/api/sensor-data', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSensorData(response.data[0] || null); // Pega o dado mais recente
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSensorData();
    }, [token]);

    if (loading) {
        return <View style={styles.center}><ActivityIndicator size="large" color="#28a745" /></View>;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Dashboard</Text>
            </View>

            <View style={styles.grid}>
                <DataCard label="Tensão" value={sensorData?.tensao?.toFixed(1) ?? '...'} unit="V" />
                <DataCard label="Corrente" value={sensorData?.corrente?.toFixed(1) ?? '...'} unit="A" />
                <DataCard label="Velocidade" value={sensorData?.velocidade?.toFixed(1) ?? '...'} unit="km/h" />
                <DataCard label="Temperatura" value={sensorData?.temperatura?.toFixed(1) ?? '...'} unit="°C" />
            </View>

            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Desempenho da Sessão</Text>
                <LineChart
                    data={{
                        labels: ["1min", "2min", "3min", "4min", "5min", "6min"],
                        datasets: [{ data: [20, 45, 28, 80, 99, 43] }] // Dados de exemplo
                    }}
                    width={Dimensions.get("window").width - 40}
                    height={220}
                    yAxisLabel=""
                    yAxisSuffix="km/h"
                    chartConfig={chartConfig}
                    bezier
                    style={styles.chart}
                />
            </View>

            <View style={styles.controlsContainer}>
                <View style={styles.statusContainer}>
                    <View style={styles.statusIndicator} />
                    <Text style={styles.statusText}>Conectado via BLE</Text>
                </View>
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={[styles.button, styles.startButton]}>
                        <Text style={[styles.buttonText, styles.startButtonText]}>Iniciar Sessão</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.stopButton]}>
                        <Text style={[styles.buttonText, styles.stopButtonText]}>Parar Sessão</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.button, styles.exportButton]}>
                    <Text style={[styles.buttonText, styles.exportButtonText]}>Exportar Dados</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(40, 167, 69, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: { r: "6", strokeWidth: "2", stroke: "#28a745" }
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20 },
    headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#1A202C' },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 10 },
    card: { width: '48%', backgroundColor: '#fff', padding: 15, borderRadius: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 3 },
    cardLabel: { fontSize: 14, color: 'gray' },
    cardValue: { fontSize: 24, fontWeight: 'bold', color: '#1A202C', marginTop: 5 },
    cardUnit: { fontSize: 16, fontWeight: 'normal' },
    chartContainer: { marginHorizontal: 20, backgroundColor: '#fff', borderRadius: 16, padding: 10, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 3 },
    chartTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10, color: '#333' },
    chart: { marginVertical: 8, borderRadius: 16 },
    controlsContainer: { padding: 20, marginTop: 10 },
    statusContainer: { flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginBottom: 20 },
    statusIndicator: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#28a745', marginRight: 8 },
    statusText: { fontSize: 14, color: 'gray' },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    button: { paddingVertical: 15, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
    buttonText: { fontSize: 16, fontWeight: 'bold' },
    startButton: { flex: 1, marginRight: 10, backgroundColor: '#28a745' },
    startButtonText: { color: '#fff' },
    stopButton: { flex: 1, marginLeft: 10, borderWidth: 1, borderColor: '#dc3545' },
    stopButtonText: { color: '#dc3545' },
    exportButton: { backgroundColor: '#e9ecef' },
    exportButtonText: { color: '#1A202C' },
});

export default HomeScreen;