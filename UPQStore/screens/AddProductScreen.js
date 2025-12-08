import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('upqstore_final_v1.db');

export default function AddProductScreen({ navigation }) {
  const [name, setName] = useState(''); const [price, setPrice] = useState(''); const [cat, setCat] = useState('');

  const add = () => {
    db.runSync('INSERT INTO products (name, category, price, description, image) VALUES (?, ?, ?, ?, ?)', [name, cat, price, 'Nuevo producto', 'logo_upq']);
    Alert.alert("Listo", "Producto subido", [{ text: "OK", onPress: () => navigation.goBack() }]);
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nombre" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Precio" value={price} onChangeText={setPrice} style={styles.input} keyboardType="numeric"/>
      <TextInput placeholder="Categoría" value={cat} onChangeText={setCat} style={styles.input} />
      <TouchableOpacity onPress={add} style={styles.btn}><Text style={{color:'#fff'}}>Subir</Text></TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20 }, input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }, btn: { backgroundColor: '#0E1C4E', padding: 15, alignItems: 'center', borderRadius: 5 } });
