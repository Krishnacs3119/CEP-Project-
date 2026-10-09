'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Sprout } from 'lucide-react';

export default function GlobalLoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // 1. Check if initial load was already completed during this session
    const hasLoadedBefore = sessionStorage.getItem('plantpedia_initial_load_done');
    if (hasLoadedBefore) {
      setIsVisible(false);
      return;
    }

    // 2. Minimum duration of 2.5 seconds (satisfies >= 2s and ~2.5s requirement)
    const minTimePromise = new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2500);
    });

    // 3. Track actual app readiness
    const appReadyPromise = new Promise<void>((resolve) => {
      if (typeof document !== 'undefined' && document.readyState === 'complete') {
        resolve();
      } else if (typeof window !== 'undefined') {
        window.addEventListener('load', () => resolve(), { once: true });
        // Fallback: check readyState periodically in case load already fired
        const interval = setInterval(() => {
          if (document.readyState === 'complete') {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      } else {
        resolve();
      }
    });

    // 4. Loader duration = maximum of actual app loading time and 2.5 seconds
    Promise.all([minTimePromise, appReadyPromise]).then(() => {
      setIsVisible(false);
      sessionStorage.setItem('plantpedia_initial_load_done', 'true');
    });
  }, []);

  // If client-side check determined already loaded in this session, don't render
  if (isClient && !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="global-plantpedia-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#F4FAF4] select-none pointer-events-auto"
          role="status"
          aria-live="polite"
          aria-label="Loading PlantPedia"
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute inset-0 pointer-events-none -z-10"
            style={{
              background:
                'radial-gradient(circle at 50% 45%, rgba(165, 214, 167, 0.35) 0%, rgba(244, 250, 244, 0.95) 60%, #F4FAF4 100%)',
            }}
          />

          <div className="flex flex-col items-center text-center px-4 max-w-sm mx-auto">
            {/* Nature Plant Icon Effect */}
            <div className="relative mb-6">
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-green-800 flex items-center justify-center text-white shadow-xl shadow-emerald-900/15 border border-emerald-400/30"
              >
                {/* Gentle breathing plant icon */}
                <motion.div
                  animate={{
                    scale: [1, 1.06, 1],
                    rotate: [0, -3, 3, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.4,
                    ease: 'easeInOut',
                  }}
                >
                  <Sprout className="w-10 h-10 text-emerald-100" />
                </motion.div>
              </motion.div>

              {/* Subtle Orbiting Floating Leaf */}
              <motion.div
                animate={{
                  y: [-2, 3, -2],
                  rotate: [0, 8, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: 'easeInOut',
                }}
                className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white shadow-md border border-emerald-200/80 flex items-center justify-center text-emerald-600"
              >
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              </motion.div>
            </div>

            {/* Seedling Emoji */}
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-2xl mb-1.5 select-none"
            >
              🌱
            </motion.span>

            {/* Brand Title: PlantPedia */}
            <motion.h1
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.45 }}
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-emerald-950 font-serif"
            >
              Plant<span className="text-emerald-600">Pedia</span>
            </motion.h1>

            {/* Subtitle: Growing Knowledge... */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.45 }}
              className="mt-2 text-sm sm:text-base font-medium italic text-emerald-800/80 font-serif"
            >
              Growing Knowledge...
            </motion.p>

            {/* Minimal Nature-Themed 2.5s Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="mt-6 w-36 h-1 bg-emerald-200/60 rounded-full overflow-hidden border border-emerald-300/40"
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="h-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
