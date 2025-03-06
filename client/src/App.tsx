import { BackHandler, ToastAndroid, StatusBar } from "react-native";
import LoadScreen from "@/Screens/load";
import HomeScreen from "@/Screens/home";
import AuthScreen from "@/Screens/auth";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export type RootStackParamList = {
  LoadScreen: undefined;
  Home: undefined;
  Auth: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [backPressed, setBackPressed] = useState(false); // Mobile back button state

  // Back button handler
  const handleBackPress = () => {
    if (backPressed) {
      // If back is pressed twice, exit the app
      BackHandler.exitApp();
    } else {
      // Show a toast message and wait for the second press
      setBackPressed(true);
      ToastAndroid.show(
        "Click again to exit the application",
        ToastAndroid.SHORT
      );
      setTimeout(() => setBackPressed(false), 2000); // Reset the back press state after 2 seconds
    }
    return true; // Prevent default back button behavior
  };

  React.useEffect(() => {
    const backH = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backH.remove();
  }, [backPressed]);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#2e332e" />
      <Stack.Navigator
        initialRouteName="LoadScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoadScreen" component={LoadScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
