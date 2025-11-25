'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, Activity } from 'lucide-react';
import { format } from 'date-fns';

interface StepsDisplayProps {
  userId: string;
}

interface StepsData {
  steps: number | null;
  lastSync: string | null;
  date: string | null;
}

export function StepsDisplay({ userId }: StepsDisplayProps) {
  const [stepsData, setStepsData] = useState<StepsData>({
    steps: null,
    lastSync: null,
    date: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const fetchSteps = async (): Promise<void> => {
    try {
      const response = await fetch(`/api/fitbit/steps?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setStepsData({
          steps: data.steps,
          lastSync: data.syncedAt,
          date: data.date,
        });
      }
    } catch (error) {
      console.error('Error fetching steps:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSync = async (): Promise<void> => {
    try {
      setIsSyncing(true);
      const response = await fetch('/api/fitbit/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const data = await response.json();
        setStepsData({
          steps: data.steps,
          lastSync: data.syncedAt,
          date: new Date().toISOString().split('T')[0],
        });
      } else {
        throw new Error('Sync failed');
      }
    } catch (error) {
      console.error('Error syncing:', error);
      alert('Failed to sync data. Please try again.');
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchSteps();

    // Auto-sync every 3 hours
    const syncInterval = setInterval(
      () => {
        fetchSteps();
      },
      3 * 60 * 60 * 1000
    ); // 3 hours in milliseconds

    return () => clearInterval(syncInterval);
  }, [userId]);

  if (isLoading) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Your Steps Today</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Your Steps Today
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
          <div className="text-6xl font-bold text-indigo-600">
            {stepsData.steps?.toLocaleString() || '0'}
          </div>
          <div className="text-sm text-gray-600 mt-2">steps</div>
        </div>

        {stepsData.lastSync && (
          <div className="text-sm text-gray-500 text-center">
            Last synced:{' '}
            {format(new Date(stepsData.lastSync), 'MMM d, yyyy h:mm a')}
          </div>
        )}

        <Button
          onClick={handleSync}
          disabled={isSyncing}
          variant="outline"
          className="w-full"
        >
          {isSyncing ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Syncing...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync Now
            </>
          )}
        </Button>

        <div className="text-xs text-center text-gray-500">
          Your data automatically syncs every 3 hours
        </div>
      </CardContent>
    </Card>
  );
}