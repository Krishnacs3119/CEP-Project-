import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPlants, getPlantBySlug } from '@/data/plants';
import PlantProfileView from '@/components/plant/PlantProfileView';

// Enable Incremental Static Regeneration (ISR) for instant loading upon QR code scan
export const revalidate = 3600; // Cache and revalidate every hour
export const dynamicParams = true; // Allow newly registered plants to render on-demand

interface PlantPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Pre-generate static params at build time for all published botanical specimens.
 * When physical QR codes are scanned in the garden, pages load instantly from CDN cache.
 */
export async function generateStaticParams() {
  const plants = await getAllPlants();
  return plants.map((plant) => ({
    slug: plant.slug,
  }));
}

/**
 * Dynamic OpenGraph and SEO metadata for plant profile pages
 */
export async function generateMetadata({ params }: PlantPageProps): Promise<Metadata> {
  const { slug } = await params;
  const plant = await getPlantBySlug(slug);

  if (!plant) {
    return {
      title: 'Plant Not Found | PlantPedia Encyclopedia',
      description: 'The requested botanical record could not be found.',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://plantpedia.org';
  const canonicalUrl = `${siteUrl}/plants/${plant.slug}`;

  return {
    title: `${plant.common_name} (${plant.scientific_name}) — Botanical Profile & Care Guide`,
    description: `Comprehensive botanical profile for ${plant.common_name} (${plant.scientific_name}). Stature: ${plant.height}, Lifespan: ${plant.lifespan}, Oxygen Output: ${plant.oxygen_level}, Region: ${plant.region}.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${plant.common_name} (${plant.scientific_name}) — PlantPedia`,
      description: plant.description.slice(0, 160),
      url: canonicalUrl,
      siteName: 'PlantPedia Botanical Encyclopedia',
      images: [
        {
          url: plant.image_url,
          width: 1200,
          height: 630,
          alt: `${plant.common_name} (${plant.scientific_name})`,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${plant.common_name} (${plant.scientific_name})`,
      description: plant.description.slice(0, 160),
      images: [plant.image_url],
    },
  };
}

export default async function PlantDetailPage({ params }: PlantPageProps) {
  const { slug } = await params;
  const plant = await getPlantBySlug(slug);

  if (!plant) {
    notFound();
  }

  return <PlantProfileView plant={plant} />;
}
