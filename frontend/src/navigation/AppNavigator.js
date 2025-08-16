import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen'; // 1. Importe a nova tela
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            {/* 2. Mude a rota inicial para "Welcome" */}
            <Stack.Navigator initialRouteName="Welcome">
                {/* 3. Adicione a nova tela à pilha de navegação */}
                <Stack.Screen
                    name="Welcome"
                    component={WelcomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    // Podemos dar um título à tela principal se quisermos
                    options={{ title: 'Dashboard' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;