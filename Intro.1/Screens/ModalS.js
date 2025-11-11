
import { StyleSheet, Text, View, Button, Modal } from 'react-native';
import React, { useState } from 'react';

export default function ModalScreen() {

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Button title="Mostrar modal" onPress={() => setModalVisible(true)} color="purple" />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.textoModal}>Esto es un modal</Text>
            <Button title="Ocultar modal" onPress={() => setModalVisible(false)} color="purple" />
          </View>
        </View>
      </Modal>

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffffff',
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#716f7282',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 25,  
    borderRadius: 15,
    alignItems: 'center',
  },
  textoModal: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});