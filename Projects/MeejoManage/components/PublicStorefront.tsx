
import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storage';
import { Store, Product, CartItem, PaymentMethod, Category, Notification } from '../types';
import { formatCurrency } from '../constants';
import { CartIcon, FacebookIcon, InstagramIcon, TikTokIcon, SearchIcon, UserIcon, GlobeIcon, LogoIcon, TrashIcon, MapPin, Phone, Mail, Filter, Star, XIcon } from './Icons';
import PublicNavbar from './PublicNavbar';

interface PublicStorefrontProps {
  storeId?: string;
  onExit?: () => void;
}

const PublicStorefront: React.FC<PublicStorefrontProps> = ({ storeId: initialStoreId, onExit }) => {
  const [store, setStore] = useState<Store | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activePage, setActivePage] = useState<'HOME' | 'SHOP'>('HOME');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Checkout State
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', address: '' });
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fix: storage methods are async
    const loadData = async () => {
        let targetId = initialStoreId;
        if (!targetId) {
            const hash = window.location.hash;
            if (hash.startsWith('#store/')) {
                targetId = hash.replace('#store/', '');
            } else {
                const active = await StorageService.getActiveStore();
                targetId = active?.id;
            }
        }

        if (targetId) {
            const loadedStore = await StorageService.getStoreById(targetId);
            if (loadedStore) {
                setStore(loadedStore);
                setProducts(await StorageService.getProductsByStoreId(targetId));
                setCategories(await StorageService.getCategoriesByStoreId(targetId));
            }
        }
        setIsLoading(false);
    };
    loadData();

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialStoreId]);

  const goBackToPlatform = () => {
      if (onExit) onExit();
      else window.location.hash = '';
  };

  const addToCart = (product: Product) => {
    if (product.stock <= 0) return;
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1, discountedPrice: product.discount_price || product.sellPrice }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
  };

  const removeFromCart = (id: string) => {
      if (confirm('Retirer cet article du panier ?')) {
          setCart(prev => prev.filter(item => item.id !== id));
      }
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0);

  const handleCheckout = async () => {
      if (!customerInfo.name || !customerInfo.phone) { alert("Veuillez remplir votre nom et téléphone."); return; }
      if (!store) return;

      const orderId = Date.now().toString();
      const receiptNumber = 'WEB-' + orderId.slice(-6);

      const sale = {
          id: orderId,
          storeId: store.id,
          date: new Date().toISOString(),
          paymentDate: new Date().toISOString().split('T')[0],
          items: cart,
          total: totalAmount,
          discountTotal: 0,
          manualDiscount: 0,
          paymentMethod: selectedPayment || PaymentMethod.CASH,
          source: 'SITE WEB',
          status: 'PENDING',
          amountPaid: totalAmount,
          changeReturned: 0,
          remainingAmount: 0,
          paymentStatus: 'PAID',
          customerPhone: customerInfo.phone,
          receiptNumber: receiptNumber,
          cashierName: 'Online'
      };
      
      // 1. Save Sale
      await StorageService.saveSale(sale as any);

      // 2. Create Notification for Store Owner
      const orderNotification: Notification = {
        id: `notif_${Date.now()}`,
        type: 'ORDER',
        storeId: store.id,
        title: '🛍️ Nouvelle Commande Web',
        message: `${customerInfo.name} a commandé pour ${formatCurrency(totalAmount)} (${cart.length} articles). Tel: ${customerInfo.phone}`,
        date: new Date().toISOString(),
        read: false
      };

      // Push to existing notifications in local storage manually to ensure it persists
      const existingNotifs = JSON.parse(localStorage.getItem('novix_notifications') || '[]');
      existingNotifs.unshift(orderNotification);
      localStorage.setItem('novix_notifications', JSON.stringify(existingNotifs));

      setOrderSuccess(true);
      setCart([]);
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-white"><div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div></div>;
  
  if (!store) return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500 bg-gray-50">
          <h1 className="text-3xl font-heading font-bold mb-4 text-gray-800">Boutique introuvable</h1>
          <p className="mb-8 text-lg">Cette boutique n'existe pas ou a été désactivée.</p>
          <button onClick={goBackToPlatform} className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition flex items-center gap-2">
              <GlobeIcon /> Retourner à Meejo
          </button>
      </div>
  );

  const filteredProducts = products
    .filter(p => selectedCategory ? p.categoryId === selectedCategory : true)
    .filter(p => searchTerm ? p.name.toLowerCase().includes(searchTerm.toLowerCase()) : true);

  // --- SUB-COMPONENTS ---

  const ProductCard: React.FC<{ p: Product }> = ({ p }) => (
      <div className="group bg-white rounded-3xl border border-gray-100/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full relative">
          <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
              {p.imageUrl ? (
                  <img src={p.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out" loading="lazy" />
              ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50 text-xs uppercase tracking-widest font-bold">Sans image</div>
              )}
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {p.discount_price && <span className="bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">-PROMO</span>}
                  {p.stock <= 5 && p.stock > 0 && <span className="bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">VITE!</span>}
                  {p.stock <= 0 && <span className="bg-gray-900 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">ÉPUISÉ</span>}
              </div>

              {/* Quick Add Overlay */}
              <button 
                onClick={(e) => { e.stopPropagation(); addToCart(p); }} 
                disabled={p.stock <= 0}
                className="absolute bottom-4 right-4 w-12 h-12 bg-white text-gray-900 rounded-full shadow-xl flex items-center justify-center hover:bg-black hover:text-white transition-all transform translate-y-16 group-hover:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                  <CartIcon className="w-5 h-5" />
              </button>
          </div>
          
          <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2 leading-relaxed group-hover:text-blue-600 transition">{p.name}</h3>
              <div className="mt-auto pt-2 flex items-center justify-between">
                  <div className="flex flex-col">
                      {p.discount_price && <span className="text-xs text-gray-400 line-through decoration-red-400 mb-0.5">{formatCurrency(p.sellPrice)}</span>}
                      <span className="font-black text-lg text-gray-900">{formatCurrency(p.discount_price || p.sellPrice)}</span>
                  </div>
              </div>
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col selection:bg-blue-100">
        
        {/* GLOBAL NAVIGATION */}
        <PublicNavbar currentPage="mall" setPage={() => {}} />
        
        {/* Spacer for fixed navbar */}
        <div className="h-[68px]"></div>

        {/* --- STICKY STORE HEADER WRAPPER --- */}
        <div className="sticky top-[68px] z-30 bg-white/95 backdrop-blur-xl shadow-sm transition-all duration-300">
            {/* Main Store Header */}
            <div className={`border-b border-gray-100 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
                <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-4">
                    
                    {/* Logo */}
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => {setActivePage('HOME'); setSelectedCategory(null);}}>
                        {store.logoUrl ? (
                            <img src={store.logoUrl} className="h-10 w-10 md:h-12 md:w-12 rounded-xl object-cover shadow-sm group-hover:rotate-3 transition" />
                        ) : (
                            <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white font-black text-xl shadow-lg">
                                {store.name[0]}
                            </div>
                        )}
                        <h1 className="font-heading font-black text-xl md:text-2xl tracking-tight text-gray-900">{store.name}</h1>
                    </div>

                    {/* Search Bar (Desktop) */}
                    <div className="hidden md:flex flex-1 max-w-lg mx-8 relative group">
                        <input 
                            className="w-full pl-12 pr-4 py-2.5 bg-gray-100 border-2 border-transparent focus:bg-white focus:border-blue-500 focus:ring-0 rounded-full text-sm font-medium transition-all"
                            placeholder="Que recherchez-vous ?" 
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <SearchIcon className="absolute left-4 top-3 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition" />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setIsCartOpen(true)} 
                            className="relative p-3 bg-gray-50 hover:bg-gray-100 rounded-full transition group"
                        >
                            <CartIcon className="w-6 h-6 text-gray-800 group-hover:scale-110 transition" />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce-short">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="md:hidden px-4 pb-1 pt-2">
                    <div className="relative">
                        <input 
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-100 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 transition outline-none"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <SearchIcon className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    </div>
                </div>
            </div>

            {/* Category Nav */}
            <div className="border-b border-gray-100 overflow-x-auto no-scrollbar py-3">
                <div className="max-w-7xl mx-auto px-4 flex gap-3">
                    <button 
                        onClick={() => { setActivePage('HOME'); setSelectedCategory(null); }}
                        className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activePage === 'HOME' ? 'bg-black text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        Accueil
                    </button>
                    <button 
                        onClick={() => { setActivePage('SHOP'); setSelectedCategory(null); }}
                        className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activePage === 'SHOP' && !selectedCategory ? 'bg-black text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        Tout voir
                    </button>
                    {categories.map(cat => (
                        <button 
                            key={cat.id}
                            onClick={() => { setSelectedCategory(cat.id); setActivePage('SHOP'); }}
                            className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${selectedCategory === cat.id ? 'bg-black text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        <main className="flex-grow bg-gray-50">
            {activePage === 'HOME' && !searchTerm && (
                <>
                    {/* HERO BANNER */}
                    <div className="max-w-[95%] md:max-w-7xl mx-auto mt-4 md:mt-8 rounded-[2rem] overflow-hidden relative h-[50vh] md:h-[600px] shadow-2xl">
                        {store.webConfig?.heroBannerUrl ? (
                            <img src={store.webConfig.heroBannerUrl} className="w-full h-full object-cover animate-scale-in" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-r from-blue-900 to-indigo-900"></div>
                        )}
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-center p-6">
                            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-[2.5rem] max-w-2xl w-full shadow-2xl animate-fade-in">
                                <span className="inline-block px-4 py-1.5 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest mb-6">Nouvelle Collection</span>
                                <h2 className="text-4xl md:text-6xl font-heading font-black text-white mb-6 leading-tight drop-shadow-lg">
                                    {store.webConfig?.heroTitle || store.name}
                                </h2>
                                <p className="text-lg text-white/90 font-medium mb-8 leading-relaxed">
                                    {store.webConfig?.welcomeMessage || "Découvrez nos produits exclusifs."}
                                </p>
                                <button 
                                    onClick={() => setActivePage('SHOP')} 
                                    className="bg-white text-black px-10 py-4 rounded-full font-black text-lg hover:scale-105 transition shadow-xl"
                                >
                                    Explorer le catalogue
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 py-16">
                        {/* FEATURED / PROMO SECTION */}
                        {products.some(p => p.discount_price) && (
                            <section className="mb-20">
                                <div className="flex items-end justify-between mb-8 px-2">
                                    <div>
                                        <h2 className="text-3xl font-heading font-black text-gray-900 mb-1">Offres Flash ⚡</h2>
                                        <p className="text-gray-500 font-medium">Profitez des meilleures réductions du moment.</p>
                                    </div>
                                    <button onClick={() => setActivePage('SHOP')} className="text-blue-600 font-bold text-sm hover:underline">Voir tout →</button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                    {products.filter(p => p.discount_price).slice(0, 5).map(p => <ProductCard key={p.id} p={p} />)}
                                </div>
                            </section>
                        )}

                        {/* RECENT PRODUCTS */}
                        <section>
                            <div className="flex items-center gap-3 mb-8 px-2">
                                <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center"><Star className="w-5 h-5" /></div>
                                <h2 className="text-3xl font-heading font-black text-gray-900">Nouveautés</h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {products.slice().reverse().slice(0, 10).map(p => <ProductCard key={p.id} p={p} />)}
                            </div>
                        </section>
                    </div>
                </>
            )}

            {(activePage === 'SHOP' || searchTerm) && (
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black font-heading">
                            {searchTerm ? `Résultats pour "${searchTerm}"` : selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : 'Catalogue Complet'}
                        </h2>
                        <span className="bg-white px-4 py-1 rounded-full text-xs font-bold shadow-sm border border-gray-100">{filteredProducts.length} articles</span>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {filteredProducts.map(p => <ProductCard key={p.id} p={p} />)}
                        </div>
                    ) : (
                        <div className="text-center py-32 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                                <SearchIcon className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-2">Aucun produit trouvé</h3>
                            <p className="text-gray-500 font-medium">Essayez une autre catégorie ou recherche.</p>
                            <button onClick={() => {setSearchTerm(''); setSelectedCategory(null);}} className="mt-8 px-8 py-3 bg-black text-white rounded-xl font-bold hover:opacity-80 transition">
                                Tout voir
                            </button>
                        </div>
                    )}
                </div>
            )}
        </main>

        {/* --- FOOTER --- */}
        <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
                <div className="md:col-span-1">
                    <div className="flex items-center gap-3 mb-6">
                        {store.logoUrl ? <img src={store.logoUrl} className="w-10 h-10 rounded-lg" /> : <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white font-black">{store.name[0]}</div>}
                        <span className="font-bold text-xl text-white tracking-tight">{store.name}</span>
                    </div>
                    <p className="leading-relaxed opacity-80 mb-6">{store.webConfig?.aboutText || "Votre boutique de référence."}</p>
                    <div className="flex gap-4">
                        <div className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-white cursor-pointer transition"><FacebookIcon /></div>
                        <div className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-white cursor-pointer transition"><InstagramIcon /></div>
                        <div className="p-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-white cursor-pointer transition"><TikTokIcon /></div>
                    </div>
                </div>
                
                <div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Boutique</h4>
                    <ul className="space-y-4">
                        <li onClick={() => setActivePage('HOME')} className="hover:text-white cursor-pointer transition">Accueil</li>
                        <li onClick={() => setActivePage('SHOP')} className="hover:text-white cursor-pointer transition">Nouveautés</li>
                        <li onClick={() => setActivePage('SHOP')} className="hover:text-white cursor-pointer transition">Promotions</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Contact</h4>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3"><MapPin className="w-4 h-4"/> {store.address}</li>
                        <li className="flex items-center gap-3"><Phone className="w-4 h-4"/> {store.phone}</li>
                        <li className="flex items-center gap-3"><Mail className="w-4 h-4"/> {store.email}</li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Légal</h4>
                    <ul className="space-y-4">
                        <li className="hover:text-white cursor-pointer transition">Conditions de vente</li>
                        <li className="hover:text-white cursor-pointer transition">Confidentialité</li>
                        <li onClick={goBackToPlatform} className="text-blue-500 font-bold hover:text-blue-400 cursor-pointer pt-4">Créer ma boutique Meejo</li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs opacity-50">
                &copy; {new Date().getFullYear()} {store.name} • Propulsé par Meejo Manage
            </div>
        </footer>

        {/* --- CART DRAWER --- */}
        {isCartOpen && (
            <div className="fixed inset-0 z-[60] flex justify-end">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
                <div className="bg-white w-full max-w-md h-full relative z-10 flex flex-col shadow-2xl animate-slide-in">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                        <h2 className="font-heading font-black text-2xl flex items-center gap-3">
                            Mon Panier <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded-full">{cart.length}</span>
                        </h2>
                        <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition"><XIcon /></button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
                        {cart.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                                    <CartIcon className="w-10 h-10" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">Votre panier est vide</h3>
                                    <p className="text-gray-500 mt-2">Découvrez nos nouveautés et commencez votre shopping.</p>
                                </div>
                                <button onClick={() => {setIsCartOpen(false); setActivePage('SHOP');}} className="px-8 py-3 bg-black text-white font-bold rounded-xl hover:opacity-90 transition">
                                    Voir le catalogue
                                </button>
                            </div>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} className="flex gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="w-20 h-24 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden">
                                        {item.imageUrl ? <img src={item.imageUrl} className="w-full h-full object-cover" /> : null}
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-sm line-clamp-2">{item.name}</h4>
                                            <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500"><TrashIcon className="w-4 h-4" /></button>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                                                <button onClick={() => updateCartQuantity(item.id, Math.max(1, item.quantity - 1))} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-sm font-bold text-gray-600 hover:text-blue-600">-</button>
                                                <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                                                <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded shadow-sm text-sm font-bold text-gray-600 hover:text-blue-600">+</button>
                                            </div>
                                            <span className="font-black text-blue-600">{formatCurrency(item.discountedPrice * item.quantity)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] z-20">
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Sous-total</span>
                                    <span>{formatCurrency(totalAmount)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>Livraison</span>
                                    <span className="text-green-600 font-bold">Calculée à l'étape suivante</span>
                                </div>
                                <div className="flex justify-between font-black text-2xl text-gray-900 border-t border-dashed pt-4">
                                    <span>Total</span>
                                    <span>{formatCurrency(totalAmount)}</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => { setIsCartOpen(false); setShowCheckout(true); }} 
                                className="w-full py-4 bg-black text-white font-black rounded-xl shadow-xl hover:bg-gray-900 active:scale-95 transition flex justify-between px-6 items-center"
                            >
                                <span>Commander</span>
                                <span className="bg-white/20 px-2 py-1 rounded text-xs">→</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* --- CHECKOUT MODAL --- */}
        {showCheckout && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                {orderSuccess ? (
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center animate-scale-in">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg shadow-green-100">✓</div>
                        <h2 className="text-2xl font-black text-gray-900 mb-2">Commande Reçue !</h2>
                        <p className="text-gray-500 mb-8 font-medium">Merci pour votre confiance. Nous vous contacterons très bientôt pour la livraison.</p>
                        <button onClick={() => {setOrderSuccess(false); setShowCheckout(false);}} className="w-full py-4 bg-gray-100 text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition">
                            Fermer
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-black font-heading text-gray-900">Finaliser la commande</h2>
                            <button onClick={() => setShowCheckout(false)} className="p-2 hover:bg-gray-100 rounded-full transition"><XIcon /></button>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-4">Informations de livraison</h3>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Nom Complet</label>
                                    <input 
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition font-medium"
                                        placeholder="Votre nom" 
                                        onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})} 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Téléphone (WhatsApp)</label>
                                    <input 
                                        type="tel"
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition font-medium"
                                        placeholder="Ex: 77 000 00 00" 
                                        onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})} 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Adresse précise</label>
                                    <textarea 
                                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50/50 outline-none transition font-medium resize-none h-24"
                                        placeholder="Quartier, point de repère..." 
                                        onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})} 
                                    />
                                </div>
                            </div>
                            
                            <div className="pt-2">
                                <h3 className="text-xs font-black uppercase text-gray-400 tracking-widest mb-4">Paiement</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={() => setSelectedPayment(PaymentMethod.WAVE)} 
                                        className={`p-4 border rounded-2xl flex flex-col items-center justify-center gap-2 transition ${selectedPayment === PaymentMethod.WAVE ? 'bg-blue-50 border-blue-500 text-blue-700 ring-2 ring-blue-500' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-[#1da1f2] text-white font-bold flex items-center justify-center text-lg shadow-md">W</div>
                                        <span className="font-bold text-sm">Wave</span>
                                    </button>
                                    <button 
                                        onClick={() => setSelectedPayment(PaymentMethod.ORANGE_MONEY)} 
                                        className={`p-4 border rounded-2xl flex flex-col items-center justify-center gap-2 transition ${selectedPayment === PaymentMethod.ORANGE_MONEY ? 'bg-orange-50 border-orange-500 text-orange-700 ring-2 ring-orange-500' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'}`}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-[#ff7900] text-white font-bold flex items-center justify-center text-xs shadow-md">OM</div>
                                        <span className="font-bold text-sm">Orange Money</span>
                                    </button>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button 
                                    onClick={handleCheckout} 
                                    className="w-full py-5 bg-black text-white font-black text-lg rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-3"
                                >
                                    <span>Confirmer la commande</span>
                                    <span className="bg-white/20 px-3 py-1 rounded text-sm">{formatCurrency(totalAmount)}</span>
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-4">Paiement à la livraison possible selon la zone.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )}
    </div>
  );
};

export default PublicStorefront;
