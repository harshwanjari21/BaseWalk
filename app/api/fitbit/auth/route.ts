import { NextRequest, NextResponse } from 'next/server';
import { FITBIT_CONFIG } from '@/lib/fitbit-config';

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

    // Build authorization URL
    const authUrl = new URL(FITBIT_CONFIG.authorizationUrl);
    authUrl.searchParams.append('client_id', FITBIT_CONFIG.clientId);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('scope', FITBIT_CONFIG.scopes);
    authUrl.searchParams.append('redirect_uri', FITBIT_CONFIG.redirectUri);
    authUrl.searchParams.append('state', userId); // Pass userId in state for callback

    return NextResponse.json({ authUrl: authUrl.toString() });
  } catch (error) {
    console.error('Error generating auth URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate authorization URL' },
      { status: 500 }
    );
  }
}