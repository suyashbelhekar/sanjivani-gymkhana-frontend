import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';

// ── Local Sanjivani campus photos ──────────────────────────────
// Drop your 5 images into: src/assets/gallery/
// with exactly these filenames:
import imgGymkhana   from '../assets/gallery/gymkhana-building.jpg';
import imgBasketball from '../assets/gallery/basketball-court.jpg';
import imgGym        from '../assets/gallery/gym-equipment.jpg';
import imgBadminton  from '../assets/gallery/badminton-court.jpg';
import imgUniversity from '../assets/gallery/sanjivani-university.jpg';
import imgSportsDay  from '../assets/gallery/sports.jpg';
import imgCourt      from '../assets/gallery/court.jpg';
import imgFootball   from '../assets/gallery/football.jpg';

const GALLERY_ITEMS = [
  {
    sport: 'Campus',
    img: imgUniversity,
    caption: 'Sanjivani University — Main Gate, Kopargaon',
    tag: 'University',
  },
  {
    sport: 'Gymkhana',
    img: imgGymkhana,
    caption: 'Sanjivani Gymkhana — Main Building',
    tag: 'Facility',
  },
  {
    sport: 'Basketball',
    img: imgBasketball,
    caption: 'Sanjivani Basketball Court — Outdoor Arena',
    tag: 'Basketball',
  },
  {
    sport: 'Badminton',
    img: imgBadminton,
    caption: 'Sanjivani Indoor Badminton Court — Championship Court',
    tag: 'Badminton',
  },
  {
    sport: 'Fitness',
    img: imgGym,
    caption: 'Gymkhana Fitness Centre — State-of-the-Art Equipment',
    tag: 'Gym',
  },
  {
    sport: 'Events',
    img: imgSportsDay,
    caption: 'National Sports Day Celebration — 29th August',
    tag: 'Events',
  },
  {
    sport: 'Court',
    img: imgCourt,
    caption: 'Sanjivani Sports Court — Multi-Purpose Arena',
    tag: 'Facility',
  },
  {
    sport: 'Football',
    img: imgFootball,
    caption: 'Sanjivani Football Ground — Inter-Department Match',
    tag: 'Football',
  },
];

const FILTERS = ['All', 'Campus', 'Gymkhana', 'Basketball', 'Badminton', 'Fitness', 'Events', 'Football', 'Court'];

const TAG_COLORS = {
  Campus:     'text-sky-400     border-sky-500/40     bg-sky-500/10',
  Gymkhana:   'text-primary-400 border-primary-500/40 bg-primary-500/10',
  Basketball: 'text-orange-400  border-orange-500/40  bg-orange-500/10',
  Badminton:  'text-yellow-400  border-yellow-500/40  bg-yellow-500/10',
  Fitness:    'text-purple-400  border-purple-500/40  bg-purple-500/10',
  Events:     'text-green-400   border-green-500/40   bg-green-500/10',
  Football:   'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
  Court:      'text-indigo-400  border-indigo-500/40  bg-indigo-500/10',
  Facility:   'text-blue-400    border-blue-500/40    bg-blue-500/10',
};

export default function Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const items =
    filter === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((i) => i.sport === filter || i.tag === filter);

  return (
    <div className="pt-6 pb-16 bg-slate-50 min-h-screen">
      {/* Page header */}
      <div className="bg-white border-b border-slate-200 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="section-label">Our Campus</p>
          <h1 className="section-title">Sanjivani Gallery</h1>
          <p className="text-slate-400 text-sm mt-1 flex items-center gap-1.5">
            <MapPin size={13} className="text-saffron" />
            Sanjivani University, Kopargaon, Maharashtra
          </p>
        </div>
      </div>

      {/* Filter chips */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              filter === f
                ? 'bg-navy-500 text-white border-navy-500 shadow-sm'
                : 'bg-white text-slate-500 border-slate-200 hover:border-navy-300 hover:text-navy-600'
            }`}
          >
            {f}
          </button>
        ))}
        </div>

      {/* Masonry grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => setLightbox(item)}
            className="break-inside-avoid bg-white rounded-2xl overflow-hidden group cursor-pointer
                       border border-slate-100 hover:shadow-hover hover:border-navy-200
                       transition-all duration-200 animate-fade-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="relative overflow-hidden">
              <img
                src={item.img}
                alt={item.caption}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  // Fallback if image file isn't dropped in yet
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback placeholder shown if file is missing */}
              <div
                className="hidden w-full h-48 bg-dark-700 items-center justify-center text-gray-500 text-sm"
              >
                📷 {item.caption}
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-dark-900/60 opacity-0 group-hover:opacity-100
                              transition-opacity duration-300 flex items-end p-4">
                <div>
                  <span className={`badge border ${TAG_COLORS[item.sport]} mb-2`}>
                    {item.tag}
                  </span>
                  <p className="text-white text-sm font-medium">{item.caption}</p>
                </div>
              </div>
            </div>

            {/* Caption strip below image */}
            <div className="px-4 py-3 flex items-center justify-between border-t border-slate-100">
              <p className="text-slate-600 text-sm truncate pr-2">{item.caption}</p>              <span className={`badge border flex-shrink-0 ${TAG_COLORS[item.sport]}`}>
                {item.tag}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="text-center py-24 bg-white rounded-2xl border border-slate-100">
          <p className="text-4xl mb-3">📷</p>
          <p className="text-slate-400">No photos for this category.</p>
        </div>
      )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center
                     justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-10 right-0 text-gray-400 hover:text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X size={26} />
            </button>
            <img
              src={lightbox.img}
              alt={lightbox.caption}
              className="w-full rounded-2xl shadow-2xl"
            />
            <div className="mt-4 flex items-center gap-3">
              <span className={`badge border ${TAG_COLORS[lightbox.sport]}`}>
                {lightbox.tag}
              </span>
              <p className="text-slate-300 text-sm">{lightbox.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
