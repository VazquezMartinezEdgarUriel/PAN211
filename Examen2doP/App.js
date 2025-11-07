import { useState, useEffect} from 'react';
import { StyleSheet, Text, View, ImageBackground,Dimensions } from 'react-native';

const BackgroundImage = require( '../assets/5011.jpg' );

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
