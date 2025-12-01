
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Animated, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get("window");



export default function SideMenu({ visible, onClose, navigation }) {
    const slideAnim = React.useRef(new Animated.Value(width)).current;

    const handelNavigate = (route) =>{
    const currentRoute = navigation.getState().routes[navigation.getState().index].name;
      if (currentRoute !== route) navigation.navigate(route);
      onClose();

    };



  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : width,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [visible]);
  return (
    visible &&(
      <View style = {styles.overlay}>
        <TouchableOpacity style={styles.backdrop} onPress={onClose} activeOpacity={1}/>
        <Animated.View
          pointerEvents={visible ? "auto" : "none"}
          style={[
            styles.menuContainer,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <View style={styles.menuContent}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.close}>×</Text>
            </TouchableOpacity>

          
            <TouchableOpacity style={styles.menuList} onPress={() => handelNavigate("Home")}>
                <Ionicons name="home" size={20} color={"#282729ff"}/>
                <Text style={styles.menuItem}>Home</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuList} onPress={() => handelNavigate("Favorites")}>
                <Ionicons name="heart" size={20} color={"#ea6363ff"}/>
              <Text style={styles.menuItem}>Favorites</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuList} onPress={() => handelNavigate("Widget Display")}>
                <MaterialIcons name="settings-display" size={20} color={"#282729ff"}/>
              <Text style={styles.menuItem}>Widget Display</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuList} onPress={() => handelNavigate("Widget Settings")}>
                <Ionicons name="settings-outline" size={20} color={"#282729ff"}/>
              <Text style={styles.menuItem}>Widget Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuList} onPress={() => handelNavigate("VerseSource")}>
                <SimpleLineIcons name="question" size={20} color={"#282729ff"}/>
              <Text style={styles.menuItem}>About</Text>
            </TouchableOpacity>
          </View>
      </Animated.View>
      </View>
      

    )
    
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  backdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  menuContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    height: "100%",
    width: "50%",
    backgroundColor: "#dfdfedff",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  menuContent: {
    padding: 20,
  },
  close: {
    fontSize: 28,
    alignSelf: "flex-end",
    color: "#666",
  },
  menuList:{
    flexDirection:"row",
    alignItems: "center",
    gap: 10,
    
  },

  menuItem: {
    fontSize: 18,
    paddingVertical: 12,
    color: "#282729ff",
  }
});
