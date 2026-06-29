import React, { useState, useEffect, createContext, useContext, useMemo, Component, ReactNode } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ShareholderDashboard from './pages/ShareholderDashboard';
import POS from './pages/POS';
import Products from './pages/Products';
import Settings from './pages/Settings';
import Expenses from './pages/Expenses';
import Promotions from './pages/Promotions';
import History from './pages/History';
import Reports from './pages/Reports';
import Sourcing from './pages/Sourcing';
import HR from './pages/HR';
import WebStore from './pages/WebStore';
import CRM from './pages/CRM';
import Marketplace from './pages/Marketplace';
import PublicStorefront from './components/PublicStorefront';
import Login from './pages/Login';
import Landing from './pages/Landing';
import CreateAccount from './pages/CreateAccount';
import PublicCalculator from './pages/PublicCalculator';
import MeejoServices from './pages/MeejoServices';
import PublicNavbar from './components/PublicNavbar';
import ChatbotUI from './components/ChatbotUI';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import Blog from './pages/Blog';
import BlogEditor from './pages/BlogEditor';
import PropositionHawaFr from './pages/PropositionHawaFr';
import { StorageService } from './services/storage';
import { User, AppSettings } from './types';
import { MenuIcon, LogoIcon, XIcon, CheckIcon } from './components/Icons';

// Toast Context
type ToastType = 'success' | 'error' | 'info';
interface Toast { id: number; message: string; type: ToastType; }
const ToastContext = createContext<{ notify: (msg: any, type?: ToastType) => void }>({ notify: () => {} });
export const useNotify = () => useContext(ToastContext);

