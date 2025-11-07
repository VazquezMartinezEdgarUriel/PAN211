import { useState, useEffect } from 'react';
import React, { Component }from 'react';
import { StyleSheet, Text, View, ImageBackground,Dimensions, ScrollView } from 'react-native';

const BackgroundImage = require('.../assets/5011.jpg')
const BackgroundImage2 = require('.../assets/4427.jpg')
const BackgroundImage3 = require('.../assets/Agua1212.jpg')
const BackgroundImage4 = require('.../assets/Pizza11.jpg')
const BackgroundImage5 = require('.../assets/5055.jpq')
export default function App() {

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);
  if (setShowSplash){
    return(
      <View style={styles.container}>
    <ImageBackground source={BackgroundImage}
      style={styles.background}
      resizeMode='cover'> 
      <View style={styles.overlay}>
        <Text style={styles.tittle}>Los Vazquez</Text>
        <Text style={styles.tittle}>Un restaurante comprometido</Text>
        </View>
    </ImageBackground>
    <ScrollView style={styles.scrollArea} 
        contentContainerStyle={styles.scrollContent} 
        showVerticalScrollIndicator={true}> 
        <Text style={style.items}>Comida </Text>
        <ImageBackground source={BackgroundImage2}
        styles={ background}
        resizeMode='cover'>
        <View style={styles.mainScreen}>
        <Text style={styles.mainText}>Hamburguesa</Text>
        <Text style={styles.mainText}>Rica Hamburguesa a termino medio, carne 70/30 </Text>
        <Text style={styles.mainText}>$125</Text>
        </View>
        </ImageBackground>
        <ImageBackground source={BackgroundImage4}
        styles={ background}
        resizeMode='cover'>
        <View style={styles.mainScreen}>
        <Text style={styles.mainText}>Pizza</Text>
        <Text style={styles.mainText}>Rica Pizza recien echa, se utiliza maza madre de primera calidad  </Text>
        <Text style={styles.mainText}>$250 Pizza Familiar</Text>
        </View>
        </ImageBackground>
    </ScrollView>  
    <ScrollView style={styles.scrollArea} 
        contentContainerStyle={styles.scrollContent} 
        showVerticalScrollIndicator={true}> 
        <Text style={style.items}>Bebida</Text>
         <ImageBackground source={BackgroundImage5}
        styles={ background}
        resizeMode='cover'>
        <View style={styles.mainScreen}>
        <Text style={styles.mainText}>Coca Cola</Text>
        <Text style={styles.mainText}>70/30 </Text>
        <Text style={styles.mainText}>$45</Text>
        </View>
        </ImageBackground>
        <ImageBackground source={BackgroundImage3}
        styles={ background}
        resizeMode='cover'>
        <View style={styles.mainScreen}>
        <Text style={styles.mainText}>Pizza</Text>
        <Text style={styles.mainText}>Rica Pizza recien echa, se utiliza maza madre de primera calidad  </Text>
        <Text style={styles.mainText}>$250 Pizza Familiar</Text>
        </View>
        </ImageBackground>

    </ScrollView>    
    </View>
    )}
  }
  const windowWidth = Dimensions.get('window').width;
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tittle:{
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  mainScreen: {
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
  },
  mineText:{
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  background:{
    flex:1,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay:{
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },  
});
