import React from 'react';

/**
 * HeroBotanicalAccents
 * Exact original subtle botanical accents for the Hero section:
 * - Soft, low-opacity hanging vine on the left edge (7-8% opacity)
 * - Soft leaf/fern branch on the right edge (7-8% opacity)
 * - Subtle ambient radial glow behind the title
 * - Cleanly contained inside the hero section with zero layout interference
 */
export default function HeroBotanicalAccents() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* Soft Center Halo behind Hero Title (approx 8% opacity) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[340px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08)_0%,rgba(52,211,153,0.03)_50%,transparent_75%)] blur-2xl" />

      {/* Top-Left: Gracefully Cascading Hanging Vine with Leaves (7-8% opacity) */}
      <svg
        className="absolute -top-6 -left-6 sm:top-0 sm:left-4 w-56 h-72 sm:w-72 sm:h-96 text-emerald-900 opacity-[0.08] transform-gpu"
        viewBox="0 0 240 320"
        fill="currentColor"
      >
        {/* Curving vine stem */}
        <path
          d="M20,-20 C50,40 10,100 60,160 C100,210 50,270 90,320"
          stroke="currentColor"
          strokeWidth="3.5"
          fill="none"
        />
        {/* Alternating organic vine leaves */}
        <path d="M28,30 C55,15 70,30 65,55 C45,60 30,50 28,30 Z" />
        <path d="M38,75 C20,95 25,115 50,110 C55,90 45,75 38,75 Z" />
        <path d="M52,120 C80,110 95,125 90,150 C70,155 55,140 52,120 Z" />
        <path d="M60,170 C40,190 45,210 70,205 C75,185 65,170 60,170 Z" />
        <path d="M72,220 C100,210 115,225 110,250 C90,255 75,240 72,220 Z" />
        <path d="M78,270 C60,290 65,310 90,305 C95,285 85,270 78,270 Z" />
        {/* Small tender sprouts */}
        <ellipse cx="48" cy="45" rx="5" ry="9" transform="rotate(-30 48 45)" />
        <ellipse cx="70" cy="135" rx="6" ry="10" transform="rotate(25 70 135)" />
        <ellipse cx="90" cy="235" rx="5" ry="9" transform="rotate(35 90 235)" />
      </svg>

      {/* Top-Right: Tropical Palm & Monstera Frond Silhouette (7-8% opacity) */}
      <svg
        className="absolute -top-10 -right-8 sm:top-2 sm:right-6 w-64 h-64 sm:w-80 sm:h-80 text-emerald-900 opacity-[0.08] rotate-12 transform-gpu"
        viewBox="0 0 280 280"
        fill="currentColor"
      >
        {/* Main Arching Branch */}
        <path
          d="M260,20 C190,40 110,120 40,260 C90,180 180,90 260,20 Z"
        />
        {/* Feathered Frond Leaflets */}
        <path d="M260,20 C230,35 195,40 180,30 C195,15 230,10 260,20 Z" />
        <path d="M235,40 C200,60 165,70 150,55 C170,40 210,35 235,40 Z" />
        <path d="M205,65 C170,95 135,105 120,85 C140,70 180,60 205,65 Z" />
        <path d="M175,95 C140,130 105,140 90,120 C110,100 150,90 175,95 Z" />
        <path d="M140,130 C105,170 80,175 65,155 C85,135 120,125 140,130 Z" />
        <path d="M105,170 C75,210 55,215 40,195 C60,175 90,165 105,170 Z" />
        {/* Counter Leaflets */}
        <path d="M245,30 C235,60 230,85 220,90 C215,70 225,45 245,30 Z" />
        <path d="M215,60 C200,95 190,120 180,125 C175,105 190,75 215,60 Z" />
        <path d="M180,95 C165,130 155,155 140,160 C140,140 155,110 180,95 Z" />
        <path d="M145,130 C130,165 120,190 105,195 C105,175 120,145 145,130 Z" />
      </svg>

      {/* Bottom-Left: Subtle Willow Foliage Silhouette Accent (6-7% opacity) */}
      <svg
        className="hidden md:block absolute -bottom-10 left-8 w-48 h-48 text-emerald-800 opacity-[0.07] rotate-45 transform-gpu"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M20,180 Q80,120 180,40" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <path d="M60,150 C80,125 105,135 95,155 C75,165 60,150 60,150 Z" />
        <path d="M100,115 C120,90 145,100 135,120 C115,130 100,115 100,115 Z" />
        <path d="M140,75 C160,50 185,60 175,80 C155,90 140,75 140,75 Z" />
        <path d="M50,135 C35,115 45,95 65,105 C70,125 50,135 50,135 Z" />
        <path d="M90,95 C75,75 85,55 105,65 C110,85 90,95 90,95 Z" />
      </svg>

      {/* Bottom-Right: Soft Organic Abstract Botanical Accent (6% opacity) */}
      <svg
        className="hidden md:block absolute -bottom-14 right-12 w-52 h-52 text-emerald-900 opacity-[0.06] -rotate-12 transform-gpu"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M38.1,-58.2C49.9,-51.2,60.2,-41.2,66.7,-28.8C73.3,-16.4,76.2,-1.5,73.4,12.3C70.6,26.1,62.2,38.7,51.3,48.7C40.4,58.7,27.1,66.1,12.9,68.9C-1.3,71.7,-16.5,69.9,-30.2,63.7C-43.9,57.5,-56.1,46.9,-64.1,33.5C-72.1,20.1,-75.8,3.9,-73.2,-11.1C-70.6,-26.1,-61.7,-40,-49.6,-47.4C-37.5,-54.8,-22.2,-55.8,-7.4,-57.4C7.4,-59.1,26.3,-65.2,38.1,-58.2Z" transform="translate(100 100)" />
      </svg>
    </div>
  );
}
