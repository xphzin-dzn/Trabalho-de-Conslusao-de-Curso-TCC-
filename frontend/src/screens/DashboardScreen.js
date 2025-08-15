// frontend/src/screens/DashboardScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import api from '../services/api';
import Chart from '../components/Chart';

const DashboardScreen = ({ route }) => {
    const [sensorData, setSensorData] = useState([]);
    const [loading, setLoading] = useState(true); // Novo estado de loading
    const { token } = route.params;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/sensors', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSensorData(response.data);
            } catch (error) {
                console.error("Erro ao buscar dados dos sensores:", error);
                // Adicione um Alert aqui se quiser notificar o usuário do erro
            } finally {
                setLoading(false); // Finaliza o loading, com ou sem erro
            }
        };

        fetchData();
    }, [token]);

    // Exibe o indicador de "Carregando..."
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Carregando dados...</Text>
            </View>
        );
    }

    // Exibe mensagem se não houver dados após o carregamento
    if (sensorData.length === 0) {
        return (
            <View style={styles.center}>
                <Text>Nenhum dado de sensor encontrado.</Text>
                <Text>Verifique se o simulador está rodando.</Text>
            </View>
        );
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>Dashboard de Sensores</Text>
                <Chart data={sensorData} valueKey="temperature" title="Temperatura" />
                <Chart data={sensorData} valueKey="humidity" title="Umidade" />
                <Chart data={sensorData} valueKey="pressure" title="Pressão" />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DashboardScreen;