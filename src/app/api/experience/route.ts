import { NextResponse } from 'next/server';
import { getExperience } from '@/data/db';

export const revalidate = 300;

export async function GET() {
  try {
    const data = await getExperience();
    return NextResponse.json({ success: true, data, error: null }, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' }
    });
  } catch (error) {
    console.error('[api/experience] Failed to fetch experience.');
    return NextResponse.json({ success: false, data: null, error: 'Failed to fetch experience' }, { status: 500 });
  }
}
