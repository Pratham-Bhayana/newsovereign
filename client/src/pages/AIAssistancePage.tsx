import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Send, Mic } from 'lucide-react';
import { auth } from '@/lib/firebaseConfig';
import { User } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

interface PersonalInfo {
  email: string;
  phone: string;
  address: string;
  nationality: string;
  occupation: string;
  designation: string;
  monthlyIncome: string;
  bio: string;
}

const AIAssistancePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [, setLocation] = useLocation();
  const functions = getFunctions();
  const grokProxy = httpsCallable(functions, 'grokProxy');

  // Mock profile data (from ProfilePage.tsx)
  const personalInfo: PersonalInfo = {
    email: user?.email || 'john.doe@example.com',
    phone: user?.phoneNumber || '+1234567890',
    address: '123 Luxury Lane, Sovereign City, SC 12345',
    nationality: 'American',
    occupation: 'Financial Consultant',
    designation: 'Senior Advisor',
    monthlyIncome: '$10,000',
    bio: 'Passionate about empowering individuals with AI-driven financial solutions at Raizing Sovereign.',
  };

  // Enhanced mock Grok response
  const mockGrokResponse = (userInput: string): string => {
    const inputLower = userInput.toLowerCase().trim();

    // Specific greeting for "Hi"
    if (inputLower === 'hi' || inputLower === 'hello') {
      return `hELLO ${user?.displayName || 'Guest'} sir welcome to Raizing Sovereign https://raizzing.netlify.app/programs`;
    }

    // Financial queries
    if (inputLower.includes('finance') || inputLower.includes('money') || inputLower.includes('investment')) {
      const income = parseFloat(personalInfo.monthlyIncome.replace(/[^0-9.]/g, ''));
      if (income > 8000) {
        return 'With your monthly income of $10,000, consider diversified mutual funds or ETFs for long-term growth. Would you like specific recommendations?';
      } else if (income > 4000) {
        return 'Explore high-yield savings accounts or low-risk bonds to build a secure financial foundation.';
      }
      return 'Start with a budgeting plan and an emergency fund covering 3-6 months of expenses.';
    }
    if (inputLower.includes('budget') || inputLower.includes('save')) {
      return 'Create a 50/30/20 budget: 50% for needs, 30% for wants, and 20% for savings or debt repayment. Want tips to optimize your savings?';
    }
    if (inputLower.includes('stock') || inputLower.includes('market')) {
      return 'Stock markets can be volatile. Diversify with index funds or consult a financial advisor for personalized picks. Interested in market trends?';
    }

    // Profile queries
    if (inputLower.includes('profile') || inputLower.includes('income') || inputLower.includes('occupation')) {
      return `You're a ${personalInfo.designation} with a monthly income of ${personalInfo.monthlyIncome}. As a ${personalInfo.occupation}, would you like advice tailored to your financial goals?`;
    }
    if (inputLower.includes('bio') || inputLower.includes('about me')) {
      return `Your bio says: "${personalInfo.bio}". How can I help you achieve your goals with Raizing Sovereign?`;
    }

    // Raizing Sovereign queries
    if (inputLower.includes('crowdfunding') || inputLower.includes('campaign')) {
      return 'Raizing Sovereign offers crowdfunding for innovative projects. Visit https://raizzing.netlify.app/crowdfunding to explore campaigns or start your own!';
    }
    if (inputLower.includes('program') || inputLower.includes('programs')) {
      return 'Our programs empower financial sovereignty. Check them out at https://raizzing.netlify.app/programs. Want details on a specific program?';
    }
    if (inputLower.includes('merchandise') || inputLower.includes('shop')) {
      return 'Browse exclusive Raizing Sovereign merchandise at https://raizzing.netlify.app/merchandise. Interested in our latest collection?';
    }
    if (inputLower.includes('consultation') || inputLower.includes('consult')) {
      return 'Book a personalized consultation at https://raizzing.netlify.app/consultation to discuss your financial goals with our experts.';
    }
    if (inputLower.includes('sovereign') || inputLower.includes('raizing')) {
      return 'Raizing Sovereign is a platform for financial empowerment through crowdfunding and AI-driven insights. Learn more at https://raizzing.netlify.app/about.';
    }

    // General queries
    if (inputLower.includes('who are you') || inputLower.includes('grok')) {
      return 'I’m Grok, an AI assistant created by xAI, here to provide financial insights and support for Raizing Sovereign users. What’s on your mind?';
    }
    if (inputLower.includes('weather') || inputLower.includes('today')) {
      return 'I don’t have real-time weather data, but I can help with financial planning for any season! What’s your next financial goal?';
    }
    if (inputLower.includes('joke') || inputLower.includes('fun')) {
      return 'Why did the investor quit? Too many "bonds" tying them down! Want a financial tip instead?';
    }
    if (inputLower.includes('news') || inputLower.includes('update')) {
      return 'I don’t fetch live news, but I can suggest staying updated with market trends on Raizing Sovereign’s blog: https://raizzing.netlify.app/blog.';
    }

    // Fallback
    return 'I’m Grok, ready to assist! Try asking about finance, your profile, Raizing Sovereign’s programs, or even a fun fact!';
  };

  // Check auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        setUser(currentUser);
        setMessages([{ id: 1, text: `Hello, ${currentUser.displayName || 'Guest'}! How can I assist you with your financial goals?`, sender: 'ai' }]);
      } else {
        setLocation('/login?redirect=/ai-assistance');
      }
    });
    return () => unsubscribe();
  }, [setLocation]);

  // Handle chat input
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const newMessage: Message = { id: messages.length + 1, text: input, sender: 'user' };
    setMessages([...messages, newMessage]);

    try {
      // Call Firebase Function proxy to Grok API
      const result = await grokProxy({ prompt: input });
      const aiResponse = (result.data as any).response || 'No response from Grok.';
      setMessages(prev => [
        ...prev,
        { id: prev.length + 1, text: aiResponse, sender: 'ai' },
      ]);
      // Speak response
      const utterance = new SpeechSynthesisUtterance(aiResponse);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Grok API error:', error);
      // Fallback to mock response
      const aiResponse = mockGrokResponse(input);
      setMessages(prev => [
        ...prev,
        { id: prev.length + 1, text: aiResponse, sender: 'ai' },
      ]);
      const utterance = new SpeechSynthesisUtterance(aiResponse);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
    setInput('');
  };

  // Handle voice input with Web Speech API
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Sorry, your browser doesn’t support speech recognition.');
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
      handleSendMessage();
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      alert('Error with speech recognition. Please try again.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] to-[#E0E7FF] dark:from-[#183b4e] dark:to-[#0f2430] font-['Inter',sans-serif] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#183b4e] dark:text-white mb-4">
            AI Assistance
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">
            Chat with Grok or use voice assistance for personalized financial support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chatbot Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white dark:bg-[#183b4e] rounded-xl shadow-sm p-6"
          >
            <h2 className="text-sm font-bold text-[#183b4e] dark:text-white mb-4">Chat with Grok</h2>
            <div className="h-[400px] overflow-y-auto mb-4 p-4 bg-gray-50 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg text-sm ${
                      message.sender === 'user'
                        ? 'bg-[#cba135] text-white'
                        : 'bg-gray-200 dark:bg-[#1b1f3b] text-[#183b4e] dark:text-white'
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about finance, investments, or your profile..."
                className="flex-1 p-2 text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#cba135] dark:placeholder-gray-400"
                aria-label="Chat input"
              />
              <button
                onClick={handleSendMessage}
                className="bg-[#cba135] text-white p-2 rounded-full hover:bg-[#b08f2e] transition"
                aria-label="Send message"
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
            className="bg-white dark:bg-[#183b4e] rounded-xl shadow-sm p-6"
          >
            <h2 className="text-sm font-bold text-[#183b4e] dark:text-white mb-4">Video AI Assistant</h2>
            <p className="text-sm text-[#183b4e] dark:text-white mb-4">
              Welcome, {user.displayName || 'Guest'}!
            </p>
            <div className="relative w-full h-[400px] bg-gray-100 dark:bg-[#333] rounded-lg mb-4 flex items-center justify-center">
              <video
                src="https://example.com/synthesia-welcome-video.mp4"
                autoPlay
                loop
                muted
                className="w-full h-full object-cover rounded-lg"
                onError={() => console.error('Video failed to load')}
              />
              <p className="absolute text-sm text-gray-600 dark:text-gray-200">Synthesia AI Video Placeholder</p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleVoiceInput}
                className={`bg-[#004225] text-white p-3 rounded-full hover:bg-[#00301c] transition ${isListening ? 'animate-pulse' : ''}`}
                aria-label={isListening ? 'Stop listening' : 'Start voice input'}
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