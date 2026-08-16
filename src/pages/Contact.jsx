import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Mail, Phone, Clock, Send, Loader2,
  ChevronRight, MessageSquare, CheckCircle2,
  Facebook, Instagram, Youtube, Twitter,
} from 'lucide-react';

// ── Intersection observer hook ────────────────────────────────
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

// ── Contact info — real Sanjivani details from image ──────────
const CONTACT_INFO = [
  {
    icon: MapPin,
    label: 'Address',
    lines: ['Sanjivani University, Kopargaon,', 'Near Shirdi, Ahilyanagar', '(Maharashtra), 423601.'],
    href: 'https://maps.google.com/?q=Sanjivani+University+Kopargaon',
    linkLabel: 'View on Google Maps',
    color: 'bg-navy-100 text-navy-600',
    hoverColor: 'hover:bg-navy-500 hover:text-white',
  },
  {
    icon: Mail,
    label: 'Email',
    lines: ['contact@sanjivani.edu.in'],
    href: 'mailto:contact@sanjivani.edu.in',
    linkLabel: 'Send an email',
    color: 'bg-green-100 text-green-600',
    hoverColor: 'hover:bg-green-500 hover:text-white',
  },
  {
    icon: Phone,
    label: 'Phone',
    lines: ['+91 9137700700', '+91 9130191301'],
    href: 'tel:+919137700700',
    linkLabel: 'Call us now',
    color: 'bg-amber-100 text-amber-600',
    hoverColor: 'hover:bg-amber-500 hover:text-white',
  },
  {
    icon: Clock,
    label: 'Gymkhana Hours',
    lines: ['Mon – Sat: 6:00 AM – 9:00 PM', 'Sunday: 7:00 AM – 5:00 PM'],
    href: null,
    linkLabel: null,
    color: 'bg-purple-100 text-purple-600',
    hoverColor: 'hover:bg-purple-500 hover:text-white',
  },
];

const DEPARTMENTS = [
  { name: 'Sports Office',       email: 'sports@sanjivani.edu.in',    phone: '+91 9137700700' },
  { name: 'Equipment Borrowing', email: 'gymkhana@sanjivani.edu.in',  phone: '+91 9130191301' },
  { name: 'Admissions',          email: 'admissions@sanjivani.edu.in', phone: '+91 9137700700' },
  { name: 'General Enquiry',     email: 'contact@sanjivani.edu.in',   phone: '+91 9130191301' },
];

const FAQS = [
  { q: 'How do I borrow sports equipment?',      a: 'Log in to your student account, go to the Equipment Portal, and submit a borrow request. The admin approves it within a few hours.' },
  { q: 'Can I book a court online?',              a: 'Yes! Visit the Live Sessions page → "Book Court" button. Select sport, court, time slot, and player names.' },
  { q: 'What ID is needed to use the Gymkhana?', a: 'Your valid Sanjivani University student ID card is sufficient. Show it at the Gymkhana entrance.' },
  { q: 'Are coaching sessions available?',        a: 'Yes. Contact the Sports Office at sports@sanjivani.edu.in to schedule sessions with our certified coaches.' },
];

