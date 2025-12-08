import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import { openDatabaseSync } from 'expo-sqlite';
import { Ionicons } from '@expo/vector-icons';

const db = openDatabaseSync('upqstore_seller.db');

export default function PaymentsScreen() {
  const [cards, setCards] = useState([]);
  const [number, setNumber] = useState('');
  const [holder, setHolder] = useState('');
  const [expiry, setExpiry] = useState('');

  const loadCards = () => {
    const rows = db.getAllSync('SELECT * FROM cards');
    setCards(rows);
  };

  useEffect(() => loadCards(), []);

  const addCard = () => {
    if(!number || !holder) return Alert.alert("Error", "Faltan datos");
    
    db.runSync(
        'INSERT INTO cards (card_number, holder_name, expiry) VALUES (?, ?, ?)', 
        [number, holder, expiry]
    );
    
    setNumber(''); setHolder(''); setExpiry('');
    loadCards();
    Alert.alert("Éxito", "Tarjeta guardada correctamente");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis Métodos de Pago</Text>
      
      <FlatList
        data={cards}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardItem}>
            <Ionicons name="card" size={32} color="#0E1C4E" />
            <View style={{marginLeft: 15}}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>**** **** **** {item.card_number.slice(-4)}</Text>
                <Text style={{color:'#666'}}>{item.holder_name} - {item.expiry}</Text>
            </View>
          </View>
        )}
        style={{maxHeight: 200}}
      />
      
      <View style={styles.form}>
        <Text style={styles.subtitle}>Agregar Nueva Tarjeta</Text>
        <TextInput placeholder="Número de Tarjeta (16 dígitos)" value={number} onChangeText={setNumber} style={styles.input} keyboardType="numeric" maxLength={16}/>
        <TextInput placeholder="Nombre del Titular" value={holder} onChangeText={setHolder} style={styles.input}/>
        <TextInput placeholder="Vencimiento (MM/YY)" value={expiry} onChangeText={setExpiry} style={styles.input} maxLength={5}/>
        
        <TouchableOpacity style={styles.btn} onPress={addCard}>
            <Text style={styles.btnText}>Guardar Tarjeta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, marginTop: 10, color: '#C8102E' },
  cardItem: { flexDirection: 'row', padding: 15, backgroundColor: '#f8f9fa', borderRadius: 10, marginBottom: 10, alignItems: 'center', elevation: 1 },
  form: { marginTop: 20, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 20 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 8, marginBottom: 15, backgroundColor: '#fafafa' },
  btn: { backgroundColor: '#0E1C4E', padding: 15, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});