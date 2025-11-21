import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconRow}>
        <Ionicons name="person-outline" size={35} color="green" />
        <Text style={styles.title}>Perfil de usuario</Text>
      </View>

      <Pressable 
        style={styles.button} onPress={() => navigation.navigate('Detalle')}>
        <Text style={styles.buttonText}>Ir a Detalle</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  iconRow: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 40
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 10
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});

