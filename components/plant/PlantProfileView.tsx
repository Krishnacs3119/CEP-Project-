'use client';

import React from 'react';
import { Plant } from '@/types/plant';
import PlantHero from './PlantHero';
import PlantSpecGrid from './PlantSpecGrid';
import PlantDescription from './PlantDescription';
import PlantActionLinks from './PlantActionLinks';

interface PlantProfileViewProps {
  plant: Plant;
}

export default function PlantProfileView({ plant }: PlantProfileViewProps) {
  return (
    <div className="min-h-screen flex flex-col bg-emerald-50/30">
      <main className="flex-1 pb-16">
        {/* 1. Hero Image with Framer Motion Enter Animations */}
        <PlantHero plant={plant} />

        {/* 2. Spec Grid (Cards): Type, Height, Lifespan, Oxygen Level, Region */}
        <PlantSpecGrid plant={plant} />

        {/* 3. Scientific Name in italics + Detailed Botanical Description */}
        <PlantDescription plant={plant} />

        {/* 4. Action Links: "More Info" (Google) and "Watch Video" (YouTube) */}
        <PlantActionLinks plant={plant} />
      </main>
    </div>
  );
}
