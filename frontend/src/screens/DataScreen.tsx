import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from './HomeScreen';

type DataScreenProps = StackScreenProps<RootStackParamList, 'Data'>;

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 16
    }
};

export default function DataScreen({ navigation }: DataScreenProps) {
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{ data: [] }]
    });

    // useEffect é usado para realizar a chamada da API
    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                // Substitua esta URL pela URL real da sua API
                const response = await fetch('https://api.seusite.com/sensor-data');
                const json = await response.json();

                // Formate os dados para o formato que o LineChart espera
                const formattedData = {
                    labels: json.labels,
                    datasets: [
                        {
                            data: json.values,
                            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                            strokeWidth: 2
                        }
                    ]
                };

                setChartData(formattedData);
            } catch (error) {
                console.error("Erro ao buscar dados do sensor:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSensorData();
    }, []); // O array vazio garante que o useEffect rode apenas uma vez

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Carregando dados...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.chartTitle}>Dados de Temperatura (°C)</Text>
            <LineChart
                data={chartData}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
            />
            <Text style={styles.chartLegend}>Evolução da temperatura nos últimos 6 meses</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', // Altere para centralizar o indicador de carregamento
        padding: 10,
        backgroundColor: '#fff'
    },
    chartTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10
    },
    chartLegend: {
        marginTop: 10,
        fontSize: 14,
        color: '#888'
    },
});