import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AppHeader({ headerText, onMenuPress }) {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>popUP</Text>

      <View style={styles.centerContainer}>
        <Text style={styles.title}>{headerText}</Text>
      </View>

      <TouchableOpacity onPress={onMenuPress}>
        <Ionicons name="menu" size={25} color="#e7e4f1ff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#2c2c2dff",
  },

  centerContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },

  title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#e7e4f1ff",
  },

  logo: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#e7e4f1ff",
  },
});

