import React, {useCallback} from "react";
import {FlatList, StyleSheet} from "react-native";
import QuoteLibraryQuoteCard from "./QuoteLibraryQuoteCard";
import FolderLibraryQuoteCard from "./FolderLibraryQuoteCard";
import { View, ActivityIndicator } from "react-native";


export default function QuoteList({quotes, cardType, onRemoveQuote, onEndReached, loadingMore}){
    const renderItem = useCallback(
    ({ item }) => {
        const quoteText = item.text || item.quote;
        const quoteBy = item.by;

        if(cardType === "folder"){
            return <FolderLibraryQuoteCard quote={quoteText} by={quoteBy} onRemove={() => onRemoveQuote(item)}/>
        }
        
      return <QuoteLibraryQuoteCard quote={quoteText} by={quoteBy} />
    },
    [cardType] // Only recreate if absolutely necessary (no deps)
  );

    return(
        <FlatList
            style={styles.container}
            data={quotes}
            keyExtractor={(item, index) => index.id?.toString()||index.toString()}
            renderItem={renderItem}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
                loadingMore ? (
                    <View style={{padding:20}}>
                        <ActivityIndicator size="small" color="black"/>
                    </View>
                ) : null
            }
            initialNumToRender={8}
            windowSize={5}
            removeClippedSubviews={true}
        />
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 20,
        backgroundColor: "#F9F7FF",
        paddingBottom: 2,
    }
});