// Global Error Boundary
interface ErrorBoundaryProps { children?: ReactNode; }
interface ErrorBoundaryState { hasError: boolean; }

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };
  constructor(props: ErrorBoundaryProps) { 
    super(props); 
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: any, errorInfo: any) { console.error("Render Crash:", error, errorInfo); }
  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-10 text-center">
          <div>
            <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Oups ! Une erreur est survenue.</h1>
            <p className="text-slate-500 mb-8 font-medium">L'interface a rencontré un problème technique inattendu.</p>
            <button onClick={() => window.location.reload()} className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl hover:bg-blue-700 transition active:scale-95">Actualiser l'application</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('landing'); 
  const [settings, setSettings] = useState<AppSettings>(() => StorageService.getSettings());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [publicStoreId, setPublicStoreId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = (message: any, type: ToastType = 'info') => {
    const id = Date.now();
    const safeMessage = typeof message === 'string' ? message : 
                        (message instanceof Error ? message.message : JSON.stringify(message));
    setToasts(prev => [...prev, { id, message: safeMessage, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  useEffect(() => {
      const checkHash = () => {
          const hash = window.location.hash || '';
          if (hash.startsWith('#store/')) {
              const id = hash.replace('#store/', '');
              setPublicStoreId(id);
          } else {
              setPublicStoreId(null);
              const target = hash.replace('#', '').toLowerCase().trim();
              if (!target) {
                  setCurrentPage('landing');
              } else {
                  const routes: Record<string, string> = {
                      'login': 'login', 'mall': 'mall', 'calculator': 'calculator', 'create-account': 'create-account',
                      'services': 'meejo-services', 'proposition-hawa-fr': 'proposition-hawa-fr', 'pos': 'pos',
                      'products': 'products', 'expenses': 'expenses', 'crm': 'crm', 'dashboard': 'dashboard',
                      'history': 'history', 'settings': 'settings', 'hr': 'hr', 'shareholder': 'shareholder',
                      'promotions': 'promotions', 'reports': 'reports', 'sourcing': 'sourcing', 'webstore': 'webstore',
                      'super-admin': 'super-admin', 'blog': 'blog', 'blog-editor': 'blog-editor'
                  };
                  setCurrentPage(routes[target] || (currentUser ? 'dashboard' : 'landing'));
              }
          }
      };

      checkHash();
      window.addEventListener('hashchange', checkHash);
      const savedUser = StorageService.getCurrentUser();
      if (savedUser) setCurrentUser(savedUser);
      if (window.innerWidth < 768) setIsSidebarOpen(false); 
      return () => window.removeEventListener('hashchange', checkHash);
  }, [currentUser]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    StorageService.setCurrentUser(user);
    window.location.hash = '#dashboard';
    notify('Bienvenue ! Connexion réussie.', 'success');
  };

  const handleLogout = () => {
      StorageService.setCurrentUser(null);
      setCurrentUser(null);
      setCurrentPage('landing');
      window.location.hash = '';
      notify('Session fermée.');
  };

  const pageContent = useMemo(() => {
    if (!currentUser) return null;
    switch (currentPage) {
        case 'dashboard': return <Dashboard />;
        case 'pos': return <POS currentUser={currentUser} />;
        case 'hr': return <HR />;
        case 'settings': return <Settings />;
        case 'shareholder': return <ShareholderDashboard currentUser={currentUser} />;
        case 'products': return <Products currentUser={currentUser} />;
        case 'promotions': return <Promotions />;
        case 'expenses': return <Expenses />;
        case 'history': return <History />;
        case 'reports': return <Reports />;
        case 'sourcing': return <Sourcing />;
        case 'webstore': return <WebStore />;
        case 'crm': return <CRM />;
        case 'marketplace': return <Marketplace />;
        case 'super-admin': return <SuperAdminDashboard />;
        case 'blog': return <Blog setPage={setCurrentPage} />;
        case 'blog-editor': return <BlogEditor setPage={setCurrentPage} />;
        default: return <Dashboard />;
    }
  }, [currentPage, currentUser]);

  return (
    <ToastContext.Provider value={{ notify }}>
      <ErrorBoundary>
        <div className={`${settings.theme === 'dark' ? 'dark' : ''} selection:bg-blue-100`}>
            {/* Toasts overlay */}
            <div className="fixed top-20 right-6 z-[999] flex flex-col gap-3 pointer-events-none">
                {toasts.map(t => (
                    <div key={t.id} className={`p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-in pointer-events-auto min-w-[280px] border ${t.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : t.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-blue-50 border-blue-200 text-blue-800'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${t.type === 'success' ? 'bg-green-500 text-white' : t.type === 'error' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
                            {t.type === 'success' ? <CheckIcon className="w-5 h-5" /> : t.type === 'error' ? <XIcon className="w-5 h-5" /> : <LogoIcon className="w-4 h-4" />}
                        </div>
                        <p className="font-bold text-sm flex-1">{t.message}</p>
                        <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))} className="opacity-40 hover:opacity-100 transition"><XIcon className="w-4 h-4" /></button>
                    </div>
                ))}
            </div>

            <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white overflow-x-hidden">
            {publicStoreId ? (
                <PublicStorefront storeId={publicStoreId === 'preview' ? undefined : publicStoreId} onExit={() => window.location.hash = ''} />
            ) : (
              <>
                  {currentUser ? (
                      <>
                          <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b dark:border-gray-700 flex items-center justify-between px-4 z-[99] print:hidden shadow-sm">
                              <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white"><LogoIcon className="w-5 h-5" /></div>
                                  <span className="font-heading font-black text-slate-800 dark:text-white">Meejo</span>
                              </div>
                              <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-600 dark:text-slate-400 hover:bg-gray-100 rounded-lg transition active:scale-90"><MenuIcon /></button>
                          </div>
                          <Sidebar 
                              currentPage={currentPage} 
                              setPage={(p) => { setCurrentPage(p); window.location.hash = `#${p}`; }} 
                              onLogout={handleLogout}
                              currentUser={currentUser}
                              settings={settings}
                              setSettings={setSettings}
                              isOpen={isSidebarOpen}
                              toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                          />
                          <main className={`flex-1 transition-all duration-300 print:ml-0 w-full min-w-0 ${isSidebarOpen ? 'md:ml-72' : 'md:ml-20'}`}>
                              {pageContent}
                          </main>
                          <ChatbotUI />
                      </>
                  ) : (
                      <div className="w-full">
                          <PublicNavbar currentPage={currentPage} setPage={setCurrentPage} />
                          {currentPage === 'landing' && <Landing />}
                          {currentPage === 'mall' && <Marketplace />}
                          {currentPage === 'calculator' && <PublicCalculator />}
                          {currentPage === 'login' && <Login onLogin={handleLogin} settings={settings} />}
                          {currentPage === 'create-account' && <CreateAccount setPage={setCurrentPage} />}
                          {currentPage === 'meejo-services' && <MeejoServices />}
                          {currentPage === 'proposition-hawa-fr' && <PropositionHawaFr />}
                      </div>
                  )}
              </>
            )}
            </div>
        </div>
      </ErrorBoundary>
    </ToastContext.Provider>
  );
};

export default App;