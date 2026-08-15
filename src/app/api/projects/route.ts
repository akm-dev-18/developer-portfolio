import { NextResponse } from 'next/server';
import { getProjectsIndex } from '@/data/db';

export const revalidate = 300; // 5-minute revalidation

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    
    if (type && type !== 'professional' && type !== 'personal') {
      return NextResponse.json({ success: false, data: null, error: 'Invalid type parameter' }, { status: 400 });
    }

    const data = await getProjectsIndex(category, type);
    return NextResponse.json({ success: true, data, error: null }, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' }
    });
  } catch (error) {
    console.error('[api/projects] Failed to fetch projects.');
    return NextResponse.json({ success: false, data: null, error: 'Failed to fetch projects' }, { status: 500 });
  }
}
