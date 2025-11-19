import AsyncStorage  from "@react-native-async-storage/async-storage";

export async function getRandomQuote(settings = {}){

    try {
        const allFolders = await AsyncStorage.getItem('folders');
        if (!allFolders) return null;

        const folders = JSON.parse(allFolders);
        let folderObj;

        if (settings.selectedFolder) {
            folderObj = folders.find( f => f.name === settings.selectedFolder) ||
            folders.find(f => String(f.id) === String(settings.selectedFolder));
        }

        if (!folderObj){
            folderObj = folders[0];
        }

        if (!folderObj || !Array.isArray(folderObj.quotes) || !folderObj.quotes.length){
            return null;
        }

        const randomIndex = Math.floor(Math.random() * folderObj.quotes.length);

        return folderObj.quotes[randomIndex];

    } catch (error){
        console.log('Error fetching random quote:', error);
        return null;
    }

}