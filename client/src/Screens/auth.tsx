import React, { useEffect } from "react";
import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import { WEB_ID, ANDROID_ID } from "@env";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { googleAuth } from "@/services/api";

// Ensure the authentication session is properly handled in the web environment
WebBrowser.maybeCompleteAuthSession();

// Define the redirect URI for authentication
const redirectUri = AuthSession.makeRedirectUri({});
Alert.alert("Redirect URI", redirectUri);

const Auth = () => {
  // Initialize Google authentication request
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_ID,
    webClientId: WEB_ID,
    redirectUri,
  });

  // Handle authentication response
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      if (authentication?.accessToken) {
        fetchUserInfo(authentication.accessToken);
      } else {
        console.error("Access token is missing");
      }
    } else if (response?.type === "error") {
      console.error("Authentication error:", response);
    }
  }, [response]);

  // Fetch user information from Google API
  async function fetchUserInfo(accessToken) {
    if (!accessToken) return;

    try {
      console.log("Access Token:", accessToken);
      googleAuth(accessToken); // send to backend
    } catch (error) {
      console.error("Error handling token:", error);
    }
  }

  return (
    <View className="w-screen h-screen bg-[#2e332e] flex-col justify-center items-center gap-[34px] overflow-hidden">
      {/* Logo */}
      <Image
        source={require("../img/ai/ai_logo.png")}
        className="w-[337px] h-[337px]"
      />

      {/* Google Sign-In Button */}
      <TouchableOpacity
        className="p-[15px] bg-white rounded-[10px] shadow-lg shadow-black/30 flex-row justify-start items-start gap-[15px]"
        disabled={!request}
        onPress={() => promptAsync()} // Optimized onPress handler
      >
        <View className="w-6 h-6">
          <Image
            source={require("../img/google.png")}
            className="w-[24px] h-[24px]"
            resizeMode="contain"
          />
        </View>
        <Text className="text-black/50 text-xl font-medium font-roboto">
          Continue Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Auth;
