import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Users, Award, Calendar, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

import imgGymkhana   from '../assets/gallery/gymkhana-building.jpg';
import imgBasketball from '../assets/gallery/basketball-court.jpg';
import imgGym        from '../assets/gallery/gym-equipment.jpg';
import imgBadminton  from '../assets/gallery/badminton-court.jpg';
import imgUniversity from '../assets/gallery/sanjivani-university.jpg';
import imgSportsDay  from '../assets/gallery/sports.jpg';
import imgCourt      from '../assets/gallery/court.jpg';
import imgFootball   from '../assets/gallery/football.jpg';
import imgCampus     from '../assets/gallery/campus.jpg';

const SPORTS = [
  {
    name: 'Badminton', courts: '4 Indoor Courts', icon: '🏸',
    base:  'bg-yellow-50  border-yellow-200',
    hover: 'hover:bg-yellow-100 hover:border-yellow-400 hover:shadow-yellow-100',
    text:  'text-yellow-700', dot: 'bg-yellow-400', link: 'hover:text-yellow-700',
  },
  {
    name: 'Football',  courts: '1 Full Ground',   icon: '⚽',
    base:  'bg-green-50   border-green-200',
    hover: 'hover:bg-green-100  hover:border-green-400  hover:shadow-green-100',
    text:  'text-green-700',  dot: 'bg-green-400',  link: 'hover:text-green-700',
  },
  {
    name: 'Basketball', courts: '2 Courts',       icon: '🏀',
    base:  'bg-orange-50  border-orange-200',
    hover: 'hover:bg-orange-100 hover:border-orange-400 hover:shadow-orange-100',
    text:  'text-orange-700', dot: 'bg-orange-400', link: 'hover:text-orange-700',
  },
  {
    name: 'Volleyball', courts: '2 Courts',       icon: '🏐',
    base:  'bg-blue-50    border-blue-200',
    hover: 'hover:bg-blue-100   hover:border-blue-400   hover:shadow-blue-100',
    text:  'text-blue-700',   dot: 'bg-blue-400',   link: 'hover:text-blue-700',
  },
  {
    name: 'Cricket',   courts: '1 Ground',        icon: '🏏',
    base:  'bg-red-50     border-red-200',
    hover: 'hover:bg-red-100    hover:border-red-400    hover:shadow-red-100',
    text:  'text-red-700',    dot: 'bg-red-400',    link: 'hover:text-red-700',
  },
];

const QUICK_LINKS = [
  { icon: '🏟️', label: 'Live Sessions',    to: '/dashboard', bg: 'hover:bg-navy-500',   ring: 'hover:ring-navy-200'   },
  { icon: '🎽', label: 'Borrow Equipment',  to: '/equipment', bg: 'hover:bg-saffron',    ring: 'hover:ring-orange-200' },
  { icon: '🖼️', label: 'Sports Gallery',   to: '/gallery',   bg: 'hover:bg-green-500',  ring: 'hover:ring-green-200'  },
  { icon: '📋', label: 'My Requests',      to: '/equipment', bg: 'hover:bg-purple-500',  ring: 'hover:ring-purple-200' },
];

const STATS = [
  { value: '1200+', label: 'Active Students',     icon: Users    },
  { value: '5',     label: 'Sports Disciplines',  icon: Award    },
  { value: '40+',   label: 'Events per Year',     icon: Calendar },
  { value: '85+',   label: 'Trophies Won',        icon: Award    },
];

const NEWS = [
  { img: imgSportsDay,  title: 'National Sports Day 2024',              date: '29 Aug 2024', tag: 'Event'    },
  { img: imgFootball,   title: 'Inter-Department Football Championship', date: '10 Nov 2024', tag: 'Sports'  },
  { img: imgCourt,      title: 'Multi-Purpose Sports Court Inauguration', date: '15 Jan 2024', tag: 'Facility' },
];

