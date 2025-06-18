// ...existing code...
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { auth, signInWithGoogle } from "@/lib/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, User, isSignInWithEmailLink, signInWithEmailLink, updateProfile } from "firebase/auth";
import { Mail, Smartphone } from "lucide-react";
import CountryFlag from "react-country-flag";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";

// Generate all country codes
const countryCodes = getCountries().map(country => ({
  code: `+${getCountryCallingCode(country)}`,
  country,
  name: new Intl.DisplayNames(['en'], { type: 'region' }).of(country) || country,
})).sort((a, b) => a.name.localeCompare(b.name));

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+1");
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [, setLocation] = useLocation();
  const emailRef = useRef<string>("");

  // Get redirect URL from query param
  const queryParams = new URLSearchParams(window.location.search);
  const redirect = queryParams.get("redirect") || "/ai-assistance";

  // Auto-detect country code
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const country = countryCodes.find(c => c.country === data.country_code);
        if (country) setCountryCode(country.code);
      } catch (err) {
        console.error("Country detection failed:", err);
        setCountryCode("+1"); // Fallback to US
      }
    };
    detectCountry();
  }, []);

  // Check auth state and handle email link
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        if (isSignup && !currentUser.emailVerified) {
          await sendEmailVerification(currentUser);
          setEmailSent(true);
        } else {
          setUser(currentUser);
          setLocation(decodeURIComponent(redirect));
        }
      }
    });

    // Handle email link sign-in
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const emailForLink = emailRef.current || window.localStorage.getItem("emailForSignIn") || prompt("Please enter your email for confirmation");
      if (emailForLink) {
        signInWithEmailLink(auth, emailForLink, window.location.href)
          .then(() => {
            if (isSignup && auth.currentUser && name.trim()) {
              updateProfile(auth.currentUser, { displayName: name.trim() });
            }
            if (isSignup && auth.currentUser && phoneNumber.trim()) {
              // Firebase updateProfile does not support phoneNumber, so this is omitted.
            }
          })
          .catch((err: any) => {
            setError(err.message || "Failed to sign in with email link.");
          });
      }
    }

    return () => unsubscribe();
  }, [redirect, setLocation, isSignup, name, phoneNumber, countryCode]);

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      if (isSignup && auth.currentUser && name.trim()) {
        await updateProfile(auth.currentUser, { displayName: name.trim() });
      }
      if (isSignup && auth.currentUser && phoneNumber.trim()) {
        // Firebase updateProfile does not support phoneNumber, so this is omitted.
      }
      setLoading(false);
    } catch (err: any) {
      console.error("Google Sign-In error:", err);
      setError(err.message || "Failed to sign in with Google.");
      setLoading(false);
    }
  };

  // Handle Email Sign-In/Sign-Up
  const handleEmailAuth = async () => {
    try {
      if (isSignup) {
        if (!name.trim()) {
          setError("Please enter your name.");
          return;
        }
        if (!phoneNumber.trim() || phoneNumber.length < 7) {
          setError("Please enter a valid phone number.");
          return;
        }
        if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
          setError("Password must be at least 8 characters with letters and numbers.");
          return;
        }
      }

      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setError("Please enter a valid email address.");
        return;
      }

      setLoading(true);
      setError(null);

      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName: name.trim(),
          });
          await sendEmailVerification(auth.currentUser!);
          setEmailSent(true);
        }
      } else {
        if (!password.trim()) {
          setError("Please enter your password.");
          setLoading(false);
          return;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
          setError("Please verify your email before signing in.");
          await sendEmailVerification(userCredential.user);
          setEmailSent(true);
        }
        }
      }
      setLoading(false);
    } catch (err: any) {
      console.error("Email auth error:", err);
      const errorMessages: Record<string, string> = {
        "auth/email-already-in-use": "Email is already registered. Try signing in.",
        "auth/invalid-email": "Invalid email address.",
        "auth/weak-password": "Password is too weak.",
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
      };
      setError(errorMessages[err.code] || err.message || "Failed to process authentication.");
      setLoading(false);
    }
  };

  // Toggle between login and signup
  const toggleMode = () => {
    setIsSignup(!isSignup);
    setError(null);
    setEmailSent(false);
    setEmail("");
    setPassword("");
    setName("");
    setPhoneNumber("");
  };

  if (user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F9FAFB] to-[#E0E7FF] dark:from-[#183b4e] dark:to-[#0f2430] font-['Inter',sans-serif] flex items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
        style={{
          backgroundImage: "radial-gradient(circle, rgba(203,161,53,0.2) 0%, transparent 70%)",
          backgroundSize: "200% 200%",
          backgroundPosition: "center",
        }}
      />
      {/* Welcome Text */}
      <motion.div
        className="absolute top-10 left-10 hidden md:block text-[#183b4e] dark:text-white"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold">Welcome to Raizing Sovereign</h1>
        <p className="text-lg mt-2">Empower your journey with AI-driven insights.</p>
      </motion.div>

      {/* Auth Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-[#183b4e] rounded-xl shadow-lg p-8 max-w-md w-full z-10"
      >
        <h2 className="text-2xl font-bold text-[#183b4e] dark:text-white mb-4">
          {isSignup ? "Sign Up" : "Sign In"}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-200 mb-6">
          {isSignup
            ? "Create an account to access AI assistance."
            : "Sign in to unlock AI-powered features."}
        </p>

        {emailSent ? (
          <p className="text-sm text-gray-600 dark:text-gray-200 mb-6">
            Check your email ({email}) for a verification link. Follow the link to complete {isSignup ? "signup" : "sign-in"}.
          </p>
        ) : (
          <>
            {/* Google Sign-In */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className={`flex items-center justify-center bg-[#cba135] text-white text-sm font-semibold px-6 py-2 rounded-full transition w-full mb-4 ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#b08f2e]"
              }`}
            >
              <Mail className="w-5 h-5 mr-2" />
              {loading ? "Signing In..." : "Continue with Google"}
            </button>

            <div className="flex items-center mb-4">
              <hr className="flex-grow border-gray-300 dark:border-gray-600" />
              <span className="px-2 text-sm text-gray-600 dark:text-gray-200">OR</span>
              <hr className="flex-grow border-gray-300 dark:border-gray-600" />
            </div>

            {/* Form */}
            <div>
              {isSignup && (
                <>
                  <label htmlFor="name" className="sr-only">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 mb-4 text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#cba135] dark:placeholder-gray-400"
                    aria-label="Name"
                  />
                </>
              )}

              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative mb-4">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#cba135] dark:placeholder-gray-400 pl-10"
                  aria-label="Email"
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isSignup ? "Create a password" : "Enter your password"}
                className="w-full px-4 py-2 mb-4 text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#cba135] dark:placeholder-gray-400"
                aria-label="Password"
              />

              {isSignup && (
                <>
                  <div className="flex mb-4">
                    <label htmlFor="country-code" className="sr-only">Country Code</label>
                    <select
                      id="country-code"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-1/3 px-2 py-2 text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-l-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#cba135]"
                      aria-label="Country Code"
                    >
                      {countryCodes.map(({ code, country, name }) => (
                        <option key={code + country} value={code}>
                          {/* CountryFlag can't be rendered in option, so just show code and name */}
                          {code} ({name})
                        </option>
                      ))}
                    </select>
                    <label htmlFor="phone" className="sr-only">Phone Number</label>
                    <div className="relative flex-1">
                      <input
                        id="phone"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Enter phone number"
                        className="w-full px-4 py-2 text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-r-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#cba135] dark:placeholder-gray-400 pl-10"
                        aria-label="Phone Number"
                      />
                      <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </>
              )}

              <button
                onClick={handleEmailAuth}
                disabled={loading}
                className={`bg-[#cba135] text-white text-sm font-semibold px-6 py-2 rounded-full transition w-full ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#b08f2e]"
                }`}
              >
                {loading ? "Processing..." : isSignup ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </>
        )}

        {error && <p className="text-xs text-red-600 dark:text-red-400 mt-4">{error}</p>}

        <p className="text-xs text-gray-600 dark:text-gray-200 mt-4">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            onClick={toggleMode}
            className="text-[#cba135] dark:text-[#cba135] hover:underline focus:outline-none"
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
// ...existing code...