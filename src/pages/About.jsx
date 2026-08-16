import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy, Users, Award, Calendar, Target, Star,
  ChevronRight, ArrowRight, BookOpen, Zap, Shield, Heart,
} from 'lucide-react';

import imgCampus      from '../assets/gallery/campus.jpg';
import imgGymkhana    from '../assets/gallery/gymkhana-building.jpg';
import imgUniversity  from '../assets/gallery/sanjivani-university.jpg';
import imgSports      from '../assets/gallery/sports.jpg';
import imgCourt       from '../assets/gallery/court.jpg';
import imgGym         from '../assets/gallery/gym-equipment.jpg';
import imgFootball    from '../assets/gallery/football.jpg';
import imgBasketball  from '../assets/gallery/basketball-court.jpg';
import imgBadminton   from '../assets/gallery/badminton-court.jpg';

// ── Intersection observer hook for scroll animations ──────────
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── Animated counter ──────────────────────────────────────────
function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useScrollReveal(0.3);
  useEffect(() => {
    if (!visible) return;
    const num = parseInt(target.replace(/\D/g, ''), 10);
    const step = Math.ceil(num / 40);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, num);
      setCount(current);
      if (current >= num) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [visible, target]);
  return (
    <span ref={ref} className="tabular-nums">
      {count}{target.includes('+') ? '+' : ''}{suffix}
    </span>
  );
}

// ── Data ──────────────────────────────────────────────────────
const STATS = [
  { value: '1200+', label: 'Active Students',    icon: Users,    color: 'text-navy-600',  bg: 'bg-navy-50'  },
  { value: '5',     label: 'Sports Disciplines', icon: Trophy,   color: 'text-gold-600',  bg: 'bg-amber-50' },
  { value: '40+',   label: 'Events per Year',    icon: Calendar, color: 'text-green-600', bg: 'bg-green-50' },
  { value: '85+',   label: 'Trophies Won',       icon: Award,    color: 'text-saffron',   bg: 'bg-orange-50'},
];

const CORE_VALUES = [
  { icon: Target,   title: 'Excellence',   desc: 'We push every student to exceed their own limits and compete at the highest levels.',        color: 'feature-icon-navy'   },
  { icon: Users,    title: 'Teamwork',     desc: 'Sports build bonds. We cultivate collaboration, mutual respect, and collective growth.',      color: 'feature-icon-gold'   },
  { icon: Shield,   title: 'Integrity',    desc: 'Fair play and sportsmanship form the ethical backbone of everything we do at the Gymkhana.',  color: 'feature-icon-orange' },
  { icon: Heart,    title: 'Inclusion',    desc: 'Every student, every discipline, every background — all are welcome and valued here.',        color: 'feature-icon-navy'   },
  { icon: Zap,      title: 'Innovation',   desc: 'From digital booking to live dashboards, we blend technology with sport for a seamless experience.', color: 'feature-icon-gold' },
  { icon: BookOpen, title: 'Development',  desc: 'Beyond wins, we focus on life skills — discipline, resilience, leadership, and character.',   color: 'feature-icon-orange' },
];

const TIMELINE = [
  { year: '2005', title: 'Gymkhana Founded',            desc: 'The Sports Gymkhana was established under Sanjivani College of Engineering with 2 disciplines.' },
  { year: '2009', title: 'University Expansion',        desc: 'Upgraded to university level — new courts, football ground, and volleyball arenas added.' },
  { year: '2014', title: 'National Recognition',        desc: 'Students represented Maharashtra at the All India Inter-University Games for the first time.' },
  { year: '2018', title: 'Infrastructure Overhaul',     desc: 'State-of-the-art gymnasium, indoor badminton hall with 4 courts, and flood-lit grounds inaugurated.' },
  { year: '2022', title: 'Digital Transformation',      desc: 'Equipment borrowing and court booking portal launched — the first of its kind in the region.' },
  { year: '2024', title: 'Live Dashboard & 85 Trophies', desc: 'Real-time session tracking launched. Gymkhana celebrated 85+ inter-university trophies.' },
];

