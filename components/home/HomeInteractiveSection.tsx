'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  QrCode,
  ArrowRight,
  Wind,
  Trees,
  Search,
  Sparkles,
  ExternalLink,
  Eye,
  Leaf
} from 'lucide-react';
import { Plant } from '@/types/plant';
import SearchBar from './SearchBar';
import ActionButtonsRow from './ActionButtonsRow';
import PlantListModal from '@/components/modals/PlantListModal';
import PlantDetailModal from '@/components/modals/PlantDetailModal';
import FavoriteQuotesModal from '@/components/modals/FavoriteQuotesModal';

interface HomeInteractiveSectionProps {
  initialPlants: Plant[];
}

export default function HomeInteractiveSection({
  initialPlants,
}: HomeInteractiveSectionProps) {
  const [plants] = useState<Plant[]>(initialPlants);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isQuotesModalOpen, setIsQuotesModalOpen] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  // Handler to open plant detail
  const handleOpenPlantDetail = (plant: Plant) => {
    setSelectedPlant(plant);
    setIsDetailModalOpen(true);
  };

  // Handler for "New One" (random plant)
  const handlePickRandomPlant = async () => {
    setIsShuffling(true);
    try {
      const excludeSlug = selectedPlant?.slug || '';
      const res = await fetch(`/api/plants/random?exclude=${excludeSlug}`);
      if (res.ok) {
        const randomPlant: Plant = await res.json();
        // brief timeout for smooth shuffle animation
        setTimeout(() => {
          setSelectedPlant(randomPlant);
          setIsDetailModalOpen(true);
          setIsShuffling(false);
        }, 300);
      } else {
        setIsShuffling(false);
      }
    } catch (err) {
      console.error('Failed to pick random plant:', err);
      setIsShuffling(false);
    }
  };

  return (
    <>
      {/* 1. Prominent Search Box */}
      <div className="mt-8 px-4">
        <SearchBar
          onSelectPlant={handleOpenPlantDetail}
        />
      </div>

      {/* 2. Action Row: List of Plants, New One, Favorite Quotes */}
      <div className="px-4">
        <ActionButtonsRow
          onOpenPlantList={() => setIsListModalOpen(true)}
          onPickRandomPlant={handlePickRandomPlant}
          onOpenQuotes={() => setIsQuotesModalOpen(true)}
          isShuffling={isShuffling}
        />
      </div>

      {/* 3. Catalog Grid Section */}
      <section id="botanical-catalog" className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
              <Search className="w-3.5 h-3.5" />
              Cataloged Campus Specimens
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 font-serif">
              Dynamic Plant Profiles & QR Identifiers
            </h2>
            <p className="text-xs sm:text-sm text-emerald-800/70 mt-1">
              Click any specimen to open its dedicated SSR/ISR dynamic route with printable QR tags and detailed care instructions.
            </p>
          </div>

          <Link
            href="/plants"
            className="text-xs text-emerald-800 hover:text-emerald-950 bg-emerald-100/70 hover:bg-emerald-200/70 px-3.5 py-1.5 rounded-xl border border-emerald-300/60 font-semibold transition-colors inline-flex items-center gap-1.5"
          >
            Showing 9 of {plants.length} Plants • View All
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Plant Cards Grid: 9 Featured Plants + 10th More Plants Card */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {plants.slice(0, 9).map((plant) => (
            <motion.div
              key={plant.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-emerald-100 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Plant Thumbnail in Native 3:4 Portrait Ratio */}
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
                  <button
                    type="button"
                    onClick={() => handleOpenPlantDetail(plant)}
                    title="Quick preview"
                    className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1 sm:p-1.5 rounded-full bg-white/90 hover:bg-white text-emerald-900 shadow-sm backdrop-blur-md transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>

                {/* Card Body */}
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

              {/* Card Footer with Details Modal & Dedicated Page Link */}
              <div className="px-3 pb-3 pt-2 sm:px-5 sm:pb-5 sm:pt-3 border-t border-emerald-50 flex items-center justify-between text-[11px] sm:text-xs">
                <span className="inline-flex items-center gap-1 font-semibold text-emerald-800">
                  <Wind className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-teal-600 flex-shrink-0" />
                  <span>{plant.oxygen_level} O₂</span>
                </span>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenPlantDetail(plant)}
                    className="text-emerald-800 font-semibold hover:text-emerald-950 transition-colors hidden sm:inline-block"
                  >
                    Quick View
                  </button>
                  <span className="text-emerald-300 hidden sm:inline-block">•</span>
                  <Link
                    href={`/plants/${plant.slug}`}
                    className="text-emerald-700 font-semibold hover:text-emerald-900 flex items-center gap-0.5 sm:gap-1 group/link"
                  >
                    <span className="hidden sm:inline">Full Page</span>
                    <span className="sm:hidden">Details</span>
                    <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover/link:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          {/* 10th Card: "More Plants" single-column card matching other cards */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-850 to-green-950 border-2 border-emerald-500/40 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
          >
            {/* Ambient decorative blur */}
            <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none -mr-8 -mt-8" />

            <Link
              href="/plants"
              className="flex flex-col justify-between h-full p-4 sm:p-6 text-center relative z-10 block"
            >
              <div>
                {/* Top Badge & Icon */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-emerald-800/80 border border-emerald-500/30 flex items-center justify-center text-emerald-300 mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-md">
                    <Leaf className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>

                  <span className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-emerald-800/70 border border-emerald-400/30 text-emerald-200 mb-1.5 sm:mb-2">
                    +{Math.max(0, plants.length - 9)} More
                  </span>

                  <h3 className="text-lg sm:text-2xl font-bold font-serif text-white group-hover:text-emerald-200 transition-colors">
                    More Plants
                  </h3>

                  <p className="text-[11px] sm:text-xs text-emerald-100/80 mt-1.5 sm:mt-2.5 leading-relaxed line-clamp-2 sm:line-clamp-none">
                    Explore all {plants.length} documented botanical specimens with filters and QR plaques.
                  </p>
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div className="pt-3 sm:pt-6 mt-3 sm:mt-4 border-t border-emerald-800/60 flex flex-col items-center gap-1.5 sm:gap-2">
                <span className="w-full inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-[11px] sm:text-xs shadow-md group-hover:scale-105 active:scale-95 transition-all">
                  <span>Explore All</span>
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-800 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[9px] sm:text-[10px] text-emerald-300/70 font-medium">
                  Campus Directory
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 4. Modals */}
      <PlantListModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        plants={plants}
        onSelectPlant={(plant) => {
          setIsListModalOpen(false);
          handleOpenPlantDetail(plant);
        }}
      />

      <PlantDetailModal
        plant={selectedPlant}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedPlant(null);
        }}
      />

      <FavoriteQuotesModal
        isOpen={isQuotesModalOpen}
        onClose={() => setIsQuotesModalOpen(false)}
      />
    </>
  );
}
