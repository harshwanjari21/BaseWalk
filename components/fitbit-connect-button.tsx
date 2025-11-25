'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface FitbitConnectButtonProps {
  userId: string;
  onConnected?: () => void;
}

export function FitbitConnectButton({
  userId,
  onConnected,
}: FitbitConnectButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleConnect = async (): Promise<void> => {
    try {
      setIsLoading(true);

      // Get authorization URL from backend
      const response = await fetch(`/api/fitbit/auth?userId=${userId}`);
      const data = await response.json();

      if (!response.ok || !data.authUrl) {
        throw new Error('Failed to get authorization URL');
      }

      // Redirect to Fitbit authorization page
      window.location.href = data.authUrl;
    } catch (error) {
      console.error('Error connecting to Fitbit:', error);
      alert('Failed to connect to Fitbit. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleConnect}
      disabled={isLoading}
      size="lg"
      className="w-full max-w-md"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Connecting...
        </>
      ) : (
        'Connect Your Fitbit'
      )}
    </Button>
  );
}