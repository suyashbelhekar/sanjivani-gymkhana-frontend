import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import {
  Activity, Clock, MapPin, Users, Plus, RefreshCw,
  Loader2, Calendar, Package, User, Building, Hash, Wifi, WifiOff,
} from 'lucide-react';
import LoadingCard from '../components/LoadingCard';

// ── Config ─────────────────────────────────────────────────────
const POLL_INTERVAL_MS = 30_000;   // 30 seconds as per spec

const SPORT_META = {
  Badminton:  { emoji: '🏸', color: 'text-yellow-600', bg: 'bg-yellow-50',  border: 'border-yellow-200' },
  Football:   { emoji: '⚽', color: 'text-green-600',  bg: 'bg-green-50',   border: 'border-green-200'  },
  Basketball: { emoji: '🏀', color: 'text-orange-600', bg: 'bg-orange-50',  border: 'border-orange-200' },
  Volleyball: { emoji: '🏐', color: 'text-blue-600',   bg: 'bg-blue-50',    border: 'border-blue-200'   },
  Cricket:    { emoji: '🏏', color: 'text-red-600',    bg: 'bg-red-50',     border: 'border-red-200'    },
};

const fmt  = (d) => d ? new Date(d).toLocaleTimeString('en-IN',  { hour:'2-digit', minute:'2-digit', hour12:true }) : '—';
const fmtD = (d) => d ? new Date(d).toLocaleDateString('en-IN',  { day:'2-digit', month:'short' }) : '—';

