import React from 'react';
import { Metadata } from 'next';
import GardenMapInteractive from '@/components/map/GardenMapInteractive';

export const metadata: Metadata = {
  title: 'Explore Gardens Near You — Interactive Botanical Map | PlantPedia',
  description:
    'Discover gardens, parks and green spaces around you. Interactive Google Maps interface featuring Mindspace Garden in Malad West, Mumbai.',
  keywords: [
    'Garden Map',
    'Google Maps Botanical',
    'Mindspace Garden',
    'Malad West Mumbai',
    'Explore Gardens Near You',
    'PlantPedia Map',
  ],
};

export default function GardenMapPage() {
  return (
    <main className="w-full flex-1 flex flex-col bg-[#F4FAF4]">
      <GardenMapInteractive />
    </main>
  );
}
