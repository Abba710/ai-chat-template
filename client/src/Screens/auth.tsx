import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { WEB_ID, ANDROID_ID } from "@env";
import * as AuthSession from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

// Ensure the authentication session is properly handled in the web environment
WebBrowser.maybeCompleteAuthSession();

// Define the redirect URI for authentication
const redirectUri = AuthSession.makeRedirectUri();

const Auth = () => {
  const [userInfo, setUserInfo] = useState(null);

  // Initialize Google authentication request
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_ID,
    webClientId: WEB_ID,
    redirectUri,
  });

  // Handle authentication response
  useEffect(() => {
    if (response?.type === "success") {
      WebBrowser.dismissBrowser();
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
  async function fetchUserInfo(token) {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.status}`);
      }

      const user = await response.json();
      console.log(user, token);

      // {
      //  "id": "123456789",
      //  "email": "user@example.com",
      //  "verified_email": true,
      //  "name": "John Doe",
      //  "given_name": "John",
      //  "family_name": "Doe",
      //  "picture": "https://lh3.googleusercontent.com/a-/A1234567890",
      //  "locale": "en"
      //}

      setUserInfo(user);
    } catch (error) {
      console.error("Error fetching user data:", error);
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
          Continue with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Auth;
