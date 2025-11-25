// Hook to check if running inside Farcaster
'use client';

import { useState, useEffect } from 'react';

export function useIsInFarcaster(): boolean {
  const [isInFarcaster, setIsInFarcaster] = useState(false);

  useEffect(() => {
    // Check if running inside Farcaster frame/mini-app
    const checkFarcasterEnvironment = () => {
      // This would check for Farcaster-specific window properties or user agent
      const userAgent = navigator.userAgent.toLowerCase();
      const isFarcaster = userAgent.includes('farcaster') || 
                         window.parent !== window || 
                         !!window.postMessage;
      
      setIsInFarcaster(isFarcaster);
    };

    checkFarcasterEnvironment();
  }, []);

  return isInFarcaster;
}