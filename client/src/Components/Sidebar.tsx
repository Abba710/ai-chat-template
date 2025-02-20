import React, { useEffect, useRef } from "react";
import { Animated, View, Text, TouchableOpacity, FlatList } from "react-native";
import { Menu } from "lucide-react-native";

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
  const translateX = useRef(new Animated.Value(-255)).current; // Initial position
  const opacity = useRef(new Animated.Value(0)).current; // Opacity for fade effect

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: isVisible ? 0 : -255,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: isVisible ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isVisible]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        width: 255,
        backgroundColor: "white",
        zIndex: 50,
        transform: [{ translateX }],
        opacity,
      }}
    >
      {/* Sidebar header */}
      <View className="px-4 w-full sm:h-[60px] mt-[10px] pt-7 sm:pt-2 pb-4 flex-row items-center justify-between border-b border-gray-100">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={onClose}>
            <Menu size={32} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat list */}
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelectChat(item.id)}
            className="p-4 bg-gray-100 border-b border-gray-300"
          >
            <Text className="text-lg text-gray-800">{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </Animated.View>
  );
};

export default Sidebar;
