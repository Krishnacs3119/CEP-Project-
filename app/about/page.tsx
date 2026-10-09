import React from 'react';
import { Metadata } from 'next';
import { Leaf } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — Mindspace Landscape Garden',
  description:
    'Our purpose, process, and vision behind Mindspace Landscape Garden botanical encyclopedia.',
};

export default function AboutPage() {
  return (
    <div className="w-full flex-1 flex flex-col bg-[#F4FAF4]">
      {/* Hero Header */}
      <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-emerald-100/70 via-emerald-50/40 to-[#F4FAF4] border-b border-emerald-100/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold mb-4">
            <Leaf className="w-3.5 h-3.5 text-emerald-700" />
            Mindspace Landscape Garden
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-emerald-950 font-serif tracking-tight">
            About PlantPedia
          </h1>
          <p className="text-lg sm:text-xl font-medium text-emerald-700 mt-2 font-serif">
            Your Trusted Source for Plant Knowledge
          </p>

          <p className="mt-4 text-sm sm:text-base text-emerald-900/80 max-w-2xl mx-auto leading-relaxed">
            Welcome to the digital encyclopedia for <strong>Mindspace Landscape Garden</strong>, bridging nature and technology to make botanical knowledge accessible for everyone.
          </p>
        </div>
      </section>

      {/* Main Content Sections: Purpose, Process, Vision */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full space-y-8">
        {/* 1. Our Purpose */}
        <section className="bg-white rounded-3xl p-7 sm:p-9 border border-emerald-100 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌱</span>
            <h2 className="text-2xl font-bold text-emerald-950 font-serif">
              Our Purpose
            </h2>
          </div>
          <p className="text-sm sm:text-base text-emerald-950/85 leading-relaxed">
            Each plant within this garden carries its own story — scientific, cultural, and spiritual. Our aim is to preserve and share this knowledge in the simplest way possible. By scanning the <strong className="text-emerald-800">QR codes</strong> hung near every plant, visitors can instantly access detailed information about its origin, growth pattern, medicinal use, and unique characteristics.
          </p>
        </section>

        {/* 2. The Process */}
        <section className="bg-white rounded-3xl p-7 sm:p-9 border border-emerald-100 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🍃</span>
            <h2 className="text-2xl font-bold text-emerald-950 font-serif">
              The Process
            </h2>
          </div>
          <p className="text-sm sm:text-base text-emerald-950/85 leading-relaxed">
            The data for each plant was collected manually through field visits — noting their <strong className="text-emerald-800">scientific names</strong>, capturing high-quality images, and verifying their taxonomy. All information was then integrated into this platform for easy access and learning.
          </p>
        </section>

        {/* 3. Vision */}
        <section className="bg-white rounded-3xl p-7 sm:p-9 border border-emerald-100 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌸</span>
            <h2 className="text-2xl font-bold text-emerald-950 font-serif">
              Vision
            </h2>
          </div>
          <p className="text-sm sm:text-base text-emerald-950/85 leading-relaxed">
            This project hopes to inspire curiosity, mindfulness, and respect for the green life around us. Whether you are a student, researcher, or just a passerby who paused to admire a leaf — we welcome you into this little digital forest.
          </p>
        </section>
      </div>
    </div>
  );
}
