import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DatabaseService from '../database/db';

export default function RecoveryScreen({ navigation }) {
  const [step, setStep] = useState(1); // Paso 1: Pedir Correo, Paso 2: Validar Código
  const [email, setEmail] = useState('');
  const [serverCode, setServerCode] = useState(null); // El código real generado
  const [userCode, setUserCode] = useState('');       // El código que escribe el usuario
  const [newPassword, setNewPassword] = useState('');

  // PASO 1: ENVIAR CÓDIGO
  const handleSendCode = () => {
    if (!email.trim()) {
      Alert.alert("Error", "Por favor ingresa tu correo");
      return;
    }

    // Verificar si el correo existe en la BD
    const exists = DatabaseService.checkEmailExists(email);
    if (!exists) {
      Alert.alert("Error", "Este correo no está registrado");
      return;
    }

    // Generar código aleatorio de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000);
    setServerCode(code.toString());

    // SIMULAMOS EL ENVÍO DE CORREO MOSTRANDO EN LOG
    console.log("----------------------------------------");
    console.log(`🔐 CÓDIGO DE RECUPERACIÓN PARA ${email}: ${code}`);
    console.log("----------------------------------------");

    Alert.alert("Código Enviado", "Revisa la consola (logs) para ver tu código de verificación.", [
        { text: "OK", onPress: () => setStep(2) }
    ]);
  };

  // PASO 2: VERIFICAR Y CAMBIAR PASSWORD
  const handleChangePassword = () => {
    if (userCode !== serverCode) {
      Alert.alert("Error", "El código es incorrecto");
      return;
    }
    if (newPassword.length < 4) {
      Alert.alert("Error", "La contraseña es muy corta");
      return;
    }

    // Actualizar en BD
    const success = DatabaseService.updatePassword(email, newPassword);
    if (success) {
      Alert.alert("¡Éxito!", "Tu contraseña ha sido actualizada. Inicia sesión ahora.", [
        { text: "Ir al Login", onPress: () => navigation.navigate('Login') }
      ]);
    } else {
      Alert.alert("Error", "No se pudo actualizar la contraseña");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#0E1C4E" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/img/logo_upq.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Recuperar Contraseña</Text>
      </View>

      <View style={styles.form}>
        {step === 1 ? (
          <>
            <Text style={styles.instruction}>Ingresa tu correo institucional para recibir un código de verificación.</Text>
            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput 
              style={styles.input} 
              placeholder="ejemplo@upq.edu.mx" 
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleSendCode}>
              <Text style={styles.buttonText}>Enviar Código</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.instruction}>Hemos enviado un código a {email}.</Text>
            
            <Text style={styles.label}>Código de Verificación</Text>
            <TextInput 
              style={styles.input} 
              placeholder="123456" 
              value={userCode}
              onChangeText={setUserCode}
              keyboardType="numeric"
            />

            <Text style={styles.label}>Nueva Contraseña</Text>
            <TextInput 
              style={styles.input} 
              placeholder="********" 
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />

            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
              <Text style={styles.buttonText}>Cambiar Contraseña</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setStep(1)} style={{marginTop: 20}}>
                <Text style={{color: '#666', textAlign: 'center'}}>¿Correo equivocado? Volver</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 50 },
  backButton: { marginBottom: 10 },
  logoContainer: { alignItems: 'center', marginBottom: 30 },
  logo: { width: 80, height: 80, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#0E1C4E' },
  form: { width: '100%' },
  instruction: { textAlign: 'center', color: '#666', marginBottom: 20, fontSize: 14 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  input: { backgroundColor: '#F0F0F0', borderRadius: 10, padding: 15, fontSize: 16, marginBottom: 20 },
  button: { backgroundColor: '#C8102E', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});