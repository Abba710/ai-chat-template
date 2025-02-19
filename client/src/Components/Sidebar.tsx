// src/components/Sidebar.tsx
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Animated } from "react-native";
import { Menu } from "lucide-react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { transform } from "@babel/core";

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
  chats: { id: string; title: string }[];
  onSelectChat: (chatId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isVisible,
  onClose,
  chats,
  onSelectChat,
}) => {
  if (!isVisible) return null;

  const offset = useSharedValue<number>(-250); // Initial position

  useEffect(() => {
    if (isVisible) {
      offset.value = withTiming(0, { duration: 300 }); // Smoothly moves to the right
    } else {
      offset.value = withTiming(-250, { duration: 300 }); // Smoothly moves to the left
    }
  }, [isVisible]);

  // Create animated styles
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }], // We apply animation to TranslatEx
  }));

  return (
    <Animated.View
      className="absolute top-0 left-0 bottom-0 w-64 bg-white shadow-lg z-50"
      style={animatedStyles} // apply animated styles
    >
      {/* sidebar header */}
      <View className="px-4 w-full sm:h-[60px] mt-[10px] pt-7 sm:pt-2 pb-4 flex-row items-center justify-between border-b border-gray-100">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={onClose}>
            <Menu size={32} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* chat list */}
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectChat(item.id)}>
            <Text className="p-4">{item.title}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Кнопка закрытия */}
      <TouchableOpacity className="p-4 bg-gray-100" onPress={onClose}>
        <Text className="text-center">Close</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Sidebar;
