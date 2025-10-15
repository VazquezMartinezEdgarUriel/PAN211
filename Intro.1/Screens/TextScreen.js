import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const TextScreen = () => {
  const [nombre, setNombre] = useState('');

  const mostrarAlerta = () => {
    if (nombre.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa tu nombre');
    } else {
      Alert.alert('Hola!', `Bienvenido, ${nombre}! `);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Practica TextInput & Alert</Text>

      <TextInput
        style={styles.nombres}
        placeholder="Escribe tu nombre"
        value={nombre}
        onChangeText={setNombre}
        maxLength={50}
      />

      <Button color='blue'  title="Mostrar saludo" onPress={mostrarAlerta} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hsla(209, 73%, 88%, 1.00)',
    padding: 20, //separa el texto del recuadro
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  nombres: {
    borderWidth: 1, //Define el grosor del borde del componente
    borderColor: '#0f0e0eff', //Color del borde
    padding: 10,
    marginBottom: 20, //Separa este componente del que está debajo de él
  },
  
});


export default TextScreen;
