"use client"

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-900/20" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-400">
                The Future is Here
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6"
            >
              The OS for{' '}
              <span className="gradient-text">Your Life</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl lg:text-2xl text-foreground/80 mb-8 max-w-2xl"
            >
              Own your identity, enhance yourself, earn with AI
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button 
                variant="gradient" 
                size="xl" 
                className="group animate-glow"
              >
                Get Early Access
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                className="glass-morphism hover:bg-white/10"
              >
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - AI Avatar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glowing orb effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-full blur-3xl animate-pulse" />
              
              {/* AI Avatar silhouette */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full animate-float" />
                <div className="absolute inset-4 border-2 border-blue-500/30 rounded-full animate-pulse" />
                <div className="absolute inset-8 border border-purple-500/30 rounded-full animate-pulse delay-500" />
                
                {/* Neural network lines */}
                <div className="absolute inset-0 opacity-30">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-px bg-gradient-to-b from-transparent via-blue-400 to-transparent animate-pulse"
                      style={{
                        left: `${20 + i * 10}%`,
                        height: '100%',
                        animationDelay: `${i * 200}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}