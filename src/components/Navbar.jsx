import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Trophy, LogOut, Shield, ChevronDown, KeyRound } from 'lucide-react';

const NAV = [
  { to: '/',          label: 'Home' },
  { to: '/gallery',   label: 'Gallery' },
  { to: '/dashboard', label: 'Live Sessions' },
  { to: '/equipment', label: 'Equipment' },
];

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen]             = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <>
      {/* ── Top utility bar (mimics Sanjivani site) ── */}
      <div className="topbar hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <span>Sanjivani University, At/Post Sahajanandnagar, Kopargaon – 423603</span>
          <div className="flex items-center gap-4">
            <span>gymkhana@sanjivani.edu.in</span>
            <span>+91 98765 43210</span>
          </div>
        </div>
      </div>

      {/* ── Main navbar ── */}
      <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      } border-b border-slate-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-navy-500 rounded-xl flex items-center justify-center
                              group-hover:bg-navy-600 transition-colors flex-shrink-0">
                <Trophy size={20} className="text-gold-400" />
              </div>
              <div className="leading-tight">
                <p className="font-display font-bold text-navy-800 text-sm leading-none">SANJIVANI</p>
                <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">
                  Gymkhana Portal
                </p>
              </div>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-navy-500 text-white'
                        : 'text-slate-600 hover:text-navy-600 hover:bg-navy-50'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all ${
                      isActive
                        ? 'bg-saffron text-white'
                        : 'text-slate-600 hover:text-saffron hover:bg-orange-50'
                    }`
                  }
                >
                  <Shield size={13} /> Admin
                </NavLink>
              )}
            </div>

            {/* Auth */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(o => !o)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-navy-50 rounded-lg border border-navy-100
                               hover:bg-navy-100 hover:border-navy-200 transition-all duration-150"
                  >
                    <div className="w-6 h-6 rounded-full bg-navy-500 flex items-center justify-center text-white text-xs font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-navy-700 font-medium">{user.name.split(' ')[0]}</span>
                    {isAdmin && <span className="badge badge-approved text-[10px]">Admin</span>}
                    <ChevronDown size={13} className={`text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 z-50 py-1 animate-fade-in">
                      {/* User info */}
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                      {/* Change password */}
                      <Link
                        to="/change-password"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-navy-600 transition-colors"
                      >
                        <KeyRound size={14} className="text-slate-400" /> Change Password
                      </Link>
                      {/* Divider */}
                      <div className="border-t border-slate-100 my-1" />
                      {/* Logout */}
                      <button
                        onClick={() => { handleLogout(); setDropdownOpen(false); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={14} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="btn-primary text-sm">Sign In</Link>
              )}
            </div>

            {/* Mobile burger */}
            <button onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600"
              aria-label="Toggle menu">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-3 space-y-1 animate-slide-up shadow-lg">
            {NAV.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-lg text-sm font-medium ${
                    isActive ? 'bg-navy-500 text-white' : 'text-slate-600 hover:bg-navy-50'
                  }`
                }>
                {label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink to="/admin" onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                    isActive ? 'bg-saffron text-white' : 'text-slate-600 hover:bg-orange-50'
                  }`
                }>
                <Shield size={14} /> Admin Portal
              </NavLink>
            )}
            <div className="pt-2 border-t border-slate-100">
              {user ? (
                <div className="space-y-1">
                  <Link
                    to="/change-password"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 rounded-lg"
                  >
                    <KeyRound size={14} className="text-slate-400" /> Change Password
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg flex items-center gap-2">
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)}
                  className="block btn-primary text-center text-sm">Sign In</Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
