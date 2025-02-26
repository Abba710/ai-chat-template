import { sendMessageToAI } from "@/services/api";
import { Dispatch, SetStateAction } from "react";
import { ChatInterface } from "@/types/app_types";

interface AIResponse {
  response: string;
}

// Fetch AI response from external API
const fetchAIResponse = async (message: string): Promise<string> => {
  try {
    const aiResponse: AIResponse = await sendMessageToAI(message); // Send message to AI service
    return aiResponse.response; // Return AI-generated response
  } catch (error) {
    throw new Error("Failed to get a response. Please try again."); // Throw error on failure
  }
};

// Handle chat selection and close sidebar
export const handleChatSelect = (
  chatId: string,
  setIsSidebarVisible: Dispatch<SetStateAction<boolean>>,
  setSelectedChatId: Dispatch<SetStateAction<string | null>>
) => {
  setSelectedChatId(chatId); // Set the selected chat ID
  setIsSidebarVisible(false); // Close the sidebar
};

// Create a new chat and add it to the chats array
export const handleCreateNewChat = (
  chats: ChatInterface[],
  setChats: Dispatch<SetStateAction<ChatInterface[]>>
): string => {
  const newChat: ChatInterface = {
    id: `${Date.now()}`, // Generate unique ID using timestamp
    title: `Chat ${chats.length + 1}`, // Name chat based on existing chat count
    messages: [], // Initialize with empty messages array
  };
  setChats([...chats, newChat]); // Append new chat to chats
  return newChat.id; // Return new chat ID
};

// Dispatch message, update UI, and fetch AI response
export const handleSend = async (
  message: string,
  setChats: Dispatch<SetStateAction<ChatInterface[]>>,
  setMessage: Dispatch<SetStateAction<string>>,
  setHeight: Dispatch<SetStateAction<number>>,
  selectedChatId: string | null
): Promise<void> => {
  if (!message.trim() || !selectedChatId) return; // Exit if message is empty or no chat selected

  // Update UI with user's message
  updateChatUI(message, setChats, setMessage, setHeight, selectedChatId);

  try {
    const aiText = await fetchAIResponse(message); // Get AI response
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { text: aiText, time: new Date(), isAi: true },
              ], // Add AI message
            }
          : chat
      )
    );
  } catch (error: any) {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === selectedChatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { text: error.message, time: new Date(), isAi: true },
              ], // Add error message
            }
          : chat
      )
    );
  }
};

// Update UI with user's message directly in chats
const updateChatUI = (
  message: string,
  setChats: Dispatch<SetStateAction<ChatInterface[]>>, // Update chats directly
  setMessage: Dispatch<SetStateAction<string>>,
  setHeight: Dispatch<SetStateAction<number>>,
  selectedChatId: string // Chat ID is required
) => {
  setChats((prev) =>
    prev.map((chat) =>
      chat.id === selectedChatId
        ? {
            ...chat,
            messages: [
              ...chat.messages,
              { text: message, time: new Date(), isAi: false },
            ], // Add user message
          }
        : chat
    )
  );
  setMessage(""); // Clear input field
  setHeight(40); // Reset input height
};
