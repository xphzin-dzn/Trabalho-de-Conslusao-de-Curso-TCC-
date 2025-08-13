import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import api from '../services/api';

export default function DataList() {
  const [dados, setDados] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const carregarDados = async () => {
    try {
      const res = await api.get('/dados');
      setDados(res.data);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await carregarDados();
    setRefreshing(false);
  };

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={dados}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>
              {JSON.stringify(item)}
            </Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f4',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  text: {
    fontSize: 14,
  },
});
