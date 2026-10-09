'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink, Video } from 'lucide-react';
import { Plant } from '@/types/plant';

interface PlantActionLinksProps {
  plant: Plant;
}

export default function PlantActionLinks({ plant }: PlantActionLinksProps) {
  const googleSearchQuery = encodeURIComponent(
    `${plant.common_name} ${plant.scientific_name} botanical facts care`
  );
  const googleSearchUrl = `https://www.google.com/search?q=${googleSearchQuery}`;

  const youtubeSearchQuery = encodeURIComponent(
    `${plant.common_name} ${plant.scientific_name} plant guide care documentary`
  );
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${youtubeSearchQuery}`;

  return (
    <section className="w-full py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 rounded-3xl p-6 sm:p-8 border border-emerald-200/80 shadow-sm"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Explore External Botanical Resources
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-emerald-950 font-serif mt-1">
                Deep Dive into {plant.common_name}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800/80 mt-1 max-w-xl">
                Access scientific papers, global herbarium databases, academic literature,
                and documentary video guides for {plant.scientific_name}.
              </p>
            </div>

            {/* The 2 Required Action Links */}
            <div className="flex flex-wrap items-center gap-3.5">
              {/* "More Info" -> Google Search */}
              <a
                href={googleSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 font-semibold text-sm border border-emerald-300 shadow-sm hover:shadow transition-all group"
                id="action-more-info"
              >
                <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Search className="w-3.5 h-3.5" />
                </div>
                <span>More Info (Google)</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-600/70" />
              </a>

              {/* "Watch Video" -> YouTube Search */}
              <a
                href={youtubeSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md shadow-red-700/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all group"
                id="action-watch-video"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Video className="w-3.5 h-3.5 text-white" />
                </div>
                <span>Watch Video (YouTube)</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
