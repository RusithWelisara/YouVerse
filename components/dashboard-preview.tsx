"use client"

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Activity, TrendingUp } from 'lucide-react';

export function DashboardPreview() {
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
            Welcome, <span className="gradient-text">Alex</span>
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Your personalized AI dashboard - track your digital identity, 
            monitor earnings, and manage your AI clone.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Digital ID Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="text-xl">Digital ID</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16 ring-2 ring-blue-500/50">
                    <AvatarImage src="/image.png" alt="Alex Parker" />
                    <AvatarFallback>AP</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">Alex Parker</h3>
                    <p className="text-sm text-muted-foreground">
                      thisisparker@gmail.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Clone Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="text-xl">AI Clone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                    Still
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    Productizing
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Lives</span>
                    <span className="font-mono">925d</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Status</span>
                    <span className="text-green-400">Finest</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Earnings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="glass-morphism">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-green-400" />
                  Earnings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-green-400">
                  $12.80
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4 mr-1 text-green-400" />
                  <span>View more</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}