import { useState, useRef, useEffect } from "react";
import { Input } from "antd";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { chatWithAI, getAllMessages, deleteChat } from "../apis/chatbot";
import {
  FaPaperPlane,
  FaRobot,
  FaUser,
  FaTrash,
  FaTimes,
} from "react-icons/fa";
import FormattedMarkdown from "../utils/FormattedMarkdown";
import { motion, AnimatePresence } from "framer-motion";

const Chatbot = ({ isVisible, setIsVisible }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isVisible) {
      scrollToBottom();
    }
  }, [isVisible, messages]);

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
      toast.success("Chat cleared!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="flex-shrink-0 bg-gradient-to-r from-[#F57C05] to-[#ff9642] text-white p-4 border-b border-orange-600">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <FaRobot className="text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-lg">AI Assistant</h3>
              <p className="text-xs text-white/80">Always here to help</p>
            </div>
          </div>

          {/* Desktop Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="hidden lg:flex p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close chat"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={clearChat}
            disabled={loading || messages.length === 0}
            className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm flex-1"
          >
            <FaTrash className="w-3 h-3" />
            <span>Clear Chat</span>
          </button>

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="lg:hidden flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all text-sm font-medium backdrop-blur-sm"
          >
            <FaTimes className="w-3 h-3" />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#F57C05] to-[#ff9642] rounded-full flex items-center justify-center mb-4 shadow-lg">
              <FaRobot className="text-3xl text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Start a Conversation
            </h4>
            <p className="text-sm text-gray-500 max-w-xs">
              Ask me anything about your notes! I'm here to help you understand
              better.
            </p>
          </div>
        )}

        {messages.map((chat, index) =>
          chat.message.map((msg, msgIndex) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              key={`${index}-${msgIndex}`}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] flex gap-2 ${
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-[#F57C05] to-[#ff9642]"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.role === "user" ? (
                    <FaUser className="text-white text-xs" />
                  ) : (
                    <FaRobot className="text-gray-600 text-sm" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl px-4 py-3 shadow-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-[#F57C05] to-[#ff9642] text-white rounded-tr-none"
                      : "bg-white text-gray-800 rounded-tl-none border border-gray-200"
                  }`}
                >
                  <div className="text-sm leading-relaxed">
                    <FormattedMarkdown>{msg.content}</FormattedMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <FaRobot className="text-gray-600 text-sm" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-gray-200">
                <div className="flex gap-1">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#F57C05] transition-colors text-sm bg-gray-50 hover:bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className="w-12 h-12 bg-gradient-to-r from-[#F57C05] to-[#ff9642] hover:from-[#ff9642] hover:to-[#F57C05] text-white rounded-xl flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 disabled:transform-none"
            aria-label="Send message"
          >
            <FaPaperPlane className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Press Enter to send
        </p>
      </div>
    </div>
  );
};

export default Chatbot;
