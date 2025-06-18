import { Link } from "wouter";
import { Bot } from "lucide-react";
import { motion } from "framer-motion";

const FloatingActionButton: React.FC = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link href="/ai-assistance">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-gradient-to-r from-[#cba135] to-[#e0c270] rounded-full shadow-xl flex items-center justify-center text-[#183b4e] hover:shadow-2xl transition"
        >
          <Bot className="w-8 h-8" />
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default FloatingActionButton;