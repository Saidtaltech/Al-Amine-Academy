import React, { useState, useEffect, useMemo } from 'react';
import { StorageService } from '../services/storage';
import { Sale } from '../types';
import { formatCurrency } from '../constants';
import { SearchIcon, UserIcon, DownloadIcon } from '../components/Icons';
import { useNotify } from '../App';

const History: React.FC = () => {
  const { notify } = useNotify();
  const [sales, setSales] = useState<Sale[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
        try {
            const data = await StorageService.getSales();
            setSales(data ? data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) : []);
        } catch (e) {
            console.error("Error loading sales history:", e);
        } finally {
            setLoading(false);
        }
    };
    load();
  }, []);

  const filteredSales = useMemo(() => {
      return sales.filter(s => 
          (s.receiptNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
          (s.customerPhone && s.customerPhone.includes(searchTerm)) ||
          (s.cashierName || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [sales, searchTerm]);

  const handleExportCSV = () => {
    const headers = "Date,Recu,Caissier,Total,Paiement\n";
    const rows = filteredSales.map(s => `${s.date},${s.receiptNumber},${s.cashierName},${s.total},${s.paymentMethod}`).join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `ventes_meejo_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
    notify('Export Historique terminé');
  };

  const handleMarkDelivered = async (sale: Sale) => {
    const updates = {
      status: 'DELIVERED' as const,
      paymentStatus: 'PAID' as const,
      amountPaid: sale.total,
      remainingAmount: 0,
      paymentDate: new Date().toISOString().split('T')[0]
    };

    await StorageService.updateSale(sale.id, updates);
    setSales(prev => prev.map(item => item.id === sale.id ? { ...item, ...updates } : item));
    notify('Vente validÃ©e', 'success');
  };

  return (
    <div className="p-6 md:p-10 space-y-10 pt-24 bg-gray-50/50 dark:bg-gray-900 min-h-screen pb-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white font-heading tracking-tight uppercase">Journal des Encaissements</h2>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Historique complet des transactions en magasin et en ligne.</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
                <div className="relative group flex-1 md:w-80 flex items-center">
                    <div className="absolute left-6 z-10 flex items-center justify-center">
                        <SearchIcon className="w-5 h-5 flex-shrink-0 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none" />
                    </div>
                    <input 
                        className="w-full pl-14 pr-6 py-4 bg-white dark:bg-gray-800 border-2 border-slate-100 dark:border-gray-700 rounded-2xl font-bold shadow-sm focus:border-blue-500 outline-none transition-all dark:text-white"
                        placeholder="Chercher ticket..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <button onClick={handleExportCSV} className="p-4 bg-white dark:bg-gray-800 border-2 border-slate-100 dark:border-gray-700 rounded-2xl text-slate-600 dark:text-slate-300 hover:text-blue-600 transition shadow-sm" title="Export CSV">
                    <DownloadIcon className="w-6 h-6" />
                </button>
            </div>
        </div>

        {loading ? (
            <div className="flex justify-center py-40 animate-pulse text-slate-300 font-black uppercase text-xs tracking-[0.3em]">Chargement du journal...</div>
        ) : (
            <div className="space-y-6">
                {filteredSales.map((sale) => (
                    <div key={sale.id} className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-gray-700 hover:border-blue-200 transition-all flex flex-col md:flex-row items-center gap-8 group">
                        <div className="w-full md:w-48 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-50 dark:border-gray-700 pb-4 md:pb-0">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{new Date(sale.date).toLocaleDateString()}</p>
                            <p className="text-lg font-black text-slate-900 dark:text-white">{new Date(sale.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>

                        <div className="flex-1 flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center font-black text-sm shadow-inner">
                                    #{sale.receiptNumber.slice(-3)}
                                </div>
                                <div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Opérateur</p>
                                    <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 text-sm"><UserIcon className="w-3 h-3"/> {sale.cashierName}</p>
                                </div>
                            </div>

                            <div className="flex-1 w-full overflow-hidden">
                                <div className="flex gap-2 flex-wrap">
                                    {(sale.items || []).map((item, i) => (
                                        <span key={i} className="px-3 py-1 bg-slate-50 dark:bg-gray-700 border border-slate-100 dark:border-gray-600 rounded-lg text-[10px] font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">{item.name} x{item.quantity}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="text-center md:text-right w-full md:w-auto px-4">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{sale.paymentMethod}</p>
                                <p className="text-xl font-black text-slate-900 dark:text-white">{formatCurrency(sale.total)}</p>
                            </div>

                            <div className="w-full md:w-32">
                                <span className={`block text-center py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm ${sale.status === 'DELIVERED' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-orange-50 text-orange-600 border border-orange-100'}`}>
                                    {sale.status === 'DELIVERED' ? 'LIVRÉ' : 'EN COURS'}
                                </span>
                                {sale.status !== 'DELIVERED' && (
                                    <button onClick={() => handleMarkDelivered(sale)} className="mt-2 w-full py-2 rounded-xl bg-green-600 text-white text-[9px] font-black uppercase tracking-widest hover:bg-green-700 transition">
                                        Valider
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {filteredSales.length === 0 && (
                    <div className="py-32 text-center text-slate-300 font-bold italic border-2 border-dashed rounded-[3rem] border-slate-100 dark:border-gray-700">Aucun résultat trouvé.</div>
                )}
            </div>
        )}
    </div>
  );
};

export default History;
