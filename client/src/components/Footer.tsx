import { Link } from "wouter";
import { MapPin, Phone, Mail, Download } from "lucide-react";
import logo from "./assets/head-logo.png"

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Crowd Funding", href: "/crowdfunding" },
    { name: "Merchandise", href: "/merchandise" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: "fab fa-facebook-f", href: "#" },
    { name: "Twitter", icon: "fab fa-twitter", href: "#" },
    { name: "LinkedIn", icon: "fab fa-linkedin-in", href: "#" },
    { name: "Instagram", icon: "fab fa-instagram", href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <img 
                src={logo} 
                alt="Raizing Sovereign Logo" 
                className="h-16 w-auto mb-2"
              />
              
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted partner for global citizenship and investment migration solutions. Helping families achieve their dreams of international mobility since 2010.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gold hover:text-dark smooth-transition"
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="text-gray-300 hover:text-gold smooth-transition">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-gold mt-0.5" />
                <span className="text-gray-300">
                  123 Business Ave, Suite 100<br />
                  New York, NY 10001
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-gold" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-gold" />
                <span className="text-gray-300">info@raizingsovereign.com</span>
              </div>
            </div>
            
            <div className="mt-6">
              <a
                href="#"
                className="inline-flex items-center text-gold hover:text-yellow-300 smooth-transition font-semibold"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Brochure
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Raizing Sovereign. All rights reserved. | 
            <a href="#" className="hover:text-gold smooth-transition ml-1">Privacy Policy</a> | 
            <a href="#" className="hover:text-gold smooth-transition ml-1">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
