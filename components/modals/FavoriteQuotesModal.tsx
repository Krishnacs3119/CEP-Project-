'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Leaf, ChevronLeft, ChevronRight, Quote as QuoteIcon, Sparkles } from 'lucide-react';
import { BOTANICAL_QUOTES } from '@/data/quotes';

interface FavoriteQuotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FavoriteQuotesModal({
  isOpen,
  onClose,
}: FavoriteQuotesModalProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, onClose]);

  if (!mounted) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BOTANICAL_QUOTES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + BOTANICAL_QUOTES.length) % BOTANICAL_QUOTES.length);
  };

  const quote = BOTANICAL_QUOTES[currentIndex];

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
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Favorite Botanical Quotes"
            className="relative w-full max-w-xl my-auto bg-gradient-to-b from-white to-emerald-50/60 rounded-3xl shadow-2xl border border-emerald-200/90 p-6 sm:p-8 overflow-hidden z-10 text-center"
          >
            {/* Prominent Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-emerald-100/90 hover:bg-white text-emerald-950 hover:text-red-600 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer border border-emerald-300 shadow-md group"
              aria-label="Close quotes modal"
              title="Close (Esc)"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>

            {/* Gently Swaying Leaf Icon Animation */}
            <motion.div
              animate={{ rotate: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm"
            >
              <Leaf className="w-8 h-8" />
            </motion.div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              Favorite Nature & Plant Quotes
            </span>

            {/* Rotating Quote Card */}
            <div className="relative min-h-[160px] flex flex-col justify-center my-4 px-4">
              <QuoteIcon className="w-8 h-8 text-emerald-300 mx-auto mb-2 opacity-60" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={quote.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-3"
                >
                  <blockquote className="text-xl sm:text-2xl font-serif font-medium text-emerald-950 italic leading-relaxed">
                    &ldquo;{quote.text}&rdquo;
                  </blockquote>
                  <p className="text-sm font-semibold text-emerald-700 tracking-wide">
                    — {quote.author}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quote Carousel Navigation Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-emerald-100/80 mt-4 text-xs">
              <button
                type="button"
                onClick={handlePrev}
                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-white hover:bg-emerald-100/80 text-emerald-900 font-semibold border border-emerald-200 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <span className="text-emerald-700/80 font-medium">
                {currentIndex + 1} of {BOTANICAL_QUOTES.length}
              </span>

              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-white hover:bg-emerald-100/80 text-emerald-900 font-semibold border border-emerald-200 transition-colors"
              >
                Next Quote
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Footer Close Button */}
            <div className="mt-4 pt-3 flex justify-center">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-white hover:bg-red-50 text-emerald-900 hover:text-red-700 font-semibold text-xs border border-emerald-200 hover:border-red-200 transition-colors shadow-sm cursor-pointer"
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
