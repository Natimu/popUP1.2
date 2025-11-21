import { NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { SharedStorageModule } = NativeModules;

// Save widget settings + selected folder for the app
export const saveWidgetSettings = async (settings) => {
  // settings = { selectedFolder: string, interval: number }
  await AsyncStorage.setItem("WIDGET_SETTINGS", JSON.stringify(settings));

  if (SharedStorageModule?.saveWidgetSettings) {
    await SharedStorageModule.saveWidgetSettings(JSON.stringify(settings));
  }
};

// Save ONLY the quotes for the selected folder to the widget container
export const saveSelectedFolderQuotesForWidget = async (quotes) => {
  // quotes = [ { quote: string, by: string }, ... ]
  if (!Array.isArray(quotes)) return;

  if (SharedStorageModule?.saveWidgetQuotes) {
    await SharedStorageModule.saveWidgetQuotes(JSON.stringify(quotes));
  }
};

// Optional: still keep full folders in AsyncStorage for app use
export const saveFoldersForApp = async (folders) => {
  await AsyncStorage.setItem("FOLDERS", JSON.stringify(folders));
};
