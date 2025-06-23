import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, User, LogIn, LogOut, Home, Info, BookOpen, DollarSign, ShoppingBag, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth, signOutUser } from '@/lib/firebaseConfig';
import { User as FirebaseUser } from 'firebase/auth';
import logo from './assets/head-logo.png';

const Header: React.FC = () => {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Programs', href: '/programs', icon: BookOpen },
    { name: 'Crowd Funding', href: '/crowdfunding', icon: DollarSign },
    { name: 'Merchandise', href: '/merchandise', icon: ShoppingBag },
  ];

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newMode;
    });
  };

  // Check auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
      if (!currentUser && location === '/profile') {
        setLocation('/login');
      }
    });
    return () => unsubscribe();
  }, [setLocation, location]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
      setLocation('/login?redirect=/');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <header className="  lg:static bg-transparent z-50 h-[10vh] lg:h-[180px] dark:bg-[#183b4e] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center relative z-[2] py-4">
          {/* Logo - Fixed while scrolling */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[180px] h-[120px] lg:w-[240px] lg:h-[160px] mb-5 z-[999]">
            <div
              className="absolute top-0 left-[-20%] w-[150%] h-full bg-[#000000]"
              style={{ clipPath: 'polygon(0 0, 100% 0%, 83% 40%, 15% 40%)' }}
            ></div>
            <Link href="/">
              <img
                src={logo}
                alt="Raizing Sovereign Logo"
                className="relative z-[2] w-full h-auto p-[10px] cursor-pointer"
              />
            </Link>
          </div>

          {/* Spacer to prevent overlap with fixed logo */}
          <div className="h-[120px] lg:h-[160px] bg-transparent"></div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex justify-center gap-[50px] list-none p-5 -my-[4%] uppercase">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span
                  className={`p-[15px] rounded-[15px] no-underline text-[#cba135] font-bold text-base hover:text-[#a8a8f5] transition-colors duration-500 cursor-pointer dark:text-white dark:hover:text-[#cba135] ${
                    location === item.href ? 'text-[#00000] dark:text-[#cba135] ' : ''
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button and User Icon */}
          <div className="hidden lg:flex absolute top-[60px] right-[-40px] items-center gap-4 z-10">
            <Link
              href="/consultation"
              className="bg-[#183b4e] py-3 px-5 rounded-lg text-white font-bold no-underline hover:bg-[#cba135] hover:drop-shadow-xl transition-all duration-300 dark:bg-[#1b1f3b] dark:hover:bg-[#cba135]"
            >
              Talk to Experts
            </Link>
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center gap-2 text-[#00000] bg-[#f4f4f4] font-semibold px-4 py-2 rounded-[10px] hover:bg-[#b08f2e] transition-colors duration-300">
                <User className="w-6 h-6" />
                <span className="text-sm">
                  {user ? user.displayName || 'Account' : 'Sign Up / Sign In'}
                </span>
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-sm border border-gray-200 z-20 dark:bg-[#183b4e] dark:border-gray-700"
                  >
                    {user ? (
                      <div className="py-2">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-black hover:bg-[#F9FAFB] hover:text-[#a8a8f5] no-underline dark:text-white dark:hover:bg-[#1b1f3b] dark:hover:text-[#cba135]"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-black hover:bg-[#F9FAFB] hover:text-[#a8a8f5] dark:text-white dark:hover:bg-[#1b1f3b] dark:hover:text-[#cba135]"
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <Link
                        href={`/login?redirect=${encodeURIComponent(location)}`}
                        className="block px-4 py-2 text-sm text-black hover:bg-[#F9FAFB] hover:text-[#a8a8f5] no-underline dark:text-white dark:hover:bg-[#1b1f3b] dark:hover:text-[#cba135]"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Sign In
                      </Link>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 absolute top-[0px] left-4 z-[1000]"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X className="w-8 h-8 text-black dark:stroke-white z-[1001]" />
            ) : (
              <Menu className="w-8 h-8 text-black dark:stroke-white z-[1001]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white w-[60%] h-full fixed top-0 left-0 z-[998] shadow-lg dark:bg-[#183b4e]"
            ref={menuRef}
          >
            <div className="flex flex-col justify-between h-full px-6 py-6">
              <div>
                <p className="text-sm text-black font-semibold mb-6 text-left dark:text-white">
                  Welcome, {user ? user.displayName || 'Guest' : 'Guest'}
                </p>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span
                      className={`flex items-center gap-2 py-2 text-black text-base font-semibold text-left hover:text-[#a8a8f5] transition-colors duration-500 cursor-pointer dark:text-white dark:hover:text-[#cba135] ${
                        location === item.href ? 'text-[#a8a8f5] dark:text-[#cba135]' : ''
                      }`}
                    >
                      <item.icon className="w-5 h-5 dark:stroke-white" />
                      {item.name}
                    </span>
                  </Link>
                ))}
                <Link
                  href="/consultation"
                  className="block bg-[#1b1f3b] py-3 px-6 rounded-lg text-white font-bold text-sm text-left no-underline hover:bg-[#cba135] hover:drop-shadow-xl transition-all duration-300 mt-4 dark:bg-[#1b1f3b] dark:hover:bg-[#cba135]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Talk to Experts
                </Link>
                {user && (
                  <Link
                    href="/profile"
                    className="block bg-[#1b1f3b] py-3 px-6 rounded-lg text-white font-bold text-sm text-left no-underline hover:bg-[#cba135] hover:drop-shadow-xl transition-all duration-300 mt-2 dark:bg-[#1b1f3b] dark:hover:bg-[#cba135]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                )}
              </div>
              <div className="absolute bottom-4 right-6">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-[#1b1f3b] py-3 px-4 rounded-lg text-white font-bold text-sm hover:bg-[#cba135] hover:drop-shadow-xl transition-all duration-300 dark:bg-[#1b1f3b] dark:hover:bg-[#cba135] mb-8"
                  >
                    <LogOut className="max-w-5 max-h-5" />
                    Logout
                  </button>
                ) : (
                  <Link
                    href={`/login?redirect=${encodeURIComponent(location)}`}
                    className="flex items-center  gap-2 bg-[#1b1f3b] py-3 px-4 rounded-lg text-white font-bold text-sm no-underline hover:bg-[#cba135] hover:drop-shadow-xl transition-all duration-300 dark:bg-[#1b1f3b] dark:hover:bg-[#cba135]  "
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogIn className="max-w-5 max-h-5" />
                    Login
                  </Link>
                )}
              </div>
              <button
                onClick={toggleTheme}
                className="absolute bottom-4 left-6 flex items-center gap-2 bg-[#1b1f3b] py-3 px-4 rounded-lg text-white font-bold text-sm hover:bg-[#cba135] hover:drop-shadow-xl transition-all duration-300 dark:bg-[#1b1f3b] dark:hover:bg-[#cba135]"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                {isDarkMode ? 'Light' : 'Dark'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;