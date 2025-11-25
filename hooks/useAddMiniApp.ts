// Hook for adding mini app to Farcaster
'use client';

import { useCallback } from 'react';

export function useAddMiniApp() {
  const addMiniApp = useCallback(async () => {
    try {
      // Add your mini app logic here
      console.log('Adding mini app to Farcaster');
      // This would integrate with Farcaster SDK to add the mini app
    } catch (error) {
      console.error('Failed to add mini app:', error);
      throw error;
    }
  }, []);

  return { addMiniApp };
}