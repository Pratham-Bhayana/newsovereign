import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { auth, signInWithGoogle } from "@/lib/firebaseConfig";
import { User } from "firebase/auth";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [, setLocation] = useLocation();

  // Get redirect URL from query param
  const queryParams = new URLSearchParams(window.location.search);
  const redirect = queryParams.get("redirect") || "/ai-assistance";

  // Check auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        setUser(currentUser);
        setLocation(decodeURIComponent(redirect));
      }
    });
    return () => unsubscribe();
  }, [redirect, setLocation]);

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      // Redirect handled by useEffect
    } catch (err) {
      setError("Failed to sign in with Google. Please try again.");
      setLoading(false);
    }
  };

  if (user) {
    return null; // Redirect handled by useEffect
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-['Inter',sans-serif] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full text-center"
      >
        <h2 className="text-xl font-bold text-[#183b4e] mb-4">Sign In</h2>
        <p className="text-sm text-gray-600 mb-6">
          Sign in with Google to access our AI assistance features.
        </p>
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className={`bg-[#cba135] text-white text-sm font-semibold px-6 py-2 rounded-full transition ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#b08f2e]"
          }`}
        >
          {loading ? "Signing In..." : "Sign In with Google"}
        </button>
        {error && <p className="text-xs text-red-500 mt-4">{error}</p>}
        <p className="text-xs text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-[#cba135] hover:underline">
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;