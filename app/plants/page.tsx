import { Metadata } from 'next';
import { getAllPlants } from '@/data/plants';
import PlantDirectoryView from '@/components/plants/PlantDirectoryView';

export const metadata: Metadata = {
  title: 'All Plants — Botanical Campus Directory',
  description:
    'Browse our comprehensive digital plant collection. Search by common or scientific names, explore specimen heights, lifespan, oxygen metrics, and print-ready QR codes.',
};

export default async function AllPlantsPage() {
  const plants = await getAllPlants();
  return <PlantDirectoryView plants={plants} />;
}
