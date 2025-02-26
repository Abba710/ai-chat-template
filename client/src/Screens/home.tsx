import React, { useState } from "react";
import { View } from "react-native";
import { ChatInterface, MessageType } from "@/types/app_types";
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
  // states
  const [message, setMessage] = useState(""); // input state
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // sidebar state
  const [chats, setChats] = useState<ChatInterface[]>([]); // chats list
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageType[]>([]); // messages state
  const [height, setHeight] = useState(40); // Initial height

  const selectedChat = chats.find((chat) => chat.id === selectedChatId);

  return (
    <View className="flex w-full h-full bg-white sm:w-screen sm:h-screen">
      {/* Header */}
      <HeaderComponent
        OpenSidebar={() => setIsSidebarVisible(true)}
      ></HeaderComponent>

      {/* MAIN */}
      <View className="flex h-screen w-screen">
        {/* Messages - displayed if there are messages */}
        {selectedChat ? (
          <MessageList messagesList={selectedChat.messages} />
        ) : (
          <MessageTips
            changeHeight={setHeight}
            message={message}
            changeMessage={setMessage}
            changeMessages={setMessages}
            childHandleSend={handleSend}
          ></MessageTips>
        )}
      </View>

      {/* Bottom Input */}
      <View className="absolute bottom-0 left-0 right-0 p-2 bg-transparent">
        <ChatInput
          height={height}
          changeHeight={setHeight}
          message={message}
          changeMessage={setMessage}
          changeMessages={setMessages}
          childHandleSend={handleSend}
        ></ChatInput>
      </View>

      {/* Sidebar */}
      <Sidebar
        isVisible={isSidebarVisible}
        onClose={() => setIsSidebarVisible(false)}
        chats={chats}
        onStartNewChat={() => handleCreateNewChat(chats, setChats)}
        onSelectChat={(chatId: string) =>
          handleChatSelect(chatId, setIsSidebarVisible, setSelectedChatId)
        }
      />
    </View>
  );
};

export default HomeScreen;
