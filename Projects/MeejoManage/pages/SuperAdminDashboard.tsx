import React, { useEffect, useState } from 'react';
import { StorageService } from '../services/storage';
import { Store, AccountRequest, Product, Sale, PaymentMethod, Source, Employee } from '../types';
import { SettingsIcon, TrashIcon, SparklesIcon, GlobeIcon, LockIcon } from '../components/Icons';
import { useNotify } from '../App';

const SuperAdminDashboard: React.FC = () => {
  const { notify } = useNotify();
  const [stores, setStores] = useState<Store[]>([]);
  const [requests, setRequests] = useState<AccountRequest[]>([]);
  const [aiConfig, setAiConfig] = useState(StorageService.getAIConfig());
  
  const currentUser = StorageService.getCurrentUser();

  if (currentUser?.role !== 'DEVELOPER') {
    return <div className="p-8 text-center text-red-500 font-bold pt-32">Accès refusé. Réservé au développeur.</div>;
  }

  useEffect(() => {
    const load = async () => {
        try {
            const [s, r] = await Promise.all([
                StorageService.getStores(),
                StorageService.getAccountRequests()
            ]);
            setStores(s || []);
            setRequests(r || []);
        } catch (error) {
            console.error("Error loading super admin data:", error);
        }
    };
    load();
  }, []);

  const handleRunSimulation = async () => {
      if (!confirm("Générer des données de test (20 produits, 10 ventes, 5 employés) ?")) return;
      
      notify('Simulation en cours...', 'info');
      
      const store = await StorageService.getActiveStore();
      const storeId = store?.id || 'demo-store-id';

      // 1. Products
      const fakeProducts: Product[] = [];
      const prodNames = ['Savon Noir', 'Huile de Coco', 'Beurre de Karité', 'Tissage Brésilien', 'Sac en Cuir', 'Robe Soie', 'Perruque Lace', 'Pommade Bio', 'Shampoing Aloe', 'Huile Argan'];
      for(let i=1; i<=20; i++) {
          fakeProducts.push({
              id: `sim_${i}`, 
              storeId, 
              name: `${prodNames[i % prodNames.length]} #${i}`, 
              reference: `REF-00${i}`, 
              barcode: `BAR-${i}`, 
              stock: Math.floor(Math.random() * 50) + 5, 
              buyPrice: 1000 + (i * 100), 
              sellPrice: 2500 + (i * 200), 
              alertThreshold: 5,
              wholesalePrice: 2000 + (i * 150),
              wholesaleThreshold: 10,
              minMargin: 500
          });
      }

      // 2. Sales
      const fakeSales: Sale[] = [];
      const today = new Date().toISOString().split('T')[0];
      for(let i=1; i<=10; i++) {
          fakeSales.push({
              id: `sale_sim_${i}`,
              storeId,
              date: new Date(Date.now() - i * 3600000).toISOString(),
              paymentDate: today,
              items: [{ ...fakeProducts[Math.floor(Math.random() * fakeProducts.length)], quantity: 1, discountedPrice: 2500 }],
              total: 2500,
              discountTotal: 0, manualDiscount: 0, amountPaid: 2500, changeReturned: 0, remainingAmount: 0,
              paymentStatus: 'PAID', paymentMethod: PaymentMethod.CASH, source: Source.POS, status: 'DELIVERED',
              receiptNumber: `SIM-00${i}`, cashierName: 'Super Admin'
          });
      }

      // 3. Employees
      const fakeEmployees: Employee[] = [
          { id: 'emp_1', storeId, firstName: 'Moussa', lastName: 'Diop', role: 'Vendeur', salary: 85000, status: 'ACTIVE', hireDate: '2024-01-15', phone: '776543210' },
          { id: 'emp_2', storeId, firstName: 'Awa', lastName: 'Ndiaye', role: 'Gérante', salary: 150000, status: 'ACTIVE', hireDate: '2023-11-20', phone: '781234567' },
          { id: 'emp_3', storeId, firstName: 'Fatou', lastName: 'Sow', role: 'Caissière', salary: 90000, status: 'ACTIVE', hireDate: '2024-02-10', phone: '704567890' },
          { id: 'emp_4', storeId, firstName: 'Omar', lastName: 'Sy', role: 'Livreur', salary: 75000, status: 'ACTIVE', hireDate: '2024-03-01', phone: '769998877' },
          { id: 'emp_5', storeId, firstName: 'Idrissa', lastName: 'Gueye', role: 'Agent', salary: 70000, status: 'ACTIVE', hireDate: '2024-01-01', phone: '775554433' }
      ];

      await StorageService.saveBulkProducts(fakeProducts);
      await StorageService.saveBulkSales(fakeSales);
      await StorageService.saveBulkEmployees(fakeEmployees);

      notify("Simulation générée avec succès !", "success");
      setTimeout(() => window.location.reload(), 1000);
  };

  const handleClearSimulation = () => {
      if (!confirm("Wipe total des données de simulation ?")) return;
      StorageService.clearSimulationData();
      notify("Données de simulation effacées.");
      setTimeout(() => window.location.reload(), 1000);
  };

  const handleSaveAIConfig = (e: React.FormEvent) => {
      e.preventDefault();
      StorageService.saveAIConfig(aiConfig);
      notify("Configuration IA mise à jour", "success");
  };

  const impersonate = (storeId: string) => {
    const s = StorageService.getSettings();
    s.activeStoreId = storeId;
    StorageService.saveSettings(s);
    window.location.hash = '#dashboard';
    window.location.reload();
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen pt-24 pb-24 font-sans">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3 font-heading uppercase tracking-tight">
              <SettingsIcon className="w-8 h-8" /> Super Admin
          </h1>
          <div className="flex flex-wrap gap-4">
              <button onClick={handleClearSimulation} className="bg-white text-red-600 px-6 py-3 rounded-2xl font-black border border-red-100 hover:bg-red-50 transition active:scale-95 shadow-sm uppercase text-xs tracking-widest">
                  Supprimer Données
              </button>
              <button onClick={handleRunSimulation} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black shadow-lg hover:bg-blue-700 flex items-center gap-2 active:scale-95 transition uppercase text-xs tracking-widest">
                  <SparklesIcon className="w-5 h-5" /> Générer Simulation
              </button>
          </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-gray-700 flex flex-col justify-center text-center group hover:shadow-xl transition-all h-fit min-h-[200px]">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-2 group-hover:text-blue-500 transition-colors">Boutiques SaaS</p>
              <p className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter">{stores.length}</p>
          </div>
          <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white flex flex-col justify-center text-center shadow-xl hover:-translate-y-1 transition-all h-fit min-h-[200px]">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-70">Requêtes en attente</p>
              <p className="text-6xl font-black tracking-tighter">{requests.length}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-gray-700 h-fit">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <GlobeIcon className="w-4 h-4" /> Config Intelligence IA
              </h3>
              <form onSubmit={handleSaveAIConfig} className="space-y-4">
                  <div>
                      <label className="block text-[9px] font-black text-slate-500 uppercase mb-1 ml-1">Modèle Actif</label>
                      <select 
                        className="w-full p-3 bg-slate-50 dark:bg-gray-700 rounded-xl font-bold border-none outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        value={aiConfig.provider}
                        onChange={e => setAiConfig({...aiConfig, provider: e.target.value})}
                      >
                          <option value="GEMINI">Google Gemini Pro (Env Key)</option>
                          <option value="PERPLEXITY">Perplexity AI (Sonar)</option>
                          <option value="OPENAI">OpenAI GPT-4o</option>
                      </select>
                  </div>
                  <div>
                    <label className="block text-[9px] font-black text-slate-500 uppercase mb-1 ml-1">Clé API Gemini</label>
                    <input 
                        type="password"
                        className="w-full p-3 bg-slate-50 dark:bg-gray-700 rounded-xl font-bold border-none outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        placeholder="Automatique via Env..."
                        disabled
                        value="********************"
                    />
                  </div>
                  <div>
                      <label className="block text-[9px] font-black text-slate-500 uppercase mb-1 ml-1">Clé API Perplexity</label>
                      <input 
                          type="password"
                          className="w-full p-3 bg-slate-50 dark:bg-gray-700 rounded-xl font-bold border-none outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="pplx-..."
                          value={aiConfig.perplexityKey || ''}
                          onChange={e => setAiConfig({...aiConfig, perplexityKey: e.target.value})}
                      />
                  </div>
                  <div>
                      <label className="block text-[9px] font-black text-slate-500 uppercase mb-1 ml-1">Clé API OpenAI</label>
                      <input 
                          type="password"
                          className="w-full p-3 bg-slate-50 dark:bg-gray-700 rounded-xl font-bold border-none outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          placeholder="sk-..."
                          value={aiConfig.openaiKey || ''}
                          onChange={e => setAiConfig({...aiConfig, openaiKey: e.target.value})}
                      />
                  </div>
                  <button type="submit" className="w-full py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:opacity-80 transition active:scale-95">Mettre à jour IA</button>
              </form>
          </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-sm overflow-hidden border border-slate-100 dark:border-gray-700">
        <div className="p-8 border-b dark:border-gray-700 flex justify-between items-center bg-slate-50/50 dark:bg-gray-700/50">
            <h2 className="text-xl font-black text-slate-800 dark:text-white font-heading uppercase tracking-tight">Liste des boutiques</h2>
        </div>
        <div className="overflow-x-auto">
            <table className="min-w-full text-left">
            <thead className="bg-white dark:bg-gray-800 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] border-b dark:border-gray-700">
                <tr>
                    <th className="px-8 py-5">Boutique</th>
                    <th className="px-8 py-5">Abonnement</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-gray-700">
                {stores.length > 0 ? stores.map(store => (
                <tr key={store.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-700/30 transition group">
                    <td className="px-8 py-6">
                        <div className="font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{store.name}</div>
                        <div className="text-xs text-slate-400 font-medium">{store.email}</div>
                    </td>
                    <td className="px-8 py-6">
                        <span className="px-4 py-1.5 rounded-full text-[10px] font-black bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">{store.pack}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                        <button onClick={() => impersonate(store.id)} className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg transition-all active:scale-95">Prendre le contrôle</button>
                    </td>
                </tr>
                )) : (
                    <tr><td colSpan={3} className="p-20 text-center text-slate-300 font-bold italic">Aucune boutique enregistrée</td></tr>
                )}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;