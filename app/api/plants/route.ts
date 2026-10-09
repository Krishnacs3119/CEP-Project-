import { NextRequest, NextResponse } from 'next/server';
import { getAllPlants } from '@/data/plants';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q')?.trim().toLowerCase() || '';
    const category = searchParams.get('category')?.trim().toLowerCase() || '';
    const type = searchParams.get('type')?.trim().toLowerCase() || '';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(60, Math.max(1, parseInt(searchParams.get('limit') || '24', 10)));

    let plants = await getAllPlants();

    // Filter by query (common name, scientific name, region, or description)
    if (q) {
      plants = plants.filter(
        (p) =>
          p.common_name.toLowerCase().includes(q) ||
          p.scientific_name.toLowerCase().includes(q) ||
          p.region.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (category && category !== 'all') {
      plants = plants.filter((p) => p.category.toLowerCase().includes(category));
    }

    // Filter by botanical type
    if (type && type !== 'all') {
      plants = plants.filter((p) => p.type.toLowerCase() === type);
    }

    const total = plants.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedItems = plants.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      items: paginatedItems,
      page,
      limit,
      total,
      totalPages,
    });
  } catch (error) {
    console.error('Failed to query plants:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve plants dataset' },
      { status: 500 }
    );
  }
}
