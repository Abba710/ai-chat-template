import React from "react";
import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import { Menu } from "lucide-react-native";
import { HeaderProps } from "@/types/app_types";

const callIcon =
  Platform.OS === "web"
    ? require("../img/call.svg")
    : require("../img/call.png");

const videoIcon =
  Platform.OS === "web"
    ? require("../img/Video.svg")
    : require("../img/Video.png");

export const HeaderComponent: React.FC<HeaderProps> = ({ OpenSidebar }) => {
  return (
    <View className="px-4 w-full sm:h-[60px] mt-[10px] pt-7 sm:pt-2 pb-4 flex-row items-center justify-between border-b border-gray-100">
      <View className="flex-row items-center gap-4">
        <TouchableOpacity onPress={OpenSidebar}>
          <Menu size={32} color="#000" />
        </TouchableOpacity>
        <View className="flex-row items-center gap-2">
          <Image
            className="w-[48px] h-[48px] rounded-full"
            source={require("../img/ai/aiavatar.jpg")}
            resizeMode="cover"
          />
          <View>
            <Text className="text-[20px] font-semibold">Ai</Text>

            <View className="flex-row items-center gap-1">
              <View className="w-2 h-2 rounded-full bg-green-500" />
              <Text className="text-sm text-green-500">Online</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="flex-row gap-4 mr-[15px]">
        <TouchableOpacity>
          <Image
            source={callIcon}
            className="w-[24px] h-[24px] sm:h-[48px] sm:w-[48px]"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={videoIcon}
            className="w-[24px] h-[24px] sm:h-[48px] sm:w-[48px]"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
