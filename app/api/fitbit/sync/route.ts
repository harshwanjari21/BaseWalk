import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Trigger steps fetch which will store data in database
    const stepsResponse = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/fitbit/steps?userId=${userId}`,
      {
        method: 'GET',
      }
    );

    if (!stepsResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to sync steps data' },
        { status: 500 }
      );
    }

    const stepsData = await stepsResponse.json();

    return NextResponse.json({
      success: true,
      steps: stepsData.steps,
      syncedAt: stepsData.syncedAt,
    });
  } catch (error) {
    console.error('Error syncing data:', error);
    return NextResponse.json(
      { error: 'Failed to sync data' },
      { status: 500 }
    );
  }
}