import { NextResponse } from 'next/server';
import { BOTANICAL_QUOTES } from '@/data/quotes';

export async function GET() {
  return NextResponse.json(BOTANICAL_QUOTES, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