// ── Page ──────────────────────────────────────────────────────
export default function Contact() {
  const [heroRef,    heroVisible]    = useScrollReveal(0.1);
  const [infoRef,    infoVisible]    = useScrollReveal(0.1);
  const [formRef,    formVisible]    = useScrollReveal(0.1);
  const [deptRef,    deptVisible]    = useScrollReveal(0.1);
  const [faqRef,     faqVisible]     = useScrollReveal(0.1);
  const [mapRef,     mapVisible]     = useScrollReveal(0.1);

  // Form state
  const [form, setForm]       = useState({ name: '', email: '', subject: '', department: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate send — replace with real API call when backend endpoint is ready
    await new Promise(r => setTimeout(r, 1500));
    setSending(false);
    setSent(true);
    setForm({ name: '', email: '', subject: '', department: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="bg-slate-50 overflow-x-hidden">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative bg-navy-800 text-white overflow-hidden py-20">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full border border-white/5 translate-x-1/2 -translate-y-1/2 animate-spin-slow" />
        <div className="absolute bottom-0 left-16 w-48 h-48 rounded-full border border-white/5 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-gold-500/10 animate-float" />
        <div className="absolute top-10 right-1/3 w-10 h-10 rounded-full bg-navy-400/30 animate-float" style={{ animationDelay: '1s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={heroRef}>
          {/* Breadcrumb */}
          <div className={`flex items-center gap-2 text-white/40 text-xs mb-6 transition-all duration-700 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Contact Us</span>
          </div>

          <div className={`transition-all duration-700 delay-100 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20
                            rounded-full px-4 py-1.5 text-sm text-white/80 mb-5
                            hover:bg-white/20 transition-all duration-200 cursor-default">
              <MessageSquare size={13} className="text-gold-400" />
              We'd love to hear from you
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-4">
              Get in <span className="text-gold-400">Touch</span>
            </h1>
            <p className="text-white/60 text-base max-w-xl leading-relaxed">
              Have a question about the Gymkhana, equipment, or court booking? Reach out
              to us — we usually respond within one working day.
            </p>
          </div>

          {/* Quick contact pills */}
          <div className={`flex flex-wrap gap-3 mt-8 transition-all duration-700 delay-200 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}>
            <a href="mailto:contact@sanjivani.edu.in"
              className="flex items-center gap-2 bg-white/10 border border-white/20
                         rounded-full px-4 py-2 text-sm text-white/80
                         hover:bg-white/20 hover:text-white hover:-translate-y-0.5
                         transition-all duration-200">
              <Mail size={13} className="text-gold-400" />
              contact@sanjivani.edu.in
            </a>
            <a href="tel:+919137700700"
              className="flex items-center gap-2 bg-white/10 border border-white/20
                         rounded-full px-4 py-2 text-sm text-white/80
                         hover:bg-white/20 hover:text-white hover:-translate-y-0.5
                         transition-all duration-200">
              <Phone size={13} className="text-gold-400" />
              +91 9137700700
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT INFO CARDS ────────────────────────────── */}
      <section className="bg-white py-14" ref={infoRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CONTACT_INFO.map(({ icon: Icon, label, lines, href, linkLabel, color, hoverColor }, i) => (
              <div key={label}
                className={`card p-6 group cursor-default
                             hover:-translate-y-2 hover:shadow-hover hover:border-navy-100
                             transition-all duration-500 ${
                  infoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${i * 90}ms` }}>

                {/* Icon */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4
                                  transition-all duration-300 ${color} ${hoverColor}
                                  group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md`}>
                  <Icon size={20} />
                </div>

                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  {label}
                </p>
                {lines.map((line, j) => (
                  <p key={j} className="text-slate-700 text-sm font-medium leading-snug">{line}</p>
                ))}
                {href && (
                  <a href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold
                               text-navy-600 hover:text-navy-800 hover:gap-2
                               transition-all duration-150">
                    {linkLabel} <ChevronRight size={11} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM + MAP ────────────────────────────── */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* ── Contact Form ── */}
            <div ref={formRef}
              className={`transition-all duration-700 ${
                formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}>
              <p className="section-label">Send a Message</p>
              <h2 className="section-title mb-2">We're Here to Help</h2>
              <p className="text-slate-500 text-sm mb-7">
                Fill in the form and our team will get back to you within 24 hours.
              </p>

              {/* Success banner */}
              {sent && (
                <div className="flex items-center gap-3 bg-green-50 border border-green-200
                                 rounded-xl px-4 py-3 mb-5 animate-scale-in">
                  <CheckCircle2 size={18} className="text-green-600 flex-shrink-0" />
                  <p className="text-green-700 text-sm font-medium">
                    Message sent! We'll reply within 24 hours.
                  </p>
                </div>
              )}

              <form onSubmit={submit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="name" value={form.name} onChange={handle} required
                      placeholder="Arjun Sharma"
                      className="input-glow" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="email" type="email" value={form.email} onChange={handle} required
                      placeholder="you@sanjivani.edu.in"
                      className="input-glow" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Department</label>
                    <select name="department" value={form.department} onChange={handle}
                      className="input-glow">
                      <option value="">Select department</option>
                      <option>Sports Office</option>
                      <option>Equipment Borrowing</option>
                      <option>Court Booking</option>
                      <option>Admissions</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="subject" value={form.subject} onChange={handle} required
                      placeholder="Court booking query"
                      className="input-glow" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message" value={form.message} onChange={handle} required
                    rows={5} placeholder="Describe your query in detail…"
                    className="input-glow resize-none" />
                </div>

                <button type="submit" disabled={sending}
                  className="btn-glow btn-shimmer w-full flex items-center justify-center gap-2 py-3 text-sm">
                  {sending
                    ? <><Loader2 size={15} className="animate-spin" /> Sending…</>
                    : <><Send size={14} /> Send Message</>
                  }
                </button>
              </form>
            </div>

            {/* ── Map + Social ── */}
            <div ref={mapRef}
              className={`flex flex-col gap-6 transition-all duration-700 delay-150 ${
                mapVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}>

              {/* Embedded Google Map */}
              <div>
                <p className="section-label">Find Us</p>
                <h2 className="section-title mb-4">Our Location</h2>
                <div className="rounded-2xl overflow-hidden shadow-md border border-slate-100
                                 hover:shadow-lg hover:scale-[1.01] transition-all duration-300">
                  <iframe
                    title="Sanjivani University Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3748.8!2d74.4836!3d19.7515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdcfb6a4b4b4b4b%3A0x4b4b4b4b4b4b4b4b!2sSanjivani%20University%2C%20Kopargaon!5e0!3m2!1sen!2sin!4v1694000000000!5m2!1sen!2sin"
                    width="100%"
                    height="280"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <a href="https://maps.google.com/?q=Sanjivani+University+Kopargaon"
                  target="_blank" rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs text-navy-600
                             font-semibold hover:text-navy-800 hover:gap-2.5 transition-all duration-150">
                  <MapPin size={12} /> Open in Google Maps <ChevronRight size={11} />
                </a>
              </div>

              {/* Address detail card */}
              <div className="card p-5 hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300">
                <div className="space-y-4">
                  {[
                    { icon: MapPin, text: 'Sanjivani University, Kopargaon, Near Shirdi, Ahilyanagar (Maharashtra), 423601.', href: null },
                    { icon: Mail,   text: 'contact@sanjivani.edu.in',  href: 'mailto:contact@sanjivani.edu.in' },
                    { icon: Phone,  text: '+91 9137700700 / +91 9130191301', href: 'tel:+919137700700' },
                    { icon: Clock,  text: 'Mon–Sat: 6:00 AM – 9:00 PM  |  Sun: 7:00 AM – 5:00 PM', href: null },
                  ].map(({ icon: Icon, text, href }) => (
                    <div key={text} className="contact-row">
                      <div className="contact-icon">
                        <Icon size={16} />
                      </div>
                      {href ? (
                        <a href={href}
                          className="text-slate-700 text-sm hover:text-navy-600 transition-colors leading-snug">
                          {text}
                        </a>
                      ) : (
                        <p className="text-slate-700 text-sm leading-snug">{text}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className="card p-5 hover:shadow-hover transition-all duration-300">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Follow Sanjivani University
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: Facebook,  href: 'https://facebook.com/sanjivanikonkani',  label: 'Facebook',  bg: 'hover:bg-blue-600'   },
                    { icon: Instagram, href: 'https://instagram.com/sanjivani_university', label: 'Instagram', bg: 'hover:bg-pink-600' },
                    { icon: Youtube,   href: 'https://youtube.com/@SanjivaniUniversity',   label: 'YouTube',   bg: 'hover:bg-red-600'  },
                    { icon: Twitter,   href: 'https://twitter.com/SanjivaniUni',            label: 'Twitter',   bg: 'hover:bg-sky-500'  },
                  ].map(({ icon: Icon, href, label, bg }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      aria-label={label}
                      className={`w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center
                                   text-slate-500 hover:text-white ${bg}
                                   hover:scale-110 hover:shadow-md hover:-translate-y-0.5
                                   transition-all duration-200`}>
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEPARTMENTS ───────────────────────────────────── */}
      <section className="bg-white py-14" ref={deptRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-10 transition-all duration-700 ${
            deptVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <p className="section-label">Direct Lines</p>
            <h2 className="section-title">Department Contacts</h2>
            <p className="section-sub">Reach the right team directly — no waiting in queues.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEPARTMENTS.map(({ name, email, phone }, i) => (
              <div key={name}
                className={`card p-5 group hover:-translate-y-1 hover:shadow-hover
                             hover:border-navy-200 transition-all duration-300 ${
                  deptVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="w-10 h-10 rounded-xl bg-navy-50 text-navy-600 flex items-center
                                 justify-center mb-3 group-hover:bg-navy-500 group-hover:text-white
                                 group-hover:scale-110 transition-all duration-300">
                  <MessageSquare size={16} />
                </div>
                <h3 className="font-display font-bold text-navy-800 text-sm mb-3
                                group-hover:text-navy-600 transition-colors">{name}</h3>
                <a href={`mailto:${email}`}
                  className="flex items-center gap-1.5 text-xs text-slate-500
                             hover:text-navy-600 transition-colors mb-1.5">
                  <Mail size={11} className="flex-shrink-0 text-slate-400" />{email}
                </a>
                <a href={`tel:${phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-1.5 text-xs text-slate-500
                             hover:text-navy-600 transition-colors">
                  <Phone size={11} className="flex-shrink-0 text-slate-400" />{phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="bg-slate-50 py-14" ref={faqRef}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-10 transition-all duration-700 ${
            faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <p className="section-label">Quick Answers</p>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <div key={q}
                className={`bg-white rounded-2xl border border-slate-100 overflow-hidden
                             shadow-sm hover:shadow-md hover:border-navy-100
                             transition-all duration-300 ${
                  faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left
                             group hover:bg-navy-50 transition-colors duration-200">
                  <span className="font-semibold text-navy-800 text-sm pr-4
                                    group-hover:text-navy-600 transition-colors">
                    {q}
                  </span>
                  <ChevronRight
                    size={16}
                    className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? 'rotate-90 text-navy-500' : ''
                    }`}
                  />
                </button>
                {/* Animated expand */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFaq === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <p className="px-5 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-3">
                    {a}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className={`text-center text-slate-400 text-sm mt-8 transition-all duration-700 delay-300 ${
            faqVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            Still have questions?{' '}
            <a href="mailto:contact@sanjivani.edu.in"
              className="text-navy-600 font-semibold hover:underline">
              Email us directly
            </a>
          </p>
        </div>
      </section>

    </div>
  );
}
