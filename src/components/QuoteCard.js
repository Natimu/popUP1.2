// src/components/QuoteCard.js
import React from "react";
import { Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";

export default function QuoteCard({ title, quote, by, background, onCustomize }) {

  const categoryBackgrounds = {
    love: require("../../assets/backgrounds/loveBg.png"),
    wisdom: require("../../assets/backgrounds/wisdomBg.png"),
    peace: require("../../assets/backgrounds/peaceBg.png"),
    bible: require("../../assets/backgrounds/bibleBg.png"),
    hope: require("../../assets/backgrounds/hopeBg.png"),
    inspiration: require("../../assets/backgrounds/inspirationBg.png"),
    truth: require("../../assets/backgrounds/truthBg.png"),
    motivation: require("../../assets/backgrounds/motivationalBg.png"),
    default: require("../../assets/backgrounds/defaultBg.png"),
  };
  const key = background;
  const imageSource = categoryBackgrounds[key] || categoryBackgrounds.default;


  return (
    <TouchableOpacity onPress={onCustomize} style={styles.cardContainer}>
      <ImageBackground
        source={imageSource}
        style={styles.card}
        imageStyle={styles.image}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.quote}>"{quote}"</Text>
        <Text style={styles.by}>{by}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 5,
    width: "100%",
  },
  card: {
    borderRadius: 16,
    padding: 20,
    minHeight: 100,
    justifyContent: "center",
    backgroundColor: "#FFF",
    elevation: 3,
  },
  defaultBackground: {
    backgroundColor: "#EAEAEA",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3A2A7C",
    marginBottom: 8,
  },
  quote: {
    fontSize: 15,
    color: "#333",
    fontStyle: "italic",
  },
  by: {
    fontSize: 12,
    color: "#333",
    fontStyle: "italic",
  },
  image: {
    borderRadius: 16,
    resizeMode: "cover",
    opacity: 0.20, // softer background
    },
});
