import React from 'react';
import { getAllPlants } from '@/data/plants';
import { Sparkles } from 'lucide-react';
import HomeInteractiveSection from '@/components/home/HomeInteractiveSection';
import HeroBotanicalAccents from '@/components/home/HeroBotanicalAccents';

export default async function HomePage() {
  const plants = await getAllPlants();

  return (
    <div className="w-full flex-1 flex flex-col bg-[#F4FAF4]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-10 sm:pt-20 sm:pb-16 bg-gradient-to-b from-emerald-100/70 via-emerald-50/40 to-[#F4FAF4] border-b border-emerald-100/80">
        {/* Subtle, delicate original botanical accents */}
        <HeroBotanicalAccents />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold mb-5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            Mindspace Landscape Garden • Digital Botanical Encyclopedia
          </div>

          {/* Exact v1 Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-emerald-950 font-serif tracking-tight max-w-4xl mx-auto leading-tight">
            &ldquo;Welcome to Garden based plant encyclopedia&rdquo;
          </h1>

          <p className="mt-3.5 text-sm sm:text-base md:text-lg text-emerald-900/80 max-w-2xl mx-auto leading-relaxed">
            Explore diverse botanical flora, discover physiological and oxygen metrics,
            scan physical campus QR codes, and explore comprehensive botanical care guides.
          </p>

          {/* Interactive Search, Action Buttons Row (List of Plants, New One, Quotes), Grid, and Modals */}
          <HomeInteractiveSection initialPlants={plants} />
        </div>
      </section>
    </div>
  );
}
