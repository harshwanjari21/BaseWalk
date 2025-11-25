import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        stepsData: {
          orderBy: { date: 'desc' },
          take: 1,
        },
      },
    });

    if (!user) {
      return NextResponse.json({
        connected: false,
        steps: null,
        lastSync: null,
      });
    }

    const isConnected = !!(user.accessToken && user.fitbitUserId);
    const latestSteps = user.stepsData[0];

    return NextResponse.json({
      connected: isConnected,
      steps: latestSteps?.steps || null,
      lastSync: latestSteps?.syncedAt || null,
      date: latestSteps?.date || null,
    });
  } catch (error) {
    console.error('Error fetching status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch status' },
      { status: 500 }
    );
  }
}