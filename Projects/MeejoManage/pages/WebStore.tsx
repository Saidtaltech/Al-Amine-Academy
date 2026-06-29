
import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storage';
import { GlobeIcon, SettingsIcon, EyeIcon, LockIcon } from '../components/Icons';
import { Store } from '../types';

const WebStore: React.FC = () => {
  const [store, setStore] = useState<Store | null>(null);
  const [config, setConfig] = useState({
      slug: '',
      bannerUrl: '',
      heroTitle: '',
      welcome: '',
      about: '',
      accent: '#000000',
      showPrices: true
  });

  useEffect(() => {
    // Fix: getActiveStore is async
    const loadStore = async () => {
        const s = await StorageService.getActiveStore();
        setStore(s);
        setConfig({
            slug: s.slug || '',
            bannerUrl: s.webConfig?.heroBannerUrl || '',
            heroTitle: s.webConfig?.heroTitle || '',
            welcome: s.webConfig?.welcomeMessage || '',
            about: s.webConfig?.aboutText || '',
            accent: s.webConfig?.accentColor || s.primaryColor,
            showPrices: s.webConfig?.showPrices ?? true
        });
    };
    loadStore();
  }, []);

  const handleSave = async () => {
      if (!store) return;
      const updated = { 
          ...store, slug: config.slug, 
          webConfig: { ...store.webConfig, heroBannerUrl: config.bannerUrl, heroTitle: config.heroTitle, welcomeMessage: config.welcome, aboutText: config.about, accentColor: config.accent, showPrices: config.showPrices }
      };
      await StorageService.saveStore(updated);
      alert('Configuration Site Web enregistrée !');
  };

  const inputClass = "w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl font-bold transition outline-none";

  if (!store) return <div className="p-10 text-slate-400">Chargement...</div>;

  return (
    <div className="p-6 md:p-10 space-y-10 pt-24 bg-gray-50/50 min-h-screen pb-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
                <h2 className="text-3xl font-black text-slate-900 font-heading">Site Vitrine & E-commerce</h2>
                <p className="text-slate-500 font-medium">Contrôlez l'apparence de votre boutique en ligne.</p>
            </div>
            <div className="flex gap-4">
                <button onClick={() => window.open(`/#store/${store.id}`, '_blank')} className="px-6 py-4 bg-blue-100 text-blue-700 rounded-2xl font-black shadow-lg hover:bg-blue-200 transition flex items-center gap-2"><EyeIcon /> Aperçu</button>
                <button onClick={handleSave} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:bg-black transition">Enregistrer</button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 space-y-8">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-2"><SettingsIcon /> Configuration Identité</h3>
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Lien de votre boutique</label>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400">meejomanage.com/store/</span>
                        <input className={inputClass} value={config.slug} onChange={e => setConfig({...config, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} />
                    </div>
                </div>
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message de Bienvenue</label>
                    <input className={inputClass} value={config.welcome} onChange={e => setConfig({...config, welcome: e.target.value})} />
                </div>
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">À Propos (Description)</label>
                    <textarea className={`${inputClass} h-32 resize-none`} value={config.about} onChange={e => setConfig({...config, about: e.target.value})} />
                </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 space-y-8">
                <h3 className="text-xl font-black text-slate-800 flex items-center gap-2"><GlobeIcon /> Personnalisation Visuelle</h3>
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bannière Hero (URL Image)</label>
                    <input className={inputClass} value={config.bannerUrl} onChange={e => setConfig({...config, bannerUrl: e.target.value})} />
                </div>
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Couleur d'accentuation</label>
                    <div className="flex items-center gap-4">
                        <input type="color" className="w-16 h-16 rounded-2xl border-none cursor-pointer" value={config.accent} onChange={e => setConfig({...config, accent: e.target.value})} />
                        <p className="font-black text-slate-800 uppercase">{config.accent}</p>
                    </div>
                </div>
                <div className="p-6 bg-slate-50 rounded-[2rem] flex items-center justify-between">
                    <div>
                        <p className="font-black text-slate-800">Afficher les prix</p>
                        <p className="text-xs text-slate-400">Si décoché, les clients devront vous contacter.</p>
                    </div>
                    <input type="checkbox" className="w-6 h-6 rounded-lg text-blue-600" checked={config.showPrices} onChange={e => setConfig({...config, showPrices: e.target.checked})} />
                </div>
            </div>
        </div>
    </div>
  );
};

export default WebStore;
