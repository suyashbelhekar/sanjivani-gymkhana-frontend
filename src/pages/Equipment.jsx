import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  Send, Clock, CheckCircle, XCircle, RotateCcw,
  Filter, Loader2, Package, X, User, Hash, Building, Calendar,
} from 'lucide-react';
import LoadingCard from '../components/LoadingCard';

const SPORTS = ['All', 'Badminton', 'Football', 'Basketball', 'Volleyball', 'Cricket'];

const STATUS = {
  pending:  { label: 'Pending',  cls: 'badge-pending',  Icon: Clock       },
  approved: { label: 'Approved', cls: 'badge-approved', Icon: CheckCircle },
  rejected: { label: 'Rejected', cls: 'badge-rejected', Icon: XCircle     },
  returned: { label: 'Returned', cls: 'badge-returned', Icon: RotateCcw   },
};

const COND = {
  Excellent: 'bg-green-50 text-green-700 border-green-200',
  Good:      'bg-blue-50  text-blue-700  border-blue-200',
  Fair:      'bg-amber-50 text-amber-700 border-amber-200',
  Poor:      'bg-red-50   text-red-600   border-red-200',
};

const EMPTY_FORM = {
  playerName: '', department: '', enrollmentNo: '',
  quantity: 1, purpose: '', timeSlotStart: '', timeSlotEnd: '',
};

