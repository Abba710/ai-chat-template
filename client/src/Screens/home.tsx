import React, { useState, useCallback, useRef } from "react";
import { sendMessageToAI } from "@/services/api";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  BackHandler,
  TextInput,
  Platform,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInputContentSizeChangeEventData,
} from "react-native";
import {
  Menu,
  Edit3,
  Languages,
  Mic,
  Send,
  SearchIcon,
} from "lucide-react-native";
import Sidebar from "@/Components/Sidebar";

type Message = {
  text: string;
  time: Date;
  isAi: boolean;
};

const callIcon =
  Platform.OS === "web"
    ? require("../img/call.svg")
    : require("../img/call.png");

const videoIcon =
  Platform.OS === "web"
    ? require("../img/Video.svg")
    : require("../img/Video.png");

const exampleMessages: Message[] = [];

const HomeScreen = () => {
  // states
  const [message, setMessage] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // sidebar state
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null); //chatid state

  // Input settings
  const [height, setHeight] = useState(40); // Initial height
  const MAX_LENGTH = 500; // Maximum character limit
  const MIN_HEIGHT = 40; // Minimum height
  const MAX_HEIGHT = 200; // Maximum height
  const LINE_HEIGHT = 40; // Approximate height of one line of text

  const [messages, setMessages] = useState<Message[]>(exampleMessages);
  // Message max length

  const [backPressed, setBackPressed] = useState(false);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const isWeb = Platform.OS === "web";

  // chats example
  const chats = [
    { id: "1", title: "Chat with AI - Session 1" },
    { id: "2", title: "DeepSeek - Session 2" },
    { id: "3", title: "GPT - Session 3" },
  ];
  // chat selection
  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
    setIsSidebarVisible(false);
  };
  // Send message
  const handleSend = async (message: string, isAi: boolean) => {
    // Check if the message is empty
    if (!message.trim()) {
      return; // Do not send empty messages
    }

    console.log("Sent:", message);

    // Add user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, time: new Date(), isAi: false }, // User message
    ]);

    setMessage("");
    setHeight(40);

    try {
      // Attempt to get a response from the AI
      const aiResponse = await sendMessageToAI(message);

      // Add AI's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: aiResponse.response, time: new Date(), isAi: true }, // AI message
      ]);
    } catch (error) {
      // Error handling if something goes wrong
      console.error("Error getting AI response:", error);

      // Add an error message to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Failed to get a response. Please try again.",
          time: new Date(),
          isAi: true,
        }, // System message
      ]);
    }
  };

  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData> | KeyboardEvent
  ) => {
    if (Platform.OS === "web") {
      // For web platform
      const webEvent = event as KeyboardEvent;
      if (webEvent.key === "Enter" && !webEvent.shiftKey) {
        webEvent.preventDefault(); // Prevent adding a new line
        handleSend(message, false); // Send the message when Enter is pressed
      }
    }
  };

  // Back button handler
  const handleBackPress = () => {
    if (backPressed) {
      // If back is pressed twice, exit the app
      BackHandler.exitApp();
    } else {
      // Show a toast message and wait for the second press
      setBackPressed(true);
      ToastAndroid.show(
        "Click again to exit the application",
        ToastAndroid.SHORT
      );
      setTimeout(() => setBackPressed(false), 2000); // Reset the back press state after 2 seconds
    }
    return true; // Prevent default back button behavior
  };

  React.useEffect(() => {
    const backH = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backH.remove();
  }, [backPressed]);

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
          setHeight(newHeight);
        }
      } else {
        // Native (Android/iOS) logic remains unchanged
        const { height: contentHeight } = e.nativeEvent.contentSize;

        // Dynamically adjust height within min and max limits
        if (contentHeight >= MIN_HEIGHT && contentHeight <= MAX_HEIGHT) {
          setHeight(contentHeight);
        } else if (contentHeight > MAX_HEIGHT) {
          setHeight(MAX_HEIGHT);
        }
      }
    },
    [height, Platform.OS] // Add height and platform as dependencies
  );

  return (
    <View className="flex w-full h-full bg-white sm:w-screen sm:h-screen">
      {/* Header */}
      <View className="px-4 w-full sm:h-[60px] mt-[10px] pt-7 sm:pt-2 pb-4 flex-row items-center justify-between border-b border-gray-100">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity onPress={() => setIsSidebarVisible(true)}>
            <Menu size={32} color="#000" />
          </TouchableOpacity>
          <View className="flex-row items-center gap-2">
            <Image
              className="w-[48px] h-[48px] rounded-full"
              source={require("../img/ai/aiavatar.jpg")}
              resizeMode="cover"
            />
            <View>
              <Text className="text-[20px] font-semibold">Ai</Text>

              <View className="flex-row items-center gap-1">
                <View className="w-2 h-2 rounded-full bg-green-500" />
                <Text className="text-sm text-green-500">Online</Text>
              </View>
            </View>
          </View>
        </View>
        <View className="flex-row gap-4 mr-[15px]">
          <TouchableOpacity>
            <Image
              source={callIcon}
              className="w-[24px] h-[24px] sm:h-[48px] sm:w-[48px]"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={videoIcon}
              className="w-[24px] h-[24px] sm:h-[48px] sm:w-[48px]"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* MAIN */}
      <View className="flex h-screen w-screen">
        {/* Tips - displayed if there are no messages */}
        {messages.length === 0 && (
          <View className="flex h-screen">
            <ScrollView
              className="flex h-screen w-screen px-4"
              showsVerticalScrollIndicator={false}
            >
              {/* Explain Section */}
              <View className="py-6">
                <View className="items-center mb-4">
                  <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center mb-1">
                    <SearchIcon size={20} color="#666" />
                  </View>
                  <Text className="text-sm font-semibold">Explain</Text>
                </View>

                <View className="gap-2">
                  <TouchableOpacity
                    className="bg-gray-50 p-4 rounded-3xl"
                    onPress={() => handleSend("Explain Quantum physics", false)}
                  >
                    <Text className="text-center text-gray-700">
                      Explain Quantum physics
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-gray-50 p-4 rounded-3xl"
                    onPress={() =>
                      handleSend(
                        "What are wormholes explain like i am 5",
                        false
                      )
                    }
                  >
                    <Text className="text-center text-gray-700">
                      What are wormholes explain like i am 5
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Write & Edit Section */}
              <View className="py-6">
                <View className="items-center mb-4">
                  <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center mb-1">
                    <Edit3 size={20} color="#666" />
                  </View>
                  <Text className="text-sm font-semibold">Write & edit</Text>
                </View>
                <View className="gap-2">
                  <TouchableOpacity
                    className="bg-gray-50 p-4 rounded-3xl"
                    onPress={() =>
                      handleSend("Write a tweet about global warming", false)
                    }
                  >
                    <Text className="text-center text-gray-700">
                      Write a tweet about global warming
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-gray-50 p-4 rounded-3xl"
                    onPress={() =>
                      handleSend("Write a poem about flower and love", false)
                    }
                  >
                    <Text className="text-center text-gray-700">
                      Write a poem about flower and love
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-gray-50 p-4 rounded-3xl"
                    onPress={() =>
                      handleSend("Write a rap song lyrics about", false)
                    }
                  >
                    <Text className="text-center text-gray-700">
                      Write a rap song lyrics about
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Translate Section */}
              <View className="py-6 mb-[160px] sm:mb-[200px]">
                <View className="items-center mb-4">
                  <View className="w-10 h-10 rounded-full bg-gray-50 items-center justify-center mb-1">
                    <Languages size={20} color="#666" />
                  </View>
                  <Text className="text-sm font-semibold">Translate</Text>
                </View>
                <View className="gap-2">
                  <TouchableOpacity
                    className="bg-gray-50 p-4 rounded-3xl"
                    onPress={() =>
                      handleSend(
                        "How do you say 'how are you' in korean?",
                        false
                      )
                    }
                  >
                    <Text className="text-center text-gray-700">
                      How do you say "how are you" in korean?
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-gray-50 p-4 rounded-3xl"
                    onPress={() =>
                      handleSend(
                        "Translate this sentence to spanish: 'I love you'",
                        false
                      )
                    }
                  >
                    <Text className="text-center text-gray-700">
                      Translate this sentence to spanish: 'I love you'
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        )}

        {/* Messages - displayed if there are messages */}
        {messages.length > 0 && (
          <ScrollView
            ref={scrollViewRef}
            className="flex h-screen w-screen px-4 py-2 mb-[150px] sm:mb-[200px]"
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() =>
              scrollViewRef.current?.scrollToEnd({ animated: true })
            }
          >
            {messages.map((message, index) => (
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
        )}
      </View>

      {/* Bottom Input */}
      <View className="absolute bottom-0 left-0 right-0 p-2 bg-transparent">
        <View className="flex-row items-center bg-white rounded-3xl px-4 py-3 shadow-xl shadow-black shadow-opacity-100">
          {/* TextInput with dynamic height adjustment */}
          <TextInput
            className="text-gray-600 w-full flex-1 border-none outline-none"
            placeholder="Type your message..."
            placeholderTextColor="#666"
            value={message}
            onChangeText={(text) => {
              setMessage(text);

              // Handle deletion explicitly on web
              if (Platform.OS === "web" && text.length < message.length) {
                const newHeight = Math.max(MIN_HEIGHT, height - LINE_HEIGHT);
                setHeight(newHeight);
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
            onPress={() => handleSend(message, false)}
            disabled={!message.trim()} // Disable button if the input is empty
          >
            <Send size={25} color={message.trim() ? "#0084ff" : "black"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sidebar */}
      <Sidebar
        isVisible={isSidebarVisible}
        onClose={() => setIsSidebarVisible(false)}
        chats={chats}
        onSelectChat={handleChatSelect}
      />
    </View>
  );
};

export default HomeScreen;
