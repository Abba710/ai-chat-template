import React from "react";
import { View, Image, Text, TouchableOpacity, Platform } from "react-native";
import { WEB_ID, ANDROID_ID } from "@env";

const web = Platform.OS === "web";
const mobile = Platform.OS === "android";

const androidId = ANDROID_ID;
const webId = WEB_ID;

const MyComponent = () => {
  return (
    <View className="w-screen h-screen bg-[#2e332e] flex-col justify-center items-center gap-[34px] overflow-hidden">
      <Image
        source={require("../img/ai/ai_logo.jpg")}
        className="w-[337px] h-[337px] rounded-[256px]"
      />

      <TouchableOpacity
        className=" p-[15px] bg-white rounded-[10px] shadow-lg shadow-black/30 flex-row justify-start items-start gap-[15px]"
        //onpress
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

export default MyComponent;
