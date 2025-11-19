import React, {createContext, useState,useEffect, useMemo} from "react";
import AsyncStorage  from "@react-native-async-storage/async-storage";

export const FoldersContext = createContext();

export const FoldersProvider = ({children}) => {
    const [folders, setFolders] = useState([]);

    {/* // remove all folders
        useEffect(()=>{
        const cleanOldFolders = async () => {
            try{
                await AsyncStorage.removeItem("folders");
                console.log("cleaned folders")
            }catch{
                console.log("Failed to clean folders")

            }
        };
        cleanOldFolders();
    }, []); */}

    useEffect(() =>{
        const loadFolders = async () => {
            try {
            const stored = await AsyncStorage.getItem("folders");
            let loadedFolders = stored ? JSON.parse(stored) : [];

            const hasFavorites = loadedFolders.some(f => f.name === "Favorites");

            if (!hasFavorites){
                const favoriteFolder = {id: Date.now(), name:"Favorites", quotes: [], isDefault: true};
                loadedFolders = [...loadedFolders, favoriteFolder];
            };

            setFolders(loadedFolders);
            await AsyncStorage.setItem("folders", JSON.stringify(loadedFolders))
    
        }catch (error) {
            console.error("Failed to load folders", error)
        }
        };
        loadFolders();

    }, []);

    useEffect(() => {
        const saveFolders = async () => {
            try {
                await AsyncStorage.setItem("folders", JSON.stringify(folders));
            }catch (error){
                console.error("Failed to save folders:", error);
            }
        };
        saveFolders();
    }, [folders]);

    const addQuoteToFolder = (folderName, quoteFile) =>{
        const folderExist = folders.some(f => f.name === folderName);
        if (!folderExist){
            console.warn(`Folder "${folderName}" not found`);
            return;
        }
        setFolders(privFolders => 
            privFolders.map(folder => {
                if (folder.name === folderName){
                    const quoteExist = folder.quotes.some(
                    q => q.quote === quoteFile.quote && q.by === quoteFile.by
                );
                if(quoteExist) return folder;
                return {...folder, quotes: [...folder.quotes, quoteFile]};
                }
                return folder;
            })
        );
        
    };

    const removeQuoteFromFolder = (folderName, quoteFile) => {
        const folderExist = folders.some(f => f.name === folderName);
        if(!folderExist){
            console.warn(`Folder "${folderName}" not found`)
            return;
        }
        setFolders(prevFolders => 
            prevFolders.map(folder =>{
                if (folder.name === folderName){
                    const checkQuote = folder.quotes.some(
                        q => q.quote === quoteFile.quote && q.by === quoteFile.by
                    );
                    if(!checkQuote) return folder;
                    return {
                        ...folder, 
                        quotes: folder.quotes.filter(
                            q => !(q.quote === quoteFile.quote && q.by === quoteFile.by)),}
                }
                return folder;
            })
        );
    };

    const handelLike = (quoteFile) =>{
        const favoriteFolder = folders.find(f=> f.name === "Favorites");
        const exists = favoriteFolder.quotes.some(
            q => q.quote === quoteFile.quote && q.by === quoteFile.by
        );
        if(exists) removeQuoteFromFolder("Favorites", quoteFile);
        else addQuoteToFolder("Favorites", quoteFile);
    }

    const value = useMemo(() => ({
        folders, 
        setFolders, 
        addQuoteToFolder, 
        removeQuoteFromFolder, 
        handelLike
    }), [folders]);


    return (
        <FoldersContext.Provider value={value}>
            {children}
        </FoldersContext.Provider>
    );

};