
import React, { useState, useEffect, useMemo } from 'react';
import { StorageService } from '../services/storage';
import { Promotion, Product, Sale, Store } from '../types';
import { formatCurrency } from '../constants';
import { TagIcon, TrashIcon, ChartBarIcon, Cube } from '../components/Icons';

const Promotions: React.FC = () => {
  const [activeStore, setActiveStore] = useState<Store | null>(null);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState<Promotion>({
    id: '', storeId: '', name: '', type: 'PERCENTAGE', value: 0,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
    productIds: [], active: true
  });

  useEffect(() => {
    // Fix: many storage methods are async
    const loadData = async () => {
        const [store, prms, prods, sls] = await Promise.all([
            StorageService.getActiveStore(),
            StorageService.getPromotions(),
            StorageService.getProducts(),
            StorageService.getSales()
        ]);
        setActiveStore(store);
        setPromotions(prms);
        setProducts(prods);
        setSales(sls);
        setFormData(prev => ({ ...prev, storeId: store.id }));
    };
    loadData();
  }, []);

  const promoStats = useMemo(() => {
      const stats: Record<string, { count: number, totalVolume: number }> = {};
      promotions.forEach(p => stats[p.id] = { count: 0, totalVolume: 0 });
      
      sales.forEach(sale => {
          sale.items.forEach(item => {
              if (item.appliedPromo) {
                  const promo = promotions.find(p => p.name === item.appliedPromo);
                  if (promo) {
                      stats[promo.id].count += item.quantity;
                      stats[promo.id].totalVolume += (item.discountedPrice * item.quantity);
                  }
              }
          });
      });
      return stats;
  }, [sales, promotions]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeStore) return;
    const p = { ...formData, id: formData.id || Date.now().toString(), storeId: activeStore.id };
    await StorageService.savePromotion(p);
    setPromotions(await StorageService.getPromotions());
    setShowModal(false);
  };

  const toggleProduct = (pid: string) => {
      setFormData(prev => ({
          ...prev,
          productIds: prev.productIds.includes(pid) ? prev.productIds.filter(id => id !== pid) : [...prev.productIds, pid]
      }));
  };

  if (!activeStore) return <div className="p-10 animate-pulse text-slate-400">Chargement...</div>;

  return (
    <div className="p-6 md:p-10 space-y-8 pt-24 bg-gray-50/50 min-h-screen pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h2 className="text-3xl font-black text-slate-900 font-heading tracking-tight">Marketing & Promotions</h2>
            <p className="text-slate-500 font-medium">Boostez vos ventes avec des offres ciblées.</p>
        </div>
        <button onClick={() => { 
            setFormData({
                id: '', storeId: activeStore.id, name: '', type: 'PERCENTAGE', value: 0,
                startDate: new Date().toISOString().split('T')[0],
                endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
                productIds: [], active: true
            }); 
            setShowModal(true); 
        }} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:bg-black transition active:scale-95 flex items-center gap-2">
          + Nouvelle Campagne
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promotions.map(promo => {
            const stats = promoStats[promo.id] || { count: 0, totalVolume: 0 };
            const isActive = promo.active && new Date(promo.endDate) >= new Date();
            return (
                <div key={promo.id} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
                    <div className="flex justify-between items-start mb-8">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${isActive ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-400'}`}>
                            <TagIcon className="w-7 h-7" />
                        </div>
                        <button onClick={async () => { if(confirm('Supprimer?')) { await StorageService.deletePromotion(promo.id); setPromotions(prev => prev.filter(p => p.id !== promo.id)); } }} className="p-2 text-slate-300 hover:text-red-500 transition"><TrashIcon /></button>
                    </div>

                    <h3 className="text-xl font-black text-slate-800 mb-2">{promo.name}</h3>
                    <div className="flex items-center gap-2 mb-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                            {isActive ? 'En cours' : 'Terminée'}
                        </span>
                        <span className="text-xs font-bold text-slate-400">Jusqu'au {new Date(promo.endDate).toLocaleDateString()}</span>
                    </div>

                    <div className="bg-slate-50 rounded-3xl p-6 space-y-4 mb-6">
                        <div className="flex justify-between items-baseline">
                            <span className="text-xs font-bold text-slate-400 uppercase">Réduction</span>
                            <span className="text-3xl font-black text-blue-600">{promo.type === 'PERCENTAGE' ? `-${promo.value}%` : `-${formatCurrency(promo.value)}`}</span>
                        </div>
                        <div className="h-px bg-slate-200"></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Utilisations</p>
                                <p className="font-black text-slate-700">{stats.count} articles</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">CA Généré</p>
                                <p className="font-black text-slate-700">{formatCurrency(stats.totalVolume)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase">
                        <Cube className="w-3 h-3" />
                        {promo.productIds.length === 0 ? 'Offre Globale' : `${promo.productIds.length} Produits éligibles`}
                    </div>
                </div>
            );
        })}
      </div>

      {showModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4">
              <div className="bg-white rounded-[3rem] p-10 w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-10">
                    <h3 className="text-3xl font-black text-slate-900">Nouvelle Offre</h3>
                    <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-900 transition text-3xl">×</button>
                  </div>
                  
                  <form onSubmit={handleSave} className="space-y-8">
                      <div className="space-y-2">
                          <label className="text-xs font-black uppercase text-slate-400 ml-1">Nom de la Campagne</label>
                          <input required className="w-full p-5 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl font-bold transition outline-none" placeholder="Ex: Soldes Tabaski" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-slate-400 ml-1">Type</label>
                            <select className="w-full p-5 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl font-bold transition outline-none" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})}>
                                <option value="PERCENTAGE">Pourcentage (%)</option>
                                <option value="FIXED">Montant Fixe (FCFA)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-slate-400 ml-1">Valeur</label>
                            <input required type="number" className="w-full p-5 bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl font-bold transition outline-none" value={formData.value || ''} onChange={e => setFormData({...formData, value: parseFloat(e.target.value)})} />
                        </div>
                      </div>

                      <div className="space-y-2">
                          <label className="text-xs font-black uppercase text-slate-400 ml-1">Ciblage Produits</label>
                          <div className="p-6 bg-slate-50 rounded-2xl max-h-48 overflow-y-auto border-2 border-slate-100">
                              <label className="flex items-center gap-3 p-3 hover:bg-white rounded-xl cursor-pointer transition mb-2">
                                  <input type="checkbox" checked={formData.productIds.length === 0} onChange={() => setFormData({...formData, productIds: []})} className="w-5 h-5 rounded-lg text-blue-600" />
                                  <span className="font-black text-slate-700">Tout le magasin (Offre Globale)</span>
                              </label>
                              <div className="h-px bg-slate-200 my-4"></div>
                              {products.map(p => (
                                  <label key={p.id} className="flex items-center gap-3 p-3 hover:bg-white rounded-xl cursor-pointer transition">
                                      <input type="checkbox" checked={formData.productIds.includes(p.id)} onChange={() => toggleProduct(p.id)} className="w-5 h-5 rounded-lg text-blue-600" />
                                      <span className="font-bold text-slate-600">{p.name}</span>
                                  </label>
                              ))}
                          </div>
                      </div>

                      <button type="submit" className="w-full py-6 bg-blue-600 text-white rounded-2xl font-black text-xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition active:scale-95">Activer la Promotion</button>
                  </form>
              </div>
          </div>
      )}
    </div>
  );
};

export default Promotions;
