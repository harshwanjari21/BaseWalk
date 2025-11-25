import { NextRequest, NextResponse } from 'next/server';
import { FITBIT_CONFIG } from '@/lib/fitbit-config';
import { encrypt } from '@/lib/crypto-utils';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state'); // userId
    const error = searchParams.get('error');

    // Debug logging
    console.log('Callback received:', { code: !!code, state, error });
    console.log('FITBIT_CONFIG:', {
      clientId: FITBIT_CONFIG.clientId ? 'SET' : 'MISSING',
      clientSecret: FITBIT_CONFIG.clientSecret ? 'SET' : 'MISSING',
      redirectUri: FITBIT_CONFIG.redirectUri,
    });

    if (error) {
      console.error('OAuth error from Fitbit:', error);
      return NextResponse.redirect(
        new URL(`/?error=${encodeURIComponent(error)}`, request.url)
      );
    }

    if (!code || !state) {
      console.error('Missing code or state:', { code: !!code, state });
      return NextResponse.redirect(
        new URL('/?error=missing_code_or_state', request.url)
      );
    }

    console.log('Attempting token exchange...');

    // Exchange authorization code for access token
    const tokenResponse = await fetch(FITBIT_CONFIG.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${FITBIT_CONFIG.clientId}:${FITBIT_CONFIG.clientSecret}`
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: FITBIT_CONFIG.redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token exchange failed:', {
        status: tokenResponse.status,
        statusText: tokenResponse.statusText,
        error: errorData
      });
      return NextResponse.redirect(
        new URL(`/?error=token_exchange_failed&details=${encodeURIComponent(errorData)}`, request.url)
      );
    }

    const tokenData = await tokenResponse.json();
    console.log('Token exchange successful, user_id:', tokenData.user_id);

    const {
      access_token,
      refresh_token,
      expires_in,
      user_id,
    } = tokenData;

    // Calculate token expiration time
    const expiresAt = new Date(Date.now() + expires_in * 1000);

    console.log('Encrypting tokens...');

    // Encrypt tokens before storing
    const encryptedAccessToken = encrypt(access_token);
    const encryptedRefreshToken = encrypt(refresh_token);

    console.log('Saving to database...');

    // Store user data in database with proper error handling
    try {
      await prisma.user.upsert({
        where: { id: state },
        update: {
          fitbitUserId: user_id,
          accessToken: encryptedAccessToken,
          refreshToken: encryptedRefreshToken,
          tokenExpiresAt: expiresAt,
          updatedAt: new Date(),
        },
        create: {
          id: state,
          fitbitUserId: user_id,
          accessToken: encryptedAccessToken,
          refreshToken: encryptedRefreshToken,
          tokenExpiresAt: expiresAt,
        },
      });
    } catch (dbError) {
      console.error('Database upsert error:', dbError);
      return NextResponse.redirect(
        new URL(`/?error=database_error&details=${encodeURIComponent('Failed to store user data')}`, request.url)
      );
    }

    console.log('Database save successful, redirecting...');

    // Redirect back to home page with success
    return NextResponse.redirect(new URL('/?connected=true', request.url));
  } catch (error) {
    console.error('Error in Fitbit callback:', error);
    const errorMessage = error instanceof Error ? error.message : 'unknown_error';
    return NextResponse.redirect(
      new URL(`/?error=callback_error&details=${encodeURIComponent(errorMessage)}`, request.url)
    );
  }
}