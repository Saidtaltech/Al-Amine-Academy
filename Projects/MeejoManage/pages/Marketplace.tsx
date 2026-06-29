import React, { useState, useEffect, useMemo } from 'react';
import { StorageService } from '../services/storage';
import { Store, Product } from '../types';
import { formatCurrency } from '../constants';
import { 
  SearchIcon, 
  TrashIcon, 
  PencilIcon, 
  CheckIcon, 
  XIcon,
  CartIcon,
  Zap,
  GlobeIcon
} from '../components/Icons';

const Marketplace: React.FC = () => {
  // Data State
  const [stores, setStores] = useState<Store[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // UI State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Interaction State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  // Management State
  const currentUser = StorageService.getCurrentUser();
  const canManage = currentUser?.role === 'DEVELOPER'; 
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // --- INITIALIZATION ---

  useEffect(() => {
      const loadData = async () => {
          setIsLoading(true);
          try {
            const [storesData, productsData] = await Promise.all([
                StorageService.getStores(),
                StorageService.getProducts()
            ]);
            
            setStores(Array.isArray(storesData) ? storesData : []);
            
            const rawProducts = Array.isArray(productsData) ? productsData : [];
            const productsWithImages = rawProducts.map((product: Product) => ({
                ...product,
                imageUrl: product.imageUrl && product.imageUrl.includes('picsum') 
                    ? `https://picsum.photos/seed/${product.id}/400/500` 
                    : (product.imageUrl || `https://picsum.photos/seed/${product.id}/400/500`)
            }));
            
            setFeaturedProducts(productsWithImages);
          } catch (e: any) {
              const errorMsg = e?.message || (typeof e === 'string' ? e : JSON.stringify(e));
              console.error("Marketplace loader error:", errorMsg);
          } finally {
              setIsLoading(false);
          }
      };

      loadData();

      const handleScroll = () => setIsScrolled(window.scrollY > 50);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- DERIVED DATA ---

  const categories = useMemo(() => {
      const catMap = new Map();
      featuredProducts.forEach(p => {
          const cat = p.categoryId || 'Autre'; 
          catMap.set(cat, (catMap.get(cat) || 0) + 1);
      });
      
      return Array.from(catMap.entries()).map(([name, count]) => ({
          id: name,
          name: name.replace('cat_', '').charAt(0).toUpperCase() + name.replace('cat_', '').slice(1), 
          count,
          icon: getCategoryIcon(name)
      }));
  }, [featuredProducts]);

  const filteredProducts = useMemo(() => {
      let result = featuredProducts;
      const term = searchTerm.toLowerCase();

      if (term.trim()) {
          result = result.filter(p =>
              p.name.toLowerCase().includes(term) ||
              (p.categoryId && p.categoryId.toLowerCase().includes(term))
          );
      }

      if (selectedCategory && selectedCategory !== 'all') {
          result = result.filter(p => p.categoryId === selectedCategory);
      }

      return result;
  }, [featuredProducts, searchTerm, selectedCategory]);

  function getCategoryIcon(category: string) {
      const icons: Record<string, string> = {
          'cat_fashion': '👗', 'cat_electronics': '📱', 'cat_home': '🏠',
          'cat_beauty': '💄', 'cat_sports': '⚽', 'cat_auto': '🚗', 'cat_kids': '🧸'
      };
      return icons[category] || '📦';
  }

  // --- ACTIONS ---

  const goToStore = (storeId: string) => { 
      if (!isEditMode) {
          window.location.hash = '#store/' + storeId; 
      }
  };

  const handleAddToCart = (product: Product, qty: number) => {
      alert(`🛒 ${qty} x ${product.name} ajouté au panier ! (Simulation)`);
      setSelectedProduct(null);
  };

  // --- CRUD OPERATIONS ---

  const toggleSelection = (productId: string) => {
      setSelectedItems(prev => prev.includes(productId) ? prev.filter(i => i !== productId) : [...prev, productId]);
  };

  const handleDelete = async (productId: string) => {
      if (!confirm('⚠️ Supprimer ce produit ?\nCette action est irréversible.')) return;
      const newProds = featuredProducts.filter(p => p.id !== productId);
      setFeaturedProducts(newProds);
  };

  const handleBulkDelete = () => {
      if (!confirm(`⚠️ Supprimer ${selectedItems.length} produits ?`)) return;
      const newProds = featuredProducts.filter(p => !selectedItems.includes(p.id));
      setFeaturedProducts(newProds);
      setSelectedItems([]);
  };

  const handleEditSubmit = () => {
      if (!editingProduct) return;
      if (!editingProduct.name || editingProduct.sellPrice <= 0) return alert('Nom et Prix requis');

      const newProds = featuredProducts.map(p => p.id === editingProduct.id ? editingProduct : p);
      setFeaturedProducts(newProds);
      setShowEditModal(false);
      setEditingProduct(null);
  };

  if (isLoading) {
      return (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mb-4 mx-auto" />
                  <p className="text-slate-500 font-bold animate-pulse">Chargement du marché...</p>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900 pb-32">
        
        {/* EDIT MODE TOGGLE */}
        {canManage && (
            <button
                onClick={() => { setIsEditMode(!isEditMode); setSelectedItems([]); }}
                className={`fixed top-24 right-6 z-50 px-6 py-3 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2 font-black text-sm uppercase tracking-wider ${
                    isEditMode 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white scale-105 ring-4 ring-green-100' 
                    : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
            >
                {isEditMode ? <><CheckIcon className="w-5 h-5" /> Mode Gestion Actif</> : <><PencilIcon className="w-5 h-5" /> Gérer Produits</>}
            </button>
        )}

        {/* HERO SECTION */}
        <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 py-24 overflow-hidden rounded-b-[3rem] shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-lg font-heading">
                    Le Marché <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Meejo</span>
                </h1>
                <p className="text-xl text-blue-100/80 max-w-2xl mx-auto mb-10 font-medium">
                    Découvrez des produits uniques de boutiques africaines authentiques.
                </p>
                
                {/* Search Input */}
                <div className="relative max-w-2xl mx-auto group">
                    <div className="absolute inset-0 bg-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl transition-all duration-300 focus-within:bg-white/20 focus-within:border-white/40">
                        <div className="pl-4 text-white/60"><SearchIcon className="w-6 h-6" /></div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Rechercher une pépite..."
                            className="w-full bg-transparent border-none outline-none text-white placeholder-blue-200/50 text-lg px-4 py-3 font-medium"
                        />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm('')} className="p-2 hover:bg-white/10 rounded-full text-white/70 transition">
                                <XIcon className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="flex justify-center gap-10 mt-10 opacity-80">
                    <div className="text-center">
                        <p className="text-3xl font-black text-white">{filteredProducts.length}</p>
                        <p className="text-xs uppercase tracking-widest text-blue-300">Produits</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-black text-white">{stores.length}</p>
                        <p className="text-xs uppercase tracking-widest text-blue-300">Boutiques</p>
                    </div>
                </div>
            </div>
        </div>

        {/* CATEGORY FILTER BAR */}
        <div className={`sticky top-[68px] z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
                    <button
                        onClick={() => setSelectedCategory('all')}
                        className={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all text-sm ${
                            selectedCategory === 'all'
                                ? 'bg-slate-900 text-white shadow-lg scale-105'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                        🎉 Tout
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all text-sm flex items-center gap-2 ${
                                selectedCategory === cat.id
                                    ? 'bg-slate-900 text-white shadow-lg scale-105'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            <span>{cat.icon}</span>
                            {cat.name}
                            <span className="opacity-50 text-xs ml-1">({cat.count})</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="max-w-7xl mx-auto px-4 py-8">
            {filteredProducts.length === 0 ? (
                <div className="col-span-full py-32 text-center">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">🔍</div>
                    <h3 className="text-3xl font-black text-slate-900 mb-3">Aucun résultat</h3>
                    <p className="text-slate-500 mb-8">Essayez d'autres mots-clés ou changez de catégorie.</p>
                    <button onClick={() => {setSearchTerm(''); setSelectedCategory('all');}} className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg">
                        Réinitialiser
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredProducts.map(product => {
                        const isSelected = selectedItems.includes(product.id);
                        return (
                            <div 
                                key={product.id}
                                onClick={() => isEditMode ? toggleSelection(product.id) : setSelectedProduct(product)}
                                className={`group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border ${isSelected ? 'border-blue-500 ring-2 ring-blue-500' : 'border-slate-100'}`}
                            >
                                {/* Edit Mode Controls */}
                                {isEditMode && (
                                    <>
                                        <div className="absolute top-3 left-3 z-20">
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shadow-md ${isSelected ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-300'}`}>
                                                {isSelected && <CheckIcon className="w-4 h-4 text-white" />}
                                            </div>
                                        </div>
                                        <div className="absolute top-3 right-3 z-20 flex gap-2">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); setEditingProduct({...product}); setShowEditModal(true); }}
                                                className="p-2 bg-white/90 backdrop-blur rounded-full shadow-md hover:text-blue-600 hover:scale-110 transition"
                                            >
                                                <PencilIcon className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); handleDelete(product.id); }}
                                                className="p-2 bg-white/90 backdrop-blur rounded-full shadow-md hover:text-red-600 hover:scale-110 transition"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </>
                                )}

                                {/* Image */}
                                <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
                                    {product.imageUrl ? (
                                        <img 
                                            src={product.imageUrl} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                            loading="lazy" 
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300"><Zap className="w-10 h-10" /></div>
                                    )}
                                    
                                    {/* Hover Overlay */}
                                    {!isEditMode && (
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <span className="bg-white/90 backdrop-blur text-slate-900 px-5 py-2 rounded-full font-bold text-xs transform translate-y-4 group-hover:translate-y-0 transition-transform shadow-xl">
                                                Aperçu Rapide
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <h3 className="font-bold text-slate-800 text-sm mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{product.categoryId?.replace('cat_', '') || 'Divers'}</span>
                                            <span className="font-black text-lg text-slate-900">{formatCurrency(product.sellPrice)}</span>
                                        </div>
                                        <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            <CartIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>

        {/* BULK ACTION BAR */}
        {selectedItems.length > 0 && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-white shadow-2xl rounded-2xl px-8 py-4 flex items-center gap-6 border border-slate-200 animate-slide-up">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                        {selectedItems.length}
                    </div>
                    <span className="font-semibold text-slate-700 text-sm">
                        Sélectionnés
                    </span>
                </div>
                <div className="h-8 w-px bg-slate-200"></div>
                <button
                    onClick={handleBulkDelete}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-red-200 transition-all flex items-center gap-2"
                >
                    <TrashIcon className="w-4 h-4" /> Supprimer
                </button>
                <button
                    onClick={() => setSelectedItems([])}
                    className="text-slate-500 hover:text-slate-800 text-sm font-bold underline"
                >
                    Annuler
                </button>
            </div>
        )}

        {/* --- MODALS --- */}

        {/* PRODUCT DETAILS MODAL */}
        {selectedProduct && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
                <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-scale-in" onClick={e => e.stopPropagation()}>
                    <div className="grid md:grid-cols-2 h-full max-h-[90vh]">
                        {/* Image Side */}
                        <div className="bg-gray-100 relative min-h-[300px] md:min-h-full">
                            <img src={selectedProduct.imageUrl} className="w-full h-full object-cover" />
                            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur rounded-full text-white hover:bg-white/40 md:hidden">
                                <XIcon className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Info Side */}
                        <div className="p-8 md:p-12 flex flex-col h-full overflow-y-auto bg-white relative">
                            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full text-slate-400 transition hidden md:block">
                                <XIcon className="w-6 h-6" />
                            </button>

                            <div className="mb-auto">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest">
                                        {selectedProduct.categoryId?.replace('cat_', '') || 'Général'}
                                    </span>
                                    {selectedProduct.stock <= 5 && <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-black uppercase tracking-widest">Stock Limité</span>}
                                </div>
                                
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 font-heading leading-tight">{selectedProduct.name}</h2>
                                <div className="text-4xl font-black text-blue-600 mb-8">{formatCurrency(selectedProduct.sellPrice)}</div>
                                
                                <p className="text-slate-500 leading-relaxed mb-8 font-medium">
                                    Produit authentique disponible immédiatement. Commandez maintenant pour une livraison rapide.
                                    {selectedProduct.barcode && <span className="block mt-2 text-xs text-slate-400">Ref: {selectedProduct.reference}</span>}
                                </p>

                                {/* Quantity Selector */}
                                <div className="flex items-center gap-6 mb-8">
                                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Quantité</span>
                                    <div className="flex items-center bg-gray-100 rounded-xl p-1">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-700 hover:text-blue-600 font-bold text-lg disabled:opacity-50">-</button>
                                        <span className="w-12 text-center font-black text-xl text-slate-900">{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-700 hover:text-blue-600 font-bold text-lg">+</button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-slate-100">
                                <button 
                                    onClick={() => handleAddToCart(selectedProduct, quantity)}
                                    className="w-full py-4 bg-slate-900 text-white font-black text-lg rounded-2xl shadow-xl hover:bg-black transition transform active:scale-95 flex items-center justify-center gap-3"
                                >
                                    <CartIcon className="w-5 h-5" /> Ajouter au panier
                                </button>
                                <button 
                                    onClick={() => goToStore(selectedProduct.storeId)}
                                    className="w-full py-4 bg-white text-slate-900 border-2 border-slate-200 font-bold text-lg rounded-2xl hover:bg-slate-50 transition flex items-center justify-center gap-3"
                                >
                                    <GlobeIcon className="w-5 h-5" /> Voir la boutique
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* EDIT PRODUCT MODAL */}
        {showEditModal && editingProduct && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 animate-scale-in">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-black font-heading text-slate-900">Modifier Produit</h2>
                        <button onClick={() => setShowEditModal(false)} className="p-2 hover:bg-gray-100 rounded-full text-slate-400 hover:text-slate-600"><XIcon /></button>
                    </div>
                    
                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs font-black uppercase text-slate-400 mb-2 ml-1">Nom du produit</label>
                            <input 
                                className="w-full p-4 border border-slate-200 rounded-xl bg-gray-50 text-slate-900 font-bold focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition"
                                value={editingProduct.name}
                                onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase text-slate-400 mb-2 ml-1">Prix (FCFA)</label>
                            <input 
                                type="number"
                                className="w-full p-4 border border-slate-200 rounded-xl bg-gray-50 text-slate-900 font-bold focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition"
                                value={editingProduct.sellPrice}
                                onChange={e => setEditingProduct({...editingProduct, sellPrice: Number(e.target.value)})}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase text-slate-400 mb-2 ml-1">Image URL</label>
                            <input 
                                className="w-full p-4 border border-slate-200 rounded-xl bg-gray-50 text-slate-900 font-medium focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition text-sm"
                                value={editingProduct.imageUrl || ''}
                                onChange={e => setEditingProduct({...editingProduct, imageUrl: e.target.value})}
                                placeholder="https://..."
                            />
                        </div>
                        
                        <div className="pt-4 flex gap-3">
                            <button onClick={() => setShowEditModal(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 transition">Annuler</button>
                            <button onClick={handleEditSubmit} className="flex-1 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl hover:bg-blue-700 transition">Sauvegarder</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default Marketplace;