import { Dispatch, SetStateAction } from "react";

// Main messages types
export type MessageType = {
  text: string;
  time: Date;
  isAi: boolean;
};

// chat types
export interface ChatMessagesProps {
  height?: number;
  changeHeight: (newHeight: number) => void;
  message: string;
  changeMessage: (newMessage: string) => void;
  changeMessages: Dispatch<SetStateAction<MessageType[]>>;
  childHandleSend: (
    message,
    changeMessages,
    changeMessage,
    changeHeight
  ) => void;
}

export interface ChatInterface {
  id: string;
  title: string;
  lastMessage?: string;
  messages: MessageType[];
}

// header types
export interface HeaderProps {
  OpenSidebar: () => void;
}

export interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
  chats: ChatInterface[];
  onSelectChat: (chatId: string) => void;
  onStartNewChat: () => void;
}
