import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { userIdToDelete } = await request.json();
    
    if (!userIdToDelete) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    // Delete the user and all associated data
    await prisma.user.delete({
      where: { id: userIdToDelete }
    });

    return NextResponse.json({ success: true, message: 'User data deleted successfully' });
  } catch (error) {
    console.error('Error deleting user data:', error);
    return NextResponse.json({ error: 'Failed to delete user data' }, { status: 500 });
  }
}

// GET endpoint to list all users (for debugging)
export async function GET(): Promise<NextResponse> {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fitbitUserId: true,
        tokenExpiresAt: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}