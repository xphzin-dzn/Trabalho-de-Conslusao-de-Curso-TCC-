import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

// Dados de exemplo para a sessão selecionada
const FAKE_SESSION_DATA = {
    id: '1',
    date: '31/08/2025 14:30',
    tensao: 48.2,
    corrente: 16.5,
    velocidade: 32.1,
    temperatura: 25.0,
    chartData: [30, 32, 33, 31, 34, 32]
};

const DataCard = ({ label, value, unit }) => (
    <View style={styles.card}>
        <Text style={styles.cardLabel}>{label}</Text>
        <Text style={styles.cardValue}>{value} <Text style={styles.cardUnit}>{unit}</Text></Text>
    </View>
);

const SessionDetailScreen = ({ route }) => {
    const { sessionId } = route.params;
    const sessionData = FAKE_SESSION_DATA; // No futuro, buscaria os dados da API usando o sessionId

    return (
        <ScrollView style={styles.container}>
            <View style={styles.grid}>
                <DataCard label="Tensão Média" value={sessionData.tensao} unit="V" />
                <DataCard label="Corrente Média" value={sessionData.corrente} unit="A" />
                <DataCard label="Velocidade Média" value={sessionData.velocidade} unit="km/h" />
                <DataCard label="Temperatura Média" value={sessionData.temperatura} unit="°C" />
            </View>

            <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Desempenho da Sessão ({sessionData.date})</Text>
                <LineChart
                    data={{
                        labels: ["Início", "25%", "50%", "75%", "Fim"],
                        datasets: [{ data: sessionData.chartData }]
                    }}
                    width={Dimensions.get("window").width - 40}
                    height={220}
                    yAxisSuffix="km/h"
                    chartConfig={chartConfig}
                    bezier
                    style={styles.chart}
                />
            </View>

            <View style={styles.controlsContainer}>
                <TouchableOpacity style={[styles.button, styles.exportButton]}>
                    <Text style={[styles.buttonText, styles.exportButtonText]}>Exportar Dados</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

// Reutilize a mesma configuração de gráfico
const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(40, 167, 69, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: { r: "6", strokeWidth: "2", stroke: "#28a745" }
};

// Reutilize estilos do HomeScreen
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 20 },
    card: { width: '48%', backgroundColor: '#fff', padding: 15, borderRadius: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 3 },
    cardLabel: { fontSize: 14, color: 'gray' },
    cardValue: { fontSize: 24, fontWeight: 'bold', color: '#1A202C', marginTop: 5 },
    cardUnit: { fontSize: 16, fontWeight: 'normal' },
    chartContainer: { marginHorizontal: 20, backgroundColor: '#fff', borderRadius: 16, padding: 10, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 3 },
    chartTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10, color: '#333' },
    chart: { marginVertical: 8, borderRadius: 16 },
    controlsContainer: { padding: 20, marginTop: 10 },
    button: { paddingVertical: 15, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
    buttonText: { fontSize: 16, fontWeight: 'bold' },
    exportButton: { backgroundColor: '#e9ecef' },
    exportButtonText: { color: '#1A202C' },
});

export default SessionDetailScreen;