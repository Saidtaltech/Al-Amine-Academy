
import React, { useState, useEffect, useMemo } from 'react';
import { StorageService } from '../services/storage';
import { Expense } from '../types';
import { formatCurrency } from '../constants';
import { WalletIcon, TrashIcon, DownloadIcon } from '../components/Icons';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useNotify } from '../App';

const EXPENSE_CATEGORIES = ['Loyer', 'Electricité', 'Salaire', 'Stock', 'Transport', 'Marketing', 'Logistique', 'Autre'];
const CATEGORY_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#64748B'];

const Expenses: React.FC = () => {
  const { notify } = useNotify();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Partial<Expense>>({ category: 'Autre', date: new Date().toISOString().split('T')[0] });

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await StorageService.getExpenses();
        if (Array.isArray(data)) {
            setExpenses(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        }
      } catch (error) {
        console.error("Error loading expenses:", error);
      }
    };
    loadData();
  }, []);

  const chartData = useMemo(() => {
      const grouped = expenses.reduce((acc, curr) => {
          acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
          return acc;
      }, {} as Record<string, number>);
      return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tenantId = await StorageService.getTenantId();
      const exp = { ...formData, id: Date.now().toString(), storeId: tenantId } as Expense;
      await StorageService.saveExpense(exp);
      const data = await StorageService.getExpenses();
      setExpenses(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      setShowModal(false);
      notify('Dépense enregistrée', 'success');
    } catch (error) {
      notify('Erreur lors de l\'enregistrement', 'error');
    }
  };

  const handleExportCSV = () => {
    const headers = "Date,Catégorie,Description,Montant\n";
    const rows = expenses.map(e => `${e.date},${e.category},${e.description},${e.amount}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `depenses_meejo_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
    notify('Export terminé', 'info');
  };

  return (
    <div className="p-6 md:p-10 space-y-10 pt-24 bg-gray-50/50 min-h-screen pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h2 className="text-3xl font-black text-slate-900 font-heading tracking-tight uppercase">Gestion des Dépenses</h2>
            <p className="text-slate-500 font-medium">Contrôlez vos sorties de fonds et optimisez vos coûts.</p>
        </div>
        <div className="flex gap-2">
            <button onClick={handleExportCSV} className="px-6 py-4 bg-white text-slate-700 rounded-2xl font-black shadow-sm border flex items-center gap-2 transition hover:bg-slate-50"><DownloadIcon /> Export CSV</button>
            <button onClick={() => { setFormData({ category: 'Autre', date: new Date().toISOString().split('T')[0] }); setShowModal(true); }} className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black shadow-xl hover:bg-red-700 transition active:scale-95">+ Sortie de Caisse</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center">
                <h3 className="font-black text-slate-800 mb-8 self-start uppercase text-xs tracking-widest">Répartition des Coûts</h3>
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie 
                                data={chartData} 
                                innerRadius={70} 
                                outerRadius={100} 
                                paddingAngle={8} 
                                dataKey="value"
                                cornerRadius={6}
                            >
                                {chartData.map((_, index) => (
                                    <Cell key={index} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(v) => formatCurrency(Number(v))} contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }} />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-widest border-b">
                        <tr><th className="p-8">Date</th><th className="p-8">Catégorie</th><th className="p-8">Désignation</th><th className="p-8 text-right">Montant</th><th className="p-8"></th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {expenses.map(e => (
                            <tr key={e.id} className="hover:bg-slate-50/50 transition text-sm">
                                <td className="p-8 text-xs font-bold text-slate-400">{new Date(e.date).toLocaleDateString()}</td>
                                <td className="p-8"><span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest">{e.category}</span></td>
                                <td className="p-8 font-bold text-slate-800">{e.description}</td>
                                <td className="p-8 font-black text-red-600 text-right">{formatCurrency(e.amount)}</td>
                                <td className="p-8">
                                  <button 
                                    onClick={async () => { 
                                      if(confirm('Supprimer cette dépense ?')) { 
                                        await StorageService.deleteExpense(e.id); 
                                        setExpenses(prev => prev.filter(x => x.id !== e.id)); 
                                      } 
                                    }} 
                                    className="text-slate-300 hover:text-red-500 transition"
                                  >
                                    <TrashIcon />
                                  </button>
                                </td>
                            </tr>
                        ))}
                        {expenses.length === 0 && <tr><td colSpan={5} className="p-20 text-center text-slate-300 italic font-bold">Aucune dépense enregistrée.</td></tr>}
                    </tbody>
                </table>
              </div>
          </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
            <div className="bg-white rounded-[3rem] p-10 w-full max-w-lg shadow-2xl animate-scale-in">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-3xl font-black text-slate-900">Saisir Dépense</h3>
                    <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-900 transition text-3xl">×</button>
                </div>
                <form onSubmit={handleSave} className="space-y-6">
                    <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Catégorie</label>
                        <select className="w-full p-5 bg-slate-50 border-2 border-transparent focus:border-red-500 rounded-2xl font-bold transition outline-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                            {EXPENSE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Description</label>
                        <input required className="w-full p-5 bg-slate-50 border-2 border-transparent focus:border-red-500 rounded-2xl font-bold transition outline-none" placeholder="Ex: Frais Transport" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
                    </div>
                    <div>
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Montant (FCFA)</label>
                        <input required type="number" className="w-full p-5 bg-slate-50 border-2 border-transparent focus:border-red-500 rounded-2xl font-black text-2xl transition outline-none" placeholder="Montant" value={formData.amount || ''} onChange={e => setFormData({...formData, amount: parseFloat(e.target.value)})} />
                    </div>
                    <button type="submit" className="w-full py-6 bg-red-600 text-white rounded-2xl font-black text-xl shadow-xl hover:bg-red-700 transition">Enregistrer</button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;
