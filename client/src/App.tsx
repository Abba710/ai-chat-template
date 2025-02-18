import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import LoadScreen from "./Screens/load";
import AuthScreen from "./Screens/auth";
import HomeScreen from "./Screens/home";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export type RootStackParamList = {
  LoadScreen: undefined;
  Home: undefined;
  Auth: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoadScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoadScreen" component={LoadScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
