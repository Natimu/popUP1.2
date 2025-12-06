
import { Ionicons, Feather, AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import React, { useState, useContext, useEffect, useRef} from "react";
import { Alert } from "react-native";
import { FoldersContext } from "../context/FolderContext";
import { Animated, View, Text, StyleSheet, TouchableOpacity, ImageBackground, Share, Modal, TextInput,FlatList, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, ScrollView } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import * as Clipboard from "expo-clipboard";
import * as Speech from "expo-speech";


export default React.memo(function FolderLibraryQuoteCard({ quote, by, onRemove, background, onCustomize }) {
  const [liked, setLiked] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [creating, setCreating] = useState(false);
  const [folderName, setFolderName] = useState("");
  const { folders, setFolders, handelLike, addQuoteToFolder } = useContext(FoldersContext);
  const swipeableRef = useRef(null);

  useEffect(() => {
    const favorites = folders.find(f => f.name === "Favorites");
    const isFavorites = favorites?.quotes?.some(
      q => q.quote === quote && q.by === by
    );
    setLiked(isFavorites);
  }, [folders]);


   const createFolder = () =>{
    if(!folderName.trim()) return;
    const newFolder = { id: Date.now(), name: folderName, quotes: []};
    setFolders([...folders, newFolder]);
    setFolderName("");
    setCreating(false);
    };

  const handelShare = async (quoteText, author) => {
        try{
          await Share.share({
            message: `"${quoteText}" - ${author}`,
          });
        }catch{
          console.error("Failed to share Quote")
        }
      };

  const handelCopy = async (quoteText, author) => {
    await Clipboard.setStringAsync(`"${quoteText}" - ${author}`);
    alert("Quote copied to clipboard!")
  };

  const handelSpeak = (quoteText, author) => {
    const textToRead = `"${quoteText}" - ${author}`;
    Speech.speak(textToRead, {
      rate: 0.8,
      pitch: 1.0,
      language: "en-US",
    })
  };

  const confirmRemove = () => {
    Alert.alert(
      "Remove Quote",
      "Are you sure you want to remove this quote from this folder",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: ()=> {
            
            onRemove();
            swipeableRef.current?.close();
           
          },
        }
      ],
      {cancelable: true}
    );
  };

  const renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        onPress={confirmRemove}
        style={{
          backgroundColor: '#e63946',
          justifyContent: 'center',
          alignItems: "stretch",
          paddingHorizontal: 20,
          marginVertical: 12,
          borderRadius: 16,
        }}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <Feather name="trash" size={24} color="#fff" />
        </Animated.View>
      </TouchableOpacity>
    );
  };

 
  return (
    <Swipeable ref = {swipeableRef} renderRightActions = {renderRightActions}>
       <TouchableOpacity onPress={onCustomize} style={styles.cardContainer}>
      <ImageBackground
        source={background ? { uri: background } : null}
        style={[styles.card, background ? { backgroundColor: "transparent" } : styles.defaultBackground]}
        imageStyle={{ borderRadius: 16 }}
      >
        <Text style={styles.quote}>"{quote}"</Text>
        <Text style={styles.by}>{by}</Text>

       {/* action buttons */}
        <View style={styles.actionBar}>
          <TouchableOpacity style={styles.actionButtons} onPress={() => {
            setLiked(!liked);
            handelLike({quote, by});
          }}>
              <Ionicons 
              name={liked ? "heart" : "heart-outline"} 
              size={20} 
              color={liked ? "#e63946" : "#555"}/>
            <Text>Like</Text>
             
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtons} onPress={() => handelShare(quote, by)}>
            <Feather name="share" size={20} color={"#333"}/>
            <Text>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtons} onPress={() => handelCopy(quote, by)}>
            <Feather name="copy" size={20} color={"#333"}/>
            <Text>Copy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtons} onPress={() => handelSpeak(quote, by)}>
            <AntDesign name="sound" size={20} color={"#333"}/>
            <Text>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtons} onPress={() => setModalVisible(true)}>
            <Ionicons name="add" size={20} color={"#333"}/>
            <Text>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtons} onPress={confirmRemove}>
            <Feather name="trash" size={20} color={"#333"}/>
            <Text>Remove</Text>
          </TouchableOpacity>

          {/* adding to folder modal */}
          <Modal
            visible={isModalVisible} 
            animationType="slide"
            transparent
            onRequestClose={() => {
              setModalVisible(false);
              setCreating(false);
              setFolderName("");
            }}
          >
            <KeyboardAvoidingView 
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{flex: 1}}
              keyboardVerticalOffset={Platform.OS === 'ios' ? -100 : 20}
            >
              <TouchableWithoutFeedback onPress={() => {
                setModalVisible(false);
                setCreating(false);
                setFolderName("");
              }}>
                <View style={styles.modalOverlay}>
                  <TouchableWithoutFeedback onPress={() => {}}>
                    <View style={styles.modalContent}>
                      <ScrollView 
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                      >
                        <Text style={styles.modalTitle}>Save to Folder</Text>
                        {!creating ? (
                          <>
                            {folders.length > 0 ? (
                              <View style={{maxHeight: 200}}>
                                <FlatList
                                  data={folders}
                                  keyExtractor={(item) => item.id.toString()}
                                  nestedScrollEnabled
                                  renderItem={({ item }) => (
                                    <TouchableOpacity
                                      style={styles.folderItem}
                                      onPress={() => {
                                        addQuoteToFolder(item.name, {quote, by});
                                        setModalVisible(false);
                                        setCreating(false);
                                      }}
                                    >
                                      <Feather name="folder" size={18} color="#555" />
                                      <Text style={styles.folderName}>{item.name}</Text>
                                    </TouchableOpacity>
                                  )}
                                />
                              </View>
                            ) : (
                              <Text style={styles.emptyText}>
                                No folders yet — create one below.
                              </Text>
                            )}

                            <TouchableOpacity
                              style={styles.createNewBtn}
                              onPress={() => setTimeout(() => setCreating(true), 100)}
                            >
                              <Ionicons name="add-circle-outline" size={18} color="#333" />
                              <Text style={styles.createNewText}>Create New Folder</Text>
                            </TouchableOpacity>
                          </>
                        ) : (
                          <View style={{paddingBottom: 20}}>
                            <TextInput
                              value={folderName}
                              onChangeText={setFolderName}
                              placeholder="Enter folder name..."
                              style={styles.input}
                              autoFocus
                              returnKeyType="done"
                              onSubmitEditing={createFolder}
                            />
                            <TouchableOpacity style={styles.saveBtn} onPress={createFolder}>
                              <Text style={styles.saveBtnText}>Save Folder</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                              style={styles.cancelBtn}
                              onPress={() => {
                                setCreating(false);
                                setFolderName("");
                              }}
                            >
                              <Text style={styles.cancelBtnText}>Cancel</Text>
                            </TouchableOpacity>
                          </View>
                        )}

                        <TouchableOpacity
                          style={styles.closeBtn}
                          onPress={() => {
                            setModalVisible(false);
                            setCreating(false);
                            setFolderName("");
                          }}
                        >
                          <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                      </ScrollView>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </Modal>
        </View>
      </ImageBackground>
    </TouchableOpacity>
    </Swipeable>
   
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
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
    backgroundColor: "rgba(234, 234, 234, 0.99)",
  },
  quote: {
    fontSize: 17,
    color: "#333",
    fontStyle: "italic",
  },
  by: {
    fontSize: 13,
    color: "#333",
    fontStyle: "italic",
    paddingBottom:10,
  },
  actionBar: {
    flexDirection: "row",
    justifyContent:"space-around",
    alignItems:"center",
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderColor: "#ccc",
  },

  actionButtons: {
    alignItems: "center",
  
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
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12, textAlign: "center"},
  folderItem: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  folderName: { marginLeft: 8, fontSize: 16, color: "#333" },
  emptyText: { textAlign: "center", color: "#777", marginTop: 20 },
  createNewBtn: { flexDirection: "row", alignItems: "center", marginTop: 20 },
  createNewText: { marginLeft: 6, color: "#333", fontSize: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginVertical: 12,
  },
  saveBtn: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
 cancelBtn:{
    backgroundColor: "#ef4444ff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  saveBtnText: { color: "#fff", fontWeight: "bold" },
  cancelBtnText: { color: "#fff", fontWeight: "bold" }, 
  closeBtn: { alignSelf: "center", marginTop: 12 },
  closeText: { color: "#555" },
});
