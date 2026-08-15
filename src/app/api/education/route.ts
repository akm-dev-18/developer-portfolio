import { NextResponse } from 'next/server';
import { getEducation } from '@/data/db';

export const revalidate = 300;

export async function GET() {
  try {
    const data = await getEducation();
    return NextResponse.json({ success: true, data, error: null }, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' }
    });
  } catch (error) {
    console.error('[api/education] Failed to fetch education.');
    return NextResponse.json({ success: false, data: null, error: 'Failed to fetch education' }, { status: 500 });
  }
}
