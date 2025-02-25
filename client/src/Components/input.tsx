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
}) => {
  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData> | KeyboardEvent
  ) => {
    if (Platform.OS === "web") {
      // For web platform
      const webEvent = event as KeyboardEvent;
      if (webEvent.key === "Enter" && !webEvent.shiftKey) {
        webEvent.preventDefault(); // Prevent adding a new line
        childHandleSend(message, changeMessages, changeMessage, changeHeight); // Send the message when Enter is pressed
      }
    }
  };

  // Processor of changes in the size of the contents
  const handleContentSizeChange = useCallback(
    (e: any) => {
      if (Platform.OS === "web") {
        // Web-specific logic
        const { height: contentHeight } = e.nativeEvent.contentSize;

        // Dynamically adjust height, but do not exceed maxHeight
        const newHeight = Math.min(contentHeight, MAX_HEIGHT);

        // Update height only if it has changed
        if (newHeight !== height) {
          changeHeight(newHeight);
        }
      } else {
        // Native (Android/iOS) logic remains unchanged
        const { height: contentHeight } = e.nativeEvent.contentSize;

        // Dynamically adjust height within min and max limits
        if (contentHeight >= MIN_HEIGHT && contentHeight <= MAX_HEIGHT) {
          changeHeight(contentHeight);
        } else if (contentHeight > MAX_HEIGHT) {
          changeHeight(MAX_HEIGHT);
        }
      }
    },
    [height, Platform.OS] // Add height and platform as dependencies
  );

  return (
    <View className="flex-row items-center bg-white rounded-3xl px-4 py-3 shadow-xl shadow-black shadow-opacity-100">
      {/* TextInput with dynamic height adjustment */}
      <TextInput
        className="text-gray-600 w-full flex-1 border-none outline-none"
        placeholder="Type your message..."
        placeholderTextColor="#666"
        value={message}
        onChangeText={(text) => {
          changeMessage(text);

          // Handle deletion explicitly on web
          if (Platform.OS === "web" && text.length < message.length) {
            const newHeight = Math.max(
              MIN_HEIGHT,
              // check Is there a height?
              height !== undefined ? height : -LINE_HEIGHT
            );
            changeHeight(newHeight);
          }
        }}
        onKeyPress={handleKeyPress}
        multiline
        maxLength={MAX_LENGTH}
        onContentSizeChange={handleContentSizeChange} // Handles dynamic resizing
        style={{
          height, // Dynamic height based on content
          paddingTop: 10,
          paddingBottom: 10,
          textAlignVertical: "top", // Align text to the top for better readability
          borderWidth: 0, // Remove border on focus
          ...Platform.select({
            web: {
              whiteSpace: "pre-wrap", // Ensure proper line wrapping on web
              wordWrap: "break-word",
            },
          }),
        }}
      />

      {/* Microphone Icon */}
      <TouchableOpacity>
        <Mic size={25} color="black" />
      </TouchableOpacity>

      {/* Send Button */}
      <TouchableOpacity
        onPress={() =>
          childHandleSend(message, changeMessages, changeMessage, changeHeight)
        }
        disabled={!message.trim()} // Disable button if the input is empty
      >
        <Send size={25} color={message.trim() ? "#0084ff" : "black"} />
      </TouchableOpacity>
    </View>
  );
};
