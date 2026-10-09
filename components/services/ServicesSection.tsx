'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import {
  Leaf,
  QrCode,
  Trees,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  icon: React.ComponentType<{ className?: string }>;
  badgeText: string;
  featurePills: string[];
  actionLabel: string;
  actionHref: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'plant-information',
    title: 'Plant Information',
    description:
      'Get complete plant details including scientific name, lifespan, oxygen level, height, benefits, and care instructions.',
    imageSrc: '/images/services/plant-information.jpg',
    imageAlt:
      'Healthy green plant with vibrant leaves representing botanical plant information',
    icon: Leaf,
    badgeText: 'Botanical Knowledge',
    featurePills: [
      'Scientific Taxonomy',
      'Oxygen & Lifespan',
      'Height & Growth',
      'Care Instructions',
    ],
    actionLabel: 'Explore Plant Directory',
    actionHref: '/plants',
  },
  {
    id: 'qr-identification',
    title: 'QR Identification',
    description:
      'Scan QR codes placed on plants to instantly access complete information about that specific plant, including its name, details, benefits, and care instructions.',
    imageSrc: '/images/services/qr-identification.jpg',
    imageAlt:
      'Person using a smartphone to scan a QR code label attached to a garden plant',
    icon: QrCode,
    badgeText: 'Instant Mobile Scan',
    featurePills: [
      'Field QR Markers',
      'Real-time Access',
      'Zero App Needed',
      'On-site Interaction',
    ],
    actionLabel: 'Browse Field Specimens',
    actionHref: '/plants',
  },
  {
    id: 'garden-support',
    title: 'Garden Support',
    description:
      'Get useful information and digital support for gardens, including garden planning, plant selection, plant care, watering guidance, maintenance tips, and keeping track of plants in the garden.',
    imageSrc: '/images/services/garden-support.jpg',
    imageAlt:
      'Beautiful picturesque garden with diverse lush flora, flowerbeds, and stone pathways',
    icon: Trees,
    badgeText: 'Horticultural Guidance',
    featurePills: [
      'Garden Planning',
      'Plant Selection',
      'Watering Schedules',
      'Care & Maintenance',
    ],
    actionLabel: 'Connect With Garden Team',
    actionHref: '/contact',
  },
];

interface ServicesSectionProps {
  showHero?: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ServicesSection({ showHero = true }: ServicesSectionProps) {

  return (
    <div className="w-full">
      {showHero && (
        <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-emerald-100/70 via-emerald-50/40 to-[#F4FAF4] border-b border-emerald-100/80">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge pill matching existing style */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              Mindspace Landscape Garden • Services
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl font-extrabold text-emerald-950 font-serif tracking-tight">
              Our Services
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl font-medium text-emerald-700 mt-2 font-serif">
              What We Offer
            </p>

            <p className="mt-3.5 text-sm sm:text-base text-emerald-900/80 max-w-2xl mx-auto leading-relaxed">
              Explore our core digital and botanical offerings designed to make plant discovery,
              identification, and garden care intuitive and accessible for everyone.
            </p>
          </div>
        </section>
      )}

      {/* Services Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {!showHero && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold mb-3">
              <Leaf className="w-3.5 h-3.5 text-emerald-700" />
              What We Offer
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-serif tracking-tight">
              Our Services
            </h2>
            <p className="text-emerald-700 font-serif text-lg mt-1 font-medium">
              What We Offer
            </p>
          </div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {servicesData.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="group flex flex-col bg-white rounded-3xl border border-emerald-100/90 shadow-sm hover:shadow-xl hover:border-emerald-300/80 transition-all duration-300 overflow-hidden"
              >
                {/* Service Image Container with Consistent 4:3 Aspect Ratio */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-emerald-50">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    priority
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Top Badge Overlay */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-emerald-950 text-xs font-semibold shadow-sm border border-emerald-200/60">
                      <Icon className="w-3.5 h-3.5 text-emerald-700" />
                      {service.badgeText}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-6">
                  <div className="space-y-3.5">
                    {/* Service Title */}
                    <h2 className="text-2xl font-bold text-emerald-950 font-serif group-hover:text-emerald-700 transition-colors">
                      {service.title}
                    </h2>

                    {/* Service Description */}
                    <p className="text-sm sm:text-base text-emerald-900/80 leading-relaxed font-sans">
                      {service.description}
                    </p>

                    {/* Key Feature Highlights */}
                    <div className="pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {service.featurePills.map((pill) => (
                          <span
                            key={pill}
                            className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200/60"
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Action Link */}
                  <div className="pt-2 border-t border-emerald-100/70">
                    <Link
                      href={service.actionHref}
                      className="inline-flex items-center justify-between w-full px-4 py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-700 text-emerald-900 hover:text-white font-semibold text-sm transition-all duration-200 border border-emerald-200/80 hover:border-emerald-700 group/btn shadow-xs"
                    >
                      <span>{service.actionLabel}</span>
                      <ArrowRight className="w-4 h-4 text-emerald-700 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Informational Assistance Callout */}
        <div className="mt-14 sm:mt-18 bg-white rounded-3xl p-6 sm:p-10 border border-emerald-200/80 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0 shadow-xs border border-emerald-200">
                <Leaf className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-emerald-950 font-serif">
                  Have questions about our botanical garden services?
                </h3>
                <p className="text-sm text-emerald-900/80 max-w-2xl leading-relaxed">
                  Whether you are planning a campus visit, looking for specific plant care guidance,
                  or interested in our QR identification system, our team is happy to assist.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link
                href="/contact"
                className="w-full md:w-auto px-5 py-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-sm transition-all text-center shadow-sm"
              >
                Contact Garden Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
