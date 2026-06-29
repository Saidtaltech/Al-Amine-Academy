import React, { useState, useEffect } from 'react';
import { StorageService } from '../services/storage';
import { User, Product, CartItem, PaymentMethod, Source } from '../types';
import { SearchIcon, CartIcon, TrashIcon, ProductIcon } from '../components/Icons';
import { formatCurrency } from '../constants';
import { useNotify } from '../App';

const POS: React.FC<{ currentUser: User }> = ({ currentUser }) => {
  const { notify } = useNotify();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
        try {
            const data = await StorageService.getProducts();
            setProducts(data || []);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };
    load();
  }, []);

  const addToCart = (p: Product) => {
    if (p.stock <= 0) return notify("Stock épuisé !", "error");
    setCart(prev => {
      const exist = prev.find(i => i.id === p.id);
      if (exist) {
        if (exist.quantity >= p.stock) {
          notify("Stock insuffisant !", "error");
          return prev;
        }
        return prev.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...p, quantity: 1, discountedPrice: p.sellPrice }];
    });
  };

  const total = cart.reduce((acc, i) => acc + ((i.discountedPrice ?? i.sellPrice) * i.quantity), 0);

  const handleCheckout = async () => {
    if (cart.length === 0 || isSaving) return;

    setIsSaving(true);
    try {
      const now = new Date();
      const receiptNumber = `POS-${now.getTime().toString().slice(-6)}`;
      const saleItems = cart.map(item => ({
        ...item,
        discountedPrice: Number(item.discountedPrice ?? item.sellPrice) || 0,
        buyPrice: Number(item.buyPrice) || 0,
        sellPrice: Number(item.sellPrice) || 0,
        quantity: Number(item.quantity) || 0
      }));

      await StorageService.saveSale({
        id: `sale_${now.getTime()}`,
        storeId: currentUser.storeId,
        date: now.toISOString(),
        paymentDate: now.toISOString().split('T')[0],
        items: saleItems,
        total,
        discountTotal: 0,
        manualDiscount: 0,
        amountPaid: total,
        changeReturned: 0,
        remainingAmount: 0,
        paymentStatus: 'PAID',
        paymentMethod: PaymentMethod.CASH,
        source: Source.POS,
        status: 'DELIVERED',
        receiptNumber,
        cashierName: currentUser.name
      });

      const nextProducts = products.map(product => {
        const soldItem = cart.find(item => item.id === product.id);
        if (!soldItem) return product;
        return { ...product, stock: Math.max(0, product.stock - soldItem.quantity) };
      });

      await Promise.all(
        nextProducts
          .filter(product => products.some(previous => previous.id === product.id && previous.stock !== product.stock))
          .map(product => StorageService.saveProduct(product))
      );

      setProducts(nextProducts);
      setCart([]);
      notify(`Vente ${receiptNumber} enregistrÃ©e`, "success");
    } catch (e) {
      console.error(e);
      notify("Impossible d'enregistrer la vente", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-gray-900 pt-16 md:pt-0 overflow-hidden">
      <div className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden">
        <header className="mb-8 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <h2 className="text-2xl font-black dark:text-white font-heading uppercase tracking-tight">Caisse Directe</h2>
          <div className="relative w-full md:w-96 flex items-center group">
            <div className="absolute left-4 z-10 flex items-center justify-center">
                <SearchIcon className="w-5 h-5 flex-shrink-0 text-slate-400 pointer-events-none group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input 
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 outline-none font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all" 
              placeholder="Rechercher article..." 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
            />
          </div>
        </header>

        {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-slate-400 font-black uppercase tracking-widest animate-pulse">Chargement du catalogue...</p>
            </div>
        ) : (
            <div className="flex-1 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 custom-scrollbar pr-2 pb-10">
            {filtered.length > 0 ? filtered.map(p => (
                <div key={p.id} onClick={() => addToCart(p)} className="bg-white dark:bg-gray-800 p-4 rounded-3xl border border-transparent hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer group flex flex-col items-center text-center h-fit">
                <div className="w-full aspect-square rounded-2xl bg-slate-100 dark:bg-gray-700 mb-4 flex items-center justify-center overflow-hidden">
                    {p.imageUrl ? <img src={p.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={p.name} /> : <ProductIcon className="text-slate-300 w-10 h-10" />}
                </div>
                <h4 className="font-bold text-sm dark:text-white line-clamp-1">{p.name}</h4>
                <p className="mt-auto font-black text-blue-600">{formatCurrency(p.sellPrice)}</p>
                </div>
            )) : (
                <div className="col-span-full py-20 text-center text-slate-300 font-bold italic">Aucun article trouvé</div>
            )}
            </div>
        )}
      </div>

      <div className="w-full md:w-96 bg-white dark:bg-gray-800 border-l dark:border-gray-700 flex flex-col shadow-2xl">
        <div className="p-8 border-b dark:border-gray-700">
          <h3 className="text-xl font-black dark:text-white flex items-center gap-2 uppercase tracking-widest"><CartIcon /> Panier</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center p-4 bg-slate-50 dark:bg-gray-700 rounded-2xl border border-gray-100 dark:border-gray-600">
              <div><p className="font-bold text-sm dark:text-white">{item.name}</p><p className="text-xs text-blue-500">x{item.quantity}</p></div>
              <button onClick={() => setCart(cart.filter(x => x.id !== item.id))} className="text-slate-300 hover:text-red-500 transition-colors p-2"><TrashIcon className="w-4 h-4" /></button>
            </div>
          ))}
          {cart.length === 0 && (
            <div className="text-center py-20 text-slate-300 font-bold italic">Panier vide</div>
          )}
        </div>
        <div className="p-8 bg-slate-900 text-white space-y-4">
          <div className="flex justify-between items-end"><p className="text-xs font-black uppercase text-slate-400 tracking-widest">Total</p><p className="text-3xl font-black">{formatCurrency(total)}</p></div>
          <button onClick={handleCheckout} disabled={cart.length === 0 || isSaving} className="w-full py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {isSaving ? 'Enregistrement...' : 'Encaisser'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default POS;
