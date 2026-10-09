'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Trees,
  Ruler,
  Clock,
  Wind,
  Globe2,
  ExternalLink,
  QrCode,
  Sprout
} from 'lucide-react';
import { Plant } from '@/types/plant';

interface PlantDetailModalProps {
  plant: Plant | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PlantDetailModal({
  plant,
  isOpen,
  onClose,
}: PlantDetailModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted || !plant) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto flex items-center justify-center p-3 sm:p-6 pt-16 sm:pt-20 pb-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-emerald-950/75 backdrop-blur-md cursor-pointer"
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
            aria-label={`Botanical Details for ${plant.common_name}`}
            className="relative w-full max-w-4xl max-h-[92vh] my-auto bg-white rounded-3xl shadow-2xl border border-emerald-200/90 flex flex-col md:flex-row overflow-hidden z-10"
          >
            {/* Left Column: Full Uncropped 3:4 Portrait Image in Original Resolution */}
            <div className="relative w-full md:w-5/12 bg-emerald-950 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-emerald-100 flex-shrink-0 min-h-[300px] md:min-h-[520px]">
              {/* Ambient blurred backdrop so any letterbox is softly filled */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Image
                  src={plant.image_url}
                  alt=""
                  fill
                  className="object-cover blur-2xl opacity-35 scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/25 to-emerald-950/60" />
              </div>

              {/* Exact Native 3:4 Photo - 100% Full View Without Any Cropping */}
              <div className="relative w-full h-full min-h-[280px] md:min-h-[500px] aspect-[3/4] flex items-center justify-center p-2 z-10">
                <Image
                  src={plant.image_url}
                  alt={plant.common_name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-contain drop-shadow-2xl"
                />
              </div>

              {/* Type Badge Overlay */}
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/90 backdrop-blur-md text-emerald-100 border border-emerald-400/30 shadow-lg">
                  {plant.type} • {plant.category}
                </span>
              </div>
            </div>

            {/* Right Column: Details, Specs, Care, & Actions */}
            <div className="relative flex-1 flex flex-col min-w-0 max-h-[92vh] overflow-hidden bg-white">
              {/* High-visibility Close Button at Top-Right */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 z-30 w-11 h-11 rounded-full bg-emerald-100/90 hover:bg-white text-emerald-950 hover:text-red-600 shadow-lg border border-emerald-200 flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer group"
                aria-label="Close modal"
                title="Close (Esc)"
              >
                <X className="w-6 h-6 stroke-[2.5]" />
              </button>

              {/* Plant Header Info */}
              <div className="p-6 pb-4 pr-16 border-b border-emerald-100/80 bg-gradient-to-r from-emerald-50/50 to-white">
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-emerald-950 leading-tight">
                  {plant.common_name}
                </h3>
                <p className="text-sm italic text-emerald-700 font-serif mt-1">
                  {plant.scientific_name}
                </p>
              </div>

              {/* Modal Body: Scrollable specs and descriptions */}
              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                {/* Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-emerald-700 mb-1">
                      <Ruler className="w-3.5 h-3.5" />
                      <span className="font-semibold">Height</span>
                    </div>
                    <p className="font-bold text-emerald-950 text-sm">{plant.height}</p>
                  </div>

                  <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-emerald-700 mb-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="font-semibold">Lifespan</span>
                    </div>
                    <p className="font-bold text-emerald-950 text-sm">{plant.lifespan}</p>
                  </div>

                  <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-emerald-700 mb-1">
                      <Wind className="w-3.5 h-3.5" />
                      <span className="font-semibold">Oxygen</span>
                    </div>
                    <p className="font-bold text-emerald-950 text-sm">{plant.oxygen_level}</p>
                  </div>

                  <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-emerald-700 mb-1">
                      <Globe2 className="w-3.5 h-3.5" />
                      <span className="font-semibold">Region</span>
                    </div>
                    <p className="font-bold text-emerald-950 text-sm truncate" title={plant.region}>{plant.region}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs uppercase font-bold tracking-wider text-emerald-800 mb-2">
                    Botanical Summary
                  </h4>
                  <p className="text-sm text-emerald-950/80 leading-relaxed">
                    {plant.description}
                  </p>
                </div>

                {/* Care Instructions */}
                {plant.care_instructions && (
                  <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200/60 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
                      <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                      Care & Cultivation
                    </div>
                    <p className="text-emerald-800/90 leading-relaxed">
                      {plant.care_instructions}
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-emerald-50/80 border-t border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-emerald-800">
                  Campus Identifier: <strong className="font-mono">{plant.slug}</strong>
                </span>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-red-50 text-emerald-900 hover:text-red-700 font-semibold text-xs border border-emerald-200 hover:border-red-200 transition-colors shadow-sm cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    Close Window
                  </button>
                  <Link
                    href={`/plants/${plant.slug}`}
                    onClick={onClose}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs shadow-md transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    Open Full Page & QR Tag
                    <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
