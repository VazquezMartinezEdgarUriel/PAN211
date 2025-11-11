import { Text, StyleSheet, View, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import BotonesScreen from './BotonesScreen';
import ContadorScreen from './ContadorScreen';
import TextScreen from './TextScreen';
import ImageBackgroung from './ImageBackgroung';
import RepasoScreen from './RepasoScreen';
import ScrollViewScreen from './ScrollViewScreen';
import ActivityIndicator from './ActivityIndicator';
import FlatList_y_Section_List from './FlatList_y_Section_List';
import ModalS from './ModalS';

export default function MenuScreen() {
    const [screen, setScreen] = useState('Menu');

    switch (screen){
        case 'Contador':
            return <ContadorScreen/>;
        case 'botones':
            return <BotonesScreen/>;
        case 'TextInput':
            return <TextScreen/>;
        case 'ImageBackgroung':
            return <ImageBackgroung/>; 
        case 'Repaso1':
            return <RepasoScreen/>;
        case 'ScollView':
            return <ScrollViewScreen/>;    
        case 'ActivityIndicator':
            return <ActivityIndicator/>;
        case 'FlatList_y_Section_List':
            return <FlatList_y_Section_List/>;
        case 'Modal11':
            return <ModalS/>;            
        case 'Menu':
        default:
            return (
                <View style={styles.container}>
                    <Text>Menu de Practicas</Text>
                    <View style={styles.botones_1}> 
                        <Button onPress={() => setScreen('botones')} title='Botones' color='#000000ff'/>
                        <Button onPress={() => setScreen('Contador')} title='Contador' color='#000000ff'/>
                        <Button onPress={() => setScreen('TextInput')} title='Text Input' color='#000000ff'/>
                        <Button onPress={() => setScreen('ImageBackgroung')} title='imageBackgroung' color='#000000ff'/>
                        <Button onPress={() => setScreen('Repaso1')} title='repaso1' color='#000000ff'/>
                        <Button onPress={() => setScreen('ScollView')} title='ScrollView' color='#000000ff'/>
                        <Button onPress={() => setScreen('ActivityIndicator')} title='activity Indicator' color='#000000ff'/>
                        <Button onPress={() => setScreen('FlatList_y_Section_List')} title='flatList y Section List' color='#000000ff'/>
                        <Button onPress={() => setScreen('Modal11')} title='Modal' color='#000000ff'/>
                            
                    </View>
                    
                </View>
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333'
    },
    button: {
        backgroundColor: '#a60000ff',
        padding: 15,
        borderRadius: 10,
        width: '80%',
        marginVertical: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },
    buttonSecondary: {
        backgroundColor: '#a90000ff'
    },
    buttonText: {
        color: '#000000ff',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600'
    },
})