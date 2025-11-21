import { View, Text, StyleSheet } from 'react-native';

export default function detalle() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles Usuario</Text>
      <Text style={styles.subtitle}>Usando Navegacion Stack</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
    color: '#000'
  },
  subtitle: {
    fontSize: 16,
    color: '#007BFF',
    textAlign: 'center'
  }
});