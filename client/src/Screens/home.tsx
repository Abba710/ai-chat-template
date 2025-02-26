import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { ChatInterface } from "@/types/app_types";
import Sidebar from "@/Components/Sidebar";
import { HeaderComponent } from "@/Components/HeaderComponent";
import { MessageList } from "@/Components/MessageList";
import { ChatInput } from "@/Components/input";
import { MessageTips } from "@/Components/MessageTips";
import {
  handleChatSelect,
  handleCreateNewChat,
  handleSend,
} from "@/utils/chatHandlers";

const HomeScreen = () => {
  // State declarations
  const [message, setMessage] = useState(""); // Input state
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Sidebar visibility state
  const [chats, setChats] = useState<ChatInterface[]>([]); // Chats list state
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null); // Selected chat ID state
  const [height, setHeight] = useState(40); // Input height state

  const selectedChat = chats.find((chat) => chat.id === selectedChatId); // Find selected chat
  const hasMessages = selectedChat && selectedChat.messages.length > 0; // Check if there are messages

  // Ensure a chat is always selected (last chat or create new)
  useEffect(() => {
    if (chats.length > 0 && !selectedChatId) {
      setSelectedChatId(chats[chats.length - 1].id); // Select the last chat
    } else if (chats.length === 0) {
      const newChatId = handleCreateNewChat(chats, setChats); // Create a new chat if none exist
      setSelectedChatId(newChatId);
    }
  }, [chats, selectedChatId]);

  return (
    <View className="flex w-full h-full bg-white sm:w-screen sm:h-screen">
      {/* Header */}
      <HeaderComponent OpenSidebar={() => setIsSidebarVisible(true)} />

      {/* Sidebar */}
      <Sidebar
        isVisible={isSidebarVisible}
        onClose={() => setIsSidebarVisible(false)}
        chats={chats}
        onStartNewChat={() => {
          const newChatId = handleCreateNewChat(chats, setChats); // Create new chat
          setSelectedChatId(newChatId); // Focus on the new chat
        }}
        onSelectChat={(chatId: string) =>
          handleChatSelect(chatId, setIsSidebarVisible, setSelectedChatId)
        }
      />

      {/* Main Content */}
      <View className="flex h-screen w-screen">
        {/* Display messages if available, otherwise show tips */}
        {hasMessages ? (
          <MessageList messagesList={selectedChat.messages} />
        ) : (
          <MessageTips
            height={height}
            changeHeight={setHeight}
            message={message}
            changeMessage={setMessage}
            childHandleSend={handleSend}
            selectedChatId={selectedChatId}
            setChats={setChats}
            setSelectedChatId={setSelectedChatId}
          />
        )}
      </View>

      {/* Bottom Input */}
      <View className="absolute bottom-0 left-0 right-0 p-2 bg-transparent">
        <ChatInput
          height={height}
          changeHeight={setHeight}
          message={message}
          changeMessage={setMessage}
          changeMessages={(newMessages) => {
            setChats(
              chats.map((chat) =>
                chat.id === selectedChatId
                  ? { ...chat, messages: newMessages }
                  : chat
              )
            );
          }}
          childHandleSend={handleSend}
          selectedChatId={selectedChatId}
          setChats={setChats}
          setSelectedChatId={setSelectedChatId}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
