import React from 'react';
import Link from 'next/link';
import { Leaf, Search, ArrowLeft } from 'lucide-react';

export default function PlantNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 border border-emerald-100 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
          <Leaf className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase tracking-wider font-bold text-emerald-700">
          404 — Specimen Not Cataloged
        </span>

        <h1 className="text-2xl font-bold text-emerald-950 font-serif mt-2">
          Plant Record Not Found
        </h1>

        <p className="text-sm text-emerald-800/80 mt-2 leading-relaxed">
          The requested botanical identifier could not be located in our repository. The specimen may have been relocated or the QR code URL may be outdated.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Garden
          </Link>
          <Link
            href="/plants"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-medium text-sm border border-emerald-200 transition-colors"
          >
            <Search className="w-4 h-4" />
            Browse All Plants
          </Link>
        </div>
      </div>
    </div>
  );
}
