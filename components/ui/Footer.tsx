import React from 'react';
import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 w-full bg-emerald-950 text-emerald-100/80 border-t border-emerald-900/60 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/30 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-emerald-100 text-sm tracking-wide">
                Mindspace Landscape Garden
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-300/80">
            <Link href="/" className="hover:text-emerald-100 transition-colors">
              Home
            </Link>
            <Link href="/plants" className="hover:text-emerald-100 transition-colors">
              Plants
            </Link>
            <Link href="/services" className="hover:text-emerald-100 transition-colors">
              Services
            </Link>
            <Link href="/garden-map" className="hover:text-emerald-100 transition-colors">
              Garden Map
            </Link>
            <Link href="/about" className="hover:text-emerald-100 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-emerald-100 transition-colors">
              Contact
            </Link>
          </div>

          <div className="text-xs text-center md:text-right text-emerald-400/70 space-y-1">
            <p>© 2026 PlantPedia. All rights reserved.</p>
            <p>Developed By Vikas Pal</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
