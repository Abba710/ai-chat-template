import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

const MyComponent = () => {
  return (
    <View className="w-[375px] h-[812px] px-[11px] py-[150px] bg-[#2e332e] rounded-[40px] flex-col justify-center items-center gap-[34px] overflow-hidden">
      {/* Изображение */}
      <Image
        source={require("../img/Rena/rena.jpeg")}
        className="w-[337px] h-[337px] rounded-[256px]"
      />

      {/* Кнопка "Continue with Google" */}
      <TouchableOpacity className=" p-[15px] bg-white rounded-[10px] shadow-lg shadow-black/30 flex-row justify-start items-start gap-[15px]">
        {/* Иконка (заглушка) */}
        <View className="w-6 h-6">
          <Image
            source={require("../img/google.png")}
            className="w-[24px] h-[24px]"
            resizeMode="contain" // или "cover"
          />
        </View>

        {/* Текст */}
        <Text className="text-black/50 text-xl font-medium font-roboto">
          Continue with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyComponent;
