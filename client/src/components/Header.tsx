import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Crowd Funding", href: "/crowdfunding" },
    { name: "Merchandise", href: "/merchandise" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center justify-center flex-1 lg:flex-none">
            <Link href="/">
              <div className="text-2xl font-bold cursor-pointer">
                <span className="text-gold">RAIZING</span>
                <span className="text-dark">SOVEREIGN</span>
              </div>
            </Link>
          </div>
          
          {/* Navigation - Hidden on mobile */}
          <nav className="hidden lg:flex items-center space-x-8 mx-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <a className={`text-gray-700 hover:text-primary smooth-transition font-medium ${
                  location === item.href ? 'text-primary' : ''
                }`}>
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>
          
          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button asChild className="gold-gradient text-dark hover:shadow-lg smooth-transition">
              <Link href="/consultation">
                Talk to our Experts
              </Link>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="px-4 py-2 space-y-2">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <a
                    className={`block py-2 text-gray-700 hover:text-primary smooth-transition ${
                      location === item.href ? 'text-primary' : ''
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
              <Button
                asChild
                className="w-full mt-2 gold-gradient text-dark"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href="/consultation">
                  Talk to our Experts
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
