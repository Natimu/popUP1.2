import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FoldersProvider } from "./src/context/FolderContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
//import { registerQuoteBackgroundTask } from "./src/services/widget/backgroundTask";
//import { requestNotificationPermission } from "./src/services/widget/notificationManager";


const queryClient = new QueryClient();



export default function App() {

  // useEffect(() => {
  //   (async () => {

  //     // Ask for notifications ONCE
  //     const granted = await requestNotificationPermission();

  //     if (granted) {
  //       await registerQuoteBackgroundTask(60);
  //     }

  //   })();
  // }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FoldersProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </QueryClientProvider>
      </FoldersProvider>
    </GestureHandlerRootView>
  );
}