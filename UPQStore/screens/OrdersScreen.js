import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('upqstore_seller.db');

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      // Obtenemos los pedidos guardados
      const rows = db.getAllSync('SELECT * FROM orders ORDER BY id DESC');
      setOrders(rows);
    } catch (e) { console.log(e); }
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
                <Text style={styles.date}>{item.date}</Text>
                <Text style={styles.status}>Entregado</Text>
            </View>
            <Text style={styles.items}>{item.items_summary}</Text>
            <Text style={styles.total}>Total Pagado: ${item.total}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No tienes pedidos anteriores.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  card: { backgroundColor: '#fff', padding: 15, marginBottom: 15, borderRadius: 10, elevation: 2 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  date: { color: '#888', fontWeight: 'bold' },
  status: { color: 'green', fontWeight: 'bold', backgroundColor: '#e6ffe6', paddingHorizontal: 8, borderRadius: 5 },
  items: { fontSize: 16, marginBottom: 10, color: '#333' },
  total: { fontSize: 18, color: '#C8102E', fontWeight: 'bold', textAlign: 'right' },
  empty: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#999' }
});