// ── Countdown hook — returns "Xh Ym left" string ──────────────
function useCountdown(endTime) {
  const [label, setLabel] = useState('');
  useEffect(() => {
    const tick = () => {
      const diff = new Date(endTime) - Date.now();
      if (diff <= 0) { setLabel('Ending…'); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setLabel(h > 0 ? `${h}h ${m}m left` : m > 0 ? `${m}m ${s}s left` : `${s}s left`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endTime]);
  return label;
}

// ── Main component ─────────────────────────────────────────────
export default function Dashboard() {
  const { user } = useAuth();

  // tab state
  const [tab, setTab] = useState('live');

  // live sessions state
  const [sessions,    setSessions]    = useState([]);
  const [serverTime,  setServerTime]  = useState(null);
  const [loadingS,    setLoadingS]    = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [countdown,   setCountdown]   = useState(POLL_INTERVAL_MS / 1000);
  const [online,      setOnline]      = useState(true);

  // court bookings state
  const [games,    setGames]    = useState([]);
  const [loadingG, setLoadingG] = useState(true);

  // booking modal
  const [showBook, setShowBook] = useState(false);
  const [booking,  setBooking]  = useState(false);
  const [form, setForm] = useState({
    sport:'Badminton', court:'', playerNames:'', startTime:'', endTime:'',
  });

  // ── Fetch live sessions from /api/sessions/live ─────────────
  // Response shape: { serverTime, count, sessions[] }
  const fetchSessions = useCallback(async (silent = false) => {
    if (!silent) setLoadingS(true);
    try {
      const { data } = await axios.get('/sessions/live');
      // Support both old (array) and new (object with sessions key) response shapes
      const list = Array.isArray(data) ? data : (data.sessions || []);
      setSessions(list);
      setServerTime(Array.isArray(data) ? null : data.serverTime);
      setLastUpdated(new Date());
      setOnline(true);
    } catch {
      setOnline(false);
    } finally {
      if (!silent) setLoadingS(false);
    }
  }, []);

  const fetchGames = useCallback(async () => {
    try {
      setLoadingG(true);
      const { data } = await axios.get('/logs/live');
      setGames(data);
    } catch { toast.error('Could not load court sessions'); }
    finally { setLoadingG(false); }
  }, []);

  // ── 30-second polling loop with visible countdown ───────────
  useEffect(() => {
    fetchSessions();
    fetchGames();

    // Countdown ticker (1 s)
    let secondsLeft = POLL_INTERVAL_MS / 1000;
    setCountdown(secondsLeft);

    const countTick = setInterval(() => {
      secondsLeft -= 1;
      setCountdown(secondsLeft);
      if (secondsLeft <= 0) secondsLeft = POLL_INTERVAL_MS / 1000;
    }, 1000);

    // Poll every 30 s (silent — no spinner)
    const pollTick = setInterval(() => {
      fetchSessions(true);   // silent background refresh
      secondsLeft = POLL_INTERVAL_MS / 1000;
      setCountdown(secondsLeft);
    }, POLL_INTERVAL_MS);

    return () => {
      clearInterval(countTick);
      clearInterval(pollTick);
    };
  }, [fetchSessions, fetchGames]);

  const ongoing   = games.filter(g => g.status === 'ongoing');
  const scheduled = games.filter(g => g.status === 'scheduled');

  // ── Manual refresh ──────────────────────────────────────────
  const manualRefresh = () => {
    fetchSessions();
    fetchGames();
    setCountdown(POLL_INTERVAL_MS / 1000);
  };

  const bookCourt = async (e) => {
    e.preventDefault(); setBooking(true);
    try {
      await axios.post('/logs/book', {
        ...form, playerNames: form.playerNames.split(',').map(s => s.trim()),
      });
      toast.success('Court booked!');
      setShowBook(false);
      setForm({ sport:'Badminton', court:'', playerNames:'', startTime:'', endTime:'' });
      fetchGames();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Booking failed');
    } finally {
      setBooking(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ── Page header ───────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200">
        <div className="page-wrapper py-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="section-label">Real-Time</p>
            <h1 className="section-title">Live Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1">
              Active equipment sessions &amp; court bookings
            </p>
          </div>
          <div className="flex gap-2 items-center">
            {/* Connection indicator */}
            <div className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border ${
              online
                ? 'bg-green-50 text-green-600 border-green-200'
                : 'bg-red-50 text-red-500 border-red-200'
            }`}>
              {online ? <Wifi size={12} /> : <WifiOff size={12} />}
              {online ? 'Connected' : 'Offline'}
            </div>
            <button onClick={manualRefresh}
              className="btn-outline text-sm flex items-center gap-2 py-2 px-4">
              <RefreshCw size={13} /> Refresh
            </button>
            {user && (
              <button onClick={() => setShowBook(true)}
                className="btn-primary text-sm flex items-center gap-2">
                <Plus size={13} /> Book Court
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="page-wrapper">
          <div className="flex border-b border-slate-200 -mb-px">
            {[
              { key:'live',   label:'🟢 Live Equipment Sessions' },
              { key:'courts', label:'🏟️ Court Bookings'          },
            ].map(t => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                  tab === t.key
                    ? 'border-navy-500 text-navy-700'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}>
                {t.label}
                {t.key === 'live' && sessions.length > 0 && (
                  <span className="ml-2 bg-green-500 text-white text-[10px] font-bold
                                   px-1.5 py-0.5 rounded-full">
                    {sessions.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="page-wrapper py-8">

        {/* ════════════════════════════════════════════════════
            TAB 1 — LIVE EQUIPMENT SESSIONS
            Engine: status=approved AND startTime<=now AND endTime>=now
            Auto-vanishes: when endTime passes OR marked returned
            Polls: every 30 seconds in background
        ════════════════════════════════════════════════════ */}
        {tab === 'live' && (
          <>
            {/* Status bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6
                            bg-white border border-slate-200 rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                {/* Pulsing green dot */}
                <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full
                                   rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-sm font-semibold text-slate-700">
                  {sessions.length} active session{sessions.length !== 1 ? 's' : ''} right now
                </span>
                {serverTime && (
                  <span className="text-xs text-slate-400 hidden sm:block">
                    Server: {new Date(serverTime).toLocaleTimeString('en-IN', { hour12:true })}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                {lastUpdated && (
                  <span>Updated {lastUpdated.toLocaleTimeString('en-IN', { hour12:true })}</span>
                )}
                <div className="flex items-center gap-1.5 bg-slate-100 rounded-full px-2.5 py-1">
                  <RefreshCw size={10} className="text-slate-400" />
                  <span>Next refresh in <span className="font-semibold text-slate-600">{countdown}s</span></span>
                </div>
              </div>
            </div>

            {/* Content */}
            {loadingS ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <LoadingCard count={3} />
              </div>
            ) : sessions.length === 0 ? (
              /* ── Friendly empty state ── */
              <div className="card text-center py-20 border-dashed border-2 border-slate-200 bg-white">
                <div className="inline-flex items-center justify-center w-16 h-16
                                 bg-slate-100 rounded-full mb-5 text-3xl">
                  🏃
                </div>
                <p className="text-slate-700 font-display font-bold text-xl mb-2">
                  No ongoing sessions right now
                </p>
                <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
                  Sessions appear here the moment an admin approves a borrow request and the
                  time slot is currently active.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-xs text-slate-400
                                 bg-slate-50 border border-slate-200 rounded-full px-4 py-2">
                  <RefreshCw size={10} />
                  Auto-checking every {POLL_INTERVAL_MS / 1000} seconds
                </div>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sessions.map(s => <LiveSessionCard key={s._id} session={s} />)}
              </div>
            )}
          </>
        )}

        {/* ════════════════════════════════════════════════════
            TAB 2 — COURT BOOKINGS
        ════════════════════════════════════════════════════ */}
        {tab === 'courts' && (
          <>
            <div className="flex items-center gap-2 mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full
                                 rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-sm text-green-700 font-medium">
                {ongoing.length} court session{ongoing.length !== 1 ? 's' : ''} in progress
              </span>
            </div>

            {loadingG ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <LoadingCard count={3} />
              </div>
            ) : (
              <>
                {ongoing.length > 0 && (
                  <div className="mb-10">
                    <h2 className="text-base font-semibold text-slate-700 mb-4 flex items-center gap-2">
                      <Activity size={15} className="text-green-500" /> Now Playing
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {ongoing.map(g => <CourtCard key={g._id} game={g} />)}
                    </div>
                  </div>
                )}
                {scheduled.length > 0 && (
                  <div>
                    <h2 className="text-base font-semibold text-slate-700 mb-4 flex items-center gap-2">
                      <Calendar size={15} className="text-navy-500" /> Upcoming
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {scheduled.map(g => <CourtCard key={g._id} game={g} />)}
                    </div>
                  </div>
                )}
                {games.length === 0 && (
                  <div className="card text-center py-20">
                    <p className="text-4xl mb-3">🏟️</p>
                    <p className="text-slate-600 font-semibold">No court sessions scheduled</p>
                    <p className="text-slate-400 text-sm mt-1">All courts are free. Book one!</p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {/* ── Court Booking Modal ────────────────────────────── */}
      {showBook && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center
                        justify-center p-4 animate-fade-in"
          onClick={() => setShowBook(false)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-slide-up p-6"
            onClick={e => e.stopPropagation()}>
            <h2 className="font-display font-bold text-navy-800 text-lg mb-5">
              Book a Court / Ground
            </h2>
            <form onSubmit={bookCourt} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Sport</label>
                  <select value={form.sport}
                    onChange={e => setForm({...form, sport: e.target.value})}
                    className="input-field">
                    {Object.keys(SPORT_META).map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Court / Ground</label>
                  <input value={form.court}
                    onChange={e => setForm({...form, court: e.target.value})}
                    placeholder="e.g. Court A" required className="input-field" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-600 mb-1 block">
                  Players (comma-separated)
                </label>
                <input value={form.playerNames}
                  onChange={e => setForm({...form, playerNames: e.target.value})}
                  placeholder="Arjun, Priya, Rohit" required className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Start Time</label>
                  <input type="datetime-local" value={form.startTime}
                    onChange={e => setForm({...form, startTime: e.target.value})}
                    required className="input-field" />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">End Time</label>
                  <input type="datetime-local" value={form.endTime}
                    onChange={e => setForm({...form, endTime: e.target.value})}
                    required className="input-field" />
                </div>
              </div>
              <div className="flex gap-3 pt-1">
                <button type="submit" disabled={booking}
                  className="btn-primary flex-1 flex items-center justify-center gap-2">
                  {booking && <Loader2 size={14} className="animate-spin" />} Confirm
                </button>
                <button type="button" onClick={() => setShowBook(false)}
                  className="btn-outline flex-1">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Live Session Card ──────────────────────────────────────────
// Shows: LIVE NOW badge, equipment/sport, who (player/dept/enroll),
// when (ISO datetime formatted), time remaining countdown
function LiveSessionCard({ session }) {
  const sportEmoji = { Badminton:'🏸', Football:'⚽', Basketball:'🏀', Volleyball:'🏐', Cricket:'🏏' };
  const icon       = sportEmoji[session.equipment?.sport] || '🎽';
  const timeLeft   = useCountdown(session.timeSlot?.end);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm
                     border-l-4 border-l-green-400 p-5 animate-fade-in
                     hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

      {/* Header: LIVE NOW badge + sport icon */}
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white
                          bg-green-500 px-3 py-1 rounded-full shadow-sm shadow-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          LIVE NOW
        </span>
        <span className="text-xl">{icon}</span>
      </div>

      {/* Equipment name + sport */}
      <p className="font-display font-bold text-slate-800 text-base leading-tight">
        {session.equipment?.name}
      </p>
      <p className="text-xs text-navy-500 font-semibold mb-3 mt-0.5">
        {session.equipment?.sport}
      </p>

      {/* Who */}
      <div className="space-y-1.5 border-t border-slate-100 pt-3 mb-3">
        <div className="flex items-center gap-2 text-sm text-slate-700">
          <User size={13} className="text-slate-400 flex-shrink-0" />
          <span className="font-semibold">{session.playerName}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Building size={12} className="text-slate-400 flex-shrink-0" />
          {session.department}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <Hash size={12} className="text-slate-400 flex-shrink-0" />
          {session.enrollmentNo}
        </div>
      </div>

      {/* When — ISO formatted display */}
      <div className="border-t border-slate-100 pt-3 space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock size={11} className="flex-shrink-0 text-slate-400" />
          <span>
            {fmtD(session.timeSlot?.start)} &nbsp;
            {fmt(session.timeSlot?.start)} – {fmt(session.timeSlot?.end)}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Package size={11} className="flex-shrink-0 text-slate-400" />
          <span>Qty: {session.quantity}</span>
        </div>
        {/* Live countdown timer */}
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-xs font-semibold
                            text-amber-600 bg-amber-50 border border-amber-200
                            px-2 py-0.5 rounded-full">
            ⏱ {timeLeft}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Court Booking Card ─────────────────────────────────────────
function CourtCard({ game }) {
  const meta = SPORT_META[game.sport] || {};
  return (
    <div className={`card-hover p-5 border ${meta.border}`}>
      <div className="flex items-center justify-between mb-3">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${meta.bg} ${meta.border}`}>
          <span>{meta.emoji}</span>
          <span className={`text-sm font-semibold ${meta.color}`}>{game.sport}</span>
        </div>
        <span className={game.status === 'ongoing' ? 'badge badge-approved' : 'badge badge-pending'}>
          {game.status === 'ongoing' ? '● Live' : '⏰ Soon'}
        </span>
      </div>
      <p className="font-semibold text-slate-800 flex items-center gap-1.5 mb-2">
        <MapPin size={13} className={meta.color} /> {game.court}
      </p>
      <p className="text-slate-500 text-sm flex items-start gap-1.5 mb-2">
        <Users size={13} className="mt-0.5 flex-shrink-0 text-slate-400" />
        {Array.isArray(game.playerNames) ? game.playerNames.join(', ') : game.playerNames}
      </p>
      <p className="text-slate-400 text-xs flex items-center gap-1.5">
        <Clock size={12} />
        {fmtD(game.timeSlot?.start)} · {fmt(game.timeSlot?.start)} – {fmt(game.timeSlot?.end)}
      </p>
    </div>
  );
}
