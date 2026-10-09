'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Trees, Wind, ArrowRight, Sparkles, QrCode } from 'lucide-react';
import { Plant } from '@/types/plant';

interface PlantDirectoryViewProps {
  plants: Plant[];
}

export default function PlantDirectoryView({ plants }: PlantDirectoryViewProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlants = plants.filter((plant) => {
    const q = searchTerm.toLowerCase();
    return (
      plant.common_name.toLowerCase().includes(q) ||
      plant.scientific_name.toLowerCase().includes(q) ||
      plant.region.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full flex-1 flex flex-col bg-[#F4FAF4]">
      {/* Header */}
      <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-emerald-100/70 via-emerald-50/40 to-[#F4FAF4] border-b border-emerald-100/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            Complete Campus Botanical Collection
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-emerald-950 font-serif tracking-tight">
            All Botanical Plants
          </h1>
          <p className="text-lg sm:text-xl font-medium text-emerald-700 mt-2 font-serif">
            Catalog of Cultivated & Native Flora
          </p>

          <p className="mt-3 text-sm sm:text-base text-emerald-900/80 max-w-xl mx-auto leading-relaxed">
            Browse through all {plants.length} documented specimens. Click any plant to access its morphological specifications, care instructions, and printable QR code.
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-emerald-700/60" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by common name, botanical name, or region..."
              className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border-2 border-emerald-300/80 shadow-md text-sm text-emerald-950 placeholder-emerald-800/50 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all font-medium"
            />
          </div>
        </div>
      </section>

      {/* Main Catalog View */}
      <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Count Badge */}
        <div className="flex justify-end mb-6">
          <span className="text-xs font-medium text-emerald-800/80 bg-emerald-100/60 px-3.5 py-1.5 rounded-xl border border-emerald-200">
            Showing {filteredPlants.length} of {plants.length} Plants
          </span>
        </div>

        {/* Plants Grid */}
        {filteredPlants.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-emerald-100 shadow-sm max-w-md mx-auto">
            <Trees className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="font-bold text-lg text-emerald-950 font-serif">
              No matching plants found
            </h3>
            <p className="text-xs text-emerald-800/80 mt-1">
              Try adjusting your search keywords.
            </p>
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-700 text-white font-semibold text-xs hover:bg-emerald-800 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredPlants.map((plant) => (
              <Link
                key={plant.id}
                href={`/plants/${plant.slug}`}
                className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-emerald-100 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-emerald-950/10">
                    <Image
                      src={plant.image_url}
                      alt={plant.common_name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-emerald-950/80 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-semibold text-emerald-200 border border-emerald-400/20">
                      {plant.type}
                    </div>
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 backdrop-blur-md p-1 sm:p-1.5 rounded-full text-emerald-900 shadow-xs">
                      <QrCode className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                  </div>

                  <div className="p-3 sm:p-5">
                    <h3 className="font-bold text-sm sm:text-lg text-emerald-950 font-serif group-hover:text-emerald-700 transition-colors line-clamp-1 sm:line-clamp-none">
                      {plant.common_name}
                    </h3>
                    <p className="text-[11px] sm:text-xs italic text-emerald-700 font-serif mt-0.5 truncate">
                      {plant.scientific_name}
                    </p>
                    <p className="text-[11px] sm:text-xs text-emerald-900/70 mt-1.5 sm:mt-2.5 line-clamp-2 leading-relaxed">
                      {plant.description}
                    </p>
                  </div>
                </div>

                <div className="px-3 pb-3 pt-2 sm:px-5 sm:pb-5 sm:pt-3 border-t border-emerald-50 flex items-center justify-between text-[11px] sm:text-xs">
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-800">
                    <Wind className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-600 flex-shrink-0" />
                    <span>{plant.oxygen_level} O₂</span>
                  </span>
                  <span className="text-emerald-700 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5 sm:gap-1">
                    <span className="hidden sm:inline">View Profile</span>
                    <span className="sm:hidden">View</span>
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
