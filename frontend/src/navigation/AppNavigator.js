import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

// Telas
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import SessionsScreen from '../screens/SessionsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SessionDetailScreen from '../screens/SessionDetailScreen'; // Importe a nova tela

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegador com as abas
function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconSource;
                    if (route.name === 'Dashboard') {
                        iconSource = require('../../assets/icon.png');
                    } else if (route.name === 'Sessões') {
                        iconSource = require('../../assets/icon.png');
                    } else if (route.name === 'Configurações') {
                        iconSource = require('../../assets/icon.png');
                    }
                    return <Image source={iconSource} style={{ width: size, height: size, tintColor: color }} />;
                },
                tabBarActiveTintColor: '#28a745',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Dashboard" component={HomeScreen} />
            <Tab.Screen name="Sessões" component={SessionsScreen} />
            <Tab.Screen name="Configurações" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

// Navegador geral
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
                {/* Tela de Detalhes adicionada aqui para poder ser chamada */}
                <Stack.Screen
                    name="SessionDetail"
                    component={SessionDetailScreen}
                    options={{ title: 'Detalhes da Sessão', headerBackTitle: 'Voltar' }} // Mostra um cabeçalho com botão de voltar
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;