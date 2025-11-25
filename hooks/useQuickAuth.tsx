'use client';

import { useEffect, useState } from 'react';

export function useQuickAuth(isInFarcaster: boolean) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isInFarcaster) {
      // Implement quick auth logic when in Farcaster
      setIsAuthenticated(true);
    }
  }, [isInFarcaster]);

  return { isAuthenticated };
}