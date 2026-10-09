'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, Wind, MapPin } from 'lucide-react';
import { Plant } from '@/types/plant';

interface PlantHeroProps {
  plant: Plant;
}

export default function PlantHero({ plant }: PlantHeroProps) {
  return (
    <section className="relative w-full overflow-hidden pt-6 pb-8 md:pt-10 md:pb-12">
      {/* Decorative nature gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/50 via-emerald-50/20 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center space-x-2 text-xs md:text-sm text-emerald-800/80 mb-6"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-emerald-950 font-medium transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-emerald-600/60" />
          <span className="text-emerald-700/80">Plants</span>
          <ChevronRight className="w-3.5 h-3.5 text-emerald-600/60" />
          <span className="font-semibold text-emerald-950 truncate max-w-[200px] sm:max-w-none">
            {plant.common_name}
          </span>
        </motion.nav>

        {/* Hero Grid: Visual Presentation + Headline Meta */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Scientific Name, Badges & Quick Intro */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Badges Row */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center gap-2.5 mb-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300/60">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                {plant.type}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-800/10 text-emerald-900">
                {plant.category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-teal-100/80 text-teal-900 border border-teal-200">
                <Wind className="w-3 h-3 text-teal-700" />
                {plant.oxygen_level} Oxygen Emitter
              </span>
            </motion.div>

            {/* Common Name */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-emerald-950 tracking-tight font-serif"
            >
              {plant.common_name}
            </motion.h1>

            {/* Scientific Name (Italicized) */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl italic font-serif text-emerald-700 mt-2 font-normal"
            >
              {plant.scientific_name}
            </motion.p>

            {/* Geographic Origin Indicator */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex items-center gap-2 mt-3 text-sm text-emerald-900/80"
            >
              <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Native Region: <strong className="font-semibold text-emerald-950">{plant.region}</strong></span>
            </motion.div>

            {/* Short Excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-5 text-base sm:text-lg text-emerald-950/80 leading-relaxed max-w-2xl line-clamp-3"
            >
              {plant.description}
            </motion.p>

            {/* Fast Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap items-center gap-3.5 mt-6"
            >
              <a
                href="#plant-specs"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-sm shadow-md shadow-emerald-900/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                View Full Specs
              </a>
            </motion.div>
          </div>

          {/* Right Column: Hero Image with Framer Motion enter animations */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] rounded-3xl overflow-hidden glass-panel p-2.5 shadow-2xl shadow-emerald-950/15 group"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-emerald-950 flex items-center justify-center">
                {/* Ambient blur backdrop */}
                <Image
                  src={plant.image_url}
                  alt=""
                  fill
                  className="object-cover blur-2xl opacity-40 scale-125 pointer-events-none"
                />
                
                {/* Full Uncropped Original Photo */}
                <div className="relative w-full h-full p-1.5 z-10 flex items-center justify-center">
                  <Image
                    src={plant.image_url}
                    alt={`${plant.common_name} (${plant.scientific_name})`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
                    className="object-contain drop-shadow-xl group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent pointer-events-none z-10" />

                {/* Live Identification Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white drop-shadow-md z-20">
                  <div className="flex items-center gap-2 bg-emerald-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-emerald-400/30">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-medium tracking-wide">
                      Botanical Profile • {plant.slug}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
