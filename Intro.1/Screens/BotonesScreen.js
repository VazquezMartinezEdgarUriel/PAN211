import React, {use, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Switch } from 'react-native-web';

export default function BotonesScreen() {
  const [prendido, setPrendido] = useState(false);
 
  const backgroundColor = prendido ? '#F5F5F5' : '#121212';
  const textColor = prendido ? '#000000' : '#FFFFFF';
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={[styles.texto, {color: textColor}]}>Estado: { prendido ? 'Prendido': 'Apagado'} </Text>  
      <TouchableOpacity
        style={ styles.botonEncender}
        onPress={() => setPrendido(true)}> 
        <Text style={styles.textoBoton}> Prendido </Text>
      </TouchableOpacity> 

      <TouchableOpacity
        style={ styles.botonApagar}
        onPress={() => setPrendido(false)}>
        <Text style={styles.textoBoton}> Apagar </Text> 
        </TouchableOpacity>

      <View style={styles.switchContainer}>
        <Text style = {[styles.switchLabel, {color:textColor}]}>Control de Switch </Text> 
        <Switch value = {prendido} onValueChange={setPrendido}></Switch>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20
  },
  texto: {
    fontSize: 20,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  botonEncender: {
    backgroundColor: '#007a04ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
   botonApagar: {
    backgroundColor: '#F44336',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 16,
  },
  textoBoton:{
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',

  },
  switchContainer:{
    flexDirection: 'row',
    alignItems: 'center',
  },

  switchLabel:{
    fontSize:16,
    marginRight:10,
  },

});