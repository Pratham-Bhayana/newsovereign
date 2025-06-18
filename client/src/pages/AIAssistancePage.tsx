import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Send, Mic } from "lucide-react";
import { auth } from "@/lib/firebaseConfig";
import { User } from "firebase/auth";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

const AIAssistancePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello! How can I assist you today?", sender: "ai" },
  ]);
  const [input, setInput] = useState<string>("");
  const [, setLocation] = useLocation();

  // Check auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setLocation("/login");
      }
    });
    return () => unsubscribe();
  }, [setLocation]);

  // Handle chat input
  const handleSendMessage = () => {
    if (!input.trim()) return;
    const newMessage: Message = { id: messages.length + 1, text: input, sender: "user" };
    setMessages([...messages, newMessage]);
    // Mock AI response (replace with API call)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: prev.length + 1, text: "I'm here to help! What's your question?", sender: "ai" },
      ]);
    }, 1000);
    setInput("");
  };

  // Handle voice input (placeholder)
  const handleVoiceInput = () => {
    console.log("Voice input toggled (placeholder)");
    // Replace with Web Speech API or voice AI integration
  };

  if (!user) {
    return null; // Redirect handled by useEffect
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-['Inter',sans-serif] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#183b4e] mb-4">
            AI Assistance
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Chat with our AI or use voice assistance for personalized support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chatbot Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-sm font-bold text-[#183b4e] mb-4">Chat with AI</h2>
            <div className="h-[400px] overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-[#cba135] text-white"
                        : "bg-gray-200 text-[#183b4e]"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === "Enter" && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cba135]"
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#cba135] text-white p-2 rounded-full hover:bg-[#b08f2e] transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Video AI Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-sm font-bold text-[#183b4e] mb-4">Video AI Assistant</h2>
            <p className="text-sm text-[#183b4e] mb-4">
              Welcome, {user.displayName || "Guest"}!
            </p>
            <div className="relative w-full h-[400px] bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              {/* Placeholder for video (replace with actual video source) */}
              <p className="text-sm text-gray-600">Video AI Placeholder</p>
              {/* <video src="ai-welcome-video.mp4" autoPlay muted className="w-full h-full object-cover rounded-lg" /> */}
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleVoiceInput}
                className="bg-[#004225] text-white p-3 rounded-full hover:bg-[#00301c] transition"
              >
                <Mic className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistancePage;
