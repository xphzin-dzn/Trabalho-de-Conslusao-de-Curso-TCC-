import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import api from '../api';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState(''); // O backend espera 'username'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }

        try {
            // O backend espera 'username' e 'password'
            const response = await api.post('/api/auth/register', { username, password });
            const { token } = response.data;

            // Após o registro, navega para a tela Home
            Alert.alert('Sucesso', 'Conta criada com sucesso!');
            navigation.navigate('Home', { token });

        } catch (error) {
            Alert.alert('Erro no Cadastro', 'Não foi possível criar a conta. Tente outro nome de usuário.');
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/icon.png')} style={styles.logo} />
            <Text style={styles.title}>Crie sua conta</Text>
            <Text style={styles.subtitle}>Crie sua conta para continuar.</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="words"
            />
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmar Senha"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Criar conta</Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Já possui conta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.loginText, styles.loginLink]}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: 'gray',
        marginBottom: 30,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#28a745',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    loginText: {
        fontSize: 16,
    },
    loginLink: {
        color: '#28a745',
        fontWeight: 'bold',
    },
});

export default RegisterScreen;