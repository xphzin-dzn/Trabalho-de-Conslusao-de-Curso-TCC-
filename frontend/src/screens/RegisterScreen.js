import React, { useState, useEffect } from 'react'; // 1. Importar o useEffect
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import api from '../api';

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    // 2. Novo estado para o erro de confirmação de senha
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    // 3. useEffect para validar as senhas em tempo real
    useEffect(() => {
        // Só mostra o erro se o campo "Confirmar Senha" não estiver vazio
        if (confirmPassword && password !== confirmPassword) {
            setConfirmPasswordError('As senhas não coincidem.');
        } else {
            setConfirmPasswordError(''); // Limpa o erro se as senhas coincidirem ou o campo estiver vazio
        }
    }, [password, confirmPassword]); // Executa sempre que 'password' ou 'confirmPassword' mudar

    const handleRegister = async () => {
        setEmailError('');

        // Mantemos esta verificação como uma segurança final antes de enviar
        if (password !== confirmPassword) {
            setConfirmPasswordError('As senhas não coincidem.');
            return;
        }

        try {
            const response = await api.post('/api/auth/register', { username, email, password });
            const { token } = response.data;

            Alert.alert('Sucesso', 'Conta criada com sucesso!');
            navigation.navigate('Home', { token });

        } catch (error) {
            if (error.response && error.response.data && error.response.data.error === 'Usuário ou email já existe.') {
                setEmailError('Este e-mail já está em uso.');
            } else {
                Alert.alert('Erro no Registo', 'Não foi possível criar a conta.');
            }
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/icon.png')} style={styles.logo} />
            <Text style={styles.title}>Crie sua conta</Text>
            <Text style={styles.subtitle}>Crie sua conta, é grátis!</Text>

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
                onChangeText={(text) => {
                    setEmail(text);
                    if (emailError) setEmailError('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

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
            {/* 4. Exibe a mensagem de erro de confirmação de senha aqui */}
            {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

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
        marginBottom: 5,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        textAlign: 'left',
        marginBottom: 10,
        paddingLeft: 5,
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