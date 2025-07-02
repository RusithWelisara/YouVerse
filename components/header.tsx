"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/onboard', label: 'Onboarding' },
    { href: '/partners', label: 'Partners' },
    { href: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-morphism shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Zap className="h-8 w-8 text-blue-500 group-hover:text-blue-400 transition-colors duration-300" />
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg group-hover:bg-blue-400/30 transition-all duration-300" />
            </div>
            <span className="text-xl lg:text-2xl font-bold gradient-text">
              YouVerse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/80 hover:text-foreground transition-colors duration-300 font-medium relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button variant="gradient" size="lg" className="animate-glow">
              Get Early Access
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg glass-morphism"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-morphism border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-foreground/80 hover:text-foreground transition-colors duration-300 font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button variant="gradient" size="lg" className="mt-4">
                  Get Early Access
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}