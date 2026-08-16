import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-navy-600 rounded-xl flex items-center justify-center">
                <Trophy size={18} className="text-gold-400" />
              </div>
              <div>
                <p className="font-display font-bold text-white leading-tight">Sanjivani Gymkhana</p>
                <p className="text-xs text-white/40">Sanjivani University, Kopargaon</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Fostering sportsmanship, teamwork and excellence across 5 premier
              sporting disciplines.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white/80 font-semibold text-sm uppercase tracking-widest mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
                ['/', 'Home'],
                ['/about', 'About Us'],
                ['/gallery', 'Gallery'],
                ['/dashboard', 'Live Sessions'],
                ['/equipment', 'Equipment Portal'],
                ['/contact', 'Contact Us'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to}
                    className="text-white/50 hover:text-gold-400 text-sm transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold-500" />{label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div id="contact-footer">
            <h3 className="text-white/80 font-semibold text-sm uppercase tracking-widest mb-4">
              Contact
            </h3>
            <div className="space-y-2.5">
              <a href="tel:+919137700700"
                className="flex items-center gap-2.5 text-white/50 hover:text-white text-sm transition-colors">
                <Phone size={13} className="text-gold-400 flex-shrink-0" /> +91 9137700700
              </a>
              <a href="tel:+919130191301"
                className="flex items-center gap-2.5 text-white/50 hover:text-white text-sm transition-colors">
                <Phone size={13} className="text-gold-400 flex-shrink-0" /> +91 9130191301
              </a>
              <a href="mailto:contact@sanjivani.edu.in"
                className="flex items-center gap-2.5 text-white/50 hover:text-white text-sm transition-colors">
                <Mail size={13} className="text-gold-400 flex-shrink-0" /> contact@sanjivani.edu.in
              </a>
              <div className="flex items-start gap-2.5 text-white/50 text-sm">
                <MapPin size={13} className="text-gold-400 mt-0.5 flex-shrink-0" />
                Sanjivani University, Kopargaon,<br />
                Near Shirdi, Ahilyanagar (Maharashtra), 423601.
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between gap-2">
          <p className="text-white/30 text-xs">© 2024 Sanjivani Gymkhana Management System</p>
          <p className="text-white/20 text-xs">Sanjivani University</p>
        </div>
      </div>
    </footer>
  );
}
