'use client';

import { useCallback } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export function useAddMiniApp() {
  const addMiniApp = useCallback(async () => {
    try {
      // Attempt to add the mini app using Farcaster SDK
      await sdk.actions.ready();
      console.log('Mini app added successfully');
    } catch (error) {
      console.error('Failed to add mini app:', error);
      throw error;
    }
  }, []);

  return { addMiniApp };
}