import { NextResponse } from 'next/server';
import { getProfile } from '@/data/db';

export const revalidate = 300;

export async function GET() {
  try {
    const data = await getProfile();

    // Strip phone numbers from the public profile response
    const publicData = {
      ...data,
      personalInfo: {
        ...data.personalInfo,
        phoneNumbers: undefined,
      },
    };

    return NextResponse.json({ success: true, data: publicData, error: null }, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' }
    });
  } catch (error) {
    console.error('[api/profile] Failed to fetch profile.');
    return NextResponse.json({ success: false, data: null, error: 'Failed to fetch profile' }, { status: 500 });
  }
}
