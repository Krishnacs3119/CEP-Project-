'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ListFilter, Shuffle, Quote, Sparkles } from 'lucide-react';

interface ActionButtonsRowProps {
  onOpenPlantList: () => void;
  onPickRandomPlant: () => void;
  onOpenQuotes: () => void;
  isShuffling?: boolean;
}

export default function ActionButtonsRow({
  onOpenPlantList,
  onPickRandomPlant,
  onOpenQuotes,
  isShuffling = false,
}: ActionButtonsRowProps) {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-wrap items-center justify-center gap-3.5 my-6">
      {/* 1. List of Plants Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={onOpenPlantList}
        className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-md shadow-emerald-950/15 border border-emerald-600 transition-all cursor-pointer"
        id="btn-list-of-plants"
      >
        <ListFilter className="w-4 h-4 text-emerald-200" />
        <span>List of Plants</span>
      </motion.button>

      {/* 2. "New One" (Random Plant) Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={onPickRandomPlant}
        disabled={isShuffling}
        className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-950 font-semibold text-sm border-2 border-emerald-300 shadow-md shadow-emerald-950/5 transition-all cursor-pointer group"
        id="btn-new-one"
      >
        <Shuffle
          className={`w-4 h-4 text-emerald-700 group-hover:rotate-180 transition-transform duration-500 ${
            isShuffling ? 'animate-spin' : ''
          }`}
        />
        <span>{isShuffling ? 'Selecting Specimen...' : 'New One'}</span>
      </motion.button>

      {/* 3. Favorite Quotes Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97 }}
        onClick={onOpenQuotes}
        className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-emerald-100/80 hover:bg-emerald-200/80 text-emerald-900 font-semibold text-sm border border-emerald-300/60 shadow-sm transition-all cursor-pointer"
        id="btn-favorite-quotes"
      >
        <Quote className="w-4 h-4 text-emerald-700" />
        <span>Favorite Quotes</span>
      </motion.button>
    </div>
  );
}