export default function Equipment() {
  const [equipment,  setEquipment]  = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loadingEq,  setLoadingEq]  = useState(true);
  const [loadingReq, setLoadingReq] = useState(true);
  const [sport,      setSport]      = useState('All');

  // borrow modal state
  const [modal,      setModal]      = useState(null);   // selected equipment item
  const [form,       setForm]       = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);

  // ── polling: refresh my requests every 15 s for real-time status ──
  const fetchReq = useCallback(async () => {
    try {
      setLoadingReq(true);
      const { data } = await axios.get('/requests/my');
      setMyRequests(data);
    } catch { /* silent */ }
    finally { setLoadingReq(false); }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        setLoadingEq(true);
        const { data } = await axios.get('/inventory');
        setEquipment(data);
      } catch { toast.error('Failed to load inventory'); }
      finally { setLoadingEq(false); }
    })();
    fetchReq();
    const interval = setInterval(fetchReq, 15000);   // poll every 15 s
    return () => clearInterval(interval);
  }, [fetchReq]);

  const openModal = (item) => {
    setForm(EMPTY_FORM);
    setModal(item);
  };

  const handleBorrow = async (e) => {
    e.preventDefault();
    if (!form.playerName || !form.department || !form.enrollmentNo || !form.timeSlotStart || !form.timeSlotEnd) {
      toast.error('All fields are required');
      return;
    }
    setSubmitting(true);
    try {
      await axios.post('/requests/borrow', {
        equipmentId:   modal.id || modal._id,
        playerName:    form.playerName,
        department:    form.department,
        enrollmentNo:  form.enrollmentNo,
        quantity:      Number(form.quantity),
        purpose:       form.purpose,
        timeSlotStart: form.timeSlotStart,
        timeSlotEnd:   form.timeSlotEnd,
      });
      toast.success('Request submitted! Awaiting admin approval.');
      setModal(null);
      fetchReq();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Request failed');
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = sport === 'All' ? equipment : equipment.filter(e => e.sport === sport);

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ── Page header ─────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200">
        <div className="page-wrapper py-6">
          <p className="section-label">Inventory</p>
          <h1 className="section-title">Equipment Portal</h1>
          <p className="text-slate-400 text-sm mt-1">
            Browse available equipment and submit a borrow request
          </p>
        </div>
      </div>

      <div className="page-wrapper py-8">

        {/* ── Sport filter ──────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <Filter size={14} className="text-slate-400" />
          {SPORTS.map(f => (
            <button key={f} onClick={() => setSport(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                sport === f
                  ? 'bg-navy-500 text-white border-navy-500'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-navy-300 hover:text-navy-600'
              }`}>
              {f}
            </button>
          ))}
        </div>

        {/* ── Equipment grid ────────────────────────────────── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-14">
          {loadingEq ? <LoadingCard count={8} /> : filtered.length === 0 ? (
            <div className="col-span-full text-center py-16 card">
              <p className="text-3xl mb-2">📦</p>
              <p className="text-slate-400">No equipment found.</p>
            </div>
          ) : filtered.map(item => {
            const avail = item.available_count ?? item.availableCount ?? 0;
            const cond  = item.condition_status ?? item.conditionStatus ?? 'Good';
            return (
              <div key={item.id || item._id} className="card-hover p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{item.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.sport}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${COND[cond] || COND.Good}`}>
                    {cond}
                  </span>
                </div>

                {avail > 0 ? (
                  <button onClick={() => openModal(item)}
                    className="btn-primary text-sm flex items-center justify-center gap-2 mt-auto">
                    <Send size={13} /> Request Borrow
                  </button>
                ) : (
                  <div className="text-center text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg py-2">
                    Out of Stock
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── My Requests — real-time status tracker ────────── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-bold text-navy-800 flex items-center gap-2">
              <Package size={18} className="text-navy-500" /> My Request Status
            </h2>
            <button onClick={fetchReq}
              className="text-xs text-navy-500 hover:underline flex items-center gap-1">
              ↻ Refresh
            </button>
          </div>

          {loadingReq ? <LoadingCard count={2} /> : myRequests.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-2xl mb-2">📋</p>
              <p className="text-slate-400 text-sm">No requests yet. Borrow something above!</p>
            </div>
          ) : (
            <div className="card overflow-hidden">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Player</th>
                    <th>Dept / Enroll.</th>
                    <th>Equipment</th>
                    <th>Qty</th>
                    <th>Time Slot</th>
                    <th>Requested</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {myRequests.map(req => {
                    const s = STATUS[req.status] || STATUS.pending;
                    return (
                      <tr key={req._id}>
                        <td className="font-medium text-slate-800">{req.playerName}</td>
                        <td>
                          <p className="text-slate-700 text-xs">{req.department}</p>
                          <p className="text-slate-400 text-xs">{req.enrollmentNo}</p>
                        </td>
                        <td>
                          <p className="font-medium text-slate-700 text-sm">{req.equipment?.name}</p>
                          <p className="text-xs text-slate-400">{req.equipment?.sport}</p>
                        </td>
                        <td className="text-center">{req.quantity}</td>
                        <td className="text-xs text-slate-500 whitespace-nowrap">
                          {req.timeSlot?.start
                            ? `${fmtDate(req.timeSlot.start)} ${fmtTime(req.timeSlot.start)} – ${fmtTime(req.timeSlot.end)}`
                            : '—'}
                        </td>
                        <td className="text-xs text-slate-400 whitespace-nowrap">
                          {fmtDate(req.requestedAt)}
                        </td>
                        <td>
                          <span className={`badge ${s.cls} flex items-center gap-1 w-fit`}>
                            <s.Icon size={10} /> {s.label}
                          </span>
                          {req.adminNote && (
                            <p className="text-xs text-slate-400 mt-1 italic">"{req.adminNote}"</p>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* ── Borrow Request Modal ─────────────────────────────── */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center
                        justify-center p-4 animate-fade-in"
          onClick={() => setModal(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg animate-slide-up"
            onClick={e => e.stopPropagation()}>

            {/* Modal header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100">
              <div>
                <h2 className="font-display font-bold text-navy-800 text-lg">Borrow Request</h2>
                <p className="text-slate-400 text-sm mt-0.5">
                  {modal.name} &nbsp;·&nbsp; {modal.sport}
                </p>
              </div>
              <button onClick={() => setModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleBorrow} className="px-6 py-5 space-y-4">

              {/* Player Name */}
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5">
                  <User size={12} className="text-navy-400" /> Main Player Name *
                </label>
                <input value={form.playerName}
                  onChange={e => setForm({...form, playerName: e.target.value})}
                  placeholder="e.g. Arjun Sharma"
                  required className="input-field" />
              </div>

              {/* Department + Enrollment */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <Building size={12} className="text-navy-400" /> Department *
                  </label>
                  <input value={form.department}
                    onChange={e => setForm({...form, department: e.target.value})}
                    placeholder="e.g. Comp. Engg."
                    required className="input-field" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <Hash size={12} className="text-navy-400" /> Enrollment No. *
                  </label>
                  <input value={form.enrollmentNo}
                    onChange={e => setForm({...form, enrollmentNo: e.target.value})}
                    placeholder="e.g. SCOE2021001"
                    required className="input-field" />
                </div>
              </div>

              {/* Time Slot */}
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5">
                  <Calendar size={12} className="text-navy-400" /> Time Slot *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">From</p>
                    <input type="datetime-local" value={form.timeSlotStart}
                      onChange={e => setForm({...form, timeSlotStart: e.target.value})}
                      required className="input-field text-sm" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">To</p>
                    <input type="datetime-local" value={form.timeSlotEnd}
                      onChange={e => setForm({...form, timeSlotEnd: e.target.value})}
                      required className="input-field text-sm" />
                  </div>
                </div>
              </div>

              {/* Quantity + Purpose */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                    Quantity
                  </label>
                  <input type="number" min={1}
                    max={modal.available_count ?? modal.availableCount ?? 1}
                    value={form.quantity}
                    onChange={e => setForm({...form, quantity: e.target.value})}
                    className="input-field" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1.5 block">
                    Purpose
                  </label>
                  <input value={form.purpose}
                    onChange={e => setForm({...form, purpose: e.target.value})}
                    placeholder="Practice, match…"
                    className="input-field" />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-1">
                <button type="submit" disabled={submitting}
                  className="btn-primary flex-1 flex items-center justify-center gap-2">
                  {submitting ? <Loader2 size={15} className="animate-spin" /> : <Send size={14} />}
                  Submit Request
                </button>
                <button type="button" onClick={() => setModal(null)}
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

// ── tiny helpers ──────────────────────────────────────────────
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day:'2-digit', month:'short' }) : '—';
const fmtTime = (d) => d ? new Date(d).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', hour12:true }) : '';
