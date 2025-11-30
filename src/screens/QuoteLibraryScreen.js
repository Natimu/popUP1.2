import React , {useState} from "react";
import { View, ActivityIndicator, StyleSheet, Text} from "react-native";
import { useRoute } from "@react-navigation/native";
import SideMenu from "../components/SideMenu";
import AppHeader from "../components/AppHeader";
import useQuotes from "../hooks/useQuotes";
import QuoteList from "../components/QuoteLists";
import { useFocusEffect } from '@react-navigation/native';


export default function QuoteLibraryScreen({navigation}){
    const route = useRoute();
    const {type, title} = route.params;
    const [menuVisible, setMenuVisible] = useState(false);
    
    const {data, 
        isLoading, 
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch
    } = useQuotes(type);

    useFocusEffect(
        React.useCallback(() => {
            refetch();
        }, [refetch])
    );


    const quotes = data ? data.pages.flat() : [];

    if (isLoading){
        return(
            <View style={StyleSheet.center}>
                <ActivityIndicator size="large" color={"#242028ff"}/>
            </View>
        );
    }

    if(error){
        return(
            <View style={styles.center}>
                <Text>Failed to load quotes</Text>
            </View>
        );
    }

    return(
        <View style={styles.container}>
            <AppHeader onMenuPress={() => {
                setMenuVisible(true)}}
                headerText={title}/>
            <QuoteList 
                quotes={quotes} 
                category={type} 
                onEndReached = {() => hasNextPage &&  fetchNextPage()}
                loadingMore = {isFetchingNextPage}/>

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