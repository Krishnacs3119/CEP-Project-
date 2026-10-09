'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Trees,
  Ruler,
  Clock,
  Wind,
  Globe2,
  Sun,
  Droplets,
  AlertCircle
} from 'lucide-react';
import { Plant, OxygenLevel } from '@/types/plant';

interface PlantSpecGridProps {
  plant: Plant;
}

export default function PlantSpecGrid({ plant }: PlantSpecGridProps) {
  const getOxygenBadgeStyle = (level: OxygenLevel) => {
    switch (level) {
      case 'High':
        return {
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          dot: 'bg-emerald-600',
          text: 'High Output',
          desc: 'Superior air purification & oxygenation',
        };
      case 'Medium':
        return {
          bg: 'bg-teal-100 text-teal-900 border-teal-300',
          dot: 'bg-teal-600',
          text: 'Moderate Output',
          desc: 'Balanced diurnal oxygen synthesis',
        };
      case 'Low':
        return {
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
          dot: 'bg-amber-600',
          text: 'Standard Output',
          desc: 'Steady ambient oxygen production',
        };
      default:
        return {
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          dot: 'bg-emerald-600',
          text: level,
          desc: 'Standard botanical output',
        };
    }
  };

  const oxygenStyle = getOxygenBadgeStyle(plant.oxygen_level);

  // Core 5 Spec Cards as requested in the specification
  const specs = [
    {
      title: 'Botanical Type',
      value: plant.type,
      subtext: plant.category,
      icon: Trees,
      iconColor: 'text-emerald-700 bg-emerald-100/90 border-emerald-200',
      badge: null,
    },
    {
      title: 'Mature Height',
      value: plant.height || 'Variable (Species dependent)',
      subtext: 'Vertical vegetative stature',
      icon: Ruler,
      iconColor: 'text-blue-700 bg-blue-100/90 border-blue-200',
      badge: null,
    },
    {
      title: 'Estimated Lifespan',
      value: plant.lifespan || 'Perennial longevity',
      subtext: 'Biological cycle duration',
      icon: Clock,
      iconColor: 'text-amber-700 bg-amber-100/90 border-amber-200',
      badge: null,
    },
    {
      title: 'Oxygen Level',
      value: `${plant.oxygen_level} Oxygen`,
      subtext: oxygenStyle.desc,
      icon: Wind,
      iconColor: 'text-teal-700 bg-teal-100/90 border-teal-200',
      badge: {
        label: oxygenStyle.text,
        style: oxygenStyle.bg,
        dot: oxygenStyle.dot,
      },
    },
    {
      title: 'Found In / Region',
      value: plant.region,
      subtext: 'Native geographical habitat',
      icon: Globe2,
      iconColor: 'text-emerald-800 bg-emerald-100/90 border-emerald-200',
      badge: null,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section id="plant-specs" className="w-full py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-emerald-950 font-serif tracking-tight">
              Botanical Specifications
            </h2>
            <p className="text-xs sm:text-sm text-emerald-800/70 mt-0.5">
              Key ecological, physiological, and morphological parameters
            </p>
          </div>
        </div>

        {/* 5-Card Spec Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5"
        >
          {specs.map((spec) => {
            const Icon = spec.icon;
            return (
              <motion.div
                key={spec.title}
                variants={itemVariants}
                className="group relative bg-white/95 rounded-2xl p-5 border border-emerald-100/80 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-emerald-800/70 tracking-wider uppercase">
                      {spec.title}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center border shadow-xs group-hover:scale-110 transition-transform duration-200 ${spec.iconColor}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-lg font-bold text-emerald-950 tracking-tight leading-snug group-hover:text-emerald-700 transition-colors">
                    {spec.value}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-50 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-700/80 font-medium line-clamp-1">
                    {spec.subtext}
                  </span>

                  {spec.badge && (
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${spec.badge.style}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${spec.badge.dot}`} />
                      {spec.badge.label}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Secondary Botanical Micro-Guide (Sunlight, Watering, Toxicity) */}
        {(plant.sunlight || plant.watering || plant.toxicity_info) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {plant.sunlight && (
              <div className="flex items-start gap-3 bg-amber-50/70 border border-amber-200/60 rounded-xl p-3.5 text-xs text-amber-950">
                <Sun className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold block text-amber-900">Sunlight Needs</span>
                  <span>{plant.sunlight}</span>
                </div>
              </div>
            )}
            {plant.watering && (
              <div className="flex items-start gap-3 bg-blue-50/70 border border-blue-200/60 rounded-xl p-3.5 text-xs text-blue-950">
                <Droplets className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold block text-blue-900">Watering Schedule</span>
                  <span>{plant.watering}</span>
                </div>
              </div>
            )}
            {plant.toxicity_info && (
              <div className="flex items-start gap-3 bg-rose-50/70 border border-rose-200/60 rounded-xl p-3.5 text-xs text-rose-950">
                <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold block text-rose-900">Pet & Human Safety</span>
                  <span className="line-clamp-2">{plant.toxicity_info}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
