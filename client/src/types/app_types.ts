// app_types.tsx
import { Dispatch, SetStateAction } from "react";

// Main messages type
export type MessageType = {
  text: string;
  time: Date;
  isAi: boolean;
};

// Chat interface with messages
export interface ChatInterface {
  id: string;
  title: string;
  messages: MessageType[];
}

// Props for chat-related components
export interface ChatMessagesProps {
  height: number;
  changeHeight: Dispatch<SetStateAction<number>>;
  message: string;
  changeMessage: Dispatch<SetStateAction<string>>;
  changeMessages?: (messages: MessageType[]) => void; // Made optional with '?'
  childHandleSend: (
    message: string,
    setChats: Dispatch<SetStateAction<ChatInterface[]>>,
    setMessage: Dispatch<SetStateAction<string>>,
    setHeight: Dispatch<SetStateAction<number>>,
    selectedChatId: string | null,
    setSelectedChatId: Dispatch<SetStateAction<string | null>>
  ) => void;
  selectedChatId: string | null;
  setChats: Dispatch<SetStateAction<ChatInterface[]>>;
  setSelectedChatId: Dispatch<SetStateAction<string | null>>;
}

// Header props
export interface HeaderProps {
  OpenSidebar: () => void;
}

// Sidebar props
export interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
  chats: ChatInterface[];
  onSelectChat: (chatId: string) => void;
  onStartNewChat: () => void;
}
