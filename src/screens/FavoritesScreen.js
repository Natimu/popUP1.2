import React , {useState, useContext, useRef, useEffect} from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Modal, TextInput, Animated, KeyboardAvoidingView, TouchableWithoutFeedback,ScrollView, Platform} from "react-native";
import { useRoute } from "@react-navigation/native";
import SideMenu from "../components/SideMenu";
import { FoldersContext } from "../context/FolderContext";
import AppHeader from "../components/AppHeader";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";




export default function FavoritesScreen({navigation}){
    const route = useRoute();
    const [menuVisible, setMenuVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false)
    const {folders} = useContext(FoldersContext);
    const [folderName, setFolderName] = useState("");
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
                                size={18}
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
                        onLongPress={() => {setModalVisible(true);

                        }}
                        >
                        <Feather name={item.name === "Favorites" ? "heart": "folder"} size={20} color={item.name === "Favorites" ? "#e63946": "#e7e4f1ff"} />
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

            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => {
                    setModalVisible(false);
                }}
                >
                    <KeyboardAvoidingView
                        behavior={Platform.OS ==='ios' ? 'padding' : 'height'}
                        style={{flex: 1}}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? -1:20}
                    >
                        <TouchableWithoutFeedback onPress={() => 
                            setModalVisible(false)
                        }>
                            <View style={styles.modalOverlay}>
                                <TouchableWithoutFeedback onPress={() => {}}>
                                    <View style={styles.modalContent}>
                                        <ScrollView
                                            keyboardShouldPersistTaps="handled"
                                            showsVerticalScrollIndicator={false}>
                                                <Text style={styles.modalTitle}>Manage Folder</Text>
                                                <View style={{paddingBottom: 20}}>
                                                    <Text>Change Folder Name</Text>
                                                    <TextInput
                                                        value={folderName}
                                                        onChangeText={setFolderName}
                                                        placeholder="Enter folder name..."
                                                        style={styles.input}
                                                        autoFocus
                                                        returnKeyType="done"
                                                        
                                                    />
                                                    <TouchableOpacity style={styles.saveBtn} onPress={() => {}}>
                                                        <Text style={styles.saveBtnText}>Save Folder</Text>
                                                    </TouchableOpacity>
                        
                                                    <TouchableOpacity
                                                        style={styles.cancelBtn}
                                                        onPress={() => {
                                                        }}
                                                    >
                                                        <Text style={styles.cancelBtnText}>Cancel</Text>
                                                    </TouchableOpacity>
                                                    </View>

                                            
                                        </ScrollView>
                                    </View>

                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </Modal>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#545458ff",
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
        fontSize: 26,
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
        color: "#e7e4f1ff",
        paddingLeft: 10,
        fontSize: 20,
    },
     modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        height: "50%",
    },
    modalTitle: { 
        fontSize: 18, 
        fontWeight: "bold", 
        marginBottom: 12,
        textAlign: "center"
     },
})