import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Lock, Eye, EyeOff, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ChangePassword() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [show, setShow] = useState({ old: false, new: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handle = (e) => { setError(''); setForm({ ...form, [e.target.name]: e.target.value }); };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.newPassword.length < 6) { setError('New password must be at least 6 characters.'); return; }
    if (form.newPassword !== form.confirmPassword) { setError('Passwords do not match.'); return; }
    setLoading(true);
    try {
      await axios.put('/auth/change-password', {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });
      setSuccess(true);
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
          <Link to="/" className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-navy-600 transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="font-display font-bold text-navy-800 text-lg">Change Password</h1>
            <p className="text-slate-400 text-xs">Update your account security</p>
          </div>
        </div>
      </div>

      {/* Form card */}
      <div className="flex items-start justify-center px-4 pt-12 pb-16">
        <div className="w-full max-w-md animate-fade-in">
          {/* Icon + title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-500 rounded-2xl mb-4 shadow-lg">
              <Lock size={28} className="text-white" />
            </div>
            <h2 className="text-2xl font-display font-bold text-navy-800">Change Password</h2>
            {user && <p className="text-slate-500 text-sm mt-1">Updating password for <span className="font-semibold text-navy-600">{user.name}</span></p>}
          </div>

          <div className="bg-white rounded-2xl shadow-card border border-slate-100 p-7">
            <form onSubmit={submit} className="space-y-5">
              {/* Current password */}
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Current Password</label>
                <div className="relative">
                  <input name="oldPassword" type={show.old ? 'text' : 'password'}
                    value={form.oldPassword} onChange={handle} required
                    autoComplete="current-password"
                    placeholder="Enter your current password"
                    className="input-field pr-10" />
                  <button type="button" onClick={() => setShow(s => ({ ...s, old: !s.old }))}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600">
                    {show.old ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* New password */}
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">New Password</label>
                <div className="relative">
                  <input name="newPassword" type={show.new ? 'text' : 'password'}
                    value={form.newPassword} onChange={handle} required
                    autoComplete="new-password"
                    placeholder="Minimum 6 characters"
                    className="input-field pr-10" />
                  <button type="button" onClick={() => setShow(s => ({ ...s, new: !s.new }))}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600">
                    {show.new ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-1">Must be at least 6 characters long</p>
              </div>

              {/* Confirm password */}
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 block">Confirm New Password</label>
                <div className="relative">
                  <input name="confirmPassword" type={show.confirm ? 'text' : 'password'}
                    value={form.confirmPassword} onChange={handle} required
                    autoComplete="new-password"
                    placeholder="Re-enter new password"
                    className="input-field pr-10" />
                  <button type="button" onClick={() => setShow(s => ({ ...s, confirm: !s.confirm }))}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600">
                    {show.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {/* Live match indicator */}
                {form.confirmPassword && (
                  <p className={`text-xs mt-1 ${form.newPassword === form.confirmPassword ? 'text-green-600' : 'text-red-500'}`}>
                    {form.newPassword === form.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                  </p>
                )}
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 mt-2 py-3">
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Lock size={15} />}
                {loading ? 'Saving...' : 'Save Password'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success popup */}
      {success && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 text-center animate-slide-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle size={36} className="text-green-500" />
            </div>
            <h3 className="text-xl font-display font-bold text-slate-800 mb-2">Password Changed!</h3>
            <p className="text-slate-500 text-sm mb-6">Your password has been updated successfully.</p>
            <button onClick={() => navigate('/')} className="btn-primary w-full py-3">
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
