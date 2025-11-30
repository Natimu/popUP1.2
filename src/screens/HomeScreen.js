import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import AppHeader from "../components/AppHeader";
import QuoteCard from "../components/QuoteCard";
import SideMenu from "../components/SideMenu";

export default function HomeScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const cards = [
    { title: "Bible Verse", type: "BIBLE", quote: "Be still, and know that I am God.", background: "bible" },
    { title: "Motivational", type: "MOTIVATION", quote: "Faith is taking the first step even when you don’t see the whole staircase.", background: "motivation" },
    { title: "Wisdom", type: "WISDOM", quote: "Trust in the Lord with all your heart.", background: "wisdom" },
    { title: "Hope", type: "GENERAL", quote: "With God all things are possible.", background: "hope" },
    { title: "Peace", type: "GENERAL", quote: "Let the peace of Christ rule in your hearts.", background: "peace" },
    { title: "Inspirational", type: "INSPIRATIONAL", quote: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
        by: "Mahatma Gandhi", type: "inspiration" },
    { title: "Love", type: "LOVE", quote: "Love cannot be reduced to a catalogue of reasons why, and a catalogue of reasons cannot be put together into love. The Luminaries",
        by: "Eleanor Catton", background: "love" },
    { title: "Truth", type: "TRUTH", quote: "Be mindful. Be grateful. Be positive. Be true. Be kind. The Light in the Heart", by: "Roy T. Bennett", background: "truth" }
  ];

  return (
    <View style={styles.container}>
      <AppHeader onMenuPress={() => {
        setMenuVisible(true)}} 
        headerText={"Welcome"}
        />

      <ScrollView contentContainerStyle={styles.cardContainer}>
        {cards.map((card, index) => (
          <QuoteCard
            key={index}
            title={card.title}
            quote={card.quote}
            by={card.by}
            background={card.background}
            onCustomize={() => 
              navigation.navigate("Quote Library", {type: card.type, title: card.title})
            }
            
          />
        ))}
      </ScrollView>

      <SideMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#545458ff",
    paddingBottom: 20,
  },
  cardContainer: {
    padding: 20,
  },
});
