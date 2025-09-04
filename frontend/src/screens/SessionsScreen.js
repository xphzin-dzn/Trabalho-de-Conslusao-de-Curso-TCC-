import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SessionsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Histórico de Sessões</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 22, fontWeight: 'bold' },
});

export default SessionsScreen;