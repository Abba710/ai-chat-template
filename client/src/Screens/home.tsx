import React, { useState } from "react";
import { View } from "react-native";
import Sidebar from "@/Components/Sidebar";
import { HeaderComponent } from "@/Components/HeaderComponent";
import { ChatInterface, MessageType } from "@/types/app_types";
import {
  handleChatSelect,
  handleCreateNewChat,
  handleSend,
} from "@/utils/chatHandlers";
import { MessageList } from "@/Components/MessageList";

import { ChatInput } from "@/Components/input";
import { MessageTips } from "@/Components/MessageTips";

const exampleMessages: MessageType[] = [];

const HomeScreen = () => {
  // states
  const [message, setMessage] = useState(""); // input state
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // sidebar state
  const [chats, setChats] = useState<ChatInterface[]>([]); // chats list
  const [selectedChat, setSelectedChat] = useState<ChatInterface | null>(null); // select chat
  const [messages, setMessages] = useState<MessageType[]>(exampleMessages); // messages state
  const [backPressed, setBackPressed] = useState(false); // Mobile back button state
  const [height, setHeight] = useState(40); // Initial height

  return (
    <View className="flex w-full h-full bg-white sm:w-screen sm:h-screen">
      {/* Header */}
      <HeaderComponent
        OpenSidebar={() => setIsSidebarVisible(true)}
      ></HeaderComponent>

      {/* MAIN */}
      <View className="flex h-screen w-screen">
        {/* Tips - displayed if there are no messages */}
        {messages.length === 0 && (
          <MessageTips
            changeHeight={setHeight}
            message={message}
            changeMessage={setMessage}
            changeMessages={setMessages}
            childHandleSend={handleSend}
          ></MessageTips>
        )}

        {/* Messages - displayed if there are messages */}
        {messages.length > 0 && (
          <MessageList messagesList={messages}></MessageList>
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
        onStartNewChat={() => handleCreateNewChat(chats)}
        onSelectChat={(chatsId) =>
          handleChatSelect(chatsId, setIsSidebarVisible(false))
        }
      />
    </View>
  );
};

export default HomeScreen;
