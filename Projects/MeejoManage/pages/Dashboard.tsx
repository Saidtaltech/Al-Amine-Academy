
import React, { useMemo, useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { StorageService } from '../services/storage';
import { formatCurrency } from '../constants';
import { WalletIcon, AlertIcon, HistoryIcon, TagIcon } from '../components/Icons';
import { DashboardStats, Store, Sale } from '../types';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    revenueToday: 0, revenueTodayTrend: 0, revenueMonth: 0, revenueMonthTrend: 0,
    totalProducts: 0, lowStockCount: 0, topProducts: [], channelStats: []
  });
  const [activeStore, setActiveStore] = useState<Store | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [s, store, sls] = await Promise.all([
          StorageService.getStats().catch(() => null),
          StorageService.getActiveStore().catch(() => null),
          StorageService.getSales().catch(() => [])
        ]);
        if (s) setStats(s);
        if (store) setActiveStore(store);
        if (sls) setSales(sls);
      } catch (e) {
        console.error("Dashboard data load error", e);
      }
    };
    load();
  }, []);

  const weeklySalesData = useMemo(() => {
    try {
      const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toISOString().split('T')[0];
      });
      return last7Days.map(date => ({
        name: new Date(date).toLocaleDateString('fr-FR', { weekday: 'short' }),
        total: sales.filter(s => s.date && s.date.startsWith(date)).reduce((acc, s) => acc + (Number(s.total) || 0), 0)
      }));
    } catch { return []; }
  }, [sales]);

  return (
    <div className="p-4 md:p-10 space-y-8 pt-20 md:pt-10 min-h-screen bg-slate-50 dark:bg-gray-900">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white font-heading uppercase tracking-tight text-shadow-sm">Tableau de Bord</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">{activeStore?.name || 'Meejo Manage'}</p>
        </div>
        <button onClick={() => window.location.hash = "#pos"} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl hover:bg-blue-700 transition active:scale-95">
          + Nouvelle Vente
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard label="CA DU JOUR" value={formatCurrency(stats.revenueToday)} icon={<WalletIcon />} color="blue" />
        <KpiCard label="VENTES CE MOIS" value={formatCurrency(stats.revenueMonth)} icon={<HistoryIcon />} color="purple" />
        <KpiCard label="ARTICLES EN STOCK" value={stats.totalProducts.toString()} icon={<TagIcon />} color="emerald" />
        <KpiCard label="ALERTES STOCK" value={stats.lowStockCount.toString()} icon={<AlertIcon />} color="red" />
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-sm border dark:border-gray-700">
        <h3 className="font-black text-slate-800 dark:text-white uppercase text-xs tracking-widest mb-8">Performance des 7 derniers jours</h3>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklySalesData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8', fontWeight: 700}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94A3B8', fontWeight: 700}} />
              <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontWeight: 'bold' }} />
              <Area type="monotone" dataKey="total" stroke="#3B82F6" strokeWidth={4} fill="url(#colorTotal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const KpiCard: React.FC<{ label: string; value: string; icon: React.ReactNode; color: string; }> = ({ label, value, icon, color }) => {
  const colors: Record<string, string> = {
    blue: 'text-blue-600 bg-blue-50 dark:bg-blue-900/20',
    purple: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20',
    emerald: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20',
    red: 'text-red-600 bg-red-50 dark:bg-red-900/20'
  };
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-gray-700 transition hover:shadow-xl group">
      {/* Icon Container with fixed size and overflow prevention */}
      <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center transform group-hover:scale-110 transition duration-300 overflow-hidden ${colors[color]}`}>
        {React.isValidElement(icon) ? React.cloneElement(icon as any, { 
          className: 'max-w-[24px] max-h-[24px] object-contain flex-shrink-0' 
        }) : null}
      </div>
      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{label}</p>
      <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{value}</h3>
    </div>
  );
};

export default Dashboard;
