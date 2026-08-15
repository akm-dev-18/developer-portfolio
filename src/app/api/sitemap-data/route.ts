import { NextResponse } from 'next/server';
import { getSitemapData } from '@/data/db';

export const revalidate = 300;

export async function GET() {
  try {
    const data = await getSitemapData();
    return NextResponse.json({ success: true, data, error: null }, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' }
    });
  } catch (error) {
    console.error('[api/sitemap-data] Failed to fetch sitemap data.');
    return NextResponse.json({ success: false, data: null, error: 'Failed to fetch sitemap data' }, { status: 500 });
  }
}
