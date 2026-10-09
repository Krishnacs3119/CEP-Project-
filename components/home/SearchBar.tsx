'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, Wind, Sparkles, ArrowRight } from 'lucide-react';
import { Plant } from '@/types/plant';

interface SearchBarProps {
  onSelectPlant?: (plant: Plant) => void;
}

export default function SearchBar({
  onSelectPlant,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounced search via /api/plants
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(`/api/plants?q=${encodeURIComponent(query.trim())}&limit=6`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.items || []);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto z-30">
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <div className="absolute left-4.5 pointer-events-none text-emerald-700">
          <Search className="w-5 h-5" />
        </div>

        <input
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search plants by common or scientific name (e.g. Dragon Tree, Plumeria, Ficus)..."
          className="w-full pl-12 pr-12 py-4 bg-white/95 backdrop-blur-md rounded-2xl border-2 border-emerald-300/80 shadow-lg shadow-emerald-950/5 text-emerald-950 placeholder-emerald-800/50 text-sm sm:text-base font-medium focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setResults([]);
            }}
            className="absolute right-4 p-1.5 rounded-lg text-emerald-600 hover:text-emerald-900 hover:bg-emerald-100/60 transition-colors"
            aria-label="Clear search input"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-emerald-200 shadow-2xl overflow-hidden z-40">
          {isLoading ? (
            <div className="p-6 text-center text-sm text-emerald-700 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Searching botanical records...
            </div>
          ) : results.length > 0 ? (
            <div className="divide-y divide-emerald-100 max-h-[380px] overflow-y-auto">
              <div className="px-4 py-2 bg-emerald-50/70 text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex justify-between items-center">
                <span>Matching Plants ({results.length})</span>
                <span>Click to view profile</span>
              </div>
              {results.map((plant) => (
                <div
                  key={plant.id}
                  className="p-3.5 hover:bg-emerald-50/80 transition-colors flex items-center justify-between gap-3 group cursor-pointer"
                  onClick={() => {
                    onSelectPlant?.(plant);
                    setIsOpen(false);
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-emerald-900/10 flex-shrink-0">
                      <Image
                        src={plant.image_url}
                        alt={plant.common_name}
                        fill
                        sizes="48px"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-emerald-950 font-serif truncate group-hover:text-emerald-700 transition-colors">
                        {plant.common_name}
                      </p>
                      <p className="text-xs italic text-emerald-700 font-serif truncate">
                        {plant.scientific_name}
                      </p>
                      <span className="inline-block text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full mt-1">
                        {plant.type}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/plants/${plant.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-xl bg-emerald-100 text-emerald-900 group-hover:bg-emerald-700 group-hover:text-white transition-colors flex-shrink-0"
                    title="Open full page"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="p-6 text-center">
              <p className="text-sm font-semibold text-emerald-950">
                No plants match &lsquo;{query}&rsquo;
              </p>
              <p className="text-xs text-emerald-800/80 mt-1 max-w-sm mx-auto">
                Try searching with a different common name, scientific name, or plant category.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
