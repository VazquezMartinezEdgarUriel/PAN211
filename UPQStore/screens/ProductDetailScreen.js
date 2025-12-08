import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DatabaseService from '../database/db';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params || {}; 
  const [quantity, setQuantity] = useState(1);

  if (!product) return <View><Text>Error: Producto no encontrado</Text></View>;

  // MISMO MAPEO QUE EN HOME
  const getImage = (imgName) => {
    switch (imgName) {
      case 'pizza': return require('../assets/images/img/pizza.jpeg');
      case 'hanburger': return require('../assets/images/img/Hanburger.jpeg');
      case 'papas': return require('../assets/images/img/Papas.jpeg');
      case 'chilaquiles': return require('../assets/images/img/Chilaquiles.jpeg');
      case 'boonles': return require('../assets/images/img/Boonles.jpeg');
      case 'coca': return require('../assets/images/img/Coca.jpeg');
      case 'pepsi': return require('../assets/images/img/Pepsi.jpeg');
      case 'squirt': return require('../assets/images/img/Squirt.jpeg');
      case 'agua': return require('../assets/images/img/Agua.jpeg');
      case 'laptop1': return require('../assets/images/img/Laptop1.jpeg');
      case 'laptop2': return require('../assets/images/img/Laptop2.jpeg');
      case 'raton': return require('../assets/images/img/Raton.jpeg');
      case 'raton2': return require('../assets/images/img/Raton 2.jpeg');
      case 'memoria': return require('../assets/images/img/Memoria.jpeg');
      case 'mochila': return require('../assets/images/img/Mochila.jpeg');
      case 'libretas': return require('../assets/images/img/Libretas.jpeg');
      case 'pack_libretas': return require('../assets/images/img/Pack Libretas.jpeg');
      case 'plumas': return require('../assets/images/img/Plumas.jpeg');
      case 'lapiz': return require('../assets/images/img/Lapiz.jpeg');
      case 'termo': return require('../assets/images/img/Termo.jpeg');
      case 'bulls': return require('../assets/images/img/BULLS.jpeg');
      case 'dodgers': return require('../assets/images/img/DODGERS.jpeg');
      case 'tigres': return require('../assets/images/img/Camisa tigres.jpeg');
      case 'balon_adidas': return require('../assets/images/img/Balon Adidas.jpeg');
      case 'balon_basquet': return require('../assets/images/img/Balon basquet.jpeg');
      default: return require('../assets/images/img/logo_upq.png');
    }
  };

  const addToCart = () => {
    try {
      DatabaseService.db.runSync(
        'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)', 
        [1, product.id, quantity]
      );
      Alert.alert('¡Agregado!', `Agregaste ${quantity} ${product.name} al carrito.`, [
          { text: 'Seguir Comprando', onPress: () => navigation.goBack() },
          { text: 'Ir al Carrito', onPress: () => navigation.navigate('Main', { screen: 'Carrito' }) }
      ]);
    } catch (e) { 
        Alert.alert('Error', 'No se pudo agregar.'); 
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Ionicons name="arrow-back" size={24} color="#fff" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Detalles</Text>
        <View style={{width: 24}} /> 
      </View>
      <View style={styles.imageContainer}><Image source={getImage(product.image)} style={styles.image} resizeMode="contain" /></View>
      <View style={styles.detailsContainer}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.descriptionLabel}>Descripción</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.controlsContainer}>
            <Text style={styles.label}>Cantidad:</Text>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))} style={styles.qBtn}><Text style={styles.qBtnText}>-</Text></TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.qBtn}><Text style={styles.qBtnText}>+</Text></TouchableOpacity>
            </View>
        </View>
        <TouchableOpacity style={styles.buyButton} onPress={addToCart}><Text style={styles.buyText}>Agregar al Carrito</Text></TouchableOpacity>
      </View>
    </ScrollView>
  );
}
// Mismos estilos que antes, no hace falta cambiarlos si ya los tienes, pero aquí están los imports
const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#C8102E', paddingTop: 50, paddingBottom: 15, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  imageContainer: { alignItems: 'center', paddingVertical: 20, backgroundColor: '#fff' },
  image: { width: 220, height: 220 },
  detailsContainer: { padding: 25, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: '#f9f9f9', flex: 1, elevation: 5 },
  category: { color: '#C8102E', fontSize: 14, fontWeight: 'bold', marginBottom: 5, textTransform: 'uppercase' },
  name: { fontSize: 24, fontWeight: 'bold', color: '#000', marginBottom: 5 },
  price: { fontSize: 30, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  descriptionLabel: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  description: { color: '#666', marginBottom: 20, lineHeight: 22 },
  controlsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  label: { fontSize: 18, fontWeight: 'bold' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  qBtn: { backgroundColor: '#e0e0e0', width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
  qBtnText: { fontSize: 20, fontWeight: 'bold' },
  quantityText: { fontSize: 20, fontWeight: 'bold', marginHorizontal: 15 },
  buyButton: { backgroundColor: '#000', paddingVertical: 15, borderRadius: 15, alignItems: 'center' },
  buyText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});