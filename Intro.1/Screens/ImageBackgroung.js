import { Text, StyleSheet, View, ImageBackground, Dimensions } from 'react-native'
import React, { useState, useEffect} from 'react'

const BackgroundImage = require ('../assets/19693-scaled.jpg');
const BackgroundImage2 = require ('../assets/FF.jpg');
export default function ImageScreen({navigation}){
  const[showSplash, setShowSplash]=useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return() => clearTimeout(timer)
  },[]);

  if (showSplash) {
    return (
    <View style={styles.container}>
    <ImageBackground source={BackgroundImage}
      style={styles.background}
      resizeMode='cover'>

      <View style={styles.overlay}>
        <Text style={styles.tittle}>Bienvenido</Text>
        <Text style={styles.tittle}>Cargando...</Text>
      </View>
    </ImageBackground>
    </View>
    
    );
  }

  return (
    <ImageBackground source={BackgroundImage2}
      style={styles.background}
      resizeMode='cover'>
    <View style={styles.mainScreen}>
      <Text style={styles.mainText}>Bienvenido a la pantalla principal</Text>

    </View></ImageBackground>
  );
}

const {width, height} = Dimensions.get('window');
    const styles = StyleSheet.create({
           background: {
            width: width,
            height: height,
        },
        overlay: {
            flex: 1,
//            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        tittle: {
            fontSize: 32,
            color: 'black',
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
        },
        mainScreen: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
           // backgroundColor: 'white',
        },
        mainText: {
            fontSize: 24,
            color: 'white',
        },
    });
    