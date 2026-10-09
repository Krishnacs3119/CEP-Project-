'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Sprout, ShieldCheck } from 'lucide-react';
import { Plant } from '@/types/plant';

interface PlantDescriptionProps {
  plant: Plant;
}

export default function PlantDescription({ plant }: PlantDescriptionProps) {
  return (
    <section className="w-full py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Column: Scientific name & Botanical Description */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 bg-white/95 rounded-3xl p-6 sm:p-8 border border-emerald-100/90 shadow-sm"
          >
            <div className="flex items-center gap-2.5 mb-3 text-emerald-700">
              <BookOpen className="w-5 h-5" />
              <span className="text-xs uppercase font-bold tracking-wider">
                Botanical Overview & Morphology
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 font-serif">
              {plant.common_name} —{' '}
              <span className="italic font-normal text-emerald-700">
                {plant.scientific_name}
              </span>
            </h2>

            <div className="mt-4 prose prose-emerald max-w-none text-emerald-950/85 leading-relaxed text-base sm:text-lg">
              <p>{plant.description}</p>
            </div>

            {/* Care & Maintenance Advice */}
            {plant.care_instructions && (
              <div className="mt-6 pt-6 border-t border-emerald-100">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm mb-2">
                  <Sprout className="w-4 h-4 text-emerald-600" />
                  Cultivation & Care Guidelines
                </div>
                <p className="text-sm sm:text-base text-emerald-900/80 leading-relaxed bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                  {plant.care_instructions}
                </p>
              </div>
            )}
          </motion.div>

          {/* Right Column: Taxonomy Card & Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 space-y-5"
          >
            {/* Quick Fact / Taxonomy Card */}
            <div className="bg-emerald-900 text-emerald-50 rounded-3xl p-6 shadow-md border border-emerald-800">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-4 h-4" />
                Taxonomic Classification
              </div>

              <dl className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-emerald-800/80 pb-2">
                  <dt className="text-emerald-300/80">Binomial Name</dt>
                  <dd className="font-serif italic font-medium text-emerald-100 text-right">
                    {plant.scientific_name}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-emerald-800/80 pb-2">
                  <dt className="text-emerald-300/80">Category</dt>
                  <dd className="font-medium text-emerald-100 text-right">
                    {plant.category}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-emerald-800/80 pb-2">
                  <dt className="text-emerald-300/80">Growth Habit</dt>
                  <dd className="font-medium text-emerald-100 text-right">
                    {plant.type}
                  </dd>
                </div>
                <div className="flex justify-between pt-1">
                  <dt className="text-emerald-300/80">Oxygen Rating</dt>
                  <dd className="font-semibold text-emerald-300 text-right">
                    {plant.oxygen_level}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Environmental Stewardship Badge */}
            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-3xl p-5 text-emerald-900 text-xs sm:text-sm">
              <div className="flex items-center gap-2 font-semibold text-emerald-950 mb-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Verified Botanical Record
              </div>
              <p className="text-emerald-800/80 leading-relaxed text-xs">
                This record is cataloged in the campus botanical repository for
                academic reference, conservation, and QR-guided field tours.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
