import { useState } from 'react';
import { Text, View, Button, StyleSheet, ActivityIndicator, Platform } from 'react-native';


export default function ActivityScreen() 
{
  const [cargando, setCargando] = useState(false);
  const carga = () => {
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      if(Platform.OS === 'web'){
        window.alert('Carga completa');
      } else {  
      Alert.alert('Carga completa');
      }
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Presione para iniciar la carga</Text>
      <View style={styles.botonesContainer}>  
        {cargando ? (<ActivityIndicator size="large" color="Red"/>) : (<Button color="brown" title="Presione para iniciar" onPress={carga} />)}
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
    botonesContainer: {
        marginTop: 20,
        gap: 20,
    },
});
