
import React, { useState } from 'react';
import { TrashIcon, SettingsIcon, Cube, PlaneIcon, BoatIcon, PencilIcon, PlusIcon } from '../components/Icons'; 
import { formatCurrency } from '../constants';

interface CalcItem { id: string; name: string; l: number; w: number; h: number; qty: number; weight: number; }

const PublicCalculator: React.FC = () => {
  const [items, setItems] = useState<CalcItem[]>([]);
  const [current, setCurrent] = useState<CalcItem>({ id: '', name: '', l: 0, w: 0, h: 0, qty: 1, weight: 0 });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [rates, setRates] = useState({ cbm: 150000, kg: 6000 });

  const addOrUpdateItem = () => {
      if (current.qty <= 0) return;
      if (editingId) {
          setItems(items.map(i => i.id === editingId ? { ...current, id: editingId } : i));
          setEditingId(null);
      } else {
          setItems([...items, { ...current, id: Date.now().toString() }]);
      }
      setCurrent({ id: '', name: '', l: 0, w: 0, h: 0, qty: 1, weight: 0 });
  };

  const handleEdit = (item: CalcItem) => { setCurrent(item); setEditingId(item.id); };
  const handleDelete = (id: string) => { if (confirm("Supprimer ce colis ?")) setItems(items.filter(i => i.id !== id)); };

  const totalCbm = items.reduce((acc, i) => acc + ((i.l * i.w * i.h) / 1000000) * i.qty, 0);
  const totalWeight = items.reduce((acc, i) => acc + (i.weight * i.qty), 0);
  
  const totalCostCbm = totalCbm * rates.cbm;
  const totalCostKg = totalWeight * rates.kg;

  const inputGroupStyle = "flex flex-col gap-2";
  const labelStyle = "text-sm font-black text-slate-700 uppercase tracking-wide ml-1";
  const inputStyle = "w-full px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-bold text-slate-900 placeholder:text-gray-300 placeholder:font-normal";

  return (
    <div className="w-full bg-white font-sans rounded-[2.5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-4 md:p-0">
            <div className="space-y-8">
                {/* Configuration des taux */}
                <div className="grid grid-cols-2 gap-6 bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <div className={inputGroupStyle}>
                        <label className={labelStyle}>Taux CBM (Maritime)</label>
                        <div className="relative">
                            <input type="number" className={inputStyle} value={rates.cbm} onChange={e => setRates({...rates, cbm: Number(e.target.value)})} />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">FCFA</span>
                        </div>
                    </div>
                    <div className={inputGroupStyle}>
                        <label className={labelStyle}>Taux KG (Aérien)</label>
                        <div className="relative">
                            <input type="number" className={inputStyle} value={rates.kg} onChange={e => setRates({...rates, kg: Number(e.target.value)})} />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">FCFA</span>
                        </div>
                    </div>
                </div>

                {/* Formulaire Ajout de colis */}
                <div className="bg-slate-50 p-8 rounded-[2.5rem] border-2 border-slate-200 shadow-sm space-y-6">
                    <div className={inputGroupStyle}>
                        <label className={labelStyle}>Nom du colis (Optionnel)</label>
                        <input 
                            type="text" 
                            className={inputStyle} 
                            placeholder="Ex: Chaussures, Sacs..." 
                            value={current.name} 
                            onChange={e => setCurrent({...current, name: e.target.value})} 
                        />
                    </div>

                    <div className="space-y-3">
                        <label className={labelStyle}>Dimensions du colis</label>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="relative">
                                <input type="number" className={inputStyle} placeholder="Long." value={current.l || ''} onChange={e => setCurrent({...current, l: Number(e.target.value)})} />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">cm</span>
                            </div>
                            <div className="relative">
                                <input type="number" className={inputStyle} placeholder="Larg." value={current.w || ''} onChange={e => setCurrent({...current, w: Number(e.target.value)})} />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">cm</span>
                            </div>
                            <div className="relative">
                                <input type="number" className={inputStyle} placeholder="Haut." value={current.h || ''} onChange={e => setCurrent({...current, h: Number(e.target.value)})} />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">cm</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className={inputGroupStyle}>
                            <label className={labelStyle}>Poids total (KG)</label>
                            <div className="relative">
                                <input type="number" className={inputStyle} placeholder="Ex: 12.5" value={current.weight || ''} onChange={e => setCurrent({...current, weight: Number(e.target.value)})} />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">KG</span>
                            </div>
                        </div>
                        <div className={inputGroupStyle}>
                            <label className={labelStyle}>Quantité</label>
                            <div className="relative">
                                <input type="number" className={inputStyle} placeholder="1" value={current.qty || ''} onChange={e => setCurrent({...current, qty: Number(e.target.value)})} />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">PCS</span>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={addOrUpdateItem} 
                        className="w-full py-5 bg-blue-600 text-white rounded-xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        {editingId ? <><PencilIcon className="w-5 h-5" /> Mettre à jour</> : <><PlusIcon className="w-5 h-5" /> Ajouter au simulateur</>}
                    </button>
                </div>
            </div>

            {/* Section Résultats */}
            <div className="space-y-8">
                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute -right-10 -bottom-10 opacity-10">
                        <BoatIcon className="w-64 h-64" />
                    </div>
                    <div className="flex justify-between items-start mb-8 relative z-10">
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-blue-400 mb-1">Fret Maritime</h4>
                            <p className="text-slate-400 text-sm font-medium">Basé sur le volume (CBM)</p>
                        </div>
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                            <BoatIcon className="w-6 h-6 text-blue-400" />
                        </div>
                    </div>
                    <div className="relative z-10">
                        <p className="text-5xl font-black mb-2 tracking-tight">{totalCbm.toFixed(3)} <span className="text-xl font-bold opacity-50 uppercase tracking-widest">m³</span></p>
                        <p className="text-3xl font-black text-blue-400">{formatCurrency(totalCostCbm)}</p>
                    </div>
                </div>

                <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute -right-10 -bottom-10 opacity-10">
                        <PlaneIcon className="w-64 h-64" />
                    </div>
                    <div className="flex justify-between items-start mb-8 relative z-10">
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-blue-100 mb-1">Fret Aérien</h4>
                            <p className="text-blue-200/60 text-sm font-medium">Basé sur le poids net (KG)</p>
                        </div>
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                            <PlaneIcon className="w-6 h-6 text-blue-100" />
                        </div>
                    </div>
                    <div className="relative z-10">
                        <p className="text-5xl font-black mb-2 tracking-tight">{totalWeight.toFixed(1)} <span className="text-xl font-bold opacity-50 uppercase tracking-widest">kg</span></p>
                        <p className="text-3xl font-black text-white">{formatCurrency(totalCostKg)}</p>
                    </div>
                </div>

                {/* Liste des colis ajoutés */}
                <div className="px-2">
                    <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Détails des colis ({items.length})</h5>
                    {items.length === 0 ? (
                        <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-[2rem] text-slate-300 font-bold italic">
                            Aucun colis dans la simulation
                        </div>
                    ) : (
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {items.map(i => (
                                <div key={i.id} className="flex justify-between items-center p-5 bg-white rounded-2xl border-2 border-slate-100 group shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center font-black text-blue-600 text-sm shadow-inner">x{i.qty}</div>
                                        <div>
                                            <p className="font-black text-slate-800 text-base">{i.name || "Colis sans nom"}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-black text-slate-500 uppercase">{i.l}x{i.w}x{i.h} cm</span>
                                                <span className="text-[10px] bg-blue-50 px-2 py-0.5 rounded font-black text-blue-500 uppercase">{i.weight} kg</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(i)} className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Modifier"><PencilIcon className="w-5 h-5" /></button>
                                        <button onClick={() => handleDelete(i.id)} className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all" title="Supprimer"><TrashIcon className="w-5 h-5" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default PublicCalculator;
