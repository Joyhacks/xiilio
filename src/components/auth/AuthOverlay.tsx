import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignInForm } from './SignInForm';
import { SignUpWizard } from './SignUpWizard';
import { useAuth } from '@/hooks/useAuth';
import logo from '@/assets/logo-24twelve-transparent.png';

interface AuthOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  defaultTab?: 'signin' | 'signup';
}

export function AuthOverlay({ isOpen, onClose, message, defaultTab = 'signin' }: AuthOverlayProps) {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [showSignUpWizard, setShowSignUpWizard] = useState(false);

  // Close on successful auth
  useEffect(() => {
    if (isAuthenticated && isOpen) {
      onClose();
    }
  }, [isAuthenticated, isOpen, onClose]);

  // Handle ESC key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  // Reset state when closing
  useEffect(() => {
    if (!isOpen) {
      setShowSignUpWizard(false);
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  const handleSkip = () => {
    // Store skip timestamp (24 hours)
    const skipUntil = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem('authOverlaySkippedUntil', skipUntil.toString());
    onClose();
  };

  const handleForgotPassword = () => {
    // For now, show a toast - implement password reset flow later
    console.log('Forgot password clicked');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-overlay-title"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
          onClick={handleSkip}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-border/50 bg-card/95 backdrop-blur-xl shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <img src={logo} alt="24Twelve" className="h-10 mx-auto mb-4" />
              
              {message && (
                <div className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm text-foreground flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    {message}
                  </p>
                </div>
              )}
            </div>

            {/* Content */}
            {showSignUpWizard ? (
              <SignUpWizard
                onSuccess={onClose}
                onBack={() => setShowSignUpWizard(false)}
              />
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Create Account</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <SignInForm
                    onSuccess={onClose}
                    onForgotPassword={handleForgotPassword}
                  />
                </TabsContent>

                <TabsContent value="signup">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-foreground">Get Started</h2>
                      <p className="text-muted-foreground mt-1">
                        Create your account to unlock personalized AI agents
                      </p>
                    </div>

                    <div className="space-y-4">
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={() => setShowSignUpWizard(true)}
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Start Setup Wizard
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        Takes about 2 minutes • Personalize your experience
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}

            {/* Skip button */}
            {!showSignUpWizard && (
              <div className="mt-6 pt-6 border-t border-border text-center">
                <button
                  onClick={handleSkip}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Skip for now
                </button>
                <p className="text-xs text-muted-foreground mt-1">
                  You can sign up later to save your preferences
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
