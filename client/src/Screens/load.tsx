import { StyleSheet, Text, View, Image, Platform } from "react-native";
import { useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";

type LoadScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "LoadScreen"
>;

const LoadScreen = () => {
  const isMobile = Platform.OS === "ios" || Platform.OS === "android";
  if (isMobile) {
    const navigation = useNavigation<LoadScreenNavigationProp>();
    useEffect(() => {
      setTimeout(() => {
        navigation.navigate("Home");
      }, 3000);
    }, []);
  } else {
    const navigation = useNavigation<LoadScreenNavigationProp>();
    navigation.navigate("Home");
  }

  return (
    <View className="w-screen h-full py-[237px] bg-[#2e332e] justify-center items-center gap-2.5 inline-flex overflow-hidden">
      <Image
        source={require("../img/ai/ai_logo.jpg")}
        className="w-[337px] h-[337px] rounded-[256px]"
      />
    </View>
  );
};

export default LoadScreen;
