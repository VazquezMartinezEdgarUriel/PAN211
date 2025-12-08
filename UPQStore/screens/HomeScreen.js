import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import DatabaseService from '../database/db'; 

const CATEGORIES = ["TODO", "COMIDA", "LAPTOPS", "MOUSE", "ARTICULOS", "BEBIDAS", "DEPORTES"];

export default function HomeScreen({ navigation }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("TODO");
  const [searchText, setSearchText] = useState('');

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [])
  );

  const loadProducts = () => {
    try {
      const allProducts = DatabaseService.db.getAllSync('SELECT * FROM products');
      setProducts(allProducts);
      filterData(selectedCategory, searchText, allProducts);
    } catch (e) { console.log(e); }
  };

  const filterData = (category, search, data) => {
    let result = data;
    if (category !== "TODO") {
        result = result.filter(p => p.category.toUpperCase().includes(category));
    }
    if (search) {
        result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    setFilteredProducts(result);
  };

  const handleCategoryPress = (cat) => {
    setSelectedCategory(cat);
    filterData(cat, searchText, products);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    filterData(selectedCategory, text, products);
  };

  // --- MAPEO DE IMÁGENES EXACTO (CASE SENSITIVE) ---
  const getImage = (imgName) => {
    switch (imgName) {
      // COMIDA
      case 'pizza': return require('../assets/images/img/pizza.jpeg');
      case 'hamburguesa': return require('../assets/images/img/Hanburger.jpeg'); // "Hanburger" con n
      case 'papas': return require('../assets/images/img/Papas.jpeg');
      case 'chilaquiles': return require('../assets/images/img/Chilaquiles.jpeg');
      case 'boneless': return require('../assets/images/img/Boonles.jpeg'); // "Boonles" con doble o

      // BEBIDAS
      case 'coca': return require('../assets/images/img/Coca.jpeg');
      case 'pepsi': return require('../assets/images/img/Pepsi.jpeg');
      case 'pepsi_zero': return require('../assets/images/img/Pepsi zero.jpeg'); // Espacio en nombre
      case 'squirt': return require('../assets/images/img/Squirt.jpeg');
      case 'agua': return require('../assets/images/img/Agua.jpeg');

      // LAPTOPS
      case 'laptop_msi': return require('../assets/images/img/Laptop1.jpeg');
      case 'laptop_asus': return require('../assets/images/img/Laptop2.jpeg');

      // MOUSE
      case 'mouse_gamer': return require('../assets/images/img/Raton.jpeg');
      case 'mouse_rojo': return require('../assets/images/img/Raton 2.jpeg'); // Espacio en nombre

      // ARTICULOS
      case 'memoria': return require('../assets/images/img/Memoria.jpeg');
      case 'mochila': return require('../assets/images/img/Mochila.jpeg');
      case 'libreta': return require('../assets/images/img/Libretas.jpeg');
      case 'pack_libretas': return require('../assets/images/img/Pack Libretas.jpeg'); // Espacio en nombre
      case 'plumas': return require('../assets/images/img/Plumas.jpeg');
      case 'lapiz': return require('../assets/images/img/Lapiz.jpeg');
      case 'termo': return require('../assets/images/img/Termo.jpeg');

      // DEPORTES
      case 'bulls': return require('../assets/images/img/BULLS.jpeg');
      case 'dodgers': return require('../assets/images/img/DODGERS.jpeg');
      case 'tigres': return require('../assets/images/img/Camisa tigres.jpeg'); // Espacio en nombre
      case 'balon_champions': return require('../assets/images/img/Balon Adidas.jpeg'); // Espacio en nombre
      case 'balon_basket': return require('../assets/images/img/Balon basquet.jpeg'); // Espacio en nombre

      default: return require('../assets/images/img/logo_upq.png');
    }
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ProductDetail', { product: item })}>
      <Image source={getImage(item.image)} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#C8102E" barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.searchBar}>
            <Ionicons name="menu" size={24} color="#666" style={{marginRight: 5}} />
            <TextInput placeholder="Buscar" style={styles.searchInput} value={searchText} onChangeText={handleSearch} />
            <Ionicons name="search" size={20} color="#666" />
        </View>
        <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => navigation.navigate('Perfil')}><Ionicons name="person-circle-outline" size={30} color="#fff" /></TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Carrito')} style={{marginLeft: 15}}><Ionicons name="cart-outline" size={30} color="#fff" /></TouchableOpacity>
        </View>
      </View>
      <View style={styles.categoryBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 10}}>
            {CATEGORIES.map((cat) => (
                <TouchableOpacity key={cat} style={[styles.catButton, selectedCategory === cat && styles.catButtonActive]} onPress={() => handleCategoryPress(cat)}>
                    <Text style={[styles.catText, selectedCategory === cat && styles.catTextActive]}>{cat}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
      <Text style={styles.sectionTitle}>Ofertas del Día</Text>
      <FlatList data={filteredProducts} keyExtractor={(item) => item.id.toString()} renderItem={renderProduct} numColumns={2} columnWrapperStyle={styles.row} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#C8102E', paddingTop: 50, paddingBottom: 15, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  searchBar: { flex: 1, flexDirection: 'row', backgroundColor: '#fff', borderRadius: 25, paddingHorizontal: 15, height: 40, alignItems: 'center', marginRight: 15 },
  searchInput: { flex: 1, fontSize: 16 },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  categoryBar: { backgroundColor: '#A00D25', paddingVertical: 10 },
  catButton: { paddingHorizontal: 15, paddingVertical: 5, marginHorizontal: 5, borderRadius: 15 },
  catButtonActive: { backgroundColor: '#fff' },
  catText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  catTextActive: { color: '#C8102E' },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginVertical: 15 },
  listContent: { paddingHorizontal: 15, paddingBottom: 100 },
  row: { justifyContent: 'space-between' },
  card: { backgroundColor: '#fff', width: '48%', borderRadius: 10, padding: 10, marginBottom: 15, alignItems: 'center', elevation: 3, borderWidth: 1, borderColor: '#eee' },
  productImage: { width: 100, height: 100, marginBottom: 10 },
  productName: { fontSize: 14, color: '#333', textAlign: 'center', marginBottom: 5 },
  productPrice: { fontSize: 16, fontWeight: 'bold', color: '#000' },
});