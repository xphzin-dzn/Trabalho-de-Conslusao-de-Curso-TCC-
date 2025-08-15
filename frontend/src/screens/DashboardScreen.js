import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import api from '../services/api';
import Chart from '../components/Chart';

const DashboardScreen = ({ route }) => {
    const [sensorData, setSensorData] = useState([]);
    const { token } = route.params;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/sensors', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSensorData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [token]);

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
});

export default DashboardScreen;