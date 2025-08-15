import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DataScreen from '../screens/DataScreen';
import { RootStackParamList } from '../screens/HomeScreen'; // 👈 Importe o tipo aqui

// 1. Tipar o Stack Navigator com o 'RootStackParamList'
const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Dashboard' }} />
        <Stack.Screen name="Data" component={DataScreen} options={{ title: 'Dados do Sensor' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}