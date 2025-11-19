import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import AppHeader from "../components/AppHeader";
import QuoteCard from "../components/QuoteCard";
import SideMenu from "../components/SideMenu";

export default function HomeScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const cards = [
    { title: "Bible Verse", type: "BIBLE", quote: "Be still, and know that I am God.", background: null },
    { title: "Motivational Quote", type: "MOTIVATION", quote: "Faith is taking the first step even when you don’t see the whole staircase.", background: null },
    { title: "Wisdom", type: "WISDOM", quote: "Trust in the Lord with all your heart.", background: null },
    { title: "Hope", type: "GENERAL", quote: "With God all things are possible.", background: null },
    { title: "Peace", type: "GENERAL", quote: "Let the peace of Christ rule in your hearts.", background: null },
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
    backgroundColor: "#F9F7FF",
    paddingBottom: 20,
  },
  cardContainer: {
    padding: 20,
  },
});
