import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Importamos el controlador de autenticación
import AuthController from './AuthController';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa correo y contraseña');
      return;
    }

    try {
      const user = await AuthController.login(email, password);
      console.log("Login exitoso para:", user.name);
      
      // Volvemos a la pantalla anterior (Perfil)
      navigation.goBack(); 

    } catch (error) {
      console.log(error);
      Alert.alert('Error de Acceso', 'Correo o contraseña incorrectos.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/images/img/logo_upq.png')}  
          style={styles.logo} 
          resizeMode="contain" 
        />
      </View>

      <View style={styles.headerBar}>
        <Text style={styles.headerText}>INICIO DE SESIÓN</Text>
      </View>

      <View style={styles.formContainer}>
        
        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="ejemplo@upq.edu.mx"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* --- AQUÍ ESTÁ LA CORRECCIÓN: Botón Recuperar Contraseña --- */}
        <TouchableOpacity onPress={() => navigation.navigate('Recovery')}>
          <Text style={styles.linkText}>¿Olvidaste tu contraseña? <Text style={styles.boldText}>Click aquí</Text></Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Alert.alert('Info', 'Contacta a sistemas para acceso Admin')}>
          <Text style={styles.linkText}>¿Eres administrador? <Text style={styles.boldText}>Click aquí</Text></Text>
        </TouchableOpacity>

        <View style={styles.buttonRow}>
          
          <TouchableOpacity 
            style={[styles.button, styles.btnRegister]} 
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.btnText}>Registrarse</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.btnLogin]} 
            onPress={handleLogin}
          >
            <Text style={styles.btnText}>Iniciar Sesión</Text>
          </TouchableOpacity>

        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  headerBar: {
    backgroundColor: '#0E1C4E', 
    width: '90%',
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 30,
    borderRadius: 5,
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  formContainer: {
    width: '85%',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#EAEAEA', 
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  linkText: {
    textAlign: 'center',
    color: '#555',
    marginBottom: 10,
    fontSize: 14,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  btnRegister: {
    backgroundColor: '#C8102E',
  },
  btnLogin: {
    backgroundColor: '#0E1C4E', 
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});