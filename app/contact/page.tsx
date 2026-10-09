import React from 'react';
import { Metadata } from 'next';
import { MapPin, Clock, Users, Code2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us & Team Credits — Mindspace Landscape Garden',
  description:
    'Visiting hours, location, and project credits for Mindspace Landscape Garden plant encyclopedia.',
};

export default function ContactPage() {
  const contactConfig = {
    gardenName: 'Mindspace Landscape Garden',
    address:
      process.env.NEXT_PUBLIC_CONTACT_ADDRESS ||
      'Mindspace Landscape Garden, Mindspace, Malad West, Mumbai, Maharashtra 400064, India',
    workingHours:
      process.env.NEXT_PUBLIC_WORKING_HOURS ||
      '6:00 AM – 12:00 PM & 3:00 PM – 9:00 PM (Daily)',
  };

  const teamMembers = [
    'Jeetesh J Shirganoor',
    'Abhishek Singh',
    'Krishna Chaudhary',
    'Pushpal Pathak',
  ];

  return (
    <div className="w-full flex-1 flex flex-col bg-[#F4FAF4]">
      {/* Hero Header */}
      <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-emerald-100/70 via-emerald-50/40 to-[#F4FAF4] border-b border-emerald-100/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold mb-4">
            🌿 Mindspace Landscape Garden
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-emerald-950 font-serif tracking-tight">
            Contact & Team Credits
          </h1>
          <p className="text-lg sm:text-xl font-medium text-emerald-700 mt-2 font-serif">
            Visiting hours, garden location & project contributors 🌿
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full space-y-10">
        {/* Main Garden Info Card */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 font-serif">
              {contactConfig.gardenName}
            </h2>
            <p className="text-sm sm:text-base text-emerald-900/75 mt-1">
              Malad West, Mumbai, Maharashtra
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
            <div className="flex items-start gap-4 p-5 bg-emerald-50/60 rounded-2xl border border-emerald-100 shadow-xs">
              <MapPin className="w-6 h-6 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-emerald-950 block text-base mb-1">
                  Garden Location
                </span>
                <span className="text-emerald-900/80 leading-relaxed text-sm">
                  {contactConfig.address}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-emerald-50/60 rounded-2xl border border-emerald-100 shadow-xs">
              <Clock className="w-6 h-6 text-emerald-700 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-emerald-950 block text-base mb-1">
                  Garden Timings
                </span>
                <span className="text-emerald-900/90 font-medium leading-relaxed text-sm">
                  {contactConfig.workingHours}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Team Credits Card */}
        <section className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-green-950 rounded-3xl p-7 sm:p-10 text-white shadow-xl border border-emerald-800/60 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-800/80 border border-emerald-700/60 flex items-center justify-center text-emerald-200">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                  Project Contributors
                </span>
                <h3 className="text-2xl font-bold font-serif text-white">
                  🌿 Team Credits
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-3xl">
              A huge thank you to the amazing team who made this project possible:
            </p>

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {teamMembers.map((member) => (
                <div
                  key={member}
                  className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition-all text-center"
                >
                  <p className="font-semibold text-emerald-50 text-sm">{member}</p>
                  <span className="text-[11px] text-emerald-300 font-medium block mt-0.5">
                    Field Research & Data
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
              Their dedication in collecting and verifying the plant data brought life to this digital garden.
            </p>

            {/* Web Development Credit */}
            <div className="pt-4 border-t border-emerald-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs text-emerald-300 font-medium block">
                    Web Development
                  </span>
                  <p className="text-base font-bold text-white tracking-wide">
                    Vikas Pal
                  </p>
                </div>
              </div>
              <span className="text-xs text-emerald-300/80 italic">
                Making this whole experience blossom online ✨
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
