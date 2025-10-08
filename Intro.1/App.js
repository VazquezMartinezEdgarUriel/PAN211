//1. Imports: Zona de importaciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-web';

//2. Main: Zona de componentes
export default function App() {

  const[contador,setContador]=useState(0);
  return (
    <View style={styles.container}>
      <Text> Contador: {contador} </Text>
      <Button title='Agregar' onPress={()=>setContador(contador+1)} />
      <Button title='Reiniciar' onPress={()=>setContador(0)} />
      <Button title='Quitar' onPress={()=>setContador(contador-1)} />
      <StatusBar style="auto" />
    </View> 
  );
}

//3 Styles: Zona de Estilos para el Componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});