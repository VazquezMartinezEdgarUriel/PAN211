import { Text, StyleSheet, View, ImageBackground, Dimensions, Switch, TextInput, TouchableOpacity} from 'react-native'
import React, { useState, useEffect} from 'react'

const BackgroundImage2 = require ('../assets/FF.jpg');
const BackgroundImage = require ('../assets/19693-scaled.jpg');

export default function ImageScreen({navigation}){
    const[showSplash, setShowSplash]=useState(true);   
    const [isEnabled, setIsEnabled] = useState(false);

    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
        setShowSplash(false);
        }, 3000);
        return() => clearTimeout(timer)
    },[]);

    const mostrarAlerta = () => {
      if (nombre.trim() === '') {
        alert('Error, Por favor escribe tu nombre');
    } else if (correo.trim() === '') { 
        alert('Error, Por favor escribe tu correo');
    } else if (!correo.includes('@')) {
        alert('Error, Por favor escribe un correo valido');
    } else if (isEnabled != true) { 
        alert('Error, Debes aceptar los terminos y condiciones'); 
    } else {
    alert(`Nombre: ${nombre} \nEmail: ${correo}`);
    }
};

    if (showSplash) {
        return (

            <View style={styles.splashContainer}> 
                <ImageBackground source={BackgroundImage}
                style={styles.background}
                resizeMode='cover'>
                <View style={styles.overlay}>
                <Text style={styles.tittle}>Cargando...</Text>
                </View>
                </ImageBackground>
            </View>
        );
    }

 
  return (
    <View style={styles.mainScreen}>
      <ImageBackground
        source={BackgroundImage2}
       // style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.darkOverlay}>
          
          <View style={styles.formContainer}>
            
            <Text style={styles.titulo}>Registro de Usuario</Text>

            <TextInput
              style={styles.recuadro}
              placeholder="Nombre completo"
              placeholderTextColor="#CCCCCC" 
              value={nombre}
              onChangeText={setNombre}
              maxLength={50}
            />
            <TextInput
              style={styles.recuadro}
              placeholder="Correo electrónico"
              placeholderTextColor="#CCCCCC" 
              value={correo}
              onChangeText={setCorreo}
              keyboardType="email-address"
              maxLength={50}
            />
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Aceptar términos y condiciones</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#f4f3f4" }}
                thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                onValueChange={setIsEnabled}
                value={isEnabled}
              />
            </View>

            <TouchableOpacity onPress={mostrarAlerta} style={styles.button}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    splashContainer: { 
      flex: 1,
    },
    background: {
      width: width,
      height: height,
      justifyContent: 'center', 
      alignItems: 'center',
    },
    overlay: {
      flex: 1,
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
    },
    darkOverlay: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black', 
    },
   
    formContainer: {
      width: '90%',
      padding: 20,
      borderRadius: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      alignItems: 'center',
    },
    titulo: {
      fontSize: 22, 
      fontWeight: 'bold', 
      marginBottom: 20,
      color: 'white', 
    },

    recuadro: {
      width: '100%',
      padding: 10,
      marginBottom: 20,
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '#CCCCCC', 
      borderRadius: 10,
      color: 'white', 
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 25,
      width: '100%',
      justifyContent: 'space-between', 
    },
    switchLabel: {
      fontSize: 14,
      color: 'white',
      flexShrink: 1,
      marginRight: 10,
    },
    button: {
      paddingVertical: 10,
    },
    buttonText: {
      color: '#3498db', 
      fontSize: 18,
      fontWeight: 'bold',
    },
});
