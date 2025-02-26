import React, { useCallback } from "react";
import {
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import {
  MAX_HEIGHT,
  MIN_HEIGHT,
  LINE_HEIGHT,
  MAX_LENGTH,
} from "@/config/config";
import { ChatMessagesProps } from "@/types/app_types";
import { Mic, Send } from "lucide-react-native";

export const ChatInput: React.FC<ChatMessagesProps> = ({
  height,
  changeHeight,
  message,
  changeMessage,
  changeMessages,
  childHandleSend,
  selectedChatId,
  setChats,
}) => {
  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData> | KeyboardEvent
  ) => {
    if (Platform.OS === "web") {
      const webEvent = event as KeyboardEvent;
      if (webEvent.key === "Enter" && !webEvent.shiftKey) {
        webEvent.preventDefault();
        childHandleSend(
          message,
          setChats,
          changeMessage,
          changeHeight,
          selectedChatId
        );
      }
    }
  };

  const handleContentSizeChange = useCallback(
    (e: any) => {
      if (Platform.OS === "web") {
        const { height: contentHeight } = e.nativeEvent.contentSize;
        const newHeight = Math.min(contentHeight, MAX_HEIGHT);
        if (newHeight !== height) {
          changeHeight(newHeight);
        }
      } else {
        const { height: contentHeight } = e.nativeEvent.contentSize;
        if (contentHeight >= MIN_HEIGHT && contentHeight <= MAX_HEIGHT) {
          changeHeight(contentHeight);
        } else if (contentHeight > MAX_HEIGHT) {
          changeHeight(MAX_HEIGHT);
        }
      }
    },
    [height, Platform.OS]
  );

  return (
    <View className="flex-row items-center bg-white rounded-3xl px-4 py-3 shadow-xl shadow-black shadow-opacity-100">
      <TextInput
        className="text-gray-600 w-full flex-1 border-none outline-none"
        placeholder="Type your message..."
        placeholderTextColor="#666"
        value={message}
        onChangeText={(text) => {
          changeMessage(text);
          if (Platform.OS === "web" && text.length < message.length) {
            const newHeight = Math.max(
              MIN_HEIGHT,
              height !== undefined ? height : -LINE_HEIGHT
            );
            changeHeight(newHeight);
          }
        }}
        onKeyPress={handleKeyPress}
        multiline
        maxLength={MAX_LENGTH}
        onContentSizeChange={handleContentSizeChange}
        style={{
          height,
          paddingTop: 10,
          paddingBottom: 10,
          textAlignVertical: "top",
          borderWidth: 0,
          ...Platform.select({
            web: {
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            },
          }),
        }}
      />
      <TouchableOpacity>
        <Mic size={25} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          childHandleSend(
            message,
            setChats, // Исправлено: заменил changeMessages на setChats
            changeMessage,
            changeHeight,
            selectedChatId // Добавлен пятый аргумент
          )
        }
        disabled={!message.trim()}
      >
        <Send size={25} color={message.trim() ? "#0084ff" : "black"} />
      </TouchableOpacity>
    </View>
  );
};
