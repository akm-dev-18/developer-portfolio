import { NextResponse } from 'next/server';
import { getProjectBySlug } from '@/data/db';

export const revalidate = 300;

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json({ success: false, data: null, error: 'Invalid slug' }, { status: 400 });
    }

    const data = await getProjectBySlug(slug);
    if (!data) {
      return NextResponse.json({ success: false, data: null, error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data, error: null }, {
      headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' }
    });
  } catch (error) {
    console.error('[api/projects/slug] Failed to fetch project.');
    return NextResponse.json({ success: false, data: null, error: 'Failed to fetch project' }, { status: 500 });
  }
}
