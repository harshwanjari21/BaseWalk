'use client';

import { useEffect, useState } from 'react';

export function useIsInFarcaster(): boolean {
  const [isInFarcaster, setIsInFarcaster] = useState(false);

  useEffect(() => {
    // Check if we're running inside Farcaster
    const checkFarcasterEnvironment = () => {
      try {
        // Check for Farcaster-specific environment variables or user agent
        const userAgent = navigator.userAgent;
        const isFarcasterWebView = userAgent.includes('Farcaster') || 
                                   window.location.hostname.includes('warpcast') ||
                                   window.location.hostname.includes('farcaster');
        
        setIsInFarcaster(isFarcasterWebView);
      } catch (error) {
        console.error('Error checking Farcaster environment:', error);
        setIsInFarcaster(false);
      }
    };

    checkFarcasterEnvironment();
  }, []);

  return isInFarcaster;
}