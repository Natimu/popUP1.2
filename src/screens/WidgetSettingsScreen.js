import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, Button} from "react-native";
import { FoldersContext } from "../context/FolderContext";
import AppHeader from "../components/AppHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DurationSlider from "../components/DurationSlider";
import SideMenu from "../components/SideMenu";





export default function WidgetSettingsScreen({navigation}) {
  const { folders } = useContext(FoldersContext);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [interval, setInterval] = useState(60); /////////////////////////////////////////////////////////////////////////////////////////////////////

  const [showFolders, setShowFolders] = useState(false);
  const [showIntervals, setShowIntervals] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const formatTime = (sec) => {
    const min = Math.floor(sec / 60);
    const hour = Math.floor(min/ 60);
    const minLeft = min % 60;
    if (hour > 0) return `${hour}h ${minLeft}m`;
    return `${minLeft} min`;
  }


  const saveSettings = async () => {
    const settings = {
        selectedFolder, 
        interval: Number(interval),
    };
    await AsyncStorage.setItem('widgetSettings', JSON.stringify(settings));
    alert('Widget setting saved! ');
  };

  return (
    <View style={styles.container}>
            
      <AppHeader onMenuPress={() => {
              setMenuVisible(true)}} 
              headerText={"Widget Settings"}
        />
        

        <View style={styles.component}>
        <TouchableOpacity style={styles.selector} onPress={() => setShowFolders(true)}>
            <Text>{selectedFolder || "Select Folder"}</Text>
        </TouchableOpacity>

        <Modal 
        visible={showFolders} 
        animationType="slide"
        transparent
        onRequestClose={() => setShowFolders(false)}>
            <View style = {styles.modalOverlay}>
                <View style = {styles.modalContent}>
                    <FlatList
                        data={folders}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                            style={styles.item}
                            onPress={() => {
                                setSelectedFolder(item.name);
                                setShowFolders(false);
                            }}
                            >
                            <Text>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        />
                        <TouchableOpacity
                            style={styles.closeBtn}
                            onPress={() => setShowFolders(false)}
                        >
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                </View>
            </View>
            
        </Modal>

        {/* Interval Picker */}
        <TouchableOpacity style={styles.selector} onPress={() => setShowIntervals(true)}>
            <Text style={styles.label}>Will render every {formatTime(interval)}
            </Text>
        </TouchableOpacity>

        <Modal visible={showIntervals} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                    <View style={{ marginTop: 30 }}>
                        <DurationSlider
                            onChange={(seconds) => {
                            setInterval(seconds);
                            
                            }}
                        />
                        <View style= {styles.buttonTimeIntervalOptions}>
                            <TouchableOpacity style= {styles.optionTimeInterval} onPress={() => {setInterval(1800); setShowIntervals(false)
                            }}>
                                <Text style={{ color: "#6200EE", fontWeight: "600" }}>30 min</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style= {styles.optionTimeInterval} onPress={() => {setInterval(3600); setShowIntervals(false)
                            }}>
                                <Text style={{ color: "#6200EE", fontWeight: "600" }}>1 hour</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style= {styles.optionTimeInterval} onPress={() => {setInterval(7200); setShowIntervals(false)
                            }}>
                                <Text style={{ color: "#6200EE", fontWeight: "600" }}>2 hour</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style= {styles.optionTimeInterval} onPress={() => {setInterval(18000); setShowIntervals(false)
                            }}>
                                <Text style={{ color: "#6200EE", fontWeight: "600" }}>5 hour</Text>
                            </TouchableOpacity>
                        </View>
                        
                        </View>
                <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setShowIntervals(false)}
                >
                    <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
            </View>
            </View>
        </Modal>
        <Button title="Save Settings" onPress={saveSettings}/>
        
        </View>
    <SideMenu
        visible={menuVisible}
        onClose={()=> setMenuVisible(false)}
        navigation={navigation}
        />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: "#F9F7FF",
        paddingBottom: 20,
        
    },
  component: {padding: 20, gap: 16 },
  selector: { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#ccc" },
  item: { padding: 15, borderBottomWidth: 1, borderColor: "#eee" },
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
  closeBtn: { alignSelf: "center", marginTop: 12 },
  closeText: { color: "#555" },
  buttonTimeIntervalOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,

  },

  optionTimeInterval: {
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20
  }


});
