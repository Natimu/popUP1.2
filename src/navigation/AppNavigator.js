import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import WidgetSettingsScreen from "../screens/WidgetSettingsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import WidgetPreview from "../components/WidgetPreview"
import QuoteLibraryScreen from "../screens/QuoteLibraryScreen";
import WidgetDisplay from "../screens/WidgetDisplay"
import FolderQuotesScreen from "../screens/FolderQuotesScreen";


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
       <Stack.Navigator screenOptions={{
            headerStyle: {
              backgroundColor: '#2c2c2dff',  // Your dark color
            },
            headerTintColor: '#e7e4f1ff',  // Back button and title color
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',  // Center the title
          }}
          initialRouteName="Home">
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Widget Settings" component={WidgetSettingsScreen} />
      <Stack.Screen name="Widget Display" component={WidgetDisplay} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Widget Preview" component={WidgetPreview}/>
      <Stack.Screen name= "Quote Library" component={QuoteLibraryScreen}/>
      <Stack.Screen name= "Folder Quote Display" component={FolderQuotesScreen}/>

    </Stack.Navigator>
  );
}



