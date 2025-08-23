'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon, 
  UserIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Book Now', href: '/booking', isCTA: true },
  ];

  const contactInfo = [
    { icon: PhoneIcon, text: '+234 801 234 5678', href: 'tel:+2348012345678' },
    { icon: EnvelopeIcon, text: 'info@engraced.com', href: 'mailto:info@engraced.com' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-medium' 
        : 'bg-transparent'
    }`}>
      {/* Top Bar */}
      <div className={`hidden lg:block transition-all duration-300 ${
        isScrolled ? 'h-0 overflow-hidden' : 'h-12 bg-primary-900'
      }`}>
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between text-white text-sm">
          <div className="flex items-center space-x-6">
            {contactInfo.map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                className="flex items-center space-x-2 hover:text-primary-200 transition-colors"
              >
                <contact.icon className="h-4 w-4" />
                <span>{contact.text}</span>
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <span>24/7 Support Available</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">E</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className={`font-bold text-xl transition-colors duration-300 ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}>
                    Engraced
                  </h1>
                  <p className={`text-xs transition-colors duration-300 ${
                    isScrolled ? 'text-gray-600' : 'text-primary-200'
                  }`}>
                    Smile Logistics
                  </p>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      item.isCTA
                        ? 'bg-primary-600 text-white rounded-lg hover:bg-primary-700'
                        : isScrolled
                        ? 'text-gray-700 hover:text-primary-600'
                        : 'text-white hover:text-primary-200'
                    }`}
                  >
                    {item.name}
                    {!item.isCTA && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* User Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                  isScrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <UserIcon className="h-6 w-6" />
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isScrolled
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {isOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white shadow-large"
            >
              <div className="px-4 py-6 space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 text-base font-medium rounded-lg transition-all duration-300 ${
                      item.isCTA
                        ? 'bg-primary-600 text-white hover:bg-primary-700'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Contact Info */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  {contactInfo.map((contact, index) => (
                    <a
                      key={index}
                      href={contact.href}
                      className="flex items-center space-x-3 text-gray-600 hover:text-primary-600 transition-colors"
                    >
                      <contact.icon className="h-5 w-5" />
                      <span className="text-sm">{contact.text}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
