"use client"

import Link from 'next/link';
import { Zap, Twitter, Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    Product: [
      { name: 'Features', href: '#features' },
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Onboarding', href: '/onboard' },
      { name: 'Partners', href: '/partners' },
    ],
    Company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
    Resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Help Center', href: '/help' },
      { name: 'Community', href: '/community' },
      { name: 'API', href: '/api' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/youverse', label: 'Twitter' },
    { icon: Github, href: 'https://github.com/youverse', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/company/youverse', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@youverse.com', label: 'Email' },
  ];

  return (
    <footer className="border-t border-white/10 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Zap className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold gradient-text">YouVerse</span>
            </Link>
            <p className="text-foreground/70 mb-6 max-w-sm">
              The OS for your life. Own your identity, enhance yourself, and earn with AI.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg glass-morphism hover:bg-white/10 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-foreground/70 hover:text-foreground transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-sm">
            © 2024 YouVerse. All rights reserved.
          </p>
          <p className="text-foreground/60 text-sm mt-4 md:mt-0">
            Built with ❤️ for the future of AI
          </p>
        </div>
      </div>
    </footer>
  );
}