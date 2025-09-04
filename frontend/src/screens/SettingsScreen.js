import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';

const SettingsScreen = ({ navigation }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handlePasswordChange = () => {
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            return Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        }
        if (newPassword !== confirmNewPassword) {
            return Alert.alert('Erro', 'As novas senhas não coincidem.');
        }
        // Lógica para chamar a API e trocar a senha...
        Alert.alert('Sucesso', 'Senha alterada com sucesso!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
    };

    const handleLogout = () => {
        // Lógica para limpar o token guardado
        navigation.navigate('Login');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Configurações</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Gerenciamento de Conta</Text>
                <View style={styles.card}>
                    <Text style={styles.inputLabel}>Senha Atual</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua senha atual"
                        secureTextEntry
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                    />
                    <Text style={styles.inputLabel}>Nova Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite a nova senha"
                        secureTextEntry
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    <Text style={styles.inputLabel}>Confirmar Nova Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirme a nova senha"
                        secureTextEntry
                        value={confirmNewPassword}
                        onChangeText={setConfirmNewPassword}
                    />
                    <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
                        <Text style={styles.buttonText}>Salvar Alterações</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Sessão</Text>
                <View style={styles.card}>
                    <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
                        <Text style={[styles.buttonText, styles.logoutButtonText]}>Sair (Logout)</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1A202C',
    },
    section: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: 'gray',
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    inputLabel: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        height: 50,
        borderColor: '#e2e8f0',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#28a745',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#dc3545',
    },
    logoutButtonText: {
        color: '#fff',
    }
});

export default SettingsScreen;