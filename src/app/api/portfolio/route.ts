import { NextResponse } from 'next/server';
import { getPublicPortfolioData } from '@/data/db';

export const revalidate = 300; // 5-minute revalidation

export async function GET() {
  try {
    const data = await getPublicPortfolioData();
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' },
    });
  } catch (error) {
    console.error('[api/portfolio] Failed to fetch portfolio data.');
    return NextResponse.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    );
  }
}
