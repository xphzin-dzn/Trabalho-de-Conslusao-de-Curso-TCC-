import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const EquipeCard = ({ imagem, nome, cargo, descricao }) => {
    return (
        <View style={styles.equipeCard}>
            <View style={styles.equipeCardHeader}>
                <Image source={imagem} style={styles.equipeAvatar} />
                <View style={styles.equipeHeaderText}>
                    <Text style={styles.equipeNome}>{nome}</Text>
                    <Text style={styles.equipeCargo}>{cargo}</Text>
                </View>
                <TouchableOpacity>
                    {/* Substitua 'icon.png' pelo seu ícone do LinkedIn */}
                    <Image source={require('../../assets/icon.png')} style={styles.linkedinIcon} />
                </TouchableOpacity>
            </View>
            <Text style={styles.equipeDescricao}>{descricao}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    equipeCard: {
        width: '48%', // Para ter 2 cartões por linha com um pequeno espaço
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
    },
    equipeCardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    equipeAvatar: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    equipeHeaderText: {
        flex: 1,
    },
    equipeNome: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A202C',
    },
    equipeCargo: {
        fontSize: 14,
        color: 'gray',
    },
    linkedinIcon: {
        width: 24,
        height: 24,
    },
    equipeDescricao: {
        fontSize: 14,
        color: '#4A5568',
        lineHeight: 20,
    },
});

export default EquipeCard;