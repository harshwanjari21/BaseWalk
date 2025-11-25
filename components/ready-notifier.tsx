// Component to notify parent that mini-app is ready
'use client';

import { useEffect } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export function ReadyNotifier() {
  useEffect(() => {
    const notifyReady = async () => {
      try {
        await sdk.actions.ready();
      } catch (error) {
        console.error('Failed to notify ready state:', error);
      }
    };

    notifyReady();
  }, []);

  return null;
}