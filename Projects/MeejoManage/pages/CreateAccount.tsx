
import React, { useState } from 'react';
import { LogoIcon } from '../components/Icons';
import { StorageService } from '../services/storage';

const CreateAccount: React.FC<{ setPage: (p: string) => void }> = ({ setPage }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    phone: '',
    email: '',
    pack: 'PRO',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    StorageService.saveAccountRequest(formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center px-4 pt-20">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-lg w-full text-center border border-slate-200">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800 mb-4 font-heading">Demande Reçue !</h2>
          <p className="text-slate-600 mb-8 text-sm leading-relaxed">
            Notre service client va vous contacter sur le <strong>{formData.phone}</strong> dans les prochaines 24h pour activer votre pack <strong>{formData.pack}</strong>.
          </p>
          <button onClick={() => setPage('landing')} className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-lg">
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const inputClass = "w-full p-3 bg-white border border-slate-300 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none text-slate-900 placeholder-slate-400 font-medium transition";

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 pt-24 pb-12">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl max-w-xl w-full relative border border-slate-200">
        <button onClick={() => setPage('landing')} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">✕</button>
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-blue-50 rounded-2xl mb-4"><LogoIcon className="w-8 h-8 text-primary" /></div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-heading">Votre Boutique Meejo</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Nom Boutique</label>
              <input required className={inputClass} placeholder="Ma Mercerie" value={formData.shopName} onChange={e => setFormData({...formData, shopName: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Votre Nom</label>
              <input required className={inputClass} placeholder="Nom Complet" value={formData.ownerName} onChange={e => setFormData({...formData, ownerName: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Téléphone / WhatsApp</label>
            <input required type="tel" className={inputClass} placeholder="+221..." value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Choix du Pack (FCFA / mois)</label>
            <select className={inputClass} value={formData.pack} onChange={e => setFormData({...formData, pack: e.target.value})}>
              <option value="STARTER">STARTER - 10 000 FCFA</option>
              <option value="PRO">PRO - 25 000 FCFA</option>
              <option value="PREMIUM">PREMIUM (IA + Vocal) - 50 000 FCFA</option>
            </select>
          </div>
          <button type="submit" className="w-full py-4 bg-secondary text-white font-bold rounded-xl shadow-lg text-lg mt-4">
            Demander mon accès
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
