// Hook for Farcaster quick auth
'use client';

import { useEffect } from 'react';

export function useQuickAuth(isInFarcaster: boolean) {
  useEffect(() => {
    if (isInFarcaster) {
      // Implement quick auth logic here
      console.log('Quick auth for Farcaster user');
    }
  }, [isInFarcaster]);
}