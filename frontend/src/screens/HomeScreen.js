import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import api from '../api';

// Um componente reutilizável para os cartões de dados
const InfoCard = ({ icon, label, value, unit }) => (
    <View style={styles.card}>
        {/* Idealmente, o 'icon' seria uma imagem diferente para cada card */}
        {/* <Image source={icon} style={styles.cardIcon} /> */}
        <Text style={styles.cardLabel}>{label}</Text>
        <Text style={styles.cardValue}>{value} <Text style={styles.cardUnit}>{unit}</Text></Text>
    </View>
);

const HomeScreen = ({ route, navigation }) => {
    const { token } = route.params;
    const [sensorData, setSensorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchSensorData = async () => {
        try {
            const response = await api.get('/api/sensor-data', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // Vamos pegar apenas o dado mais recente da lista
            setSensorData(response.data[0] || null);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os dados do sensor.');
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchSensorData();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchSensorData();
    }, []);

    const handleLogout = () => {
        // Limpar o token se estiver guardado e voltar ao início
        navigation.navigate('Welcome');
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.center]}>
                <ActivityIndicator size="large" color="#28a745" />
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Dashboard</Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.logoutButton}>Sair</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.welcomeMessage}>Bem-vindo!</Text>

            {sensorData ? (
                <>
                    <View style={styles.grid}>
                        <InfoCard label="Temperatura" value={sensorData.temperatura?.toFixed(1) || 'N/A'} unit="°C" />
                        <InfoCard label="Velocidade" value={sensorData.velocidade?.toFixed(1) || 'N/A'} unit="km/h" />
                        <InfoCard label="Tensão" value={sensorData.tensao?.toFixed(1) || 'N/A'} unit="V" />
                        <InfoCard label="Corrente" value={sensorData.corrente?.toFixed(1) || 'N/A'} unit="A" />
                    </View>
                    <Text style={styles.lastUpdated}>
                        Última atualização: {new Date(sensorData.timestamp).toLocaleString('pt-BR')}
                    </Text>
                </>
            ) : (
                <Text style={styles.noDataText}>Nenhum dado de sensor encontrado. Puxe para baixo para atualizar.</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7fafc',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1A202C',
    },
    logoutButton: {
        fontSize: 16,
        color: '#28a745',
        fontWeight: '600',
    },
    welcomeMessage: {
        fontSize: 22,
        fontWeight: '300',
        color: 'gray',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    card: {
        width: '48%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        marginBottom: 15,
        // Sombra para dar elevação
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    cardLabel: {
        fontSize: 16,
        color: 'gray',
    },
    cardValue: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1A202C',
        marginTop: 5,
    },
    cardUnit: {
        fontSize: 18,
        fontWeight: 'normal',
        color: 'gray',
    },
    lastUpdated: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 20,
    },
    noDataText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 16,
        marginTop: 50,
        paddingHorizontal: 20,
    },
});

export default HomeScreen;