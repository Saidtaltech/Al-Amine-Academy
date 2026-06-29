
import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storage';
import { Shipment } from '../types';
import { formatCurrency } from '../constants';
import { CargoIcon, SearchCheckIcon, TrashIcon } from '../components/Icons';
import PublicCalculator from './PublicCalculator';

const Sourcing: React.FC = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => { 
    const load = async () => {
      const data = await StorageService.getShipments();
      setShipments(data);
    };
    load();
  }, []);

  const handleSync = () => {
      setIsSyncing(true);
      setTimeout(() => {
          setIsSyncing(false);
          alert("Alibaba Cloud : 3 commandes synchronisées !");
      }, 2500);
  };

  return (
    <div className="p-6 md:p-10 space-y-10 bg-gray-50/50 min-h-screen pb-32 pt-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
                <h2 className="text-3xl font-black text-slate-900 font-heading">Sourcing & Alibaba Sync</h2>
                <p className="text-slate-500 font-medium">Calculez vos coûts de revient et suivez vos colis en un clic.</p>
            </div>
            <button 
                onClick={handleSync} 
                disabled={isSyncing}
                className="px-8 py-4 bg-orange-600 text-white rounded-2xl font-black shadow-xl hover:bg-orange-700 transition flex items-center gap-2 disabled:opacity-50"
            >
                {isSyncing ? '⏳ Synchronisation...' : '⚡ Sync Alibaba'}
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
                <div className="bg-white rounded-[3rem] p-4 md:p-8 shadow-sm border border-slate-100">
                    <h3 className="text-xl font-black text-slate-800 mb-6 px-4 flex items-center gap-2">
                        <SearchCheckIcon className="w-5 h-5"/> Simulateur Précis (Mer/Air)
                    </h3>
                    <PublicCalculator />
                </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                    <h4 className="font-black text-slate-800 mb-6 flex items-center gap-2"><CargoIcon className="w-5 h-5"/> Logistics Tracker</h4>
                    <div className="space-y-6">
                        {shipments.map(s => (
                            <div key={s.id} className="relative pl-8 border-l-2 border-slate-100 pb-4">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{s.status}</p>
                                <p className="font-black text-slate-800 text-sm mt-1">{s.name}</p>
                                <p className="text-xs text-slate-400 mt-1">Ref: {s.trackingNumber}</p>
                            </div>
                        ))}
                        {shipments.length === 0 && (
                            <div className="text-center py-10 text-slate-300 font-bold italic">
                                Aucun cargo actif actuellement.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Sourcing;
