import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from './assets/head-logo.png';

const Header: React.FC = () => {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '//programs' },
    { name: 'Crowd Funding', href: '//crowdfunding' },
    { name: 'Merchandise', href: '//merchandise' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="relative text-center bg-gray  z-50 h-[180px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center relative z-[2] py-4">
          {/* Logo - Fixed while scrolling */}
          <div className=" fixed top-0 left-1/2 transform -translate-x-1/2 w-[240px] h-[160px] mb-5 z-[999]">
            <div
              className="absolute top-0 left-[-20%] w-[150%] h-full bg-black"
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
          <div className="h-[180px] bg-transparent"></div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex justify-center gap-[50px] list-none p-0 -my-[4%] uppercase">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span
                  className={`p-[15px] rounded-[15px] no-underline text-black font-bold text-base hover:text-[#a8a8f5] transition-colors duration-500 cursor-pointer ${
                    location === item.href ? 'text-[#a8a8f5]' : ''
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block absolute top-[60px] right-[-40px] bg-[#1b1f3b] py-5 px-10 rounded-lg z-10 cursor-pointer hover:bg-[#cba135] hover:drop-shadow-[0_0_20px_#000000] transition-all duration-300">
            <Link to="#" className="no-underline text-white font-bold">
              Talk to Experts
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 absolute top-4 right-4" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="px-4 py-2 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span
                    className={`block py-2 text-black hover:text-[#a8a8f5] transition-colors duration-500 cursor-pointer ${
                      location === item.href ? 'text-[#a8a8f5]' : ''
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
              <div className="w-full mt-2 bg-[#1b1f3b] py-5 px-10 rounded-lg cursor-pointer hover:bg-[#cba135] hover:drop-shadow-[0_0_20px_#000000] transition-all duration-300 animate-btn-r-l text-center">
                <Link
                  to="#"
                  className="no-underline text-white font-bold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Talk to Experts
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;