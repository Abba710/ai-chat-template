import { sendMessageToAI } from "@/services/api";
import { Dispatch, SetStateAction } from "react";
import { ChatInterface, MessageType } from "@/types/app_types";

interface AIResponse {
  response: string;
}
// UI Update
const updateChatUI = (
  message: string,
  setMessages: Dispatch<SetStateAction<MessageType[]>>,
  setMessage: Dispatch<SetStateAction<string>>,
  setHeight: Dispatch<SetStateAction<number>>
) => {
  setMessages((prev) => [
    ...prev,
    { text: message, time: new Date(), isAi: false },
  ]);
  setMessage("");
  setHeight(40);
};

// API function
const fetchAIResponse = async (message: string): Promise<string> => {
  try {
    const aiResponse: AIResponse = await sendMessageToAI(message);
    return aiResponse.response;
  } catch (error) {
    throw new Error("Failed to get a response. Please try again.");
  }
};
// chat select fucntion
export const handleChatSelect = (chatId: string, setIsSidebarVisible) => {
  // To do: Write a chat selection function
  setIsSidebarVisible(false);
};

//create new chat function
export const handleCreateNewChat = (
  chats: ChatInterface[],
  setChats: Dispatch<SetStateAction<ChatInterface[]>>
) => {
  const newChat: ChatInterface = { id: `${Date.now()}`, title: "New Chat" };
  setChats([...chats, newChat]);
};

// message dispatcher
export const handleSend = async (
  message: string,
  setMessages: Dispatch<SetStateAction<MessageType[]>>,
  setMessage: Dispatch<SetStateAction<string>>,
  setHeight: Dispatch<SetStateAction<number>>
): Promise<void> => {
  if (!message.trim()) return;

  updateChatUI(message, setMessages, setMessage, setHeight);

  try {
    const aiText = await fetchAIResponse(message);
    setMessages((prev) => [
      ...prev,
      { text: aiText, time: new Date(), isAi: true },
    ]);
  } catch (error: any) {
    setMessages((prev) => [
      ...prev,
      { text: error.message, time: new Date(), isAi: true },
    ]);
  }
};
