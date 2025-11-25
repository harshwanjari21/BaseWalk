import { NextRequest, NextResponse } from 'next/server';
import { FITBIT_CONFIG } from '@/lib/fitbit-config';
import { decrypt } from '@/lib/crypto-utils';
import { prisma } from '@/lib/prisma';

async function refreshTokenIfNeeded(userId: string, user: any): Promise<string> {
  // Check if token is expired or will expire in next 5 minutes
  const now = new Date();
  const expiresAt = user.tokenExpiresAt ? new Date(user.tokenExpiresAt) : null;
  
  if (!expiresAt || expiresAt.getTime() - now.getTime() < 5 * 60 * 1000) {
    // Token expired or expiring soon, refresh it
    const refreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/fitbit/refresh-token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      }
    );

    if (!refreshResponse.ok) {
      throw new Error('Failed to refresh token');
    }

    // Get updated user data
    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!updatedUser || !updatedUser.accessToken) {
      throw new Error('Failed to get updated access token');
    }

    return decrypt(updatedUser.accessToken);
  }

  return decrypt(user.accessToken);
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const date = searchParams.get('date') || 'today';

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.accessToken) {
      return NextResponse.json(
        { error: 'User not found or not connected to Fitbit' },
        { status: 404 }
      );
    }

    // Get valid access token (refresh if needed)
    const accessToken = await refreshTokenIfNeeded(userId, user);

    // Fetch steps data from Fitbit API
    const stepsResponse = await fetch(
      `${FITBIT_CONFIG.apiBaseUrl}/1/user/-/activities/steps/date/${date}/1d.json`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!stepsResponse.ok) {
      const errorData = await stepsResponse.text();
      console.error('Failed to fetch steps:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch steps data from Fitbit' },
        { status: 500 }
      );
    }

    const stepsData = await stepsResponse.json();
    const steps = stepsData['activities-steps']?.[0]?.value || '0';
    const stepDate = stepsData['activities-steps']?.[0]?.dateTime || date;

    // Store steps data in database
    await prisma.stepsData.upsert({
      where: {
        userId_date: {
          userId: userId,
          date: new Date(stepDate),
        },
      },
      update: {
        steps: parseInt(steps, 10),
        syncedAt: new Date(),
      },
      create: {
        userId: userId,
        steps: parseInt(steps, 10),
        date: new Date(stepDate),
        syncedAt: new Date(),
      },
    });

    return NextResponse.json({
      steps: parseInt(steps, 10),
      date: stepDate,
      syncedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching steps:', error);
    return NextResponse.json(
      { error: 'Failed to fetch steps data' },
      { status: 500 }
    );
  }
}