const SPORTS_FACILITIES = [
  { sport: 'Badminton',  icon: '🏸', img: imgBadminton,  courts: '4 Indoor Courts',  feat: 'Synthetic flooring, professional lighting, BWF-standard nets' },
  { sport: 'Basketball', icon: '🏀', img: imgBasketball, courts: '2 Outdoor Courts', feat: 'Tartan surface, NBA-spec hoops, flood lights for night play' },
  { sport: 'Football',   icon: '⚽', img: imgFootball,   courts: '1 Full Ground',    feat: 'Natural turf, regulation size, dressing rooms & coaching zone' },
  { sport: 'Cricket',    icon: '🏏', img: imgCourt,      courts: '1 Cricket Ground', feat: 'Turf pitch, practice nets, bowling machine available' },
  { sport: 'Gym',        icon: '🏋️', img: imgGym,        courts: 'Fully Equipped',   feat: 'Cardio machines, free weights, personal trainer on request' },
];

const TEAM = [
  { name: 'Dr. Rajesh Patil',     role: 'Director of Sports',    initial: 'R', color: 'bg-navy-500'   },
  { name: 'Mr. Suresh Kale',      role: 'Head Coach – Cricket',  initial: 'S', color: 'bg-green-500'  },
  { name: 'Ms. Priya Deshmukh',   role: 'Badminton & Volleyball',initial: 'P', color: 'bg-purple-500' },
  { name: 'Mr. Akash Sharma',     role: 'Football & Athletics',  initial: 'A', color: 'bg-saffron'    },
];

