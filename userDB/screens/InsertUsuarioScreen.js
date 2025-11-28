import { useEffect, useState, useCallback } from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert, ActivityIndicator, Platform } from 'react-native';
import { UsuarioController } from '../controllers/UsersController';


const controller = new UsuarioController();

export default function UsuarioView() {

  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(true);
  const [guardando, setGuardando] = useState(false);

  const [editingUsuario, setEditingUsuario] = useState(null); 
  const [editingNombre, setEditingNombre] = useState('');     
  const [procesando, setProcesando] = useState(false);        

  // SELECT
  const cargarUsuarios = useCallback(async () => {
    try {
      setLoading(true);
      const data = await controller.obtenerUsuarios();
      setUsuarios(data);
      console.log(`${data.length} usuarios cargados`);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await controller.initialize();
      await cargarUsuarios();
    };

    init();

    controller.addListener(cargarUsuarios);

    return () => {
      controller.removeListener(cargarUsuarios);
    };
  }, [cargarUsuarios]);

  //Insert nuevo usuario
  const handleAgregar = async () => {
    if (guardando || procesando) return;

    if (!nombre.trim()) {
      Alert.alert('Campo vacío', 'Escribe un nombre antes de agregar.');
      return;
    }

    try {
      setGuardando(true);
      const usuarioCreado = await controller.crearUsuario(nombre.trim());
      Alert.alert(
        'Usuario creado',
        `"${usuarioCreado.nombre}" guardado con ID: ${usuarioCreado.id}`
      );
      setNombre('');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setGuardando(false);
    }
  };

  const handleIniciarEdicion = (usuario) => {
    if (procesando || guardando) return;
    setEditingUsuario(usuario);
    setEditingNombre(usuario.nombre);
  };

  //Editar guardar cambios
  const handleGuardarEdicion = async () => {
    if (!editingUsuario) return;
    if (!editingNombre.trim()) {
      Alert.alert('Campo vacío', 'El nombre no puede estar vacío.');
      return;
    }

    try {
      setProcesando(true);
      await controller.actualizarUsuario(editingUsuario.id, editingNombre.trim());
      Alert.alert('Actualizado', 'El usuario se ha actualizado correctamente.');
      setEditingUsuario(null);
      setEditingNombre('');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setProcesando(false);
    }
  };

  // Cancelar 
  const handleCancelarEdicion = () => {
    setEditingUsuario(null);
    setEditingNombre('');
  };

  // Eliminar
const handleEliminar = (usuario) => {
  Alert.alert(
    'Eliminar usuario',
    `¿Seguro que quieres eliminar a "${usuario.nombre}" (ID: ${usuario.id})?`,
    [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await controller.eliminarUsuario(usuario.id);
            Alert.alert('Eliminado', 'Usuario eliminado correctamente.');
          } catch (error) {
            Alert.alert('Error', error.message);
          }
        },
      },
    ]
  );
};


  const renderUsuario = ({ item, index }) => {
    const estaEditando = editingUsuario && editingUsuario.id === item.id;

    return (
      <View style={styles.userItem}>
        <View style={styles.userNumber}>
          <Text style={styles.userNumberText}>{index + 1}</Text>
        </View>

        <View style={styles.userInfo}>
          {estaEditando ? (
            <>
              <Text style={styles.editLabel}>Editar usuario:</Text>
              <TextInput
                style={styles.editInput}
                value={editingNombre}
                onChangeText={setEditingNombre}
                editable={!procesando}
                placeholder="Nuevo nombre"
              />
              <View style={styles.userActions}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.saveButton]}
                  onPress={handleGuardarEdicion}
                  disabled={procesando}
                >
                  <Text style={styles.actionButtonText}>
                    {procesando ? 'Guardando...' : 'Guardar'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={handleCancelarEdicion}
                  disabled={procesando}
                >
                  <Text style={styles.actionButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.userName}>{item.nombre}</Text>
              <Text style={styles.userId}>ID: {item.id}</Text>
              <Text style={styles.userDate}>
                {new Date(item.fechaCreacion).toLocaleDateString('es-MX', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>

              <View style={styles.userActions}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.editButton]}
                  onPress={() => handleIniciarEdicion(item)}
                  disabled={procesando}
                >
                  <Text style={styles.actionButtonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => handleEliminar(item)}
                >
                  <Text style={styles.actionButtonText}>Eliminar</Text>
                </TouchableOpacity>

              </View>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>INSERT & SELECT</Text>
      <Text style={styles.subtitle}>
        {Platform.OS === 'web'
          ? 'WEB (LocalStorage)'
          : `${Platform.OS.toUpperCase()} (SQLite)`}
      </Text>

      <View style={styles.insertSection}>
        <Text style={styles.sectionTitle}>Insertar Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe el nombre del usuario"
          value={nombre}
          onChangeText={setNombre}
          editable={!guardando && !procesando}
        />
        <TouchableOpacity
          style={[
            styles.button,
            (guardando || procesando) && styles.buttonDisabled
          ]}
          onPress={handleAgregar}
          disabled={guardando || procesando}
        >
          <Text style={styles.buttonText}>
            {guardando ? 'Guardando...' : 'Agregar Usuario'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.selectSection}>
        <View style={styles.selectHeader}>
          <Text style={styles.sectionTitle}>Lista de Usuarios</Text>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={cargarUsuarios}
            disabled={loading || procesando || guardando}
          >
            <Text style={styles.refreshText}>
              {loading ? 'Cargando...' : 'Recargar'}
            </Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Cargando usuarios...</Text>
          </View>
        ) : (
          <FlatList
            data={usuarios}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderUsuario}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No hay usuarios</Text>
                <Text style={styles.emptySubtext}>Agrega el primero arriba</Text>
              </View>
            }
            contentContainerStyle={usuarios.length === 0 && styles.emptyList}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  insertSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectSection: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  selectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  refreshButton: {
    padding: 8,
  },
  refreshText: {
    color: '#007AFF',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  userItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  userNumber: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userNumberText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  userId: {
    fontSize: 12,
    color: '#007AFF',
    marginBottom: 2,
  },
  userDate: {
    fontSize: 12,
    color: '#666',
  },
  userActions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  editButton: {
    backgroundColor: '#007AFF',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  saveButton: {
    backgroundColor: '#34C759',
  },
  cancelButton: {
    backgroundColor: '#8E8E93',
  },
  editLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#bbb',
  },
});
