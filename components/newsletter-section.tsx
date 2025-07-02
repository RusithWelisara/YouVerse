"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
    toast.success('Successfully subscribed to early access!');
  };

  return (
    <section className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="glass-morphism border-2 border-blue-500/20">
            <CardContent className="p-8 lg:p-12 text-center">
              {!isSubmitted ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6"
                  >
                    <Mail className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    Get Early Access
                  </h2>
                  
                  <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
                    Be among the first to experience the future of personal AI. 
                    Join our exclusive early access program and shape the future of YouVerse.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email || ''}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1"
                      disabled={isLoading}
                    />
                    <Button 
                      type="submit" 
                      variant="gradient" 
                      size="lg"
                      disabled={isLoading}
                      className="sm:w-auto"
                    >
                      {isLoading ? 'Joining...' : 'Join Waitlist'}
                    </Button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    Welcome to the Future!
                  </h2>
                  
                  <p className="text-lg text-foreground/80">
                    You're now on the early access list. We'll notify you as soon as YouVerse is ready.
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}