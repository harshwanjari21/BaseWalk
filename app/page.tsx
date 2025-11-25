'use client'
import { useEffect, useState } from 'react';
import { FitbitConnectButton } from '@/components/fitbit-connect-button';
import { StepsDisplay } from '@/components/steps-display';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CheckCircle, XCircle } from 'lucide-react';
import { sdk } from "@farcaster/miniapp-sdk";
import { useAddMiniApp } from "@/hooks/useAddMiniApp";
import { useQuickAuth } from "@/hooks/useQuickAuth";
import { useIsInFarcaster } from "@/hooks/useIsInFarcaster";

export default function HomePage() {
    const { addMiniApp } = useAddMiniApp();
    const isInFarcaster = useIsInFarcaster();
    useQuickAuth(isInFarcaster);
    useEffect(() => {
      const tryAddMiniApp = async () => {
        try {
          await addMiniApp()
        } catch (error) {
          console.error('Failed to add mini app:', error)
        }

      }

    

      tryAddMiniApp()
    }, [addMiniApp])
    useEffect(() => {
      const initializeFarcaster = async () => {
        try {
          await new Promise(resolve => setTimeout(resolve, 100))
          
          if (document.readyState !== 'complete') {
            await new Promise<void>(resolve => {
              if (document.readyState === 'complete') {
                resolve()
              } else {
                window.addEventListener('load', () => resolve(), { once: true })
              }

            })
          }

    

          await sdk.actions.ready()
          console.log('Farcaster SDK initialized successfully - app fully loaded')
        } catch (error) {
          console.error('Failed to initialize Farcaster SDK:', error)
          
          setTimeout(async () => {
            try {
              await sdk.actions.ready()
              console.log('Farcaster SDK initialized on retry')
            } catch (retryError) {
              console.error('Farcaster SDK retry failed:', retryError)
            }

          }, 1000)
        }

      }

    

      initializeFarcaster()
    }, [])
  const [userId, setUserId] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [connectionMessage, setConnectionMessage] = useState<string>('');

  useEffect(() => {
    // Generate or retrieve user ID (in production, this would come from Farcaster auth)
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      const newUserId = `user_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      localStorage.setItem('userId', newUserId);
      setUserId(newUserId);
    }

    // Check for connection status from URL params
    const params = new URLSearchParams(window.location.search);
    if (params.get('connected') === 'true') {
      setConnectionMessage('Successfully connected to Fitbit!');
      // Clean up URL
      window.history.replaceState({}, '', '/');
    } else if (params.get('error')) {
      setConnectionMessage(`Connection failed: ${params.get('error')}`);
      window.history.replaceState({}, '', '/');
    }
  }, []);

  useEffect(() => {
    const checkConnection = async (): Promise<void> => {
      if (!userId) return;

      try {
        const response = await fetch(`/api/fitbit/status?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setIsConnected(data.connected);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkConnection();
  }, [userId]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16 pb-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Activity className="h-16 w-16 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Fitbit Steps Tracker
          </h1>
          <p className="text-lg text-gray-600">
            Track your daily steps from your Fitbit device
          </p>
        </div>

        {/* Connection Status Message */}
        {connectionMessage && (
          <Card className="max-w-md mx-auto border-2">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                {connectionMessage.includes('Success') ? (
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                )}
                <p className="text-sm">{connectionMessage}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-8">
            {!isConnected ? (
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Get Started</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600">
                    Connect your Fitbit account to start tracking your daily
                    steps. Your data will automatically sync every 3 hours.
                  </p>
                  <FitbitConnectButton
                    userId={userId}
                    onConnected={() => setIsConnected(true)}
                  />
                </CardContent>
              </Card>
            ) : (
              <StepsDisplay userId={userId} />
            )}

            {/* Info Card */}
            <Card className="w-full max-w-md bg-blue-50 border-blue-200">
              <CardContent className="pt-6 space-y-3">
                <h3 className="font-semibold text-gray-900">Features:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Secure OAuth 2.0 authentication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Automatic sync every 3 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Manual sync button for instant updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>Encrypted token storage</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
