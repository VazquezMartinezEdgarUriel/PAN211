import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// USAMOS EL CONTROLADOR (Igual que en Login)
import AuthController from './AuthController';

export default function RegisterScreen() {
  const navigation = useNavigation();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    // 1. Validaciones básicas
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      // 2. Usamos el AuthController para registrar
      // Esto guarda en la BD nueva y hace auto-login
      const newUser = await AuthController.register(name, email, password);

      console.log("Registro exitoso:", newUser);
      Alert.alert('¡Éxito!', 'Cuenta creada correctamente', [
        { 
          text: 'OK', 
          onPress: () => {
            // 3. Al terminar, vamos al Main (o volvemos al perfil)
            // .popToTop() nos regresa a la pantalla principal de la tienda ya logueados
            navigation.popToTop(); 
          }
        }
      ]);

    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudo crear la cuenta. Es posible que el correo ya exista.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#0E1C4E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CREAR CUENTA</Text>
      </View>

      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/images/img/logo_upq.png')}  
          style={styles.logo} 
          resizeMode="contain" 
        />
      </View>

      <View style={styles.formContainer}>
        
        <Text style={styles.label}>Nombre Completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Tu Nombre"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Correo Institucional</Text>
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

        <Text style={styles.label}>Confirmar Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="********"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity 
          style={styles.btnRegister} 
          onPress={handleRegister}
        >
          <Text style={styles.btnText}>Registrarse</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0E1C4E',
    marginLeft: 10,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  formContainer: {
    width: '85%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#EAEAEA', 
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  btnRegister: {
    backgroundColor: '#C8102E', // Rojo UPQ para registrarse
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    elevation: 3,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});