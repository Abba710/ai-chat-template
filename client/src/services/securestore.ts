import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export async function saveToken(token: string) {
  if (Platform.OS === "web") {
    localStorage.setItem("authToken", token);
  } else {
    await SecureStore.setItemAsync("authToken", token);
  }
}

export async function getToken() {
  if (Platform.OS === "web") {
    return localStorage.getItem("authToken");
  } else {
    return await SecureStore.getItemAsync("authToken");
  }
}

export async function removeToken() {
  if (Platform.OS === "web") {
    localStorage.removeItem("authToken");
  } else {
    await SecureStore.deleteItemAsync("authToken");
  }
}
