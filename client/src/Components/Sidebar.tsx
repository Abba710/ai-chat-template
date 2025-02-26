import React, { useEffect, useRef } from "react";
import { Animated, View, Text, TouchableOpacity, FlatList } from "react-native";
import { Menu, Plus } from "lucide-react-native";
import { SidebarProps } from "@/types/app_types";

const Sidebar: React.FC<SidebarProps> = ({
  isVisible,
  onClose,
  chats,
  onSelectChat,
  onStartNewChat,
}) => {
  const translateX = useRef(new Animated.Value(-280)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: isVisible ? 0 : -280,
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
        width: 280,
        backgroundColor: "white",
        zIndex: 50,
        transform: [{ translateX }],
        opacity,
        shadowColor: "#000",
        shadowOffset: { width: 1, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
      }}
    >
      {/* Sidebar header - synced with main screen */}
      <View className="px-4 w-full sm:h-[60px] mt-[10px] pt-7 sm:pt-2 pb-4 flex-row items-center justify-between border-b border-gray-100">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={onClose}>
            <Menu size={32} color="#000" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-800">
            Conversations
          </Text>
        </View>
        {/* Start New Chat Button - More Harmonious */}
        <TouchableOpacity
          onPress={onStartNewChat}
          className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center hover:bg-gray-200 transition-all duration-200"
        >
          <Plus size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      {/* Chat list */}
      <FlatList
        data={chats || []}
        keyExtractor={(item) => item.id || Math.random().toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelectChat(item.id)}
            className="p-3 mx-2 my-1 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-200 transition-all duration-200"
          >
            <Text className="text-base font-medium text-gray-800">
              {item.title || "Untitled"}
            </Text>
            <Text className="text-sm text-gray-500 mt-1 line-clamp-1">
              {item.lastMessage
                ? item.lastMessage.slice(0, 30)
                : "No messages yet"}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingVertical: 8 }}
        showsVerticalScrollIndicator={false}
      />
    </Animated.View>
  );
};

export default Sidebar;
