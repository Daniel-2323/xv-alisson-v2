import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Lock, Users, Ticket, Trash2, RefreshCw, ArrowLeft, MessageSquare } from 'lucide-react';
import { FallingGoldParticles } from '../components/Effects';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const TOKEN_KEY = 'admin_token';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error('Contraseña incorrecta');
      const data = await res.json();
      localStorage.setItem(TOKEN_KEY, data.token);
      onLogin(data.token);
    } catch (err) {
      setError('Contraseña incorrecta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen section-bg flex items-center justify-center px-6 relative overflow-hidden">
      <FallingGoldParticles count={20} />
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md p-10 rounded-lg border border-[color:var(--gold-1)]/25 bg-[color:var(--bg-panel)]/70 backdrop-blur shadow-2xl"
      >
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-[color:var(--gold-1)]/10 border border-[color:var(--gold-1)]/50 flex items-center justify-center">
            <Lock size={22} className="text-[color:var(--gold-1)]" />
          </div>
        </div>
        <p className="section-eyebrow text-center">Panel Privado</p>
        <h1 className="font-serif-display italic text-4xl text-gold-gradient text-center mt-2">Iniciar Sesión</h1>
        <p className="font-serif-body italic text-center text-[color:var(--cream-soft)]/70 mt-3">
          Ingresa la contraseña para ver las confirmaciones
        </p>

        <div className="mt-8">
          <label className="section-eyebrow block mb-3">Contraseña</label>
          <input
            type="password"
            className="field-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoFocus
          />
        </div>

        {error && (
          <p className="font-serif-body italic text-sm text-red-300 mt-4 text-center">{error}</p>
        )}

        <button type="submit" disabled={loading || !password} className="btn-gold-solid w-full mt-6 disabled:opacity-60">
          {loading ? 'INGRESANDO...' : 'INGRESAR'}
        </button>

        <div className="mt-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-[color:var(--cream-soft)]/60 hover:text-[color:var(--gold-1)] text-sm font-serif-body italic transition">
            <ArrowLeft size={14} /> Volver a la invitación
          </Link>
        </div>
      </form>
    </div>
  );
};

