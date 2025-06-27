import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { auth, signInWithGoogle } from "@/lib/firebaseConfig";
import { updateProfile, sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, User, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { Mail, Smartphone, Eye, EyeOff } from "lucide-react";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";
import logo from '../components/assets/head-logo.png';

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
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
    let isMounted = true;
    const detectCountry = async () => {
      try {
        const geoPromise = new Promise<{ countryCode: string }>((resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error("Geolocation not supported"));
            return;
          }
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                const response = await fetch(
                  `https://api.opencagedata.com/geocode/v1/json?q=${position.coords.latitude}+${position.coords.longitude}&key=7343bece781644c7bc4a86ba0545e226&no_annotations=1`
                );
                const data = await response.json();
                if (data.results[0]?.components?.country_code) {
                  resolve({ countryCode: data.results[0].components.country_code.toUpperCase() });
                } else {
                  reject(new Error("No country code found"));
                }
              } catch (err) {
                reject(err);
              }
            },
            (err) => reject(err),
            { timeout: 5000 }
          );
        });

        const { countryCode } = await geoPromise;
        const country = countryCodes.find(c => c.country === countryCode);
        if (country && isMounted) {
          setCountryCode(country.code);
          return;
        }
      } catch (err) {
        // fallback
      }
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const country = countryCodes.find(c => c.country === data.country_code);
        if (country && isMounted) {
          setCountryCode(country.code);
          return;
        }
      } catch (err) {}
      if (isMounted) setCountryCode("+1");
    };
    detectCountry();
    return () => { isMounted = false; };
  }, []);

  // Check auth state and handle email link
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        if (!currentUser.emailVerified && isSignup) {
          try {
            await sendEmailVerification(currentUser);
            setEmailSent(true);
            await auth.signOut();
          } catch (err: any) {
            setError(err.message || "Failed to send verification email.");
          }
        } else if (currentUser.emailVerified) {
          setUser(currentUser);
          setLocation(decodeURIComponent(redirect));
        }
      }
    });

    // Handle email link sign-in
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const emailForLink = emailRef.current || prompt("Please enter your email for confirmation");
      if (emailForLink) {
        signInWithEmailLink(auth, emailForLink, window.location.href)
          .then(async () => {
            if (isSignup && auth.currentUser && name.trim()) {
              await updateProfile(auth.currentUser, { displayName: name.trim() });
            }
          })
          .catch((err: any) => {
            setError(err.message || "Failed to sign in with email link.");
          });
      }
    }

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
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
      setLoading(false);
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google.");
      setLoading(false);
    }
  };

  // Handle Email Sign-In/Sign-Up
  const handleEmailAuth = async () => {
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

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        emailRef.current = email;
        setEmailSent(true);
        setLoading(false);
        return;
      } else {
        if (!password.trim()) {
          setError("Please enter your password.");
          setLoading(false);
          return;
        }
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
          setError("Please verify your email before signing in. Check your inbox for the verification link.");
          setEmailSent(true);
          setLoading(false);
          await auth.signOut();
          return;
        }
        setUser(userCredential.user);
        setLocation(decodeURIComponent(redirect));
      }
      setLoading(false);
    } catch (err: any) {
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
    <div className="min-h-screen w-full bg-gradient-to-br from-[#F9FAFB] to-[#E0E7FF] dark:from-[#183b4e] dark:to-[#0f2430] flex items-center justify-center px-2 py-6">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2 }}
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(203,161,53,0.2) 0%, transparent 70%)",
            backgroundSize: "120% 120%", // smaller for mobile
            backgroundPosition: "center",
          }}
        />
        <style>
          {`
            @media (min-width: 640px) {
              .login-bg-ani {
                background-size: 200% 200% !important;
              }
            }
          `}
        </style>
      </div>
      <div className="relative z-10 w-full max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/95 dark:bg-[#183b4e] rounded-2xl shadow-2xl px-5 py-8 sm:px-8 sm:py-10 flex flex-col gap-4"
        >
          {/* Title added here */}

          <div className="flex flex-col items-center gap-2 mb-2">
            <img
              src={logo}
              alt="Raizing Sovereign"
              className="w-250 h-10  mb-4 "
            />
                      <h2 className="text-lg sm:text-xl font-semibold text-[#183b4e] dark:text-white text-center mb-2">
            Please Sign to continue
          </h2>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#cba135] text-center">
              {isSignup ? "Create Account" : "Sign In"}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-200 text-center">
              {isSignup
                ? "Join us to unlock AI-powered assistance for your journey."
                : "Sign in to access your AI-powered dashboard."}
            </p>
          </div>

          {emailSent ? (
            <div className="bg-[#f8f4ea] text-[#183b4e] rounded-lg px-4 py-3 text-center text-sm mb-2">
              Check your email (<span className="font-semibold">{email}</span>) for a verification link.<br />
              Follow the link to complete {isSignup ? "signup" : "sign-in"}.
            </div>
          ) : (
            <>
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className={`flex items-center justify-center bg-[#cba135] text-white text-sm font-semibold px-6 py-2 rounded-full transition w-full mb-3 ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#b08f2e]"
                }`}
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-2" />
                {loading ? "Signing In..." : "Continue with Google"}
              </button>

              <div className="flex items-center mb-2">
                <hr className="flex-grow border-gray-300 dark:border-gray-600" />
                <span className="px-2 text-xs text-gray-500 dark:text-gray-300">OR</span>
                <hr className="flex-grow border-gray-300 dark:border-gray-600" />
              </div>

              <form
                className="flex flex-col gap-3"
                onSubmit={e => {
                  e.preventDefault();
                  handleEmailAuth();
                }}
                autoComplete="on"
              >
                {isSignup && (
                  <div>
                    <label htmlFor="name" className="sr-only">Name</label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full px-4 py-2 text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#cba135] dark:placeholder-gray-400"
                      aria-label="Name"
                      autoComplete="name"
                    />
                  </div>
                )}

                <div className="relative">
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full px-4 py-2 text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#cba135] dark:placeholder-gray-400 pl-10"
                    aria-label="Email"
                    autoComplete="email"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                <div className="relative">
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isSignup ? "Create a password" : "Password"}
                    className="w-full px-4 py-2 text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#cba135] dark:placeholder-gray-400 pr-10"
                    aria-label="Password"
                    autoComplete={isSignup ? "new-password" : "current-password"}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#cba135]"
                    onClick={() => setShowPassword((v) => !v)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {isSignup && (
                  <div className="flex gap-2">
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
                        placeholder="Phone Number"
                        className="w-full px-4 py-2 text-sm text-gray-900 dark:text-white bg-gray-100 dark:bg-[#333] rounded-r-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#cba135] dark:placeholder-gray-400 pl-10"
                        aria-label="Phone Number"
                        autoComplete="tel"
                      />
                      <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-[#cba135] text-white text-sm font-semibold px-6 py-2 rounded-full transition w-full mt-2 ${
                    loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#b08f2e]"
                  }`}
                >
                  {loading ? "Processing..." : isSignup ? "Sign Up" : "Sign In"}
                </button>
              </form>
            </>
          )}

          {error && (
            <div className="text-xs text-red-600 dark:text-red-400 mt-2 text-center">{error}</div>
          )}

          <div className="text-xs text-gray-600 dark:text-gray-200 mt-4 text-center">
            {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
            <button
              onClick={toggleMode}
              className="text-[#cba135] dark:text-[#cba135] hover:underline focus:outline-none"
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;