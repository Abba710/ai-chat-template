import { Dispatch, SetStateAction } from "react";

// Main messages types
export type MessageType = {
  text: string;
  time: Date;
  isAi: boolean;
};

//
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
}

export interface HeaderProps {
  OpenSidebar: () => void;
}
