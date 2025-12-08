import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AuthController from './AuthController';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Estados para los inputs
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  useEffect(() => {
    const currentUser = AuthController.getCurrentUser();
    updateLocalUser(currentUser);

    const unsubscribe = AuthController.addListener(() => {
      updateLocalUser(AuthController.getCurrentUser());
    });
    return () => AuthController.removeListener(unsubscribe);
  }, []);

  const updateLocalUser = (u) => {
    setUser(u);
    if (u) {
      setEditName(u.name);
      setEditEmail(u.email);
    }
  };

  const handleSaveProfile = async () => {
    try {
      if (!editName.trim() || !editEmail.trim()) {
        Alert.alert("Error", "Los campos no pueden estar vacíos");
        return;
      }
      
      // 1. Guardar en Base de Datos
      const updatedUser = await AuthController.updateProfile(editName, editEmail);
      
      // 2. FORZAR ACTUALIZACIÓN VISUAL INMEDIATA
      setUser(updatedUser); 
      setIsEditing(false); 
      
      Alert.alert("¡Éxito!", "Perfil actualizado correctamente");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo actualizar el perfil");
    }
  };

  const handleLogout = () => {
    AuthController.logout();
    // Opcional: navegar al inicio
  };

  if (!user) {
    return (
      <View style={styles.containerGuest}>
        <Ionicons name="person-circle-outline" size={100} color="#ccc" />
        <Text style={styles.titleGuest}>Bienvenido a UPQ Store</Text>
        <Text style={styles.subtitleGuest}>Inicia sesión para ver tu perfil.</Text>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButtonText}>Iniciar Sesión / Registrarse</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
             {user.name ? user.name[0].toUpperCase() : 'U'}
          </Text>
        </View>

        {isEditing ? (
            <View style={{width: '100%', alignItems: 'center'}}>
                <TextInput 
                    style={styles.input} 
                    value={editName} 
                    onChangeText={setEditName} 
                    placeholder="Nombre"
                />
                <TextInput 
                    style={styles.input} 
                    value={editEmail} 
                    onChangeText={setEditEmail} 
                    placeholder="Correo"
                    autoCapitalize="none"
                />
                <View style={styles.editButtonsRow}>
                    <TouchableOpacity style={[styles.smallButton, {backgroundColor: '#666'}]} onPress={() => setIsEditing(false)}>
                        <Text style={{color: '#fff'}}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.smallButton, {backgroundColor: '#C8102E'}]} onPress={handleSaveProfile}>
                        <Text style={{color: '#fff'}}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ) : (
            <>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
                <TouchableOpacity style={styles.editIcon} onPress={() => setIsEditing(true)}>
                    <Ionicons name="pencil" size={16} color="#C8102E" />
                    <Text style={{color: '#C8102E', marginLeft: 5, fontWeight: 'bold'}}>Editar Perfil</Text>
                </TouchableOpacity>
            </>
        )}
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Orders')}>
          <Ionicons name="bag-handle-outline" size={24} color="#333" />
          <Text style={styles.menuText}>Mis Pedidos</Text>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Payments')}>
          <Ionicons name="card-outline" size={24} color="#333" />
          <Text style={styles.menuText}>Métodos de Pago</Text>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </TouchableOpacity>

        {user.role === 'admin' && (
           <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Seller')}>
             <Ionicons name="add-circle-outline" size={24} color="#C8102E" />
             <Text style={[styles.menuText, {color: '#C8102E'}]}>Administrar Productos</Text>
             <Ionicons name="chevron-forward" size={24} color="#ccc" />
           </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerGuest: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20 },
  titleGuest: { fontSize: 24, fontWeight: 'bold', marginTop: 10, color: '#333' },
  subtitleGuest: { fontSize: 16, color: '#666', textAlign: 'center', marginVertical: 10, marginBottom: 30 },
  loginButton: { backgroundColor: '#C8102E', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 25 },
  loginButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  container: { flexGrow: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#fff', alignItems: 'center', padding: 30, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, elevation: 5 },
  avatarContainer: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#C8102E', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  avatarText: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  name: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  email: { fontSize: 14, color: '#666', marginBottom: 10 },
  editIcon: { flexDirection: 'row', alignItems: 'center', marginTop: 5, padding: 5 },
  input: { backgroundColor: '#eee', width: '80%', padding: 10, borderRadius: 10, marginBottom: 10, textAlign: 'center' },
  editButtonsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '60%', marginTop: 5 },
  smallButton: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
  menu: { marginTop: 20, paddingHorizontal: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
  menuText: { flex: 1, marginLeft: 15, fontSize: 16, color: '#333' },
  logoutButton: { marginTop: 30, marginHorizontal: 20, padding: 15, alignItems: 'center', marginBottom: 40 },
  logoutText: { color: '#C8102E', fontSize: 16, fontWeight: 'bold' }
});

export default ProfileScreen;