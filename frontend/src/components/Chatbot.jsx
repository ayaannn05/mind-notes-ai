import { useState, useRef, useEffect } from "react";
import { Button, Input } from "antd";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { chatWithAI, getAllMessages, deleteChat } from "../apis/chatbot";
import {
  SendOutlined,
  RobotOutlined,
  LoadingOutlined,
  CloseOutlined,
  UserOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import FormattedMarkdown from "../utils/FormattedMarkdown";
import { motion, AnimatePresence } from "framer-motion";

const Chatbot = ({ isVisible, setIsVisible }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const chatbotRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isVisible) {
      scrollToBottom();
    }
  }, [isVisible, messages]); // Scroll on new messages too

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);
      const requestBody = {
        user_input: input,
        noteId: id,
      };
      const response = await chatWithAI(requestBody);
      const newMessage = {
        message: [
          { role: "user", content: input },
          { role: "assistant", content: response.response },
        ],
      };
      setMessages((prev) => [...prev, newMessage]);
      setInput("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getAllMessages(id);
        setMessages(response.messages[0]?.messages || []);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchMessages();
  }, [id]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = async () => {
    try {
      await deleteChat();
      setMessages([]);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-0 right-0 sm:bottom-4 sm:right-4 w-full sm:w-[600px] h-[100vh] sm:h-[600px] z-[1000]"
        >
          <div
            className="flex flex-col h-full relative bg-white sm:rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm bg-opacity-95"
            ref={chatbotRef}
          >
            {/* Header */}
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="flex justify-between items-center p-4 bg-gradient-to-r from-[#F17905] to-[#ff9636] text-white"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <RobotOutlined className="text-xl" />
                </motion.div>
                <span className="font-bold text-lg tracking-wide">
                  AI Assistant
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  type="text"
                  size="middle"
                  className="text-white hover:text-gray-100 hover:scale-105 transition-transform"
                  disabled={loading}
                  onClick={clearChat}
                  icon={<MessageOutlined />}
                >
                  New Chat
                </Button>
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  size="middle"
                  className="text-white hover:text-gray-100 hover:rotate-90 transition-transform"
                  onClick={() => setIsVisible(false)}
                />
              </div>
            </motion.div>

            {/* Chat Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white"
              style={{ height: "calc(100% - 120px)" }}
            >
              {messages.map((chat, index) =>
                chat.message.map((msg, msgIndex) => (
                  <motion.div
                    initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    key={`${index}-${msgIndex}`}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[90%] sm:max-w-[80%] flex items-start gap-3 p-3 sm:p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-[#F17905] to-[#ff9636] text-white rounded-br-none"
                          : "bg-white text-gray-800 rounded-bl-none border border-gray-100"
                      }`}
                    >
                      {msg.role === "assistant" && (
                        <RobotOutlined className="mt-1 text-[#F17905]" />
                      )}
                      <div className="flex-1 text-sm sm:text-base">
                        <FormattedMarkdown>{msg.content}</FormattedMarkdown>
                      </div>
                      {msg.role === "user" && (
                        <UserOutlined className="mt-1 text-white" />
                      )}
                    </div>
                  </motion.div>
                ))
              )}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 text-gray-500 p-3 bg-white rounded-lg shadow-md"
                >
                  <LoadingOutlined className="text-[#F17905]" />
                  <span>AI is thinking...</span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="p-4 bg-white border-t border-gray-100 shadow-lg"
            >
              <div className="flex gap-3">
                <Input
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                  className="rounded-full border-2 hover:border-[#F17905] focus:border-[#F17905] shadow-sm"
                  size="large"
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleSendMessage}
                    disabled={loading || !input.trim()}
                    className="rounded-full bg-gradient-to-r from-[#F17905] to-[#ff9636] hover:from-[#ff9636] hover:to-[#F17905] border-none h-[40px] w-[40px] flex items-center justify-center shadow-md"
                    size="large"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Chatbot;
