import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View } from 'react-native'; // Importe Image e View

// Telas
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import SessionsScreen from '../screens/SessionsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegador principal com as abas (após o login)
function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    // Lógica para mostrar ícones - substitua 'icon.png' pelos seus ícones
                    if (route.name === 'Dashboard') {
                        iconName = require('../../assets/icon.png');
                    } else if (route.name === 'Sessões') {
                        iconName = require('../../assets/icon.png');
                    } else if (route.name === 'Configurações') {
                        iconName = require('../../assets/icon.png');
                    }
                    return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />;
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

// Navegador geral da aplicação
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                {/* Telas que não têm a barra de abas */}
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                {/* O navegador com abas é tratado como uma única tela aqui */}
                <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;