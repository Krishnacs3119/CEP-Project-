'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Wind, Leaf, ArrowRight, Eye } from 'lucide-react';
import { Plant } from '@/types/plant';

interface PlantListModalProps {
  isOpen: boolean;
  onClose: () => void;
  plants: Plant[];
  onSelectPlant: (plant: Plant) => void;
}

export default function PlantListModal({
  isOpen,
  onClose,
  plants,
  onSelectPlant,
}: PlantListModalProps) {
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const categories = ['All', ...Array.from(new Set(plants.map((p) => p.category)))];

  const filteredPlants = plants.filter((plant) => {
    const matchesSearch =
      plant.common_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.scientific_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || plant.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-3 sm:p-6 pt-16 sm:pt-20 pb-8">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-emerald-950/75 backdrop-blur-md transition-opacity cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="List of Botanical Plants"
            className="relative w-full max-w-4xl max-h-[90vh] my-auto bg-white rounded-3xl shadow-2xl border border-emerald-200/90 flex flex-col overflow-hidden z-10"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-800 to-green-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-emerald-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600/50 border border-emerald-400/30 flex items-center justify-center text-emerald-100">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif">
                    List of Plants
                  </h3>
                  <p className="text-xs text-emerald-200/80">
                    Botanical repository • {plants.length} cataloged specimens
                  </p>
                </div>
              </div>

              {/* Prominent Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="w-11 h-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-red-600 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer border border-white/30 shadow-md group"
                aria-label="Close modal"
                title="Close (Esc)"
              >
                <X className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>

            {/* Filter Bar */}
            <div className="p-4 sm:p-6 bg-emerald-50/50 border-b border-emerald-100 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-700/60" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by common or scientific name..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-emerald-200 text-sm text-emerald-950 placeholder-emerald-800/50 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-emerald-700 text-white'
                        : 'bg-white text-emerald-900 border border-emerald-200 hover:bg-emerald-100/70'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Plant List Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-emerald-100">
              {filteredPlants.length === 0 ? (
                <div className="py-12 text-center text-emerald-900/70">
                  <p className="font-semibold text-base">No plants match your search</p>
                  <p className="text-xs mt-1">Try adjusting the query or category filter</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {filteredPlants.map((plant) => (
                    <div
                      key={plant.id}
                      className="group bg-white hover:bg-emerald-50/80 rounded-2xl p-3 border border-emerald-100/80 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-3.5"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-emerald-900/10 flex-shrink-0">
                          <Image
                            src={plant.image_url}
                            alt={plant.common_name}
                            fill
                            sizes="64px"
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>

                        <div className="min-w-0">
                          <h4 className="font-bold text-sm text-emerald-950 font-serif truncate group-hover:text-emerald-700 transition-colors">
                            {plant.common_name}
                          </h4>
                          <p className="text-xs italic text-emerald-700/90 font-serif truncate">
                            {plant.scientific_name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">
                              {plant.type}
                            </span>
                            <span className="text-[10px] font-medium text-emerald-700 flex items-center gap-0.5">
                              <Wind className="w-2.5 h-2.5 text-teal-600" />
                              {plant.oxygen_level} O₂
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => onSelectPlant(plant)}
                          title="Quick preview"
                          className="p-2 rounded-xl bg-emerald-100/70 hover:bg-emerald-200 text-emerald-900 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <Link
                          href={`/plants/${plant.slug}`}
                          onClick={onClose}
                          title="View dedicated profile"
                          className="p-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white transition-colors"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-emerald-50/70 border-t border-emerald-100 flex items-center justify-between text-xs text-emerald-800">
              <span>Showing {filteredPlants.length} of {plants.length} specimens</span>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-red-50 text-emerald-900 hover:text-red-700 font-semibold border border-emerald-200 hover:border-red-200 transition-colors shadow-sm cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                Close Window
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
