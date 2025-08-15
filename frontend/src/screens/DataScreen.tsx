import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, ActivityIndicator, Alert } from 'react-native';
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
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    }
};

export default function DataScreen({ navigation }: DataScreenProps) {
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{ data: [] }]
    });

    // Função para buscar e processar os dados do backend
    const fetchSensorData = async () => {
        // SUBSTITUA '192.168.1.10' PELO IP DA SUA MÁQUINA
        const serverIp = '192.168.1.10'; 
        const baseUrl = `http://${serverIp}:3000/api`;

        try {
            // 1. LOGIN: Obter o token de autenticação
            const loginResponse = await fetch(`${baseUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // Substitua por credenciais válidas do seu banco de dados
                    email: 'seu_email@exemplo.com', 
                    password: 'sua_senha_secreta',
                }),
            });

            if (!loginResponse.ok) {
                throw new Error('Falha na autenticação. Verifique suas credenciais.');
            }

            const { token } = await loginResponse.json();
            
            if (!token) {
                throw new Error('Token JWT não recebido.');
            }
            
            // 2. BUSCAR DADOS: Usar o token para acessar a rota protegida
            const dataResponse = await fetch(`${baseUrl}/sensor-data`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!dataResponse.ok) {
                throw new Error('Falha ao buscar os dados do sensor. Token pode estar expirado.');
            }

            const rawData = await dataResponse.json();

            // 3. Processar o array de objetos e formatar para o gráfico
            const labels = rawData.map(item => {
                const date = new Date(item.timestamp);
                return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
            });

            const dataValues = rawData.map(item => parseFloat(item.temperatura));

            const formattedData = {
                labels: labels.reverse(), // Reverse para mostrar os dados mais recentes por último
                datasets: [
                    {
                        data: dataValues.reverse(),
                        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                        strokeWidth: 2
                    }
                ]
            };
            
            setChartData(formattedData);

        } catch (error) {
            console.error("Erro no frontend:", error);
            Alert.alert("Erro", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSensorData();
    }, []);

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
            {chartData.datasets[0].data.length > 0 ? (
                <LineChart
                    data={chartData}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    bezier
                />
            ) : (
                <Text>Nenhum dado disponível.</Text>
            )}
            <Text style={styles.chartLegend}>Evolução da temperatura</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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