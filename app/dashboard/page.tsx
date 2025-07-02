"use client"

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Header } from '@/components/header';
import { 
  DollarSign, 
  Activity, 
  TrendingUp, 
  Users, 
  Brain, 
  Zap,
  Calendar,
  Settings,
  Bell
} from 'lucide-react';

// Dynamically import chart components to prevent hydration issues
const LineChart = dynamic(() => import('recharts').then((mod) => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then((mod) => mod.Line), { ssr: false });
const XAxis = dynamic(() => import('recharts').then((mod) => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then((mod) => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then((mod) => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then((mod) => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then((mod) => mod.ResponsiveContainer), { ssr: false });
const AreaChart = dynamic(() => import('recharts').then((mod) => mod.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then((mod) => mod.Area), { ssr: false });

const earningsData = [
  { name: 'Jan', value: 4.20 },
  { name: 'Feb', value: 6.80 },
  { name: 'Mar', value: 8.50 },
  { name: 'Apr', value: 12.80 },
];

const activityData = [
  { name: 'Mon', interactions: 24, earnings: 2.40 },
  { name: 'Tue', interactions: 32, earnings: 3.20 },
  { name: 'Wed', interactions: 28, earnings: 2.80 },
  { name: 'Thu', interactions: 45, earnings: 4.50 },
  { name: 'Fri', interactions: 38, earnings: 3.80 },
  { name: 'Sat', interactions: 52, earnings: 5.20 },
  { name: 'Sun', interactions: 41, earnings: 4.10 },
];

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Loading state while client-side hydration occurs
  if (!isClient || !currentTime) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                Welcome back, <span className="gradient-text">Alex</span>
              </h1>
              <p className="text-foreground/70">
                {currentTime?.toLocaleDateString?.('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                }) || 'Loading...'}
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <Button variant="outline" size="sm" className="glass-morphism">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm" className="glass-morphism">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-morphism">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <DollarSign className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">$12.80</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-morphism">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Interactions</CardTitle>
                <Brain className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">
                  <Activity className="inline h-3 w-3 mr-1" />
                  +15.3% from last week
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-morphism">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Days</CardTitle>
                <Calendar className="h-4 w-4 text-purple-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">925</div>
                <p className="text-xs text-muted-foreground">
                  Since joining YouVerse
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-morphism">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Clone Status</CardTitle>
                <Zap className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-400">Active</div>
                <p className="text-xs text-muted-foreground">
                  Productizing • Finest
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Earnings Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle>Earnings Overview</CardTitle>
                  <CardDescription>Your AI earnings over the past 4 months</CardDescription>
                </CardHeader>
                <CardContent>
                  {isClient && earningsData?.length > 0 && (
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={earningsData}>
                        <defs>
                          <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#3B82F6" 
                          fillOpacity={1} 
                          fill="url(#colorEarnings)" 
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Activity Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                  <CardDescription>AI interactions and earnings this week</CardDescription>
                </CardHeader>
                <CardContent>
                  {isClient && activityData?.length > 0 && (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={activityData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1F2937', 
                            border: '1px solid #374151',
                            borderRadius: '8px'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="interactions" 
                          stroke="#8B5CF6" 
                          strokeWidth={2}
                          dot={{ fill: '#8B5CF6' }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="earnings" 
                          stroke="#10B981" 
                          strokeWidth={2}
                          dot={{ fill: '#10B981' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Digital ID */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle>Digital ID</CardTitle>
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
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Profile Completion</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* AI Clone Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle>AI Clone Status</CardTitle>
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
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Lives</span>
                      <span className="font-mono">925d</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Status</span>
                      <span className="text-green-400">Finest</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Learning Progress</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <Button variant="outline" className="w-full glass-morphism">
                    Customize Clone
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm">AI interaction completed</p>
                        <p className="text-xs text-muted-foreground">2 minutes ago</p>
                      </div>
                      <span className="text-xs text-green-400">+$0.15</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm">Profile updated</p>
                        <p className="text-xs text-muted-foreground">1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm">New milestone reached</p>
                        <p className="text-xs text-muted-foreground">3 hours ago</p>
                      </div>
                      <span className="text-xs text-green-400">+$2.50</span>
                    </div>
                  </div>
                  <Button variant="ghost" className="w-full text-sm">
                    View All Activity
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}