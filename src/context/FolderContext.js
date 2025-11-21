import React, { createContext, useState, useEffect, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//  NEW IMPORTS (for optimized widget syncing)
import {
  saveSelectedFolderQuotesForWidget,
  saveWidgetSettings
} from "../utils/widgetStorage";

export const FoldersContext = createContext();

export const FoldersProvider = ({ children }) => {
  const [folders, setFolders] = useState([]);

  //  NEW: store widget settings so we know WHICH folder the widget is using
  const [widgetSettings, setWidgetSettings] = useState(null);

  // Load folders on start
  useEffect(() => {
    const loadFolders = async () => {
      try {
        const stored = await AsyncStorage.getItem("folders");
        let loadedFolders = stored ? JSON.parse(stored) : [];

        const hasFavorites = loadedFolders.some(f => f.name === "Favorites");

        if (!hasFavorites) {
          const favoriteFolder = { id: Date.now(), name: "Favorites", quotes: [], isDefault: true };
          loadedFolders = [...loadedFolders, favoriteFolder];
        }

        setFolders(loadedFolders);

        // Load widget settings (if exist)
        const widgetStored = await AsyncStorage.getItem("WIDGET_SETTINGS");
        if (widgetStored) {
          setWidgetSettings(JSON.parse(widgetStored));
        }

        await AsyncStorage.setItem("folders", JSON.stringify(loadedFolders));

      } catch (error) {
        console.error("Failed to load folders", error);
      }
    };

    loadFolders();
  }, []);

  // Save folders anytime they change
  useEffect(() => {
    const saveFolders = async () => {
      try {
        await AsyncStorage.setItem("folders", JSON.stringify(folders));
      } catch (error) {
        console.error("Failed to save folders:", error);
      }
    };
    saveFolders();
  }, [folders]);

  //  NEW 
  // Whenever widget settings change, write them to RN + widget shared storage
  useEffect(() => {
    const syncWidgetSettings = async () => {
      if (widgetSettings) {
        try {
          await AsyncStorage.setItem("WIDGET_SETTINGS", JSON.stringify(widgetSettings));
          await saveWidgetSettings(widgetSettings);
        } catch (e) {
          console.log("Failed updating widget settings", e);
        }
      }
    };
    syncWidgetSettings();
  }, [widgetSettings]);

  //  NEW  Automatically update widget quotes if editing the active folder
  const syncWidgetQuotesIfNeeded = async (folderName) => {
    if (!widgetSettings) return;

    if (folderName === widgetSettings.selectedFolder) {
      const folder = folders.find(f => f.name === folderName);
      if (folder) {
        await saveSelectedFolderQuotesForWidget(folder.quotes);
      }
    }
  };

  // Add quote to folder
  const addQuoteToFolder = (folderName, quoteFile) => {
    const folderExist = folders.some(f => f.name === folderName);
    if (!folderExist) {
      console.warn(`Folder "${folderName}" not found`);
      return;
    }

    setFolders(prevFolders =>
      prevFolders.map(folder => {
        if (folder.name === folderName) {
          const quoteExist = folder.quotes.some(
            q => q.quote === quoteFile.quote && q.by === quoteFile.by
          );
          if (quoteExist) return folder;

          const updated = { ...folder, quotes: [...folder.quotes, quoteFile] };

          //  NEW 
          syncWidgetQuotesIfNeeded(folderName);

          return updated;
        }
        return folder;
      })
    );
  };

  // Remove quote from folder
  const removeQuoteFromFolder = (folderName, quoteFile) => {
    const folderExist = folders.some(f => f.name === folderName);
    if (!folderExist) {
      console.warn(`Folder "${folderName}" not found`);
      return;
    }

    setFolders(prevFolders =>
      prevFolders.map(folder => {
        if (folder.name === folderName) {
          const exists = folder.quotes.some(
            q => q.quote === quoteFile.quote && q.by === quoteFile.by
          );
          if (!exists) return folder;

          const updated = {
            ...folder,
            quotes: folder.quotes.filter(
              q => !(q.quote === quoteFile.quote && q.by === quoteFile.by)
            )
          };

          //  NEW 
          syncWidgetQuotesIfNeeded(folderName);

          return updated;
        }
        return folder;
      })
    );
  };

  // Like / Unlike quote (Favorites)
  const handelLike = (quoteFile) => {
    const favoriteFolder = folders.find(f => f.name === "Favorites");
    const exists = favoriteFolder.quotes.some(
      q => q.quote === quoteFile.quote && q.by === quoteFile.by
    );

    if (exists) removeQuoteFromFolder("Favorites", quoteFile);
    else addQuoteToFolder("Favorites", quoteFile);
  };

  // Context value
  const value = useMemo(
    () => ({
      folders,
      setFolders,

      widgetSettings,
      setWidgetSettings,

      addQuoteToFolder,
      removeQuoteFromFolder,
      handelLike,
    }),
    [folders, widgetSettings]
  );

  return (
    <FoldersContext.Provider value={value}>
      {children}
    </FoldersContext.Provider>
  );
};
