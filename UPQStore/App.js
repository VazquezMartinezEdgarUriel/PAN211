import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Base de Datos
import { initDB, seedProducts } from './database/db';

// Pantallas Existentes
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import SellerScreen from './screens/SellerScreen';
import OrdersScreen from './screens/OrdersScreen';
import PaymentsScreen from './screens/PaymentsScreen';

// 1. IMPORTAR LA NUEVA PANTALLA DE RECUPERACIÓN
import RecoveryScreen from './screens/RecoveryScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Inicio') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Carrito') iconName = focused ? 'cart' : 'cart-outline';
          else if (route.name === 'Perfil') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#C8102E', 
        tabBarInactiveTintColor: 'gray',
        headerShown: false
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Carrito" component={CartScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        initDB(); 
        seedProducts();
        console.log("✅ Sistema listo.");
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    };

    prepare();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#C8102E" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={HomeTabs} options={{ headerShown: false }} />
        
        {/* Pantallas de Autenticación */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Crear Cuenta' }} />
        
        {/* 2. AGREGAR LA PANTALLA DE RECUPERACIÓN AL STACK */}
        <Stack.Screen name="Recovery" component={RecoveryScreen} options={{ headerShown: false }} />

        {/* Otras Pantallas */}
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Seller" component={SellerScreen} options={{ title: 'Subir Producto' }} />
        <Stack.Screen name="Orders" component={OrdersScreen} options={{ title: 'Mis Pedidos' }} />
        <Stack.Screen name="Payments" component={PaymentsScreen} options={{ title: 'Mis Pagos' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}