const AdminDashboard = ({ token, onLogout }) => {
  const [rsvps, setRsvps] = useState([]);
  const [stats, setStats] = useState({ total_confirmations: 0, total_passes: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const authHeaders = { 'x-admin-token': token };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [rRes, sRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/admin/rsvps`, { headers: authHeaders }),
        fetch(`${BACKEND_URL}/api/admin/stats`, { headers: authHeaders }),
      ]);
      if (rRes.status === 401 || sRes.status === 401) {
        onLogout();
        return;
      }
      setRsvps(await rRes.json());
      setStats(await sRes.json());
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => { load(); }, [load]);

  const remove = async (id) => {
    if (!window.confirm('¿Eliminar esta confirmación?')) return;
    const res = await fetch(`${BACKEND_URL}/api/admin/rsvps/${id}`, { method: 'DELETE', headers: authHeaders });
    if (res.ok) load();
  };

  const exportCSV = () => {
    const rows = [['Nombre', 'Pases', 'Mensaje', 'Fecha']];
    rsvps.forEach((r) => rows.push([r.name, r.passes, r.message || '', new Date(r.created_at).toLocaleString('es-MX')]));
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `confirmaciones_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = rsvps.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen section-bg relative overflow-hidden">
      <FallingGoldParticles count={18} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[color:var(--gold-1)]/20">
          <div>
            <p className="section-eyebrow">Panel Privado</p>
            <h1 className="font-serif-display italic text-4xl md:text-5xl text-gold-gradient mt-2">Confirmaciones</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-[color:var(--cream-soft)]/70 hover:text-[color:var(--gold-1)] text-sm font-sans tracking-widest-xl uppercase transition inline-flex items-center gap-2">
              <ArrowLeft size={14} /> Invitación
            </Link>
            <button onClick={load} className="text-[color:var(--gold-2)] text-sm font-sans tracking-widest-xl uppercase inline-flex items-center gap-2 hover:opacity-80 transition">
              <RefreshCw size={14} /> Actualizar
            </button>
            <button onClick={onLogout} className="text-red-300 text-sm font-sans tracking-widest-xl uppercase inline-flex items-center gap-2 hover:opacity-80 transition">
              <LogOut size={14} /> Salir
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 gap-5 mt-8">
          <div className="p-6 rounded-lg border border-[color:var(--gold-1)]/25 bg-[color:var(--bg-panel)]/60 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[color:var(--gold-1)]/10 flex items-center justify-center border border-[color:var(--gold-1)]/40">
                <Users size={20} className="text-[color:var(--gold-1)]" />
              </div>
              <div>
                <p className="section-eyebrow">Confirmaciones</p>
                <p className="font-serif-display text-4xl text-gold-gradient mt-1">{stats.total_confirmations}</p>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-lg border border-[color:var(--gold-1)]/25 bg-[color:var(--bg-panel)]/60 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[color:var(--gold-1)]/10 flex items-center justify-center border border-[color:var(--gold-1)]/40">
                <Ticket size={20} className="text-[color:var(--gold-1)]" />
              </div>
              <div>
                <p className="section-eyebrow">Total de Pases</p>
                <p className="font-serif-display text-4xl text-gold-gradient mt-1">{stats.total_passes}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mt-8 flex flex-wrap items-center gap-3 justify-between">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="field-input max-w-sm"
          />
          <button onClick={exportCSV} className="btn-gold-outline">EXPORTAR CSV</button>
        </div>

        {/* Table */}
        <div className="mt-6 rounded-lg border border-[color:var(--gold-1)]/25 bg-[color:var(--bg-panel)]/50 backdrop-blur overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[color:var(--gold-1)]/20">
                  <th className="section-eyebrow py-3 px-4">Nombre</th>
                  <th className="section-eyebrow py-3 px-4">Pases</th>
                  <th className="section-eyebrow py-3 px-4">Mensaje</th>
                  <th className="section-eyebrow py-3 px-4">Fecha</th>
                  <th className="section-eyebrow py-3 px-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="py-8 text-center text-[color:var(--cream-soft)]/60 font-serif-body italic">Cargando...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={5} className="py-10 text-center text-[color:var(--cream-soft)]/60 font-serif-body italic">Sin confirmaciones aún</td></tr>
                ) : filtered.map((r) => (
                  <tr key={r.id} className="border-b border-[color:var(--gold-1)]/10 hover:bg-[color:var(--gold-1)]/5 transition">
                    <td className="py-3 px-4 font-serif-display text-[color:var(--cream)]">{r.name}</td>
                    <td className="py-3 px-4 font-serif-display text-gold-gradient text-lg">{r.passes}</td>
                    <td className="py-3 px-4 text-sm text-[color:var(--cream-soft)]/80 max-w-xs">
                      {r.message ? (
                        <span className="inline-flex items-start gap-2"><MessageSquare size={14} className="text-[color:var(--gold-1)] mt-1 flex-shrink-0" /> <span className="italic font-serif-body">{r.message}</span></span>
                      ) : <span className="text-[color:var(--cream-soft)]/40">—</span>}
                    </td>
                    <td className="py-3 px-4 text-xs text-[color:var(--cream-soft)]/70 font-sans">{new Date(r.created_at).toLocaleString('es-MX')}</td>
                    <td className="py-3 px-4 text-right">
                      <button onClick={() => remove(r.id)} className="text-red-300/80 hover:text-red-300 transition p-2" aria-label="Eliminar">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminPage = () => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  const logout = () => {
    if (token) {
      fetch(`${BACKEND_URL}/api/admin/logout`, { method: 'POST', headers: { 'x-admin-token': token } }).catch(() => {});
    }
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  if (!token) return <AdminLogin onLogin={setToken} />;
  return <AdminDashboard token={token} onLogout={logout} />;
};

export default AdminPage;
