//1. Imports: Zona de importaciones
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-web';

//2. Main: Zona de componentes
export default function ContadorScreen() {

  const[contador,setContador]=useState(0);
  return (
    <View style={styles.container}>

      <Text style={styles.texto}> Contador: </Text>
      <Text style={styles.texto2}> {contador}</Text>


      <View style={styles.botonesContainer}>
      <Button color='Red'title='Agregar' onPress={()=>setContador(contador+1)} />
      <Button color='Red'title='Reiniciar' onPress={()=>setContador(0)} />
      <Button color='Red'title='Quitar' onPress={()=>setContador(contador-1)} /></View>
      <StatusBar style="auto" />
    </View> 
  );
}

//3 Styles: Zona de Estilos para el Componente
const styles = StyleSheet.create({
  container: {
    flex: 1, //Ocupacion del esoacio en la pantalla
    backgroundColor: '#a10404c9', //Color de fondo
    alignItems: 'center', // para alinear los elementos en el eje x (horizontal)
    justifyContent: 'start', // para alinear los elementos en el eje y (vertical)
  }, 
  texto:{
    color:'#000000ff', //Color del texto
    fontSize:30, //Tamaño del texto
    fontFamily:'Times New Roman', //Tipo de letra
    fontWeight:'bold', //Grosor de la letra
    fontStyle:'italic', //Estilo de la letra
    textDecorationLine:'line-through', //Decoracion del texto
  }, 
  texto2:{
    color:'hsla(0, 0%, 0%, 1.00)', //Color del texto
    fontSize:40, //Tamaño del texto
    fontFamily:'Courier', //Tipo de letra
    fontWeight:'900', //Grosor de la letra
    fontStyle:'italic', //Estilo de la letra
    textDecorationLine:'underline', //Decoracion del texto
    },

    botonesContainer:{
        marginTop:15, //Margen superior
        flexDirection: 'row', //Alineacion de los botones en fila
        gap:15, //Espacio entre cada boton

    },
});
