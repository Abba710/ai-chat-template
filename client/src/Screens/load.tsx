import { View, Image, Platform } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { getToken } from "@/services/securestore";

type LoadScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LoadScreen"
>;

const LoadScreen = () => {
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const navigation = useNavigation<LoadScreenNavigationProp>();
  const isNative = Platform.OS !== "web"; // Check if running on a native platform

  // Function to retrieve the token from storage
  const fetchToken = useCallback(async () => {
    const storedToken = await getToken();
    setToken(storedToken);

    // On web, navigate immediately based on token availability
    if (!isNative) {
      navigation.replace(storedToken ? "Home" : "Auth");
    }
  }, [navigation, isNative]);

  // Fetch the token on component mount
  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  // On mobile, delay navigation by 3 seconds for a loading effect
  useEffect(() => {
    if (isNative && token !== undefined) {
      const timeout = setTimeout(() => {
        navigation.replace(token ? "Home" : "Auth");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [token, navigation, isNative]);

  // On web, do not render anything (redirect happens instantly)
  if (!isNative) return null;

  // Show loading screen while checking the token
  if (token === undefined) {
    return (
      <View className="w-screen h-full bg-[#2e332e] justify-center items-center">
        <Image
          source={require("../img/ai/ai_logo.png")}
          className="w-[200px] h-[200px]"
        />
      </View>
    );
  }

  return null;
};

export default LoadScreen;
