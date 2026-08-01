import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ShieldCheck, Package, Users, AlertCircle, TrendingUp, CheckCircle, XCircle, RotateCcw, RefreshCw, Loader2, Filter } from 'lucide-react';

const STATUS_FILTERS = ['All', 'pending', 'approved', 'rejected', 'returned'];

const STATUS_MAP = {
  pending:  'badge-pending',
  approved: 'badge-approved',
  rejected: 'badge-rejected',
  returned: 'badge-returned',
};

export default function AdminPortal() {
  const [metrics,   setMetrics]   = useState(null);
  const [requests,  setRequests]  = useState([]);
  const [loadingM,  setLoadingM]  = useState(true);
  const [loadingR,  setLoadingR]  = useState(true);
  const [filter,    setFilter]    = useState('All');
  const [processing,setProcessing]= useState(null);
  const [modal,     setModal]     = useState(null); // { id, action }
  const [note,      setNote]      = useState('');

  const fetchM = async () => { try { const {data} = await axios.get('/requests/admin/metrics'); setMetrics(data); } catch { toast.error('Metrics failed'); } finally { setLoadingM(false); } };
  const fetchR = async () => { try { setLoadingR(true); const p = filter !== 'All' ? `?status=${filter}` : ''; const {data} = await axios.get(`/requests/admin/requests${p}`); setRequests(data); } catch { toast.error('Requests failed'); } finally { setLoadingR(false); } };

  useEffect(() => { fetchM(); }, []);
  useEffect(() => { fetchR(); }, [filter]);

  const act = async (id, action) => {
    setProcessing(id + action);
    try {
      await axios.put(`/requests/admin/requests/${id}`, { action, adminNote: note });
      toast.success(`Request ${action}`);
      setModal(null); setNote('');
      fetchR(); fetchM();
    } catch (err) { toast.error(err?.response?.data?.message || 'Action failed'); }
    finally { setProcessing(null); }
  };

  const CARDS = metrics ? [
    { label: 'Items Currently Out', value: metrics.itemsOut,          icon: Package,     color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
    { label: 'Pending Requests',    value: metrics.pendingRequests,    icon: AlertCircle,  color: 'text-amber-600',  bg: 'bg-amber-50',  border: 'border-amber-200'  },
    { label: 'Active Borrows',      value: metrics.approvedActive,     icon: Users,        color: 'text-navy-600',   bg: 'bg-navy-50',   border: 'border-navy-200'   },
    { label: 'Total Equipment',     value: metrics.totalEquipmentItems,icon: TrendingUp,   color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-200'  },
  ] : [];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="page-wrapper py-6 flex items-center justify-between">
          <div>
            <p className="section-label flex items-center gap-1"><ShieldCheck size={12} /> Admin Control</p>
            <h1 className="section-title">Admin Portal</h1>
          </div>
          <button onClick={() => { fetchM(); fetchR(); }} className="btn-outline text-sm flex items-center gap-2 py-2 px-4">
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
      </div>

      <div className="page-wrapper py-8">
        {/* Metric cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {loadingM
            ? Array.from({length:4}).map((_,i) => <div key={i} className="card p-5 space-y-3"><div className="shimmer h-4 w-1/2" /><div className="shimmer h-8 w-1/3" /></div>)
            : CARDS.map(({label, value, icon: Icon, color, bg, border}) => (
              <div key={label} className={`card p-5 border ${border}`}>
                <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon size={16} className={color} />
                </div>
                <p className={`text-3xl font-display font-bold ${color}`}>{value ?? 0}</p>
                <p className="text-slate-400 text-xs mt-1">{label}</p>
              </div>
            ))}
        </div>

        {/* Requests */}
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="font-display font-bold text-navy-800">Borrow Requests</h2>
            <div className="flex flex-wrap gap-2 items-center">
              <Filter size={13} className="text-slate-400" />
              {STATUS_FILTERS.map(s => (
                <button key={s} onClick={() => setFilter(s)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border capitalize transition-all ${
                    filter === s ? 'bg-navy-500 text-white border-navy-500' : 'bg-white text-slate-500 border-slate-200 hover:border-navy-300'
                  }`}>{s}</button>
              ))}
            </div>
          </div>

          {loadingR ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 size={22} className="animate-spin text-navy-400" />
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl mb-2">📭</p>
              <p className="text-slate-400 text-sm">No requests for this filter.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Player / Dept</th>
                    <th>Enroll. No</th>
                    <th>Equipment</th>
                    <th className="text-center">Qty</th>
                    <th>Time Slot</th>
                    <th>Requested</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(req => (
                    <tr key={req._id}>
                      <td>
                        <p className="font-medium text-slate-800 text-sm">{req.student?.name}</p>
                        <p className="text-xs text-slate-400">{req.student?.email}</p>
                      </td>
                      <td>
                        <p className="text-slate-700 text-sm">{req.playerName || req.student?.name}</p>
                        <p className="text-xs text-slate-400">{req.department || req.student?.department || '—'}</p>
                      </td>
                      <td className="text-xs text-slate-500 font-mono">{req.enrollmentNo || '—'}</td>
                      <td>
                        <p className="font-medium text-slate-700 text-sm">{req.equipment?.name}</p>
                        <p className="text-xs text-slate-400">{req.equipment?.sport}</p>
                      </td>
                      <td className="text-center">{req.quantity}</td>
                      <td className="text-xs text-slate-500 whitespace-nowrap">
                        {req.timeSlot?.start
                          ? `${new Date(req.timeSlot.start).toLocaleDateString('en-IN',{day:'2-digit',month:'short'})} ${new Date(req.timeSlot.start).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:true})} – ${new Date(req.timeSlot.end).toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:true})}`
                          : '—'}
                      </td>
                      <td className="text-xs text-slate-400 whitespace-nowrap">
                        {new Date(req.requestedAt).toLocaleDateString('en-IN', {day:'2-digit',month:'short',year:'2-digit'})}
                      </td>
                      <td>
                        <span className={`badge ${STATUS_MAP[req.status]} capitalize`}>{req.status}</span>
                        {req.adminNote && (
                          <p className="text-xs text-slate-400 mt-1 italic max-w-[120px] truncate">"{req.adminNote}"</p>
                        )}
                      </td>
                      <td>
                        <ActionBtns req={req} processing={processing}
                          onAction={action => { setModal({id: req._id, action}); setNote(''); }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Confirm modal */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-slide-up">
            <h3 className="font-bold text-navy-800 capitalize text-lg mb-1">Confirm: {modal.action}</h3>
            <p className="text-slate-400 text-sm mb-4">Optional note for the student:</p>
            <textarea value={note} onChange={e => setNote(e.target.value)}
              placeholder="Add a note..." rows={3}
              className="input-field resize-none mb-4 text-sm" />
            <div className="flex gap-3">
              <button onClick={() => act(modal.id, modal.action)} disabled={!!processing}
                className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm capitalize">
                {processing && <Loader2 size={13} className="animate-spin" />} {modal.action}
              </button>
              <button onClick={() => setModal(null)} className="btn-outline flex-1 text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionBtns({ req, processing, onAction }) {
  if (req.status === 'pending') return (
    <div className="flex gap-1.5">
      <button onClick={() => onAction('approved')} disabled={!!processing}
        className="flex items-center gap-1 px-2.5 py-1 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-lg text-xs font-medium transition-all">
        <CheckCircle size={11} /> Approve
      </button>
      <button onClick={() => onAction('rejected')} disabled={!!processing}
        className="flex items-center gap-1 px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs font-medium transition-all">
        <XCircle size={11} /> Reject
      </button>
    </div>
  );
  if (req.status === 'approved') return (
    <button onClick={() => onAction('returned')} disabled={!!processing}
      className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-medium transition-all">
      <RotateCcw size={11} /> Mark Returned
    </button>
  );
  return <span className="text-slate-300 text-xs">—</span>;
}
