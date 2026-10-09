'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Trees,
  Compass,
  ExternalLink,
  Navigation,
  Leaf,
  Focus,
} from 'lucide-react';
import { mindspaceGarden } from '@/data/gardens';

declare global {
  interface Window {
    google?: any;
    initPlantPediaGoogleMap?: () => void;
  }
}

export default function GardenMapInteractive() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const googleMapInstanceRef = useRef<any>(null);
  const googleMarkerRef = useRef<any>(null);
  const [useJsApi, setUseJsApi] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Exact coordinates
  const lat = mindspaceGarden.coordinates[0]; // 19.1794904
  const lng = mindspaceGarden.coordinates[1]; // 72.8336388
  const googleMapsUrl = mindspaceGarden.googleMapsUrl; // https://maps.app.goo.gl/Gf5JysVXwcvBLFGm8

  // Google Maps API key from environment variable
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Initialize Google Maps JS API if an API key is provided
  useEffect(() => {
    if (!apiKey) return;

    let isMounted = true;

    const initMap = () => {
      if (!isMounted || !mapContainerRef.current || !window.google?.maps) return;

      const position = { lat, lng };

      const map = new window.google.maps.Map(mapContainerRef.current, {
        center: position,
        zoom: 17,
        mapTypeId: 'roadmap',
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
      });

      const marker = new window.google.maps.Marker({
        position,
        map,
        title: mindspaceGarden.name,
        animation: window.google.maps.Animation.DROP,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="font-family: inherit; padding: 6px 10px; max-width: 240px;">
            <span style="display: inline-block; font-size: 10px; font-weight: 700; text-transform: uppercase; color: #065f46; background: #ecfdf5; padding: 2px 8px; border-radius: 9999px; margin-bottom: 4px; border: 1px solid #a7f3d0;">
              ${mindspaceGarden.category}
            </span>
            <h4 style="margin: 2px 0 4px; font-weight: 700; color: #064e3b; font-size: 15px;">
              ${mindspaceGarden.name}
            </h4>
            <p style="margin: 0; color: #047857; font-size: 12px; font-weight: 600;">
              📍 ${mindspaceGarden.area}
            </p>
          </div>
        `,
      });

      // Show info window on load and on click
      infoWindow.open({ anchor: marker, map });

      marker.addListener('click', () => {
        infoWindow.open({ anchor: marker, map });
      });

      googleMapInstanceRef.current = map;
      googleMarkerRef.current = marker;
      setUseJsApi(true);
      setIsMapLoaded(true);
    };

    if (window.google?.maps) {
      initMap();
    } else {
      window.initPlantPediaGoogleMap = initMap;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initPlantPediaGoogleMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    return () => {
      isMounted = false;
      if (window.initPlantPediaGoogleMap) {
        delete window.initPlantPediaGoogleMap;
      }
    };
  }, [apiKey, lat, lng]);

  // Recenter map on exact Mindspace Garden location
  const handleRecenter = useCallback(() => {
    if (useJsApi && googleMapInstanceRef.current) {
      googleMapInstanceRef.current.panTo({ lat, lng });
      googleMapInstanceRef.current.setZoom(17);
      if (googleMarkerRef.current) {
        googleMarkerRef.current.setAnimation(window.google?.maps?.Animation?.BOUNCE);
        setTimeout(() => {
          googleMarkerRef.current?.setAnimation(null);
        }, 1200);
      }
    } else {
      // Re-trigger iframe center
      setIframeKey((prev) => prev + 1);
    }
  }, [useJsApi, lat, lng]);

  // Google Maps interactive embed URL centered on exact coordinates
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${lat},${lng}(Mindspace+Garden)&t=&z=17&ie=UTF8&iwloc=B&output=embed`;

  return (
    <div className="w-full flex-1 flex flex-col bg-[#F4FAF4]">
      {/* Header Section */}
      <section className="relative overflow-hidden py-12 sm:py-16 bg-gradient-to-b from-emerald-100/70 via-emerald-50/40 to-[#F4FAF4] border-b border-emerald-100/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-semibold mb-4">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            Botanical Garden Location
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-emerald-950 font-serif tracking-tight">
            Explore Gardens Near You
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl font-medium text-emerald-700 mt-2 font-serif">
            Discover gardens, parks and green spaces around you.
          </p>

          <p className="mt-3 text-sm sm:text-base text-emerald-900/80 max-w-2xl mx-auto leading-relaxed">
            Visit the flagship garden of PlantPedia. Explore live botanical flora in person, scan on-site QR codes, and enjoy the urban greenery.
          </p>
        </div>
      </section>

      {/* Main Map Section: Garden Card + Google Maps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex-1 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start min-h-[560px]">
          {/* Left Column: Garden Information Card (Kept Intact) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
              {/* Card Header & Badge */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    <Trees className="w-3.5 h-3.5 text-emerald-700" />
                    {mindspaceGarden.category}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700/80 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/50">
                    19.1795° N, 72.8336° E
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-serif leading-tight">
                  {mindspaceGarden.name}
                </h2>

                <div className="flex items-center gap-2 text-sm text-emerald-800 font-semibold">
                  <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{mindspaceGarden.area}</span>
                </div>
              </div>

              {/* Garden Description */}
              <p className="text-sm sm:text-base text-emerald-900/85 leading-relaxed font-sans border-t border-emerald-100/80 pt-4">
                &ldquo;{mindspaceGarden.description}&rdquo;
              </p>

              {/* Garden Highlights List */}
              <div className="bg-emerald-50/60 rounded-2xl p-4 border border-emerald-100 space-y-2 text-xs text-emerald-950">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">📍 Address:</span>
                  <span className="text-emerald-900/80">{mindspaceGarden.address}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">🌿 Flora:</span>
                  <span className="text-emerald-900/80">49+ Documented Botanical Specimens</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">📱 Digital:</span>
                  <span className="text-emerald-900/80">Physical QR Codes on Garden Plants</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={handleRecenter}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-900 hover:bg-emerald-800 text-white font-semibold text-sm shadow-sm transition-all cursor-pointer group"
                >
                  <Focus className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
                  <span>Center Marker on Map</span>
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-semibold shadow-xs transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3 text-emerald-600" />
                  </a>

                  <Link
                    href="/plants"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-100/70 hover:bg-emerald-200 text-emerald-950 text-xs font-semibold transition-colors"
                  >
                    <Leaf className="w-3.5 h-3.5 text-emerald-700" />
                    <span>View All Plants</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Display */}
          <div className="lg:col-span-7 h-[480px] lg:h-[580px] rounded-3xl overflow-hidden border border-emerald-200/90 shadow-md relative bg-emerald-50/50">
            {/* Top Indicator Overlay */}
            <div className="absolute top-4 left-4 z-20 pointer-events-auto">
              <div className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-emerald-200/80 shadow-sm text-xs font-semibold text-emerald-950 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                <span>Google Maps • Mindspace Garden</span>
              </div>
            </div>

            {/* Google Maps JS API Container (if API key provided) */}
            {apiKey && (
              <div
                ref={mapContainerRef}
                className={`w-full h-full min-h-[480px] ${useJsApi ? 'block' : 'hidden'}`}
              />
            )}

            {/* Google Maps Real Interactive View (Default / Embed) */}
            {(!apiKey || !useJsApi) && (
              <iframe
                key={iframeKey}
                ref={iframeRef}
                src={googleMapsEmbedUrl}
                title="Google Maps — Mindspace Garden, Malad West, Mumbai"
                width="100%"
                height="100%"
                className="w-full h-full border-0 min-h-[480px]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setIsMapLoaded(true)}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
