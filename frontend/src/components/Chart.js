// frontend/src/components/Chart.js

import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Chart = ({ data, valueKey, title }) => {
    // Verificação para garantir que os dados existem e não estão vazios
    if (!data || data.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.noDataText}>Sem dados para exibir.</Text>
            </View>
        );
    }

    const chartData = {
        labels: data.map((d) => new Date(d.timestamp).toLocaleTimeString('pt-BR')),
        datasets: [
            {
                data: data.map((d) => d[valueKey]),
            },
        ],
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <LineChart
                data={chartData}
                width={Dimensions.get('window').width - 20}
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 1,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: '4',
                        strokeWidth: '2',
                        stroke: '#ffa726',
                    },
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    noDataText: {
        marginTop: 20,
        fontStyle: 'italic',
        color: 'gray',
    },
});

export default Chart;