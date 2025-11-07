import React, { useEffect, useState } from "react";
import {View,Text,ScrollView,ImageBackground,TouchableOpacity,StyleSheet} from "react-native";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 2000); // Duración del Splash en milisegundos
  }, []);

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashText}>Bienvenido a mi Galería</Text>
      </View>
    );
  }

  // Lista de fotos (puedes cambiar imágenes y textos)
  const fotos = [
    {
      titulo: "Montaña",
      descripcion: "Una vista hermosa en la cima.",
      detalle: "Foto tomada durante una caminata al amanecer.",
      imagen: { uri: "https://picsum.photos/id/10/400/300" }
    },
    {
      titulo: "Playa",
      descripcion: "Arena blanca y agua cristalina.",
      detalle: "Un día perfecto para relajarse frente al mar.",
      imagen: { uri: "https://picsum.photos/id/29/400/300" }
    },
    {
      titulo: "Bosque",
      descripcion: "Naturaleza viva y aire puro.",
      detalle: "Los árboles rodean todo, un ambiente tranquilo.",
      imagen: { uri: "https://picsum.photos/id/55/400/300" }
    },
    {
      titulo: "Ciudad",
      descripcion: "Luces, autos y movimiento constante.",
      detalle: "La vida urbana nunca descansa.",
      imagen: { uri: "https://picsum.photos/id/1011/400/300" }
    },
    {
      titulo: "Lago",
      descripcion: "Reflejos sobre el agua calma.",
      detalle: "Un paisaje perfecto para relajarse.",
      imagen: { uri: "https://picsum.photos/id/1015/400/300" }
    },
    {
      titulo: "Desierto",
      descripcion: "Arena, calor y silencio.",
      detalle: "Dunas que parecen no tener fin.",
      imagen: { uri: "https://picsum.photos/id/1003/400/300" }
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Mi Galería</Text>

      {fotos.map((foto, index) => (
        <View key={index} style={styles.card}>
          <ImageBackground
            source={foto.imagen}
            style={styles.image}
            imageStyle={{ borderRadius: 12 }}
          >
            <View style={styles.cardContent}>
              <Text style={styles.photoTitle}>{foto.titulo}</Text>
              <Text style={styles.desc}>{foto.descripcion}</Text>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  alert(`📸 Foto: ${foto.titulo}\n\n${foto.detalle}`);
                }}
              >
                <Text style={styles.buttonText}>Ver detalles</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2b4c7e"
  },
  splashText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold"
  },
  container: {
    padding: 20,
    backgroundColor: "#fff"
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  card: {
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden"
  },
  image: {
    height: 200,
    justifyContent: "flex-end"
  },
  cardContent: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 10,
    borderRadius: 12
  },
  photoTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  desc: {
    color: "white",
    marginBottom: 8
  },
  button: {
    backgroundColor: "#ffca28",
    padding: 6,
    alignSelf: "flex-start",
    borderRadius: 6
  },
  buttonText: {
    fontWeight: "bold"
  }
});