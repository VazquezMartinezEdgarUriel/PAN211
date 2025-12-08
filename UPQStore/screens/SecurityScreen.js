import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView } from 'react-native';
import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('upqstore_seller.db');

export default function SecurityScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Cargamos los datos del usuario actual
    const user = db.getFirstSync('SELECT * FROM users ORDER BY id DESC LIMIT 1');
    if (user) {
        setUserId(user.id);
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone || '');
        setPassword(user.password);
    }
  }, []);

  const saveChanges = () => {
    if (!name || !email || !password) return Alert.alert("Error", "No puedes dejar campos vacíos");
    
    try {
        db.runSync(
            'UPDATE users SET name = ?, email = ?, phone = ?, password = ? WHERE id = ?',
            [name, email, phone, password, userId]
        );
        Alert.alert("Actualizado", "Tus datos se han guardado correctamente.", [{ text: "OK", onPress: () => navigation.goBack() }]);
    } catch (e) {
        Alert.alert("Error", "No se pudo actualizar la información.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Editar Perfil</Text>

      <Text style={styles.label}>Nombre Completo</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} />

      <Text style={styles.label}>Correo Electrónico</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput value={phone} onChangeText={setPhone} style={styles.input} placeholder="Agrega tu número" keyboardType="phone-pad"/>

      <Text style={styles.label}>Contraseña</Text>
      <TextInput value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />

      <TouchableOpacity style={styles.btn} onPress={saveChanges}>
        <Text style={styles.btnText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 25, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, color: '#0E1C4E', textAlign: 'center' },
  label: { fontWeight: 'bold', marginTop: 10, color: '#555' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginTop: 5, fontSize: 16 },
  btn: { backgroundColor: '#C8102E', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 40 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});