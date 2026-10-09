import React from 'react';
import { Metadata } from 'next';
import ServicesSection from '@/components/services/ServicesSection';

export const metadata: Metadata = {
  title: 'Our Services — What We Offer | Mindspace Landscape Garden',
  description:
    'Discover our botanical garden services including comprehensive Plant Information, instant QR Identification, and dedicated Garden Support.',
  keywords: [
    'Plant Information',
    'QR Identification',
    'Garden Support',
    'Botanical Encyclopedia',
    'Mindspace Landscape Garden',
    'Plant Care',
  ],
};

export default function ServicesPage() {
  return (
    <main className="w-full flex-1 flex flex-col bg-[#F4FAF4]">
      <ServicesSection showHero={true} />
    </main>
  );
}
