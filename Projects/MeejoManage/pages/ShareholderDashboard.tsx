
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { StorageService } from '../services/storage';
import { calculateFinancialSummary } from '../services/financials';
import { User } from '../types';
import { formatCurrency, t } from '../constants';

const ShareholderDashboard: React.FC<{ currentUser: User }> = ({ currentUser }) => {
  const settings = StorageService.getSettings();
  const isRTL = settings.language === 'ar';
  
  const [financials, setFinancials] = useState({
    netProfit: 0,
    grossMargin: 0,
    totalExpenses: 0,
    inventoryExpenses: 0,
    pendingRevenue: 0,
    estimatedCostAmount: 0,
    missingCostRevenue: 0,
    missingCostItems: 0,
    history: [] as any[]
  });

  useEffect(() => {
    // Fix: storage methods are async
    const loadFinancials = async () => {
        const [sales, expenses, products] = await Promise.all([
            StorageService.getSales(),
            StorageService.getExpenses(),
            StorageService.getProducts()
        ]);
        
        const scopedStoreId = currentUser.storeId && currentUser.storeId !== 'ALL' ? currentUser.storeId : null;
        const scopedSales = scopedStoreId ? sales.filter(sale => sale.storeId === scopedStoreId) : sales;
        const scopedExpenses = scopedStoreId ? expenses.filter(expense => expense.storeId === scopedStoreId) : expenses;
        const scopedProducts = scopedStoreId ? products.filter(product => product.storeId === scopedStoreId) : products;
        const summary = calculateFinancialSummary(scopedSales, scopedExpenses, scopedProducts);

        // History for chart
        const last12Months = [...Array(12)].map((_, i) => {
            const d = new Date();
            d.setMonth(d.getMonth() - (11 - i));
            return d.toISOString().slice(0, 7); // YYYY-MM
        });

        const chartData = last12Months.map(month => {
            const monthSales = scopedSales.filter(s => s.date.startsWith(month));
            const monthExpenses = scopedExpenses.filter(e => e.date.startsWith(month));
            const monthSummary = calculateFinancialSummary(monthSales, monthExpenses, scopedProducts);
            return { name: month, profit: monthSummary.netProfit };
        });

        setFinancials({ ...summary, history: chartData });
    };
    loadFinancials();
  }, [currentUser.storeId]);

  const { netProfit, grossMargin, totalExpenses, inventoryExpenses, pendingRevenue, estimatedCostAmount, missingCostRevenue, missingCostItems, history } = financials;
  const userShare = currentUser.sharePercentage || 0;
  const userDividends = netProfit * (userShare / 100);

  return (
    <div className="p-4 md:p-8 space-y-8 pb-20 md:pb-8 pt-20 md:pt-8" dir={isRTL ? 'rtl' : 'ltr'}>
        <header>
            <h2 className={`text-3xl font-bold text-gray-800 dark:text-white ${isRTL ? 'font-arabic' : ''}`}>{t('shareholder_dashboard', settings.language)}</h2>
            <p className="text-gray-500 dark:text-gray-400">Bienvenue, {currentUser.name}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-blue-600">
                <p className={`text-sm text-gray-500 dark:text-gray-400 uppercase font-bold ${isRTL ? 'font-arabic' : ''}`}>{t('net_profit', settings.language)} (Global)</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{formatCurrency(netProfit)}</p>
                <p className="mt-2 text-xs font-bold text-slate-400">Marge brute {formatCurrency(grossMargin)} - dépenses exploitation {formatCurrency(totalExpenses)}</p>
                <p className="mt-1 text-[10px] font-bold text-slate-400">Stock exclu {formatCurrency(inventoryExpenses)} · En attente {formatCurrency(pendingRevenue)}</p>
                {(estimatedCostAmount > 0 || missingCostItems > 0) && (
                    <p className="mt-1 text-[10px] font-bold text-orange-500">Coûts estimés {formatCurrency(estimatedCostAmount)} · Coûts manquants {missingCostItems} ligne(s), CA {formatCurrency(missingCostRevenue)}</p>
                )}
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border-l-4 border-purple-600">
                <p className={`text-sm text-gray-500 dark:text-gray-400 uppercase font-bold ${isRTL ? 'font-arabic' : ''}`}>{t('my_shares', settings.language)}</p>
                <p className="text-3xl font-bold text-purple-900 dark:text-purple-400 mt-2">{userShare}%</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl transform scale-105 border-l-4 border-green-500">
                <p className={`text-sm text-gray-500 dark:text-gray-400 uppercase font-bold ${isRTL ? 'font-arabic' : ''}`}>{t('my_dividends', settings.language)}</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{formatCurrency(userDividends)}</p>
            </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-gray-800 dark:text-white mb-6">Évolution des Bénéfices (12 mois)</h3>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={history}>
                        <defs>
                            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" tick={{ fill: settings.theme === 'dark' ? '#9CA3AF' : '#4B5563' }} />
                        <YAxis orientation={isRTL ? "right" : "left"} tick={{ fill: settings.theme === 'dark' ? '#9CA3AF' : '#4B5563' }} />
                        <Tooltip 
                            formatter={(val) => formatCurrency(Number(val))} 
                            contentStyle={{ backgroundColor: settings.theme === 'dark' ? '#1F2937' : '#fff', borderColor: settings.theme === 'dark' ? '#374151' : '#ccc', color: settings.theme === 'dark' ? '#fff' : '#000' }}
                        />
                        <Area type="monotone" dataKey="profit" stroke="#10B981" fillOpacity={1} fill="url(#colorProfit)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  );
};

export default ShareholderDashboard;
