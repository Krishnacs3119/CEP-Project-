import { NextRequest, NextResponse } from 'next/server';
import { getAllPlants } from '@/data/plants';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const exclude = searchParams.get('exclude')?.trim().toLowerCase();

    const plants = await getAllPlants();
    if (plants.length === 0) {
      return NextResponse.json({ error: 'No plants available' }, { status: 404 });
    }

    // Filter out the excluded slug if possible
    let pool = plants;
    if (exclude && plants.length > 1) {
      pool = plants.filter((p) => p.slug.toLowerCase() !== exclude);
    }

    const randomIndex = Math.floor(Math.random() * pool.length);
    const randomPlant = pool[randomIndex];

    return NextResponse.json(randomPlant, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Failed to get random plant:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve random plant' },
      { status: 500 }
    );
  }
}
