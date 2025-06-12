import { Link } from "wouter";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingActionButton() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link href="/consultation">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 gold-gradient rounded-full shadow-2xl flex items-center justify-center text-dark hover:shadow-3xl smooth-transition"
        >
          <MessageCircle className="w-8 h-8" />
        </motion.button>
      </Link>
    </motion.div>
  );
}
