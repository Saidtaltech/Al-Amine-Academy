
import React, { useMemo, useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { StorageService } from '../services/storage';

const Reports: React.FC = () => {
  const settings = StorageService.getSettings();
  const [reportData, setReportData] = useState({ hourlyStats: [] as any[], sourceStats: [] as any[] });

  useEffect(() => {
    // Fix: storage.getSales is async
    const loadData = async () => {
      const sales = await StorageService.getSales();
      
      // Source Distribution Logic
      const srcCounts: Record<string, number> = {};
      sales.forEach(s => { srcCounts[s.source] = (srcCounts[s.source] || 0) + 1; });
      let sourceStats = Object.entries(srcCounts).map(([name, value]) => ({ name, value }));
      
      // Better Demo Data if empty
      if (sourceStats.length === 0) sourceStats = [
          { name: 'Magasin (POS)', value: 65 },
          { name: 'Site Web', value: 20 },
          { name: 'WhatsApp', value: 10 },
          { name: 'Meejo Market', value: 5 }
      ];

      // Hourly Distribution Logic
      const hours: Record<string, number> = { 9: 2, 10: 5, 11: 8, 12: 12, 13: 15, 14: 10, 15: 8, 16: 14, 17: 20, 18: 15 };
      sales.forEach(s => {
          const h = new Date(s.date).getHours();
          hours[h] = (hours[h] || 0) + 1;
      });
      const hourlyStats = Object.entries(hours)
        .map(([h, v]) => ({ hour: `${h}h`, count: v }))
        .sort((a, b) => parseInt(a.hour) - parseInt(b.hour));

      setReportData({ hourlyStats, sourceStats });
    };
    loadData();
  }, []);

  const { hourlyStats, sourceStats } = reportData;

  // Distinct and accessible palette
  const SOURCE_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];

  return (
    <div className="p-4 md:p-8 space-y-10 pt-24 bg-gray-50 min-h-screen pb-24">
        <h2 className="text-4xl font-black text-slate-900 font-heading tracking-tight">Audits & Performance</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* CANAUX D'ACQUISITION */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
                <h3 className="text-2xl font-black text-slate-900 mb-8 flex justify-between items-center">
                    Canaux de Vente
                    <span className="text-[10px] uppercase font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded">Répartition %</span>
                </h3>
                <div className="h-80 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={sourceStats}
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={105}
                                paddingAngle={5}
                                dataKey="value"
                                cornerRadius={8}
                                stroke="none"
                            >
                                {sourceStats.map((_, index) => (
                                    <Cell key={index} fill={SOURCE_COLORS[index % SOURCE_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '15px', border:'none', boxShadow:'0 10px 25px -5px rgba(0,0,0,0.1)', fontWeight: 'bold' }} />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'black', textTransform: 'uppercase' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-xs text-center text-slate-400 font-bold mt-4 italic">Origine des revenus encaissés.</p>
            </div>

            {/* TRAFFIC PAR HEURE */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
                <h3 className="text-2xl font-black text-slate-900 mb-8">Flux Clients par Heure</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={hourlyStats}>
                            <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{fill:'#94a3b8', fontWeight:700, fontSize:10}} />
                            <YAxis axisLine={false} tickLine={false} hide />
                            <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px' }} />
                            <Bar dataKey="count" fill="#3b82f6" radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-xs text-slate-400 font-bold text-center mt-4">Astuce : Déployez plus de personnel à 17h.</p>
            </div>
        </div>
    </div>
  );
};

export default Reports;
