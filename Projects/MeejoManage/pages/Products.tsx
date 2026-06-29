import React, { useState, useEffect, useMemo } from 'react';
import { StorageService } from '../services/storage';
import { Product, User, Category } from '../types';
import { formatCurrency } from '../constants';
import { SearchIcon, TrashIcon, DownloadIcon, PlusIcon, XIcon, ProductIcon } from '../components/Icons';
import { useNotify } from '../App';

interface ProductsProps { currentUser: User; }

const Products: React.FC<ProductsProps> = ({ currentUser }) => {
  const { notify } = useNotify();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [onlyLowStock, setOnlyLowStock] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'stock'>('name');

  const empty: Product = { id: 'temp_' + Date.now(), storeId: '', reference: '', name: '', barcode: '', stock: 0, buyPrice: 0, sellPrice: 0, alertThreshold: 5, imageUrl: '', wholesalePrice: 0, wholesaleThreshold: 10, minMargin: 0 };
  const [formData, setFormData] = useState<Product>(empty);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
        const [prods, cats] = await Promise.all([
            StorageService.getProducts(),
            StorageService.getCategoriesByStoreId()
        ]);
        setProducts(prods || []);
        setCategories(cats || []);
    } catch (e) {
        console.error(e);
        notify('Erreur de chargement des produits', 'error');
    } finally {
        setIsLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        await StorageService.saveProduct(formData);
        await loadProducts();
        setShowModal(false);
        notify('Produit enregistré avec succès', 'success');
    } catch (err) {
        notify('Échec de l\'enregistrement', 'error');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
          notify("L'image est trop lourde (max 2Mo)", "error");
          return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const filtered = useMemo(() => {
    let result = products.filter(p => {
      const term = search.toLowerCase();
      const matchesSearch = (p.name || '').toLowerCase().includes(term) || (p.reference || '').toLowerCase().includes(term) || (p.barcode && p.barcode.includes(term));
      const matchesCategory = selectedCategory === 'all' || p.categoryId === selectedCategory;
      const matchesLowStock = !onlyLowStock || p.stock <= p.alertThreshold;
      return matchesSearch && matchesCategory && matchesLowStock;
    });

    return result.sort((a, b) => {
        if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
        if (sortBy === 'price') return b.sellPrice - a.sellPrice;
        if (sortBy === 'stock') return a.stock - b.stock;
        return 0;
    });
  }, [products, search, selectedCategory, onlyLowStock, sortBy]);

  return (
    <div className="p-4 md:p-10 space-y-8 pt-20 md:pt-10 bg-slate-50 dark:bg-gray-900 min-h-screen pb-32">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white font-heading uppercase tracking-tight">Stock & Articles</h2>
            <p className="text-slate-50 dark:text-slate-400 font-medium bg-blue-600 dark:bg-transparent px-3 py-1 rounded-lg w-fit">Inventaire Cloud en temps réel.</p>
        </div>
        <div className="flex flex-wrap gap-2">
            <button onClick={() => { setFormData(empty); setShowModal(true); }} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition flex items-center gap-2 text-sm uppercase tracking-widest"><PlusIcon className="w-5 h-5" /> Nouveau Produit</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border dark:border-gray-700">
        <div className="lg:col-span-4 relative flex items-center group">
            <div className="absolute left-4 z-10 flex items-center justify-center">
                <SearchIcon className="w-5 h-5 flex-shrink-0 text-slate-400 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-gray-700 rounded-xl border border-transparent outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all font-bold" 
              placeholder="Rechercher par nom, ref..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
            />
        </div>
        <div className="lg:col-span-3">
            <select className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-700 rounded-xl dark:text-white outline-none border border-transparent focus:ring-2 focus:ring-blue-500 font-bold" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                <option value="all">Toutes les catégories</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
        </div>
        <div className="lg:col-span-2">
            <select className="w-full px-4 py-3 bg-slate-50 dark:bg-gray-700 rounded-xl dark:text-white outline-none border border-transparent focus:ring-2 focus:ring-blue-500 font-bold" value={sortBy} onChange={e => setSortBy(e.target.value as any)}>
                <option value="name">Tri: Nom</option>
                <option value="price">Tri: Prix</option>
                <option value="stock">Tri: Stock</option>
            </select>
        </div>
        <div className="lg:col-span-3 flex items-center justify-end px-4">
            <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" checked={onlyLowStock} onChange={e => setOnlyLowStock(e.target.checked)} className="w-5 h-5 rounded text-red-600 border-gray-300 dark:border-gray-600" />
                <span className="text-xs font-black text-red-600 uppercase tracking-widest group-hover:opacity-80 transition-opacity">Alertes Stock</span>
            </label>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-gray-700 overflow-hidden">
        {isLoading ? (
            <div className="p-40 text-center text-slate-400 animate-pulse font-bold uppercase text-xs tracking-[0.3em]">Lecture des données en cours...</div>
        ) : (
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[700px]">
                    <thead className="bg-slate-50 dark:bg-gray-700/50 text-slate-400 font-black text-[10px] uppercase tracking-widest border-b dark:border-gray-700">
                        <tr>
                            <th className="p-6">Article</th>
                            <th className="p-6">Stock</th>
                            <th className="p-6 text-right">Prix Vente</th>
                            <th className="p-6 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-gray-700">
                        {filtered.length > 0 ? filtered.map(p => (
                            <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-700/30 transition group">
                                <td className="p-6 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-100 dark:bg-gray-600 rounded-xl overflow-hidden flex items-center justify-center shadow-inner">
                                        {p.imageUrl ? (
                                          <img src={p.imageUrl} className="w-full h-full object-cover" alt={p.name} />
                                        ) : (
                                          <ProductIcon className="text-slate-300 w-6 h-6" />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-bold text-sm truncate dark:text-white group-hover:text-blue-600 transition-colors">{p.name}</p>
                                        <p className="text-[10px] text-slate-400 font-black tracking-widest">{p.reference || 'SANS REF'}</p>
                                    </div>
                                </td>
                                <td className="p-6"><span className={`px-4 py-1.5 rounded-full text-[10px] font-black shadow-sm ${p.stock <= p.alertThreshold ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>{p.stock} UNITES</span></td>
                                <td className="p-6 font-black text-sm text-right dark:text-slate-300">{formatCurrency(p.sellPrice)}</td>
                                <td className="p-6 text-center"><button onClick={() => { setFormData(p); setShowModal(true); }} className="px-5 py-2 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:shadow-lg transition-all active:scale-95">Gérer</button></td>
                            </tr>
                        )) : (
                            <tr><td colSpan={4} className="p-32 text-center text-slate-300 font-bold italic border-none">Aucun article dans cette sélection.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-[120] p-4">
          <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 w-full max-w-2xl shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center mb-8"><h3 className="text-2xl font-black dark:text-white font-heading uppercase tracking-tight">Fiche Article</h3><button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-red-500 transition-colors text-3xl">×</button></div>
            <form onSubmit={handleSave} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3 flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Aperçu Image</label>
                        <div className="aspect-square bg-slate-50 dark:bg-gray-700 rounded-2xl border-2 border-dashed border-slate-200 dark:border-gray-600 overflow-hidden flex items-center justify-center relative group">
                            {formData.imageUrl ? (
                                <>
                                    <img src={formData.imageUrl} className="w-full h-full object-cover" alt="Article" />
                                    <button 
                                        type="button" 
                                        onClick={() => setFormData({...formData, imageUrl: ''})} 
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg"
                                    >
                                        <XIcon className="w-4 h-4" />
                                    </button>
                                </>
                            ) : (
                                <div className="text-center p-4">
                                    <ProductIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                                    <p className="text-[9px] text-slate-400 font-bold uppercase">Aucune image</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="text-[10px] font-black uppercase text-slate-400 block mb-1 ml-1">Upload Fichier</label>
                            <div className="relative">
                                <input 
                                    type="file" 
                                    onChange={handleImageUpload} 
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                                    accept="image/*" 
                                />
                                <div className="w-full p-4 bg-slate-50 dark:bg-gray-700 rounded-xl font-bold dark:text-white border border-slate-200 dark:border-gray-600 text-center hover:bg-slate-100 dark:hover:bg-gray-600 transition">
                                    Choisir une image...
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase text-slate-400 block mb-1 ml-1">OU URL Image</label>
                            <input 
                                type="url" 
                                className="w-full p-4 bg-slate-50 dark:bg-gray-700 rounded-xl font-bold dark:text-white border border-transparent focus:ring-2 focus:ring-blue-500 outline-none transition" 
                                placeholder="https://..." 
                                value={formData.imageUrl} 
                                onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="text-[10px] font-black uppercase text-slate-400 ml-1">Désignation</label><input className="w-full p-4 bg-slate-50 dark:bg-gray-700 rounded-xl font-bold dark:text-white border border-transparent focus:ring-2 focus:ring-blue-500 outline-none transition" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required /></div>
                    <div><label className="text-[10px] font-black uppercase text-slate-400 ml-1">Référence</label><input className="w-full p-4 bg-slate-50 dark:bg-gray-700 rounded-xl font-bold dark:text-white border border-transparent focus:ring-2 focus:ring-blue-500 outline-none transition" value={formData.reference} onChange={e => setFormData({...formData, reference: e.target.value})} /></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div><label className="text-[10px] font-black uppercase text-slate-400 ml-1">Stock</label><input type="number" className="w-full p-4 bg-slate-50 dark:bg-gray-700 rounded-xl font-black dark:text-white border border-transparent focus:ring-2 focus:ring-blue-500 outline-none transition" value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})} required /></div>
                    <div><label className="text-[10px] font-black uppercase text-slate-400 ml-1">Prix Vente</label><input type="number" className="w-full p-4 bg-slate-50 dark:bg-gray-700 rounded-xl font-black dark:text-white border border-transparent focus:ring-2 focus:ring-blue-500 outline-none transition" value={formData.sellPrice} onChange={e => setFormData({...formData, sellPrice: parseFloat(e.target.value)})} required /></div>
                    <div><label className="text-[10px] font-black uppercase text-slate-400 ml-1">Seuil Alerte</label><input type="number" className="w-full p-4 bg-slate-50 dark:bg-gray-700 rounded-xl font-black dark:text-white border border-transparent focus:ring-2 focus:ring-blue-500 outline-none transition" value={formData.alertThreshold} onChange={e => setFormData({...formData, alertThreshold: parseInt(e.target.value)})} /></div>
                    <div><label className="text-[10px] font-black uppercase text-slate-400 ml-1">Code Barre</label><input className="w-full p-4 bg-slate-50 dark:bg-gray-700 rounded-xl font-bold dark:text-white border border-transparent focus:ring-2 focus:ring-blue-500 outline-none transition" value={formData.barcode} onChange={e => setFormData({...formData, barcode: e.target.value})} /></div>
                </div>

                <button type="submit" className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl hover:bg-blue-700 uppercase tracking-widest transition-all active:scale-95">Enregistrer sur le Cloud</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;