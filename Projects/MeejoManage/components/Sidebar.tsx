
import React, { useMemo, useState, useEffect } from 'react';
import { DashboardIcon, CartIcon, ProductIcon, HistoryIcon, TagIcon, LogoIcon, SettingsIcon, WalletIcon, MoonIcon, SunIcon, ChartBarIcon, GlobeIcon, MegaphoneIcon, Bell, UsersIcon, XIcon } from './Icons';
import { User, AppSettings, Theme, Store } from '../types';
import { t, PACK_FEATURES } from '../constants';
import { StorageService } from '../services/storage';

interface SidebarProps {
  currentPage: string;
  setPage: (page: string) => void;
  onLogout: () => void;
  currentUser: User;
  settings: AppSettings;
  setSettings: (s: AppSettings) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setPage, onLogout, currentUser, settings, setSettings, isOpen, toggleSidebar }) => {
  const [activeStore, setActiveStore] = useState<Store | null>(null);

  useEffect(() => {
      StorageService.getActiveStore()
        .then(store => { if (store) setActiveStore(store); })
        .catch(err => console.error("Sidebar store load fail", err));
  }, []);

  const toggleTheme = () => {
    const newTheme = settings.theme === 'dark' ? 'light' : 'dark';
    const newSettings = { ...settings, theme: newTheme as Theme };
    setSettings(newSettings);
    StorageService.saveSettings(newSettings);
  };

  const menuItems = useMemo(() => {
    const role = currentUser?.role || 'ASSISTANT';
    const pack = (activeStore?.pack as keyof typeof PACK_FEATURES) || 'STARTER';
    const features = PACK_FEATURES[pack] || PACK_FEATURES.STARTER;

    if (role === 'SHAREHOLDER') {
        return [{ id: 'shareholder', label: t('shareholder_dashboard', settings.language), icon: ChartBarIcon }];
    }

    const items = [
      { id: 'dashboard', label: t('dashboard', settings.language), icon: DashboardIcon },
      { id: 'pos', label: t('pos', settings.language), icon: CartIcon },
      { id: 'products', label: t('products', settings.language), icon: ProductIcon },
      { id: 'promotions', label: t('promotions', settings.language), icon: TagIcon },
      { id: 'expenses', label: t('expenses', settings.language), icon: WalletIcon },
      { id: 'history', label: t('history', settings.language), icon: HistoryIcon },
    ];

    if (features.crm) items.push({ id: 'crm', label: t('crm', settings.language), icon: UsersIcon });
    if (features.sourcing) items.push({ id: 'sourcing', label: t('sourcing', settings.language), icon: GlobeIcon });
    if (features.hr) items.push({ id: 'hr', label: t('hr', settings.language), icon: UsersIcon });
    if (features.web) items.push({ id: 'webstore', label: t('webstore', settings.language), icon: GlobeIcon });
    
    items.push({ id: 'blog', label: 'Actualités', icon: MegaphoneIcon });
    items.push({ id: 'settings', label: t('settings', settings.language), icon: SettingsIcon });

    if (role === 'DEVELOPER') {
        items.push({ id: 'super-admin', label: 'Super Admin', icon: SettingsIcon });
    }

    return items;
  }, [currentUser?.role, settings.language, activeStore]);

  const isRTL = settings.language === 'ar';

  return (
    <>
      {/* Overlay mobile - higher z-index than content, lower than sidebar */}
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[95] md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={toggleSidebar} 
      />
      
      {/* Sidebar container */}
      <div className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} h-full bg-white dark:bg-gray-800 shadow-2xl transition-all duration-300 z-[100] flex flex-col border-r dark:border-gray-700 ${
        isOpen 
          ? 'w-72 translate-x-0' 
          : 'w-20 -translate-x-full md:translate-x-0 md:flex hidden'
      }`}>
        <div className="h-20 flex items-center px-6 border-b border-gray-100 dark:border-gray-700 relative">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                    <LogoIcon className="w-6 h-6" />
                </div>
                <div className={`${!isOpen && 'md:hidden'} flex flex-col`}>
                    <h1 className="font-extrabold text-lg text-slate-800 dark:text-white leading-none font-heading">Meejo</h1>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Manage</span>
                </div>
            </div>
            {/* Explicit close button for mobile when open */}
            {isOpen && (
                <button onClick={toggleSidebar} className="md:hidden absolute right-4 p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white">
                    <XIcon className="w-6 h-6" />
                </button>
            )}
        </div>

        <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => { setPage(item.id); if (window.innerWidth < 768) toggleSidebar(); }}
                  className={`w-full flex items-center ${isOpen ? 'px-4' : 'justify-center'} py-3.5 rounded-2xl transition-all duration-200 group relative ${
                    currentPage === item.id 
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-black' 
                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${currentPage === item.id ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  {(isOpen || window.innerWidth < 768) && <span className="ml-3 text-sm">{item.label}</span>}
                  {currentPage === item.id && isOpen && <div className="absolute left-0 w-1.5 h-6 bg-blue-600 rounded-r-full" />}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-gray-700 space-y-2 bg-gray-50/50 dark:bg-gray-800/50">
            <button onClick={toggleTheme} className={`w-full flex items-center ${isOpen ? 'px-4' : 'justify-center'} py-3 rounded-xl hover:bg-white dark:hover:bg-gray-700 text-slate-500 dark:text-slate-400 transition shadow-sm border border-transparent hover:border-slate-100`}>
                {settings.theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                {isOpen && <span className="ml-3 text-xs font-bold">{settings.theme === 'dark' ? 'Mode Clair' : 'Mode Sombre'}</span>}
            </button>
            <button onClick={onLogout} className={`w-full flex items-center ${isOpen ? 'px-4' : 'justify-center'} py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 transition border border-transparent hover:border-red-100`}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                {isOpen && <span className="ml-3 text-xs font-black uppercase tracking-tight">{t('logout', settings.language)}</span>}
            </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