export default function Home() {
  return (
    <div className="bg-slate-50">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative text-white overflow-hidden">
        {/* Campus background image with dark overlay */}
        <img
          src={imgCampus}
          alt="Sanjivani Campus"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Navy gradient overlay — keeps text readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-800/75 to-navy-700/50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="animate-fade-in">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20
                              rounded-full px-4 py-1.5 text-sm text-white/80 mb-5
                              hover:bg-white/20 hover:border-white/40 transition-all duration-200 cursor-default">
                <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
                Sanjivani University, Kopargaon
              </div>

              <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-4">
                Welcome to<br />
                <span className="text-gold-400">Sanjivani</span> Gymkhana
              </h1>
              <p className="text-white/70 text-base leading-relaxed mb-8 max-w-lg">
                Your one-stop sports management portal. Book courts, borrow equipment,
                track live sessions — all in one place.
              </p>

              <div className="flex flex-wrap gap-3">
                {/* CTA button — lifts on hover */}
                <Link to="/dashboard"
                  className="btn-orange flex items-center gap-2
                             hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-900/30
                             transition-all duration-200">
                  View Live Sessions <ArrowRight size={15} />
                </Link>
                <Link to="/gallery"
                  className="border border-white/30 hover:bg-white/15 hover:border-white/60
                             text-white font-semibold px-5 py-2.5 rounded-lg
                             hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10
                             transition-all duration-200 flex items-center gap-2">
                  Sports Gallery <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Hero image collage — each image zooms on hover */}
            <div className="hidden md:grid grid-cols-2 gap-3 animate-fade-in">
              <div className="rounded-2xl overflow-hidden row-span-2 h-72
                              hover:scale-[1.02] transition-transform duration-400 shadow-lg hover:shadow-xl">
                <img src={imgGymkhana} alt="Gymkhana"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="rounded-2xl overflow-hidden h-[138px]
                              hover:scale-[1.03] transition-transform duration-300 shadow-md hover:shadow-lg">
                <img src={imgBasketball} alt="Basketball"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="rounded-2xl overflow-hidden h-[138px]
                              hover:scale-[1.03] transition-transform duration-300 shadow-md hover:shadow-lg">
                <img src={imgBadminton} alt="Badminton"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK LINKS ────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="text-center font-display font-bold text-navy-800 text-xl mb-8">
            Quick Links
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {QUICK_LINKS.map(({ icon, label, to, bg, ring }) => (
              <Link key={to + label} to={to} className="flex flex-col items-center gap-3 group">
                {/* Circle: spins emoji slightly, fills with colour */}
                <div className={`w-16 h-16 rounded-full bg-navy-50 border-2 border-navy-100
                                 flex items-center justify-center text-2xl shadow-sm
                                 group-hover:text-white group-hover:scale-110
                                 group-hover:shadow-md group-hover:border-transparent
                                 ring-4 ring-transparent ${ring}
                                 ${bg} transition-all duration-250`}>
                  <span className="group-hover:rotate-12 inline-block transition-transform duration-200">
                    {icon}
                  </span>
                </div>
                <span className="text-xs text-center font-medium text-slate-600
                                 group-hover:text-navy-700 transition-colors leading-tight">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────── */}
      <section className="bg-navy-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map(({ value, label }) => (
              <div key={label}
                className="border-r border-white/10 last:border-0 px-4
                           group cursor-default">
                {/* Number lifts and brightens on hover */}
                <p className="text-3xl font-display font-bold text-gold-400
                               group-hover:text-gold-300 group-hover:scale-110
                               transition-all duration-200 inline-block">
                  {value}
                </p>
                <p className="text-white/70 text-xs mt-1 group-hover:text-white/90
                               transition-colors duration-200">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label">About Us</p>
              <h2 className="section-title mb-4">Building Champions Since 2005</h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                The Sanjivani Gymkhana is the sporting nerve center of Sanjivani University.
                Established with the mission of nurturing athletic talent alongside academic
                excellence, the Gymkhana provides world-class facilities and competitive
                platforms for students.
              </p>
              <p className="text-slate-500 leading-relaxed mb-6">
                With state-of-the-art infrastructure, expert coaching staff, and a passionate
                sports community, we empower students to compete at inter-university,
                state, and national levels.
              </p>
              <div className="flex gap-3">
                <Link to="/gallery"
                  className="btn-primary text-sm flex items-center gap-2
                             hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                  View Gallery <ChevronRight size={14} />
                </Link>
                <a href="#contact"
                  className="btn-outline text-sm
                             hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                  Contact Us
                </a>
              </div>
            </div>

            {/* Image grid — each image zooms independently */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { src: imgUniversity, alt: 'University', cls: '' },
                { src: imgFootball,   alt: 'Football',   cls: '' },
                { src: imgCourt,      alt: 'Court',      cls: 'col-span-2' },
              ].map(({ src, alt, cls }) => (
                <div key={alt}
                  className={`overflow-hidden rounded-2xl shadow-sm
                               hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ${cls}`}>
                  <img src={src} alt={alt}
                    className="w-full h-40 object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SPORTS CARDS ───────────────────────────────────── */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <p className="section-label">Our Sports</p>
            <h2 className="section-title">5 Premier Disciplines</h2>
            <p className="section-sub">Professionally managed arenas for every Sanjivani athlete</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {SPORTS.map((s, i) => (
              <div key={s.name}
                className={`rounded-2xl border p-5 cursor-default animate-fade-in
                             shadow-sm hover:shadow-md hover:-translate-y-1
                             transition-all duration-250 ${s.base} ${s.hover}`}
                style={{ animationDelay: `${i * 80}ms` }}>

                {/* Icon bounces on card hover */}
                <div className="text-3xl mb-3 inline-block
                                group-hover:scale-125 hover:animate-bounce
                                transition-transform duration-200">
                  {s.icon}
                </div>

                <h3 className={`font-display font-bold text-base mb-1 ${s.text}`}>{s.name}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                  {s.courts}
                </p>

                <Link to="/dashboard"
                  className={`mt-3 inline-flex items-center text-xs font-semibold
                               text-navy-600 gap-1 hover:gap-2 transition-all duration-150 ${s.link}`}>
                  Live sessions <ChevronRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWS & EVENTS ──────────────────────────────────── */}
      <section className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <p className="section-label">Latest Happening</p>
            <h2 className="section-title">News &amp; Events</h2>
            <p className="section-sub">What's new on campus — events, achievements</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {NEWS.map((item) => (
              <div key={item.title}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden
                           shadow-sm hover:shadow-lg hover:-translate-y-1
                           transition-all duration-300 group cursor-pointer">

                {/* Image: zooms on card hover */}
                <div className="h-44 overflow-hidden">
                  <img src={item.img} alt={item.title}
                    className="w-full h-full object-cover
                               group-hover:scale-110 transition-transform duration-500" />
                </div>

                <div className="p-4">
                  <span className="badge badge-approved text-[10px] mb-2
                                   group-hover:bg-navy-100 group-hover:text-navy-700
                                   transition-colors duration-200">
                    {item.tag}
                  </span>
                  <h3 className="font-semibold text-slate-800 text-sm leading-snug mb-2
                                  group-hover:text-navy-700 transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400">{item.date}</p>

                  {/* Arrow slides right on hover */}
                  <div className="mt-3 flex items-center gap-1 text-xs text-navy-600
                                  font-semibold group-hover:gap-2 transition-all duration-150">
                    Read More <ChevronRight size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ────────────────────────────────────────── */}
      <section id="contact" className="bg-navy-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">Contact</p>
              <h2 className="text-2xl font-display font-bold mb-3">Gymkhana Head</h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Reach out to our sports director for bookings, events, and equipment queries.
              </p>
            </div>

            <div className="md:col-span-2 grid sm:grid-cols-2 gap-5">
              {/* Contact card — lifts on hover */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5
                               hover:bg-white/10 hover:border-white/25 hover:-translate-y-0.5
                               hover:shadow-lg hover:shadow-black/20
                               transition-all duration-250">
                <div className="w-10 h-10 rounded-full bg-navy-600 flex items-center
                                 justify-center mb-3 text-lg
                                 hover:bg-gold-500 transition-colors duration-200">
                  👨‍🏫
                </div>
                <p className="font-semibold text-white text-base">Prof. Rajesh Patil</p>
                <p className="text-gold-400 text-xs mt-0.5">Director of Sports &amp; Physical Education</p>
                <div className="mt-4 space-y-2">
                  <a href="tel:+919876543210"
                    className="flex items-center gap-2.5 text-white/60 hover:text-white
                               text-sm transition-all duration-150 hover:gap-3">
                    <Phone size={13} className="text-gold-400 flex-shrink-0" /> +91 98765 43210
                  </a>
                  <a href="mailto:gymkhana@sanjivani.edu.in"
                    className="flex items-center gap-2.5 text-white/60 hover:text-white
                               text-sm transition-all duration-150 hover:gap-3">
                    <Mail size={13} className="text-gold-400 flex-shrink-0" /> gymkhana@sanjivani.edu.in
                  </a>
                  <div className="flex items-start gap-2.5 text-white/60 text-sm">
                    <MapPin size={13} className="text-gold-400 flex-shrink-0 mt-0.5" />
                    Sanjivani University, Kopargaon – 423603
                  </div>
                </div>
              </div>

              {/* Hours card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5
                               hover:bg-white/10 hover:border-white/25 hover:-translate-y-0.5
                               hover:shadow-lg hover:shadow-black/20
                               transition-all duration-250 flex flex-col justify-between">
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Office Hours</p>
                  <p className="text-white font-semibold">Mon – Sat</p>
                  <p className="text-white/60 text-sm">9:00 AM – 5:00 PM</p>
                </div>
                <div className="mt-4">
                  <Link to="/equipment"
                    className="btn-orange text-sm w-full text-center block
                               hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                    Borrow Equipment
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
