import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

// 1. Importa tus pantallas reales
// Asegúrate de que los nombres de archivo coincidan con los que tienes en la carpeta 'screens'
import HomeScreen from '../screens/HomeScreen';   // O '../screens/HomeScreen' si así lo llamaste
import ProfileScreen from '../screens/ProfileScreen'; // O '../screens/ProfileScreen'

// Pantalla temporal para el Carrito (luego creamos el archivo real)
const CartPlaceholder = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Carrito de Compras (Próximamente)</Text>
  </View>
);

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#8B0000', // Color rojo UPQ
        tabBarInactiveTintColor: 'gray',
        // Iconos dinámicos según la pestaña
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Carrito') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* Definición de las 3 Pestañas */}
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Carrito" component={CartPlaceholder} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}