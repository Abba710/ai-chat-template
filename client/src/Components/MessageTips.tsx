import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ChatMessagesProps } from "@/types/app_types";
import { Edit3, Languages, SearchIcon } from "lucide-react-native";

export const MessageTips: React.FC<ChatMessagesProps> = ({
  changeHeight,
  changeMessage,
  changeMessages,
  childHandleSend,
}) => {
  return (
    <View className="flex h-screen">
      <ScrollView
        className="flex h-screen w-screen px-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Explain Section */}
        <View className="py-6">
          <View className="items-center mb-4">
            <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center mb-1">
              <SearchIcon size={20} color="#666" />
            </View>
            <Text className="text-sm font-semibold">Explain</Text>
          </View>

          <View className="gap-2">
            <TouchableOpacity
              className="bg-gray-50 p-4 rounded-3xl"
              onPress={() =>
                childHandleSend(
                  "Explain Quantum physics",
                  changeMessages,
                  changeMessage,
                  changeHeight
                )
              }
            >
              <Text className="text-center text-gray-700">
                Explain Quantum physics
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-50 p-4 rounded-3xl"
              onPress={() =>
                childHandleSend(
                  "What are wormholes explain like i am 5",
                  changeMessages,
                  changeMessage,
                  changeHeight
                )
              }
            >
              <Text className="text-center text-gray-700">
                What are wormholes explain like i am 5
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Write & Edit Section */}
        <View className="py-6">
          <View className="items-center mb-4">
            <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center mb-1">
              <Edit3 size={20} color="#666" />
            </View>
            <Text className="text-sm font-semibold">Write & edit</Text>
          </View>
          <View className="gap-2">
            <TouchableOpacity
              className="bg-gray-50 p-4 rounded-3xl"
              onPress={() =>
                childHandleSend(
                  "What are wormholes explain like i am 5",
                  changeMessages,
                  changeMessage,
                  changeHeight
                )
              }
            >
              <Text className="text-center text-gray-700">
                Write a tweet about global warming
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-50 p-4 rounded-3xl"
              onPress={() =>
                childHandleSend(
                  "Write a poem about flower and love",
                  changeMessages,
                  changeMessage,
                  changeHeight
                )
              }
            >
              <Text className="text-center text-gray-700">
                Write a poem about flower and love
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-50 p-4 rounded-3xl"
              onPress={() =>
                childHandleSend(
                  "Write a rap song lyrics about",
                  changeMessages,
                  changeMessage,
                  changeHeight
                )
              }
            >
              <Text className="text-center text-gray-700">
                Write a rap song lyrics about
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Translate Section */}
        <View className="py-6 mb-[160px] sm:mb-[200px]">
          <View className="items-center mb-4">
            <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center mb-1">
              <Languages size={20} color="#666" />
            </View>
            <Text className="text-sm font-semibold">Translate</Text>
          </View>
          <View className="gap-2">
            <TouchableOpacity
              className="bg-gray-50 p-4 rounded-3xl"
              onPress={() =>
                childHandleSend(
                  `How do you say "how are you" in korean?`,
                  changeMessages,
                  changeMessage,
                  changeHeight
                )
              }
            >
              <Text className="text-center text-gray-700">
                How do you say "how are you" in korean?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-gray-50 p-4 rounded-3xl"
              onPress={() =>
                childHandleSend(
                  `Translate this sentence to spanish: 'I love you'`,
                  changeMessages,
                  changeMessage,
                  changeHeight
                )
              }
            >
              <Text className="text-center text-gray-700">
                Translate this sentence to spanish: 'I love you'
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
