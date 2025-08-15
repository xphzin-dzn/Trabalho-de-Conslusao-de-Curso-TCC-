import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import api from '../api';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Estados separados para cada tipo de erro
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleLogin = async () => {
        // Limpa os erros anteriores
        setEmailError('');
        setPasswordError('');

        try {
            const response = await api.post('/api/auth/login', { email, password });
            const { token } = response.data;
            navigation.navigate('Home', { token });
        } catch (error) {
            // Verifica se há uma resposta com dados do servidor
            if (error.response && error.response.data && error.response.data.error) {
                const errorMessage = error.response.data.error;

                // Verifica a mensagem específica do erro e atualiza o estado correspondente
                if (errorMessage === 'Usuário não encontrado') {
                    setEmailError('O e-mail digitado não foi encontrado.');
                } else if (errorMessage === 'Senha incorreta') {
                    setPasswordError('A senha está incorreta.');
                } else {
                    // Para qualquer outro erro vindo da API
                    Alert.alert('Erro no Login', errorMessage);
                }
            } else {
                // Para erros de conexão ou outros problemas
                Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor.');
            }
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/icon.png')} style={styles.logo} />
            <Text style={styles.title}>Entre com sua conta</Text>
            <Text style={styles.subtitle}>Digite seu e-mail e senha para efetuar login.</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(text) => {
                    setEmail(text);
                    if (emailError) setEmailError(''); // Limpa o erro ao começar a digitar
                }}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {/* Exibe a mensagem de erro de e-mail aqui */}
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={(text) => {
                    setPassword(text);
                    if (passwordError) setPasswordError(''); // Limpa o erro ao começar a digitar
                }}
                secureTextEntry
            />
            {/* Exibe a mensagem de erro de senha aqui */}
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <TouchableOpacity
                style={styles.forgotPasswordContainer}
                onPress={() => {/* Navegar para tela de recuperação de senha */ }}
            >
                <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Não possui conta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={[styles.signupText, styles.signupLink]}>Criar conta</Text>
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
        marginBottom: 5, // Diminuído para dar espaço à mensagem de erro
        paddingHorizontal: 15,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        textAlign: 'left',
        marginBottom: 10,
        paddingLeft: 5,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginBottom: 20,
        marginTop: 5,
    },
    forgotPasswordText: {
        color: '#28a745',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#28a745',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    signupText: {
        fontSize: 16,
    },
    signupLink: {
        color: '#28a745',
        fontWeight: 'bold',
    },
});

export default LoginScreen;