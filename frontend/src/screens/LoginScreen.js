import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import api from '../api';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState(''); // Alterado de email para username
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            // Adicionado /api ao endpoint
            const response = await api.post('/api/auth/login', { username, password }); // Alterado de email para username
            const { token } = response.data;

            // Aqui você pode salvar o token para usar em outras requisições
            // Por exemplo, usando AsyncStorage

            navigation.navigate('Home', { token });
        } catch (error) {
            Alert.alert('Erro no Login', 'Usuário ou senha inválidos.');
            console.error(error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}>Login</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
                placeholder="Usuário" // Alterado de Email para Usuário
                value={username}
                onChangeText={setUsername} // Alterado de setEmail para setUsername
                autoCapitalize="none"
            />
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Entrar" onPress={handleLogin} />
        </View>
    );
};

export default LoginScreen;