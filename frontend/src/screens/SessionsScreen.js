import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const SESSIONS_DATA = [
    { id: '1', date: '31/08/2025 14:30', duration: '15m 22s', avgSpeed: '32 km/h', consumption: '0.8 kWh' },
    { id: '2', date: '30/08/2025 11:15', duration: '12m 05s', avgSpeed: '34 km/h', consumption: '0.7 kWh' },
    { id: '3', date: '28/08/2025 16:45', duration: '18m 40s', avgSpeed: '30 km/h', consumption: '1.1 kWh' },
];

const SessionsScreen = ({ navigation }) => {

    const renderItem = ({ item }) => (
        <View style={styles.sessionCard}>
            <View style={styles.sessionRow}>
                <Text style={styles.sessionLabel}>Data:</Text>
                <Text style={styles.sessionValue}>{item.date}</Text>
            </View>
            <View style={styles.sessionRow}>
                <Text style={styles.sessionLabel}>Duração:</Text>
                <Text style={styles.sessionValue}>{item.duration}</Text>
            </View>
            <View style={styles.sessionRow}>
                <Text style={styles.sessionLabel}>Velocidade Média:</Text>
                <Text style={styles.sessionValue}>{item.avgSpeed}</Text>
            </View>
            <View style={styles.sessionRow}>
                <Text style={styles.sessionLabel}>Consumo Total:</Text>
                <Text style={styles.sessionValue}>{item.consumption}</Text>
            </View>
            <TouchableOpacity
                style={styles.detailsButton}
                onPress={() => navigation.navigate('SessionDetail', { sessionId: item.id })}
            >
                <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Histórico de Sessões</Text>
            </View>
            <FlatList
                data={SESSIONS_DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 20 },
    headerTitle: { fontSize: 32, fontWeight: 'bold', color: '#1A202C' },
    list: { paddingHorizontal: 20 },
    sessionCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    sessionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    sessionLabel: {
        fontSize: 16,
        color: 'gray',
    },
    sessionValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A202C',
    },
    detailsButton: {
        marginTop: 10,
        backgroundColor: '#e9ecef',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    detailsButtonText: {
        color: '#1A202C',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default SessionsScreen;