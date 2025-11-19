// src/components/QuoteCard.js
import React from "react";
import { Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";

export default function QuoteCard({ title, quote, by, background, onCustomize }) {
  return (
    <TouchableOpacity onPress={onCustomize} style={styles.cardContainer}>
      <ImageBackground
        source={background ? { uri: background } : null}
        style={[styles.card, background ? { backgroundColor: "transparent" } : styles.defaultBackground]}
        imageStyle={{ borderRadius: 16 }}
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
});
