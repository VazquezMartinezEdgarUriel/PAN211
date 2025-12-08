import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  Alert, 
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { openDatabaseSync } from 'expo-sqlite';

// Conectamos a la misma BD nueva del Paso 1
const db = openDatabaseSync('upqstore_seller.db');

export default function SellerScreen() {
  const [products, setProducts] = useState([]);
  
  // Estados para el formulario
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Cargar productos al abrir
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    try {
      const rows = db.getAllSync('SELECT * FROM products ORDER BY id DESC');
      setProducts(rows);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSave = () => {
    if (!name || !price || !category) {
      Alert.alert("Error", "Nombre, Precio y Categoría son obligatorios");
      return;
    }

    try {
      if (editMode) {
        // --- MODO EDITAR ---
        db.runSync(
          'UPDATE products SET name=?, price=?, category=?, description=? WHERE id=?',
          [name, parseFloat(price), category, desc, selectedId]
        );
        Alert.alert("Éxito", "Producto actualizado correctamente");
        setEditMode(false);
        setSelectedId(null);
      } else {
        // --- MODO SUBIR (CREAR) ---
        // Usamos 'logo_upq' como imagen por defecto para productos nuevos
        db.runSync(
          'INSERT INTO products (name, category, price, description, image) VALUES (?, ?, ?, ?, ?)',
          [name, category, parseFloat(price), desc, 'logo_upq']
        );
        Alert.alert("Éxito", "Tu producto ya está a la venta");
      }
      
      // Limpiar y recargar
      setName(''); setPrice(''); setCategory(''); setDesc('');
      loadProducts();

    } catch (e) {
      Alert.alert("Error", "No se pudo guardar el producto");
    }
  };

  const handleEdit = (item) => {
    setName(item.name);
    setPrice(item.price.toString());
    setCategory(item.category);
    setDesc(item.description);
    setSelectedId(item.id);
    setEditMode(true);
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Eliminar", 
      "¿Seguro que quieres borrar este producto?", 
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive", 
          onPress: () => {
            db.runSync('DELETE FROM products WHERE id = ?', [id]);
            loadProducts();
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDetails}>${item.price} - {item.category}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEdit(item)} style={styles.iconBtn}>
          <Ionicons name="pencil" size={24} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.iconBtn}>
          <Ionicons name="trash" size={24} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>
        {editMode ? "Editar Producto" : "Vender un Producto"}
      </Text>
      
      <View style={styles.formCard}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput 
            style={styles.input} 
            value={name} 
            onChangeText={setName} 
            placeholder="Ej. Calculadora"
        />

        <Text style={styles.label}>Precio ($)</Text>
        <TextInput 
            style={styles.input} 
            value={price} 
            onChangeText={setPrice} 
            keyboardType="numeric" 
            placeholder="150.00"
        />

        <Text style={styles.label}>Categoría</Text>
        <TextInput 
            style={styles.input} 
            value={category} 
            onChangeText={setCategory} 
            placeholder="Articulos, Comida, etc."
        />

        <Text style={styles.label}>Descripción</Text>
        <TextInput 
            style={[styles.input, {height: 60}]} 
            value={desc} 
            onChangeText={setDesc} 
            multiline 
            placeholder="Detalles del producto..."
        />

        <TouchableOpacity 
            style={[styles.btn, editMode ? styles.btnEdit : styles.btnCreate]} 
            onPress={handleSave}
        >
            <Text style={styles.btnText}>
                {editMode ? "Guardar Cambios" : "Publicar Producto"}
            </Text>
        </TouchableOpacity>

        {editMode && (
            <TouchableOpacity onPress={() => {
                setEditMode(false); 
                setName(''); setPrice(''); setCategory(''); setDesc('');
            }}>
                <Text style={styles.cancelText}>Cancelar Edición</Text>
            </TouchableOpacity>
        )}
      </View>

      <Text style={styles.listTitle}>Mis Productos Activos</Text>
      
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#C8102E', textAlign: 'center', marginBottom: 20 },
  formCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, elevation: 3, marginBottom: 20 },
  label: { fontWeight: 'bold', marginBottom: 5, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 5, padding: 10, marginBottom: 15, backgroundColor: '#fafafa' },
  btn: { padding: 15, borderRadius: 5, alignItems: 'center' },
  btnCreate: { backgroundColor: '#0E1C4E' },
  btnEdit: { backgroundColor: '#007bff' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cancelText: { color: 'red', textAlign: 'center', marginTop: 10, fontWeight: 'bold' },
  
  listTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, alignItems: 'center', justifyContent: 'space-between', elevation: 2 },
  info: { flex: 1 },
  productName: { fontSize: 16, fontWeight: 'bold' },
  productDetails: { color: '#666', marginTop: 2 },
  actions: { flexDirection: 'row' },
  iconBtn: { marginLeft: 15, padding: 5 }
});
