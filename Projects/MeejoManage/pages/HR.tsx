import React from 'react';
import { UsersIcon, WalletIcon } from '../components/Icons';

const HR: React.FC = () => {
  return (
    <div className="p-4 md:p-10 space-y-10 pt-24 bg-slate-50 dark:bg-gray-900 min-h-screen">
      <header>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white font-heading uppercase tracking-tight">Ressources Humaines</h1>
          <p className="text-slate-500 font-medium">Gestion simplifiée de vos collaborateurs.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-sm border dark:border-gray-700">
              <h3 className="text-xl font-black mb-6 dark:text-white flex items-center gap-3"><UsersIcon /> Employés</h3>
              <div className="py-20 text-center text-slate-300 italic font-bold">Aucun employé pour le moment.</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-sm border dark:border-gray-700">
              <h3 className="text-xl font-black mb-6 dark:text-white flex items-center gap-3"><WalletIcon /> Salaires</h3>
              <div className="p-6 bg-slate-50 dark:bg-gray-700 rounded-2xl">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Masse Salariale</p>
                  <p className="text-3xl font-black text-slate-900 dark:text-white">0 FCFA</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default HR;