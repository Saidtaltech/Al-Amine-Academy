import React from 'react';
import { SettingsIcon, SunIcon, MoonIcon, GlobeIcon, LockIcon } from '../components/Icons';

const Settings: React.FC = () => {
  return (
    <div className="p-4 md:p-10 space-y-10 pt-24 bg-slate-50 dark:bg-gray-900 min-h-screen">
      <header>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white font-heading uppercase tracking-tight">Paramètres Système</h1>
          <p className="text-slate-500 font-medium italic">Configurez votre environnement Meejo.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-white dark:bg-gray-800 p-10 rounded-[2.5rem] shadow-sm border dark:border-gray-700 space-y-8">
              <h3 className="text-xl font-black dark:text-white flex items-center gap-3"><SunIcon /> Thème et Apparence</h3>
              <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 border-2 border-blue-500 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex flex-col items-center gap-2 text-blue-600 font-black cursor-pointer">
                      <SunIcon className="w-8 h-8" /> <span>Clair</span>
                  </div>
                  <div className="p-6 border-2 border-slate-100 dark:border-gray-700 rounded-2xl flex flex-col items-center gap-2 text-slate-400 font-black cursor-pointer">
                      <MoonIcon className="w-8 h-8" /> <span>Sombre</span>
                  </div>
              </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-10 rounded-[2.5rem] shadow-sm border dark:border-gray-700 space-y-8">
              <h3 className="text-xl font-black dark:text-white flex items-center gap-3"><GlobeIcon /> Boutique</h3>
              <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-slate-400 block ml-2">En-tête Factures</label>
                  <input className="w-full p-4 bg-slate-50 dark:bg-gray-700 rounded-2xl border-none outline-none font-bold dark:text-white focus:ring-2 focus:ring-blue-500" placeholder="Ma Boutique..." />
              </div>
          </div>
      </div>
      
      <div className="bg-blue-600 p-8 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-md"><LockIcon className="w-8 h-8" /></div>
              <div>
                  <h4 className="text-xl font-black font-heading">Sécurité de Niveau Supérieur</h4>
                  <p className="text-sm text-blue-100 font-medium">Vos données sont encryptées et synchronisées automatiquement.</p>
              </div>
          </div>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Vérifier l'état Cloud</button>
      </div>
    </div>
  );
};

export default Settings;