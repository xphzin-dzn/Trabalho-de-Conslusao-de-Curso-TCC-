import React from 'react';
import { View, Text, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Tela de Login</Text>
            <Button
                title="Ir para a Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
};

export default LoginScreen;