import { Text, StyleSheet, View, FlatList, SectionList } from 'react-native'
import React, { Component } from 'react'

export default function FlatList_y_Section_List () {
  const ejerecicos = [
    { id: 1, nombre: 'Sentadillas', descripcion: 'Ejerecicio de Piernas y gluteos' },
    { id: 2, nombre: 'Sentadillas', descripcion: 'Ejerecicio de Piernas y gluteos' },
    { id: 3, nombre: 'Sentadillas', descripcion: 'Ejerecicio de Piernas y gluteos' },
    { id: 4, nombre: 'Sentadillas', descripcion: 'Ejerecicio de Piernas y gluteos' },
    { id: 5, nombre: 'Sentadillas', descripcion: 'Ejerecicio de Piernas y gluteos' },
    { id: 6, nombre: 'Sentadillas', descripcion: 'Ejerecicio de Piernas y gluteos' },
    { id: 7, nombre: 'Sentadillas', descripcion: 'Ejerecicio de Piernas y gluteos' },
    { id: 8, nombre: 'Sentadillas', descripcion: 'Ejerecicio de Piernas y gluteos' },
    { id: 9, nombre: 'Sentadillas', descripcion: 'Ejerecicio de Piernas y gluteos' },
  ]

  const contactos = [
    { titulo: 'A', data: ['Alejandra', 'Ana', 'Andrea'] },
    { titulo: 'B', data: ['Barbara', 'Brenda', 'Bianca'] },
    { titulo: 'K', data: ['Katia', 'Katie', 'Katerine'] },
  ]
  return (

    <View style={styles.container}>
      <View style={styles.lisContainer}>
        <Text style={styles.titulo}>Lista de ejerecicos</Text>
        <FlatList
          data={ejerecicos}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.nombre} > {item.nombre} </Text>
              <Text style={styles.descripcion}>{item.descripcion}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.lisContainer}>
        <Text style={styles.titulo}>Lista de contactos</Text>
        <SectionList
          sections={contactos}
          renderItem={({item}) => (
              <Text style={styles.item}>{item}</Text>
          )}
          renderSectionHeader={({section}) => (
              <Text style={styles.header}>{section.titulo}</Text>     
            )}
        />
      </View>
    </View>
  ) 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  lisContainer: {
    flex: 1,
    marginBottom: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },  
  item: {
    padding: 10,
    backgroundColor: 'gray',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descripcion: {
    fontSize: 14,
    color: 'blue',
  },
  header: {
    fontSize: 18,
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
  },  
})