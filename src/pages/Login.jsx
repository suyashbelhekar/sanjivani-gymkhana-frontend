import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff, Loader2, Trophy } from 'lucide-react';

export default function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [mode, setMode]       = useState('login');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', studentId: '', department: '', role: 'student' });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      mode === 'login' ? await login(form.email, form.password) : await register(form);
      toast.success(mode === 'login' ? 'Welcome back!' : 'Account created!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex flex-col justify-between w-2/5 bg-navy-700 text-white p-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
            <Trophy size={20} className="text-gold-400" />
          </div>
          <div>
            <p className="font-display font-bold">Sanjivani Gymkhana</p>
            <p className="text-xs text-white/50">Sports Management Portal</p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-display font-bold leading-snug mb-4">
            Your sports hub,<br />
            <span className="text-gold-400">all in one place.</span>
          </h2>
          <p className="text-white/60 text-sm leading-relaxed">
            Book courts, borrow equipment, track live sessions and manage
            the Gymkhana — seamlessly.
          </p>

          <div className="mt-8 space-y-3">
            {['5 Sports Disciplines', 'Equipment Borrowing Portal', 'Live Court Sessions', 'Admin Dashboard'].map((f) => (
              <div key={f} className="flex items-center gap-2.5 text-sm text-white/70">
                <span className="w-5 h-5 rounded-full bg-gold-500/20 border border-gold-500/30
                                 flex items-center justify-center text-gold-400 text-xs">✓</span>
                {f}
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/30 text-xs">Sanjivani University, Kopargaon – 423603</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-navy-500 rounded-xl flex items-center justify-center">
              <Trophy size={18} className="text-gold-400" />
            </div>
            <p className="font-display font-bold text-navy-800">Sanjivani Gymkhana</p>
          </div>

          <h1 className="text-2xl font-display font-bold text-navy-800 mb-1">
            {mode === 'login' ? 'Sign in to your account' : 'Create an account'}
          </h1>
          <p className="text-slate-500 text-sm mb-6">
            {mode === 'login'
              ? "Don't have an account? "
              : 'Already registered? '}
            <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-navy-600 font-semibold hover:underline">
              {mode === 'login' ? 'Register' : 'Sign in'}
            </button>
          </p>

          <form onSubmit={submit} className="space-y-4">
            {mode === 'register' && (
              <>
                <div>
                  <label className="text-xs font-medium text-slate-600 mb-1 block">Full Name</label>
                  <input name="name" value={form.name} onChange={handle} required
                    placeholder="Arjun Sharma" className="input-field" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1 block">Student ID</label>
                    <input name="studentId" value={form.studentId} onChange={handle}
                      placeholder="SCOE2021001" className="input-field" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1 block">Department</label>
                    <input name="department" value={form.department} onChange={handle}
                      placeholder="Computer Engg." className="input-field" />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handle} required
                placeholder="you@sanjivani.edu.in" className="input-field" />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600 mb-1 block">Password</label>
              <div className="relative">
                <input name="password" type={showPass ? 'text' : 'password'}
                  value={form.password} onChange={handle} required
                  autoComplete="current-password"
                  placeholder="••••••••" className="input-field pr-10" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
              {loading && <Loader2 size={15} className="animate-spin" />}
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 bg-navy-50 border border-navy-100 rounded-xl p-4 text-xs text-slate-500">
            <p className="font-semibold text-navy-700 mb-1">Demo Credentials</p>
            <p>Admin: <span className="text-navy-600 font-medium">admin@sanjivani.edu.in</span> / admin123</p>
            <p>Student: <span className="text-navy-600 font-medium">student@sanjivani.edu.in</span> / student123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
