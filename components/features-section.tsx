"use client"

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Shield, Coins, Users } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Identity',
    description: 'Create your digital twin with advanced AI that learns and evolves with you.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'Own Your Data',
    description: 'Complete control over your digital identity and personal information.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Coins,
    title: 'Earn with AI',
    description: 'Monetize your digital presence and AI interactions seamlessly.',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Users,
    title: 'Connect & Collaborate',
    description: 'Build meaningful connections in the digital metaverse.',
    gradient: 'from-green-500 to-emerald-500',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Revolutionize Your{' '}
            <span className="gradient-text">Digital Life</span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Experience the future of personal AI with features designed to enhance, 
            protect, and monetize your digital identity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full glass-morphism group hover:bg-white/5 transition-all duration-500">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl lg:text-2xl">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-foreground/70 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}