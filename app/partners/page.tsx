"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/header';
import { 
  Building2, 
  Users, 
  Zap, 
  Calendar,
  Download,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

const partnerBenefits = [
  {
    icon: Zap,
    title: 'Advanced AI Integration',
    description: 'Access to cutting-edge AI models and APIs for seamless integration.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Priority Support',
    description: '24/7 dedicated support team for all your partnership needs.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security and compliance for enterprise deployments.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Expand your reach with our worldwide network of AI services.',
    gradient: 'from-orange-500 to-red-500',
  },
];

const partnerTiers = [
  {
    name: 'Startup',
    price: 'Free',
    description: 'Perfect for early-stage companies',
    features: [
      'Up to 1,000 AI interactions/month',
      'Basic API access',
      'Community support',
      'Standard documentation',
    ],
    popular: false,
  },
  {
    name: 'Growth',
    price: '$299/month',
    description: 'Ideal for growing businesses',
    features: [
      'Up to 50,000 AI interactions/month',
      'Advanced API access',
      'Priority support',
      'Custom integrations',
      'Analytics dashboard',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large-scale deployments',
    features: [
      'Unlimited AI interactions',
      'Full API access',
      'Dedicated support team',
      'Custom AI models',
      'White-label solutions',
      'SLA guarantees',
    ],
    popular: false,
  },
];

export default function PartnersPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    tier: 'Growth',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success('Partnership application submitted successfully!');
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      companyName: '',
      email: '',
      phone: '',
      tier: 'Growth',
      message: '',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Partner with <span className="gradient-text">YouVerse</span>
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto mb-8">
            Join our ecosystem of innovative companies building the future of AI-powered 
            digital identities. Unlock new revenue streams and enhance your products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="group">
              Become a Partner
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="glass-morphism">
              <Download className="mr-2 h-5 w-5" />
              Download Partnership Guide
            </Button>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Partnership Benefits
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Discover the advantages of partnering with YouVerse and how we can 
              help accelerate your business growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerBenefits?.map((benefit, index) => (
              <motion.div
                key={benefit?.title || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full glass-morphism group hover:bg-white/5 transition-all duration-500">
                  <CardHeader className="text-center">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${benefit?.gradient || 'from-blue-500 to-cyan-500'} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {benefit?.icon && <benefit.icon className="h-8 w-8 text-white" />}
                    </div>
                    <CardTitle className="text-xl">{benefit?.title || 'Benefit'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-foreground/70">
                      {benefit?.description || ''}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Partnership Tiers
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Choose the partnership tier that best fits your business needs and scale.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {partnerTiers?.map((tier, index) => (
              <motion.div
                key={tier?.name || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {tier?.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <Card className={`h-full glass-morphism ${tier?.popular ? 'ring-2 ring-blue-500/50' : ''}`}>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{tier?.name || 'Tier'}</CardTitle>
                    <div className="text-3xl font-bold gradient-text">{tier?.price || 'Custom'}</div>
                    <CardDescription>{tier?.description || ''}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {tier?.features?.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                          <span className="text-sm">{feature || ''}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant={tier?.popular ? "gradient" : "outline"} 
                      className="w-full mt-6"
                    >
                      {tier?.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="glass-morphism">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-2">Apply for Partnership</CardTitle>
              <CardDescription className="text-lg">
                Ready to join the YouVerse ecosystem? Fill out the form below and our 
                partnership team will get back to you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Company Name *
                    </label>
                    <Input
                      required
                      value={formData?.companyName || ''}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Enter your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Business Email *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData?.email || ''}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your business email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={formData?.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Preferred Tier
                    </label>
                    <select
                      value={formData?.tier || 'Growth'}
                      onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                      className="w-full h-10 px-3 py-2 bg-background/50 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {partnerTiers?.map((tier) => (
                        <option key={tier?.name} value={tier?.name || 'Growth'}>
                          {tier?.name || 'Tier'} - {tier?.price || 'Custom'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tell us about your project
                  </label>
                  <textarea
                    value={formData?.message || ''}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, goals, and how you plan to integrate with YouVerse..."
                    rows={4}
                    className="w-full px-3 py-2 bg-background/50 border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>

                <div className="flex justify-center">
                  <Button 
                    type="submit" 
                    variant="gradient" 
                    size="xl"
                    disabled={isSubmitting}
                    className="min-w-[200px]"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}