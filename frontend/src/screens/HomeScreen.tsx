import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

// 1. Defina o tipo de parâmetro para cada tela
// 'RootStackParamList' é um objeto onde as chaves são os nomes das telas
// e os valores são os parâmetros que a tela espera.
// Neste caso, as telas 'Home' e 'Data' não recebem parâmetros, então usamos 'undefined'.
export type RootStackParamList = {
    Home: undefined;
    Data: undefined;
};

// 2. Crie o tipo de tela para 'Home' usando os tipos de navegação
type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

// 3. Use o tipo no componente
export default function HomeScreen({ navigation }: HomeScreenProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao Dashboard!</Text>
            <Button
                title="Ver Dados do Sensor"
                onPress={() => navigation.navigate('Data')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});