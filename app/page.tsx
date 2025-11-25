'use client'
import { useEffect, useState } from 'react';
import { FitbitConnectButton } from '@/components/fitbit-connect-button';
import { StepsDisplay } from '@/components/steps-display';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CheckCircle, XCircle } from 'lucide-react';

// Global variables for SDK
declare global {
  interface Window {
    farcasterSdk: any;
    userFid: number | null;
    userInfo: any;
    isFarcasterUser: boolean;
    isSessionOnly: boolean;
  }
}

export default function HomePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState<string>('');
    const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'connected' | 'disconnected'>('unknown');
    const [userInfo, setUserInfo] = useState<any>(null);

    useEffect(() => {
        const initializeFarcaster = async () => {
            console.log('Initializing Farcaster Mini App SDK:', new Date());
            try {
                // Wait for SDK to be available
                let attempts = 0;
                while (!window.farcasterSdk && attempts < 50) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                    attempts++;
                }
                
                if (window.farcasterSdk) {
                    // Initialize the SDK and call ready
                    await window.farcasterSdk.actions.ready({ disableNativeGestures: true });
                    console.log('Farcaster SDK ready() called successfully');
                    
                    // Hide splash screen after SDK is ready
                    const splash = document.getElementById('splash-screen');
                    if (splash) {
                        splash.style.display = 'none';
                    }
                    
                    // Get user context
                    const context = await window.farcasterSdk.context;
                    
                    // Enhanced FID extraction with better error handling
                    let userFid = null;
                    let userData = null;
                    
                    try {
                        if (context && context.user && context.user.fid) {
                            const fidValue = context.user.fid;
                            
                            // Convert FID to number first, then to string for consistency
                            if (typeof fidValue === 'number') {
                                userFid = fidValue;
                            } else if (typeof fidValue === 'string' && !isNaN(parseInt(fidValue))) {
                                userFid = parseInt(fidValue);
                            } else if (fidValue && typeof fidValue === 'object') {
                                // Handle Proxy objects
                                const numValue = Number(fidValue);
                                if (!isNaN(numValue) && numValue > 0) {
                                    userFid = numValue;
                                }
                            }
                            
                            // Store user info for display
                            userData = {
                                fid: userFid,
                                username: context.user.username || 'Anonymous',
                                displayName: context.user.displayName || 'User',
                                pfpUrl: context.user.pfpUrl || null
                            };
                        }
                    } catch (conversionError) {
                        console.warn('Error extracting user FID:', conversionError);
                    }
                    
                    // Store globally for other components
                    window.userFid = userFid;
                    window.userInfo = userData;
                    
                    // Set user type
                    if (userFid && userFid > 0) {
                        window.isFarcasterUser = true;
                        window.isSessionOnly = false;
                        console.log('Authenticated Farcaster User FID:', userFid);
                        console.log('User Info:', userData);
                    } else {
                        window.isFarcasterUser = false;
                        window.isSessionOnly = true;
                        console.log('Running in Farcaster but no valid user - session only mode');
                    }
                    
                    // Set local state
                    setUserInfo(userData);
                    setUserId(userFid ? `farcaster_${userFid}` : `guest_${Date.now()}`);
                    
                } else {
                    console.warn('Farcaster SDK not available - running in demo mode for non-Farcaster users');
                    window.userFid = null;
                    window.userInfo = null;
                    window.isFarcasterUser = false;
                    window.isSessionOnly = true;
                    
                    // Hide splash screen even if SDK not available
                    const splash = document.getElementById('splash-screen');
                    if (splash) {
                        splash.style.display = 'none';
                    }
                    
                    // Fallback for non-Farcaster environment
                    setUserId(`guest_${Date.now()}`);
                }
                
            } catch (error) {
                console.error('Farcaster SDK initialization error:', error);
                window.userFid = null;
                window.userInfo = null;
                window.isFarcasterUser = false;
                window.isSessionOnly = true;
                
                // Hide splash screen on error
                const splash = document.getElementById('splash-screen');
                if (splash) {
                    splash.style.display = 'none';
                }
                
                // Fallback for errors
                setUserId(`guest_${Date.now()}`);
            } finally {
                setIsLoading(false);
            }
        };

        initializeFarcaster();
    }, []);

    useEffect(() => {
        if (userId) {
            checkConnectionStatus();
        }
    }, [userId]);

    const checkConnectionStatus = async () => {
        try {
            const response = await fetch(`/api/fitbit/status?userId=${userId}`);
            if (response.ok) {
                const data = await response.json();
                setConnectionStatus(data.connected ? 'connected' : 'disconnected');
            }
        } catch (error) {
            console.error('Error checking connection status:', error);
            setConnectionStatus('disconnected');
        }
    };

    const handleConnectionUpdate = () => {
        checkConnectionStatus();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading BaseWalk...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <header className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Activity className="h-8 w-8 text-blue-600" />
                        <h1 className="text-3xl font-bold text-gray-900">
                            BaseWalk
                            {userInfo && (
                                <span className="text-lg font-normal text-gray-600 block">
                                    Welcome, {userInfo.displayName}!
                                </span>
                            )}
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        Connect your Fitbit to track daily steps in Farcaster
                    </p>
                </header>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Connection Status Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                {connectionStatus === 'connected' ? (
                                    <>
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span>Fitbit Connected</span>
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="h-5 w-5 text-red-500" />
                                        <span>Connect Your Fitbit</span>
                                    </>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {connectionStatus === 'disconnected' && (
                                <div className="space-y-4">
                                    <p className="text-gray-600">
                                        Connect your Fitbit account to start tracking your daily steps
                                        and view your fitness progress in Farcaster.
                                    </p>
                                    <FitbitConnectButton
                                        userId={userId}
                                        onConnected={handleConnectionUpdate}
                                    />
                                </div>
                            )}
                            {connectionStatus === 'connected' && (
                                <div className="space-y-4">
                                    <p className="text-green-600">
                                        ✅ Your Fitbit is connected! Your steps sync automatically every 3 hours.
                                    </p>
                                    <FitbitConnectButton
                                        userId={userId}
                                        onConnected={handleConnectionUpdate}
                                    />
                                </div>
                            )}
                            {connectionStatus === 'unknown' && (
                                <div className="space-y-4">
                                    <div className="animate-pulse">
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* User Info Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Profile</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {userInfo ? (
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        {userInfo.pfpUrl && (
                                            <img
                                                src={userInfo.pfpUrl}
                                                alt="Profile"
                                                className="w-12 h-12 rounded-full"
                                            />
                                        )}
                                        <div>
                                            <p className="font-medium">{userInfo.displayName}</p>
                                            <p className="text-sm text-gray-500">@{userInfo.username}</p>
                                            <p className="text-xs text-blue-600">FID: {userInfo.fid}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-gray-500">
                                    <p>Guest User</p>
                                    <p className="text-xs">Running in demo mode</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Steps Display */}
                {connectionStatus === 'connected' && (
                    <div className="mt-8">
                        <StepsDisplay userId={userId} />
                    </div>
                )}

                {/* Features Info */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="text-center">
                                <div className="text-2xl mb-2">🔄</div>
                                <h3 className="font-medium">Auto Sync</h3>
                                <p className="text-sm text-gray-600">Steps sync every 3 hours automatically</p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl mb-2">📊</div>
                                <h3 className="font-medium">Daily Tracking</h3>
                                <p className="text-sm text-gray-600">View your daily step count and progress</p>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl mb-2">🔒</div>
                                <h3 className="font-medium">Secure</h3>
                                <p className="text-sm text-gray-600">Your data is encrypted and secure</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
