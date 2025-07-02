"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Header } from '@/components/header';
import { ArrowLeft, ArrowRight, User, Camera, Mic, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const steps = [
  {
    id: 1,
    title: 'Personal Information',
    description: 'Tell us about yourself',
    icon: User,
  },
  {
    id: 2,
    title: 'Avatar Customization',
    description: 'Create your digital identity',
    icon: Camera,
  },
  {
    id: 3,
    title: 'Voice & Personality',
    description: 'Define your AI characteristics',
    icon: Mic,
  },
  {
    id: 4,
    title: 'Complete Setup',
    description: 'Finalize your YouVerse profile',
    icon: CheckCircle,
  },
];

const avatarPresets = [
  { id: 1, name: 'Professional', image: '/image.png' },
  { id: 2, name: 'Casual', image: '/image.png' },
  { id: 3, name: 'Creative', image: '/image.png' },
  { id: 4, name: 'Futuristic', image: '/image.png' },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    avatar: 1,
    voiceType: 'natural',
    personality: 'friendly',
  });
  const [isLoading, setIsLoading] = useState(false);

  const progress = (currentStep / steps.length) * 100;
  const currentStepData = steps?.find(step => step?.id === currentStep);

  const handleNext = async () => {
    if (currentStep < steps.length) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setCurrentStep(currentStep + 1);
      setIsLoading(false);
    } else {
      // Complete onboarding
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Welcome to YouVerse! Your AI clone is being created.');
      setIsLoading(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <Input
                  value={formData?.firstName || ''}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <Input
                  value={formData?.lastName || ''}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <Input
                type="email"
                value={formData?.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email address"
              />
            </div>
          </div>
        );

      case 2:
        const selectedAvatar = avatarPresets?.find(a => a?.id === formData?.avatar);
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Avatar className="h-32 w-32 mx-auto mb-4 ring-4 ring-blue-500/50">
                <AvatarImage src={selectedAvatar?.image || '/image.png'} />
                <AvatarFallback>
                  {(formData?.firstName?.[0] || '') + (formData?.lastName?.[0] || '')}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">Choose Your Avatar Style</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {avatarPresets?.map((preset) => (
                <button
                  key={preset?.id}
                  onClick={() => setFormData({ ...formData, avatar: preset?.id || 1 })}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                    formData?.avatar === preset?.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <Avatar className="h-16 w-16 mx-auto mb-2">
                    <AvatarImage src={preset?.image || '/image.png'} />
                    <AvatarFallback>{preset?.name?.[0] || 'A'}</AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium">{preset?.name || 'Avatar'}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-4">Voice Type</label>
              <div className="grid md:grid-cols-3 gap-4">
                {['natural', 'professional', 'energetic'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFormData({ ...formData, voiceType: type })}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 capitalize ${
                      formData?.voiceType === type
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-4">Personality</label>
              <div className="grid md:grid-cols-3 gap-4">
                {['friendly', 'professional', 'creative'].map((personality) => (
                  <button
                    key={personality}
                    onClick={() => setFormData({ ...formData, personality })}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 capitalize ${
                      formData?.personality === personality
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    {personality}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold">Almost Ready!</h3>
            <p className="text-foreground/80 max-w-md mx-auto">
              Your AI clone is being created with your preferences. This may take a few moments.
            </p>
            <div className="bg-card/50 rounded-xl p-6 max-w-md mx-auto">
              <h4 className="font-semibold mb-4">Your Profile Summary</h4>
              <div className="space-y-2 text-sm text-left">
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span>{(formData?.firstName || '') + ' ' + (formData?.lastName || '')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span>{formData?.email || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Voice:</span>
                  <span className="capitalize">{formData?.voiceType || 'natural'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Personality:</span>
                  <span className="capitalize">{formData?.personality || 'friendly'}</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl lg:text-4xl font-bold">
                Welcome to <span className="gradient-text">YouVerse</span>
              </h1>
              <div className="text-sm text-foreground/60">
                Step {currentStep} of {steps?.length || 4}
              </div>
            </div>
            
            <Progress value={progress} className="h-2 mb-6" />
            
            <div className="grid grid-cols-4 gap-4">
              {steps?.map((step) => (
                <div
                  key={step?.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                    step?.id === currentStep
                      ? 'bg-blue-500/20 border border-blue-500/30'
                      : (step?.id || 0) < currentStep
                      ? 'bg-green-500/20 border border-green-500/30'
                      : 'bg-card/50 border border-white/10'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    step?.id === currentStep
                      ? 'bg-blue-500'
                      : (step?.id || 0) < currentStep
                      ? 'bg-green-500'
                      : 'bg-muted'
                  }`}>
                    {step?.icon && <step.icon className="h-4 w-4 text-white" />}
                  </div>
                  <div className="hidden md:block">
                    <p className="font-medium text-sm">{step?.title || 'Step'}</p>
                    <p className="text-xs text-foreground/60">{step?.description || ''}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle className="text-2xl">
                {currentStepData?.title || 'Loading...'}
              </CardTitle>
              <CardDescription className="text-lg">
                {currentStepData?.description || ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="glass-morphism"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <Button
                  variant="gradient"
                  onClick={handleNext}
                  disabled={isLoading}
                  className="min-w-[120px]"
                >
                  {isLoading ? (
                    'Processing...'
                  ) : currentStep === steps.length ? (
                    'Complete Setup'
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}