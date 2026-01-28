import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';

interface UseAuthGateReturn {
  showAuthOverlay: boolean;
  authMessage: string | null;
  openAuthOverlay: (message?: string) => void;
  closeAuthOverlay: () => void;
  requireAuth: (action: string, callback: () => void) => void;
  checkFirstVisit: () => boolean;
}

export function useAuthGate(): UseAuthGateReturn {
  const { isAuthenticated, loading } = useAuth();
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);
  const [authMessage, setAuthMessage] = useState<string | null>(null);

  // Check if user skipped overlay recently
  const isSkipped = useCallback(() => {
    const skippedUntil = localStorage.getItem('authOverlaySkippedUntil');
    if (skippedUntil) {
      const skipTime = parseInt(skippedUntil, 10);
      if (Date.now() < skipTime) {
        return true;
      }
      // Clear expired skip
      localStorage.removeItem('authOverlaySkippedUntil');
    }
    return false;
  }, []);

  // Check if this is the first visit
  const checkFirstVisit = useCallback(() => {
    if (loading) return false;
    if (isAuthenticated) return false;
    if (isSkipped()) return false;
    
    const hasVisited = sessionStorage.getItem('hasVisitedLanding');
    if (!hasVisited) {
      sessionStorage.setItem('hasVisitedLanding', 'true');
      return true;
    }
    return false;
  }, [isAuthenticated, loading, isSkipped]);

  // Open auth overlay with optional message
  const openAuthOverlay = useCallback((message?: string) => {
    setAuthMessage(message || null);
    setShowAuthOverlay(true);
  }, []);

  // Close auth overlay
  const closeAuthOverlay = useCallback(() => {
    setShowAuthOverlay(false);
    setAuthMessage(null);
  }, []);

  // Require auth for an action
  const requireAuth = useCallback((action: string, callback: () => void) => {
    if (isAuthenticated) {
      callback();
    } else {
      openAuthOverlay(`Sign in to ${action} and enjoy a personalized experience`);
    }
  }, [isAuthenticated, openAuthOverlay]);

  return {
    showAuthOverlay,
    authMessage,
    openAuthOverlay,
    closeAuthOverlay,
    requireAuth,
    checkFirstVisit,
  };
}
