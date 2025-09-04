import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import api from '../api';

const HomeScreen = ({ route, navigation }) => {
    // O token agora vem da navegação Stack para o navegador Tab
    const token = route.params?.token;
    const [sensorData, setSensorData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchSensorData = async () => {
        if (!token) return; // Se não houver token, não faz nada
        try {
            const response = await api.get('/api/sensor-data', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSensorData(response.data[0] || null);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os dados do sensor.');
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
                <View>
                    <Text style={styles.welcomeTitle}>Olá, Usuário 👋</Text>
                    <Text style={styles.welcomeSubtitle}>Bem-vindo ao seu dashboard</Text>
                </View>
                <TouchableOpacity>
                    <Image source={require('../../assets/icon.png')} style={styles.notificationIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.statusCard}>
                <View style={styles.statusHeader}>
                    <Text style={styles.statusTitle}>Status da Sessão</Text>
                    <Text style={styles.statusActive}>Ativa</Text>
                </View>
                <View style={styles.statusBody}>
                    <View style={styles.statusInfo}>
                        <Text style={styles.infoLabel}>Consumo Atual</Text>
                        <Text style={styles.infoValue}>
                            {sensorData ? (sensorData.tensao * sensorData.corrente / 1000).toFixed(2) : '0.0'} kWh
                        </Text>
                    </View>
                    <View style={styles.statusInfo}>
                        <Text style={styles.infoLabel}>Velocidade</Text>
                        <Text style={styles.infoValue}>
                            {sensorData ? sensorData.velocidade.toFixed(1) : '0.0'} km/h
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.actionsContainer}>
                <TouchableOpacity style={[styles.button, styles.stopButton]}>
                    <Text style={[styles.buttonText, styles.stopButtonText]}>Parar Sessão</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.exportButton]}>
                    <Text style={[styles.buttonText, styles.exportButtonText]}>Exportar Dados</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A202C',
    },
    welcomeSubtitle: {
        fontSize: 16,
        color: 'gray',
    },
    notificationIcon: {
        width: 24,
        height: 24,
    },
    statusCard: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    statusHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 15,
    },
    statusTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A202C',
    },
    statusActive: {
        color: '#28a745',
        fontSize: 16,
        fontWeight: 'bold',
    },
    statusBody: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 20,
    },
    statusInfo: {
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 5,
    },
    infoValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1A202C',
    },
    actionsContainer: {
        marginTop: 30,
        paddingHorizontal: 20,
    },
    button: {
        paddingVertical: 15,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 15,
    },
    stopButton: {
        backgroundColor: '#dc3545',
    },
    stopButtonText: {
        color: '#fff',
    },
    exportButton: {
        backgroundColor: '#e9ecef',
    },
    exportButtonText: {
        color: '#1A202C',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;