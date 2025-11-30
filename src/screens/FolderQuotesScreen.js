import React , {useContext, useState, useEffect} from "react";
import { View, StyleSheet} from "react-native";
import { useRoute } from "@react-navigation/native";
import SideMenu from "../components/SideMenu";
import AppHeader from "../components/AppHeader";
import QuoteList from "../components/QuoteLists";
import { FoldersContext } from "../context/FolderContext";



export default function FolderQuotesScreen({navigation}){
    const route = useRoute();
    const [menuVisible, setMenuVisible] = useState(false);
    const {folders, removeQuoteFromFolder} = useContext(FoldersContext);
    const folder = folders.find(f=> f.id === route.params.folderId);
    

    const removeQuote = (quoteFile) => removeQuoteFromFolder(folder.name, quoteFile);

    return(
        <View style={styles.container}>
            <AppHeader onMenuPress={() => {
                setMenuVisible(true)}}
                headerText={folder.name}/>
            <QuoteList 
                quotes={folder.quotes}
                cardType={"folder"}
                onRemoveQuote={removeQuote}
                />

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
        backgroundColor: "#545458ff",
        paddingBottom: 20,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
})