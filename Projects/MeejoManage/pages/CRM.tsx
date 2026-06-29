
import React, { useState, useEffect, useMemo } from 'react';
import { StorageService } from '../services/storage';
import { Customer, Sale } from '../types';
import { formatCurrency } from '../constants';
import { UsersIcon, Star, Phone, HistoryIcon, DownloadIcon, XIcon, SearchIcon } from '../components/Icons';
import { useNotify } from '../App';

const CRM: React.FC = () => {
  const { notify } = useNotify();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    // Fix: getCustomers and getSales are async
    const loadData = async () => {
      const custs = await StorageService.getCustomers();
      const sls = await StorageService.getSales();
      setCustomers(custs.sort((a, b) => b.totalSpent - a.totalSpent));
      setSales(sls);
    };
    loadData();
  }, []);

  const filtered = useMemo(() => {
      const term = searchTerm.toLowerCase();
      return customers.filter(c => c.name.toLowerCase().includes(term) || c.phone.includes(term));
  }, [customers, searchTerm]);

  const handleExportCSV = () => {
    const headers = "Nom,Telephone,Total Achats,Points\n";
    const rows = filtered.map(c => `${c.name},${c.phone},${c.totalSpent},${c.loyaltyPoints}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `clients_meejo_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
    notify('Export Clients terminé');
  };

  const getCustomerScore = (c: Customer) => {
      if (c.totalSpent === 0) return 0;
      const monetary = Math.min(100, (c.totalSpent / 500000) * 100);
      const frequency = Math.min(100, (c.loyaltyPoints / 500) * 100);
      return Math.round((monetary + frequency) / 2);
  };

  const getRank = (spent: number) => {
      if (spent >= 500000) return { label: 'DIAMANT', color: 'text-blue-600 bg-blue-50 border-blue-200' };
      if (spent >= 200000) return { label: 'OR', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' };
      return { label: 'BRONZE', color: 'text-slate-500 bg-slate-50 border-slate-200' };
  };

  return (
    <div className="p-4 md:p-10 space-y-10 pt-20 md:pt-10 bg-slate-50 dark:bg-gray-900 min-h-screen pb-32">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="animate-fade-in">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white font-heading">Clients & Fidélité</h2>
                <p className="text-slate-500 font-medium">Pilotez votre relation client et récompensez les meilleurs.</p>
            </div>
            <button onClick={handleExportCSV} className="px-6 py-3 bg-white dark:bg-gray-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold shadow-sm border dark:border-gray-700 flex items-center gap-2"><DownloadIcon /> Export CSV</button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border dark:border-gray-700 shadow-sm text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Base Clients</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white">{customers.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border dark:border-gray-700 shadow-sm text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Panier Moyen</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white">{customers.length > 0 ? formatCurrency(Math.floor(customers.reduce((a,c)=>a+c.totalSpent,0)/customers.length)) : '0'}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm flex items-center gap-3 border dark:border-gray-700">
                    <SearchIcon className="text-slate-400 w-5 h-5" />
                    <input className="flex-1 bg-transparent outline-none font-bold text-slate-900 dark:text-white" placeholder="Nom ou numéro client..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>

                <div className="space-y-4">
                    {filtered.map((c, i) => {
                        const rank = getRank(c.totalSpent);
                        const score = getCustomerScore(c);
                        return (
                            <div key={c.id} onClick={() => setSelectedCustomer(c)} className="bg-white dark:bg-gray-800 p-6 rounded-[2rem] border border-slate-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col sm:flex-row items-center gap-6 group">
                                <div className="w-16 h-16 bg-slate-50 dark:bg-gray-700 rounded-2xl flex items-center justify-center font-black text-slate-300 text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">{c.name[0]}</div>
                                <div className="flex-1 text-center sm:text-left">
                                    <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                                        <h4 className="font-black text-slate-800 dark:text-white">{c.name}</h4>
                                        <span className={`px-2 py-0.5 rounded-full border text-[8px] font-black tracking-widest ${rank.color}`}>{rank.label}</span>
                                    </div>
                                    <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1"><Phone className="w-3 h-3"/> {c.phone}</p>
                                    <div className="mt-2 h-1.5 w-32 bg-slate-100 dark:bg-gray-700 rounded-full overflow-hidden mx-auto sm:mx-0"><div className="h-full bg-blue-500" style={{ width: `${score}%` }}></div></div>
                                </div>
                                <div className="text-center sm:text-right border-t sm:border-t-0 sm:border-l border-slate-50 dark:border-gray-700 pt-4 sm:pt-0 sm:pl-8">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">CA Client</p>
                                    <p className="text-xl font-black text-blue-600">{formatCurrency(c.totalSpent)}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full"></div>
                    <h3 className="text-2xl font-black mb-4">Marketing Direct</h3>
                    <p className="text-blue-100 text-xs mb-8 opacity-80 leading-relaxed">Boostez vos ventes en envoyant vos offres à vos {customers.length} clients via WhatsApp.</p>
                    <button onClick={() => window.open('https://wa.me/221787935555', '_blank')} className="w-full py-4 bg-white text-blue-700 rounded-xl font-black text-xs uppercase shadow-xl hover:scale-105 transition">Lancer Campagne</button>
                </div>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] border dark:border-gray-700 shadow-sm">
                    <h4 className="font-black text-slate-800 dark:text-white mb-6">Score de Fidélité</h4>
                    <div className="flex justify-between items-end">
                        <div><p className="text-4xl font-black text-green-500">84%</p><p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Taux de retour</p></div>
                        <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center"><Star className="w-10 h-10 text-green-500" /></div>
                    </div>
                </div>
            </div>
        </div>

        {selectedCustomer && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[110] flex items-center justify-center p-4" onClick={() => setSelectedCustomer(null)}>
                <div className="bg-white dark:bg-gray-800 w-full max-w-xl rounded-[2.5rem] shadow-2xl p-8 animate-scale-in" onClick={e => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-8"><h3 className="text-2xl font-black dark:text-white">Historique Client</h3><button onClick={() => setSelectedCustomer(null)} className="text-slate-400 text-3xl">×</button></div>
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center text-3xl font-black mx-auto mb-4 shadow-xl">{selectedCustomer.name[0]}</div>
                        <h4 className="text-xl font-black dark:text-white">{selectedCustomer.name}</h4>
                        <p className="text-slate-400 text-sm font-bold">{selectedCustomer.phone}</p>
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-3 custom-scrollbar pr-2">
                        {sales.filter(s => s.customerPhone === selectedCustomer.phone).map(s => (
                            <div key={s.id} className="p-4 bg-slate-50 dark:bg-gray-700 rounded-xl flex justify-between items-center border dark:border-gray-600">
                                <div><p className="font-black text-sm dark:text-white">#{s.receiptNumber}</p><p className="text-[10px] text-slate-400 uppercase">{new Date(s.date).toLocaleDateString()}</p></div>
                                <span className="font-black text-blue-600">{formatCurrency(s.total)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default CRM;
