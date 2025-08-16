import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ProcessoItem = ({ numero, titulo, conteudo, aberto, onPress }) => {
    return (
        <View style={[styles.processoItem, aberto && styles.processoItemAberto]}>
            <TouchableOpacity onPress={onPress} style={styles.processoItemHeader}>
                <Text style={[styles.processoItemNumber, aberto && styles.processoItemNumeroAberto]}>{numero}</Text>
                <Text style={[styles.processoItemTitle, aberto && styles.processoItemTitleAberto]}>{titulo}</Text>
                <View style={[styles.processoItemToggle, aberto && styles.processoItemToggleAberto]}>
                    <Text style={[styles.processoItemToggleText, aberto && styles.processoItemToggleTextAberto]}>{aberto ? '−' : '+'}</Text>
                </View>
            </TouchableOpacity>
            {aberto && (
                <Text style={styles.processoItemContent}>{conteudo}</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    processoItem: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 30,
        marginBottom: 15,
        paddingHorizontal: 20,
        paddingVertical: 15,
        overflow: 'hidden',
    },
    processoItemAberto: {
        backgroundColor: '#28a745',
        borderColor: '#28a745',
    },
    processoItemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    processoItemNumber: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#a0aec0',
        marginRight: 15,
    },
    processoItemNumeroAberto: {
        color: '#fff',
    },
    processoItemTitle: {
        flex: 1,
        fontSize: 20,
        fontWeight: '600',
        color: '#1A202C',
    },
    processoItemTitleAberto: {
        color: '#fff',
    },
    processoItemToggle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    processoItemToggleAberto: {
        backgroundColor: '#fff',
        borderColor: '#fff',
    },
    processoItemToggleText: {
        fontSize: 20,
        color: '#a0aec0',
    },
    processoItemToggleTextAberto: {
        color: '#28a745',
    },
    processoItemContent: {
        marginTop: 15,
        paddingLeft: 37,
        fontSize: 16,
        color: '#fff',
        lineHeight: 24,
    },
});

export default ProcessoItem;