// ── Page ──────────────────────────────────────────────────────
export default function About() {
  const [heroRef, heroVisible]         = useScrollReveal(0.1);
  const [statsRef, statsVisible]       = useScrollReveal(0.2);
  const [missionRef, missionVisible]   = useScrollReveal(0.15);
  const [valuesRef, valuesVisible]     = useScrollReveal(0.1);
  const [timelineRef, timelineVisible] = useScrollReveal(0.1);
  const [facilitiesRef, facVisible]    = useScrollReveal(0.1);
  const [teamRef, teamVisible]         = useScrollReveal(0.15);

  return (
    <div className="bg-slate-50 overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative text-white overflow-hidden min-h-[420px] flex items-center">
        <img src={imgCampus} alt="Sanjivani Campus"
          className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="hero-overlay absolute inset-0" />

        {/* Floating decorative circles */}
        <div className="absolute top-10 right-16 w-64 h-64 rounded-full border border-white/10 animate-spin-slow" />
        <div className="absolute bottom-8 right-32 w-36 h-36 rounded-full border border-white/5 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        <div className="absolute -top-4 left-1/3 w-24 h-24 rounded-full bg-gold-500/10 animate-float" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full"
          ref={heroRef}>
          {/* Breadcrumb */}
          <div className={`flex items-center gap-2 text-white/50 text-xs mb-5 transition-all duration-700 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/80">About Us</span>
          </div>

          <div className={`transition-all duration-700 delay-100 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20
                            rounded-full px-4 py-1.5 text-sm text-white/80 mb-5
                            hover:bg-white/20 transition-all duration-200 cursor-default">
              <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
              Sanjivani University Gymkhana
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-4">
              About <span className="text-gold-400">Sanjivani</span> Gymkhana
            </h1>
            <p className="text-white/70 text-base leading-relaxed max-w-2xl">
              Building champions, nurturing talent, and fostering sportsmanship since 2005.
              The sporting nerve center of Sanjivani University, Kopargaon.
            </p>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-100" ref={statsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ value, label, icon: Icon, color, bg }, i) => (
              <div key={label}
                className={`stat-card group transition-all duration-500 ${
                  statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                <div className={`feature-icon mx-auto mb-3 ${bg} ${color}
                                 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <Icon size={22} />
                </div>
                <p className={`text-3xl font-display font-bold ${color} stat-value`}>
                  <AnimatedCounter target={value} />
                </p>
                <p className="text-slate-500 text-xs mt-1 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ──────────────────────────────── */}
      <section className="bg-slate-50 py-16" ref={missionRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Text */}
            <div className={`transition-all duration-700 ${
              missionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}>
              <p className="section-label">Who We Are</p>
              <h2 className="section-title mb-5">
                Building Champions<br />
                <span className="text-gradient">Since 2005</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                The Sanjivani Gymkhana is the sporting nerve center of Sanjivani University,
                Kopargaon. Established with the mission of nurturing athletic talent alongside
                academic excellence, the Gymkhana provides world-class facilities and competitive
                platforms for every student.
              </p>
              <p className="text-slate-500 leading-relaxed mb-6">
                With state-of-the-art infrastructure, expert coaching staff, and a passionate
                sports community, we empower students to compete at inter-university, state,
                and national levels — while developing the life skills that define great
                human beings.
              </p>

              {/* Mission / Vision cards */}
              <div className="grid sm:grid-cols-2 gap-4 mb-7">
                {[
                  { icon: Target,  title: 'Our Mission', text: 'Provide every student equal access to world-class sports facilities and expert coaching.', bg: 'bg-navy-50', color: 'text-navy-600' },
                  { icon: Star,    title: 'Our Vision',  text: 'Become the premier sports institution in Maharashtra, producing national champions.', bg: 'bg-amber-50', color: 'text-amber-600' },
                ].map(({ icon: Icon, title, text, bg, color }) => (
                  <div key={title}
                    className={`${bg} border border-slate-100 rounded-2xl p-4
                                group hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}>
                    <Icon size={18} className={`${color} mb-2 group-hover:scale-110 transition-transform duration-200`} />
                    <p className="font-semibold text-navy-800 text-sm mb-1">{title}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Link to="/gallery"
                  className="btn-glow btn-shimmer text-sm flex items-center gap-2">
                  View Gallery <ArrowRight size={14} />
                </Link>
                <Link to="/contact"
                  className="btn-outline text-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Image collage */}
            <div className={`transition-all duration-700 delay-200 ${
              missionVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}>
              <div className="grid grid-cols-2 gap-3">
                <div className="img-zoom row-span-2 h-72 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <img src={imgGymkhana} alt="Gymkhana Building" />
                </div>
                <div className="img-zoom h-[138px] shadow-md hover:shadow-lg transition-shadow duration-300">
                  <img src={imgUniversity} alt="University" />
                </div>
                <div className="img-zoom h-[138px] shadow-md hover:shadow-lg transition-shadow duration-300">
                  <img src={imgSports} alt="Sports Day" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ───────────────────────────────────── */}
      <section className="bg-white py-16" ref={valuesRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${
            valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <p className="section-label">What Drives Us</p>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-sub max-w-lg mx-auto">
              These six principles guide every decision, every practice, and every competition
              at the Sanjivani Gymkhana.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map(({ icon: Icon, title, desc, color }, i) => (
              <div key={title}
                className={`card group p-6 cursor-default
                             hover:-translate-y-2 hover:shadow-hover hover:border-navy-100
                             transition-all duration-500 ${
                  valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}>
                <div className={`${color} mb-4`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-display font-bold text-navy-800 mb-2 text-base
                                group-hover:text-navy-600 transition-colors duration-200">
                  {title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────── */}
      <section className="bg-navy-800 text-white py-16 overflow-hidden" ref={timelineRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${
            timelineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-1">Our Journey</p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
              Milestones Through the Years
            </h2>
          </div>

          {/* Timeline grid */}
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
            {TIMELINE.map(({ year, title, desc }, i) => (
              <div key={year}
                className={`flex gap-5 pb-10 transition-all duration-700 ${
                  timelineVisible ? 'opacity-100 translate-x-0' : i % 2 === 0 ? 'opacity-0 -translate-x-12' : 'opacity-0 translate-x-12'
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}>

                {/* Year pill */}
                <div className="flex-shrink-0 flex flex-col items-center gap-2 pt-1">
                  <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-500/40
                                   flex items-center justify-center text-gold-400 text-xs font-bold
                                   hover:bg-gold-500/30 hover:scale-110 transition-all duration-200 cursor-default">
                    {year.slice(2)}
                  </div>
                  {i < TIMELINE.length - 2 && (
                    <div className="w-px flex-1 bg-white/10 min-h-[2rem]" />
                  )}
                </div>

                {/* Content */}
                <div className="pt-2 group">
                  <p className="text-gold-400 text-xs font-semibold mb-0.5">{year}</p>
                  <h3 className="font-display font-bold text-white text-base mb-1
                                  group-hover:text-gold-300 transition-colors duration-200">
                    {title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACILITIES ────────────────────────────────────── */}
      <section className="bg-slate-50 py-16" ref={facilitiesRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${
            facVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <p className="section-label">Infrastructure</p>
            <h2 className="section-title">World-Class Facilities</h2>
            <p className="section-sub">Five sports. One campus. Every facility built for performance.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {SPORTS_FACILITIES.map(({ sport, icon, img, courts, feat }, i) => (
              <div key={sport}
                className={`bg-white rounded-2xl border border-slate-100 overflow-hidden
                             shadow-sm group cursor-default
                             hover:-translate-y-2 hover:shadow-hover hover:border-navy-200
                             transition-all duration-500 ${
                  facVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}>

                {/* Image */}
                <div className="h-36 overflow-hidden">
                  <img src={img} alt={sport}
                    className="w-full h-full object-cover
                               group-hover:scale-110 transition-transform duration-500" />
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl group-hover:animate-wiggle inline-block">{icon}</span>
                    <h3 className="font-display font-bold text-navy-800 text-sm
                                    group-hover:text-navy-600 transition-colors">{sport}</h3>
                  </div>
                  <p className="text-xs font-semibold text-saffron mb-1">{courts}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{feat}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────── */}
      <section className="bg-white py-16" ref={teamRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 transition-all duration-700 ${
            teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <p className="section-label">The People Behind</p>
            <h2 className="section-title">Our Sports Staff</h2>
            <p className="section-sub">Experienced coaches and administrators dedicated to your growth.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {TEAM.map(({ name, role, initial, color }, i) => (
              <div key={name}
                className={`card text-center p-6 group cursor-default
                             hover:-translate-y-2 hover:shadow-hover
                             transition-all duration-500 ${
                  teamVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}>
                {/* Avatar */}
                <div className={`w-16 h-16 rounded-full ${color} text-white text-xl
                                 font-bold flex items-center justify-center mx-auto mb-4
                                 group-hover:scale-110 group-hover:shadow-lg
                                 transition-all duration-300`}>
                  {initial}
                </div>
                <h3 className="font-display font-bold text-navy-800 text-sm mb-1
                                group-hover:text-navy-600 transition-colors">{name}</h3>
                <p className="text-xs text-slate-500">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <section className="relative bg-navy-500 text-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-white translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-3">Join Us Today</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 animate-fade-in">
            Ready to Play? Your Court Awaits.
          </h2>
          <p className="text-white/70 max-w-lg mx-auto text-sm leading-relaxed mb-8">
            Register now to book courts, borrow equipment, and track live sessions on the
            Sanjivani Gymkhana portal.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/login"
              className="btn-shimmer bg-gold-500 hover:bg-gold-600 text-white font-semibold
                         px-7 py-3 rounded-lg transition-all duration-200
                         hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold-900/30
                         flex items-center gap-2">
              Get Started <ArrowRight size={15} />
            </Link>
            <Link to="/contact"
              className="border-2 border-white/30 hover:bg-white/15 hover:border-white/60
                         text-white font-semibold px-7 py-3 rounded-lg
                         hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2">
              Contact Us <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
