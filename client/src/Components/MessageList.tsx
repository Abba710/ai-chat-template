import { useRef } from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MessageType } from "@/types/app_types";

interface MessageListProps {
  messagesList: MessageType[];
}

export const MessageList: React.FC<MessageListProps> = ({ messagesList }) => {
  const scrollViewRef = useRef<ScrollView | null>(null);

  return (
    <ScrollView
      ref={scrollViewRef}
      className="flex h-screen w-screen px-4 py-2 mb-[150px] sm:mb-[200px]"
      showsVerticalScrollIndicator={false}
      onContentSizeChange={() =>
        scrollViewRef.current?.scrollToEnd({ animated: true })
      }
    >
      {messagesList.map((message, index) => (
        <View
          key={index}
          className={`max-w-[80%] sm:max-w-[60%] rounded-tl-[25px] rounded-bl-[25px] rounded-br-[25px] gap-2.5 px-4 py-3 ${
            message.isAi
              ? "bg-[#EEEEEE] self-start rounded-tl-[0] rounded-tr-[25px]"
              : "bg-[#2e332e] self-end"
          } mb-2`}
        >
          <Text
            className={`text-base font-nunito ${
              message.isAi ? "text-black" : "text-white"
            }`}
          >
            {message.text}
          </Text>
          <Text
            className={`text-xs mt-1 self-end ${
              message.isAi ? "text-gray-500" : "text-gray-300"
            }`}
          >
            {message.time.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};
