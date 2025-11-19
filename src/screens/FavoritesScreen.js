import React , {useState, useContext, useRef, useEffect} from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Text, TextInput, Animated, Keyboard} from "react-native";
import { useRoute } from "@react-navigation/native";
import SideMenu from "../components/SideMenu";
import { FoldersContext } from "../context/FolderContext";
import AppHeader from "../components/AppHeader";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";



export default function FavoritesScreen({navigation}){
    const route = useRoute();
    const [menuVisible, setMenuVisible] = useState(false);
    const {folders} = useContext(FoldersContext);
    const [searchQuery, setSearchQuery] = useState("");
    const fadeAnimation = useRef(new Animated.Value(0)).current;

    const filteredFolders = folders.filter(folders => 
        folders.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
    );

    useEffect(() => {
        Animated.timing(fadeAnimation, {
            toValue: searchQuery.length > 0 ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [searchQuery])
     
    
    return(
        <View style={styles.container}>
            
            <AppHeader onMenuPress={() => {
                setMenuVisible(true)}}
                headerText="Folders"/>
                 <View style={styles.searchBar}>
                    <TextInput 
                    style = {styles.searchText}
                    placeholder="Search folders"
                    placeholderTextColor="#888"
                    autoCapitalize="none"
                    autoCorrect={false}
                    spellCheck={false}
                    value= {searchQuery}
                    onChangeText={setSearchQuery}
                    returnKeyType="search"
                    />
                    
                    <Animated.View style={{opacity: fadeAnimation}}>
                        <Feather name="x-circle" 
                                color="#888" 
                                onPress={() => {
                                    setSearchQuery(""); 
                                    }
                                } />
                    </Animated.View>
                
                </View>
            <View style={styles.itemContainer}>
               
                <FlatList
                    data={filteredFolders}
                    style={styles.flatFolderList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                        style={styles.folderItem}
                        onPress={() => {
                            navigation.navigate("Folder Quote Display", {folderId: item.id})
                            }}
                        >
                        <Feather name={item.name === "Favorites" ? "heart": "folder"} size={18} color={item.name === "Favorites" ? "#e63946": "#555"} />
                        <Text style={styles.folderName}>{item.name}</Text>
                        </TouchableOpacity>
                        )}
                />
               
            </View>
             <SideMenu
                    visible={menuVisible}
                    onClose={() => setMenuVisible(false)}
                    navigation={navigation}
                />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9F7FF",
        paddingBottom: 20,
        
    },
    itemContainer:{
        paddingLeft:20,
        
    },
    searchBar:{
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginHorizontal: 15,
        marginTop: 10,
        marginBottom: 10,
        fontSize: 16,
        color: "#333",
        borderWidth: 1,
        borderColor: "#ddd",
    },
    searchText: {
        flex: 1,

    },

    folderItem: {
        paddingBottom: 10,
        flexDirection: "row",
    },

    folderName: {
        paddingLeft: 10,
    }
})