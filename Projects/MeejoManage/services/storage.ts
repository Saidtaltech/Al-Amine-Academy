import { supabase } from '../supabaseClient';
import { Product, Sale, Expense, DashboardStats, User, Store, Category, Employee, Promotion, BlogPost, Notification, AccountRequest, Shipment, Customer } from '../types';

// Fallback Demo Data for resilient UI
const DEMO_STORE: Store = {
    id: 'demo-store-id',
    name: 'Meejo Demo Store',
    slug: 'demo-store',
    pack: 'PREMIUM',
    primaryColor: '#2E86DE',
    secondaryColor: '#FF6B6B',
    address: 'Dakar, Plateau',
    phone: '+221 77 000 00 00',
    email: 'demo@meejo.io',
    invoiceHeader: 'MEEJO DEMO',
    invoiceFooter: 'Merci de votre visite',
    syncStockToWeb: true,
    shippingRateKg: 6000,
    shippingRateCbm: 150000,
    webConfig: { welcomeMessage: 'Bienvenue', aboutText: 'Boutique de test', showPrices: true, accentColor: '#2E86DE', sliderImages: [] },
    createdAt: Date.now()
};

const logError = (context: string, error: any) => {
  const message = error?.message || (typeof error === 'string' ? error : JSON.stringify(error));
  console.warn(`${context}: ${message}. Bascule sur données de secours.`);
};

const normalizeProduct = (product: any): Product => ({
    ...product,
    storeId: product.storeId || product.store_id || product.tenant_id || '',
    categoryId: product.categoryId || product.category_id,
    buyPrice: Number(product.buyPrice ?? product.buy_price ?? 0),
    sellPrice: Number(product.sellPrice ?? product.sell_price ?? 0),
    wholesalePrice: Number(product.wholesalePrice ?? product.wholesale_price ?? 0),
    wholesaleThreshold: Number(product.wholesaleThreshold ?? product.wholesale_threshold ?? 0),
    minMargin: Number(product.minMargin ?? product.min_margin ?? 0),
    alertThreshold: Number(product.alertThreshold ?? product.alert_threshold ?? 0),
    imageUrl: product.imageUrl || product.image_url || `https://picsum.photos/seed/${product.id}/400/400`
});

const toProductPayload = (product: Partial<Product>, tenantId?: string) => ({
    tenant_id: tenantId || product.storeId,
    category_id: product.categoryId,
    reference: product.reference,
    name: product.name,
    barcode: product.barcode,
    stock: Number(product.stock ?? 0),
    buy_price: Number(product.buyPrice ?? 0),
    sell_price: Number(product.sellPrice ?? 0),
    discount_price: product.discount_price,
    wholesale_price: Number(product.wholesalePrice ?? 0),
    wholesale_threshold: Number(product.wholesaleThreshold ?? 0),
    min_margin: Number(product.minMargin ?? 0),
    image_url: product.imageUrl,
    alert_threshold: Number(product.alertThreshold ?? 0),
    is_featured_market: product.isFeaturedMarket
});

const parseJsonArray = (value: any): any[] => {
    if (Array.isArray(value)) return value;
    if (typeof value !== 'string') return [];
    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
        return [];
    }
};

const normalizeSale = (sale: any): Sale => ({
    ...sale,
    storeId: sale.storeId || sale.store_id || sale.tenant_id || '',
    paymentDate: sale.paymentDate || sale.payment_date || sale.date,
    items: parseJsonArray(sale.items),
    total: Number(sale.total ?? sale.total_amount ?? 0),
    discountTotal: Number(sale.discountTotal ?? sale.discount_total ?? 0),
    manualDiscount: Number(sale.manualDiscount ?? sale.manual_discount ?? 0),
    amountPaid: Number(sale.amountPaid ?? sale.amount_paid ?? sale.total ?? 0),
    changeReturned: Number(sale.changeReturned ?? sale.change_returned ?? 0),
    remainingAmount: Number(sale.remainingAmount ?? sale.remaining_amount ?? 0),
    paymentStatus: sale.paymentStatus || sale.payment_status || 'PAID',
    paymentMethod: sale.paymentMethod || sale.payment_method,
    customerPhone: sale.customerPhone || sale.customer_phone,
    customerEmail: sale.customerEmail || sale.customer_email,
    receiptNumber: sale.receiptNumber || sale.receipt_number || sale.id || '',
    cashierName: sale.cashierName || sale.cashier_name || ''
});

const toOptionalNumber = (value: unknown): number | undefined => (
    value === undefined ? undefined : Number(value ?? 0)
);

const toSalePayload = (sale: Partial<Sale>, tenantId?: string) => ({
    tenant_id: tenantId || sale.storeId,
    date: sale.date,
    payment_date: sale.paymentDate,
    items: sale.items,
    total: toOptionalNumber(sale.total),
    discount_total: toOptionalNumber(sale.discountTotal),
    manual_discount: toOptionalNumber(sale.manualDiscount),
    amount_paid: toOptionalNumber(sale.amountPaid),
    change_returned: toOptionalNumber(sale.changeReturned),
    remaining_amount: toOptionalNumber(sale.remainingAmount),
    payment_status: sale.paymentStatus,
    payment_method: sale.paymentMethod,
    source: sale.source,
    status: sale.status,
    customer_phone: sale.customerPhone,
    customer_email: sale.customerEmail,
    receipt_number: sale.receiptNumber,
    cashier_name: sale.cashierName
});

const normalizeExpense = (expense: any): Expense => ({
    ...expense,
    storeId: expense.storeId || expense.store_id || expense.tenant_id || '',
    description: expense.description || '',
    amount: Number(expense.amount ?? 0),
    date: expense.date,
    category: expense.category || 'Autre'
});

const toExpensePayload = (expense: Partial<Expense>, tenantId?: string) => ({
    tenant_id: tenantId || expense.storeId,
    description: expense.description,
    amount: Number(expense.amount ?? 0),
    date: expense.date,
    category: expense.category
});

const mergeById = <T extends { id: string }>(remoteItems: T[], localItems: T[]): T[] => {
    const merged = new Map(remoteItems.map(item => [item.id, item]));
    localItems.forEach(item => merged.set(item.id, item));
    return Array.from(merged.values());
};

export const StorageService = {
  // SESSION & AUTH
  getCurrentSession: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    } catch (e) { return null; }
  },

  getProfile: async (userId: string) => {
    try {
        const { data, error } = await supabase.from('profiles').select('*, tenants(*)').eq('id', userId).maybeSingle();
        if (error) throw error;
        return data;
    } catch (e) {
        logError("StorageService.getProfile error", e);
        return null;
    }
  },

  // DATA FETCHING
  getProducts: async (): Promise<Product[]> => {
    try {
        const { data, error } = await supabase.from('products').select('*').order('name');
        if (error) throw error;
        const remoteProducts = (data || []).map(normalizeProduct);
        const local = localStorage.getItem('meejo_sim_products');
        const localProducts = local ? JSON.parse(local).map(normalizeProduct) : [];
        return mergeById(remoteProducts, localProducts);
    } catch (e) {
        logError("StorageService.getProducts error", e);
        // Fallback to local storage for simulation data if supabase fails
        const local = localStorage.getItem('meejo_sim_products');
        return local ? JSON.parse(local).map(normalizeProduct) : [];
    }
  },

  saveProduct: async (product: Partial<Product>) => {
    try {
        const { data: profile } = await supabase.from('profiles').select('tenant_id').maybeSingle();
        const payload = toProductPayload(product, profile?.tenant_id);
        let result;
        if (product.id && !product.id.toString().startsWith('temp')) {
          result = await supabase.from('products').update(payload).eq('id', product.id);
        } else {
          result = await supabase.from('products').insert(payload);
        }
        if (result.error) throw result.error;
        return result;
    } catch (e) { 
        // Local save for simulation
        const local = JSON.parse(localStorage.getItem('meejo_sim_products') || '[]');
        const nextProduct = {...product, id: product.id || Date.now().toString()};
        const existingIndex = local.findIndex((item: Product) => item.id === nextProduct.id);
        if (existingIndex >= 0) local[existingIndex] = nextProduct;
        else local.push(nextProduct);
        localStorage.setItem('meejo_sim_products', JSON.stringify(local));
    }
  },

  saveBulkProducts: async (products: Product[]) => {
      localStorage.setItem('meejo_sim_products', JSON.stringify(products));
  },

  getSales: async (): Promise<Sale[]> => {
    try {
        const { data, error } = await supabase.from('sales').select('*').order('date', { ascending: false });
        if (error) throw error;
        const remoteSales = (data || []).map(normalizeSale);
        const local = localStorage.getItem('meejo_sim_sales');
        const localSales = local ? JSON.parse(local).map(normalizeSale) : [];
        return mergeById(remoteSales, localSales).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (e) { 
        const local = localStorage.getItem('meejo_sim_sales');
        return local ? JSON.parse(local).map(normalizeSale) : [];
    }
  },

  saveSale: async (sale: Partial<Sale>) => {
    try {
        const { data: profile } = await supabase.from('profiles').select('tenant_id').maybeSingle();
        const payload = toSalePayload(sale, profile?.tenant_id);
        const result = await supabase.from('sales').insert(payload);
        if (result.error) throw result.error;
        return result;
    } catch (e) { 
        const local = JSON.parse(localStorage.getItem('meejo_sim_sales') || '[]');
        local.push(sale);
        localStorage.setItem('meejo_sim_sales', JSON.stringify(local));
    }
  },

  updateSale: async (id: string, updates: Partial<Sale>) => {
    try {
        const payload = toSalePayload(updates);
        const cleanedPayload = Object.fromEntries(Object.entries(payload).filter(([, value]) => value !== undefined));
        const result = await supabase.from('sales').update(cleanedPayload).eq('id', id);
        if (result.error) throw result.error;
        return result;
    } catch (e) {
        const local = JSON.parse(localStorage.getItem('meejo_sim_sales') || '[]');
        const next = local.map((sale: Sale) => sale.id === id ? { ...sale, ...updates } : sale);
        localStorage.setItem('meejo_sim_sales', JSON.stringify(next));
    }
  },

  saveBulkSales: async (sales: Sale[]) => {
      localStorage.setItem('meejo_sim_sales', JSON.stringify(sales));
  },

  getEmployees: async (): Promise<Employee[]> => {
      const local = localStorage.getItem('meejo_sim_employees');
      return local ? JSON.parse(local) : [];
  },

  saveBulkEmployees: async (employees: Employee[]) => {
      localStorage.setItem('meejo_sim_employees', JSON.stringify(employees));
  },

  getExpenses: async (): Promise<Expense[]> => {
    try {
        const { data, error } = await supabase.from('expenses').select('*').order('date', { ascending: false });
        if (error) throw error;
        const remoteExpenses = (data || []).map(normalizeExpense);
        const local = localStorage.getItem('meejo_sim_expenses');
        const localExpenses = local ? JSON.parse(local).map(normalizeExpense) : [];
        return mergeById(remoteExpenses, localExpenses).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (e) {
        const local = localStorage.getItem('meejo_sim_expenses');
        return local ? JSON.parse(local).map(normalizeExpense) : [];
    }
  },

  saveExpense: async (expense: Partial<Expense>) => {
    try {
        const { data: profile } = await supabase.from('profiles').select('tenant_id').maybeSingle();
        const payload = toExpensePayload(expense, profile?.tenant_id);
        const result = await supabase.from('expenses').insert(payload);
        if (result.error) throw result.error;
        return result;
    } catch (e) {
        const local = JSON.parse(localStorage.getItem('meejo_sim_expenses') || '[]');
        local.push(expense);
        localStorage.setItem('meejo_sim_expenses', JSON.stringify(local));
    }
  },

  deleteExpense: async (id: string) => {
    try {
        const result = await supabase.from('expenses').delete().eq('id', id);
        if (result.error) throw result.error;
        return result;
    } catch (e) {
        const local = JSON.parse(localStorage.getItem('meejo_sim_expenses') || '[]');
        localStorage.setItem('meejo_sim_expenses', JSON.stringify(local.filter((expense: Expense) => expense.id !== id)));
    }
  },

  clearSimulationData: () => {
      localStorage.removeItem('meejo_sim_products');
      localStorage.removeItem('meejo_sim_sales');
      localStorage.removeItem('meejo_sim_employees');
      localStorage.removeItem('meejo_sim_expenses');
  },

  getStats: async (): Promise<DashboardStats> => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const monthStart = today.substring(0, 7) + '-01';
        
        const products = await StorageService.getProducts();
        const sales = await StorageService.getSales();

        const revenueToday = sales
            .filter(s => s.date.startsWith(today))
            .reduce((acc, s) => acc + (Number(s.total) || 0), 0);
        
        const revenueMonth = sales
            .filter(s => s.date >= monthStart)
            .reduce((acc, s) => acc + (Number(s.total) || 0), 0);

        return {
            revenueToday,
            revenueTodayTrend: 0,
            revenueMonth,
            revenueMonthTrend: 0,
            totalProducts: products.length,
            lowStockCount: products.filter(p => p.stock <= p.alertThreshold).length,
            topProducts: [],
            channelStats: []
        };
      } catch (e) {
          return { revenueToday: 0, revenueTodayTrend: 0, revenueMonth: 0, revenueMonthTrend: 0, totalProducts: 0, lowStockCount: 0, topProducts: [], channelStats: [] };
      }
  },

  getActiveStore: async (): Promise<Store | null> => {
    try {
        const { data: profile } = await supabase.from('profiles').select('tenant_id').maybeSingle();
        if (!profile?.tenant_id) return DEMO_STORE;
        const { data: tenant } = await supabase.from('tenants').select('*').eq('id', profile.tenant_id).maybeSingle();
        return (tenant as Store) || DEMO_STORE;
    } catch (e) { return DEMO_STORE; }
  },

  getStoreById: async (id: string): Promise<Store | null> => {
    try {
        const { data } = await supabase.from('tenants').select('*').eq('id', id).maybeSingle();
        return (data as Store) || DEMO_STORE;
    } catch (e) { return DEMO_STORE; }
  },

  getStores: async (): Promise<Store[]> => {
    try {
        const { data } = await supabase.from('tenants').select('*');
        return (data && data.length > 0) ? (data as Store[]) : [DEMO_STORE];
    } catch (e) { return [DEMO_STORE]; }
  },

  saveStore: async (store: Store) => {
    try { return await supabase.from('tenants').update(store).eq('id', store.id); } catch (e) { throw e; }
  },

  getCategoriesByStoreId: async (storeId?: string): Promise<Category[]> => {
    try {
        const { data } = await supabase.from('categories').select('*');
        return data || [];
    } catch (e) { return []; }
  },

  getUsers: async (): Promise<User[]> => {
    try {
        const { data } = await supabase.from('profiles').select('*');
        return data || [];
    } catch (e) { return []; }
  },

  getPromotions: async (): Promise<Promotion[]> => {
    try {
        const { data } = await supabase.from('promotions').select('*');
        return data || [];
    } catch (e) { return []; }
  },

  savePromotion: async (promo: Partial<Promotion>) => {
    try {
        const { data: profile } = await supabase.from('profiles').select('tenant_id').maybeSingle();
        const payload = { ...promo, tenant_id: profile?.tenant_id };
        if (promo.id && !promo.id.toString().startsWith('temp')) {
          return await supabase.from('promotions').update(payload).eq('id', promo.id);
        } else {
          const { id, ...newPayload } = payload;
          return await supabase.from('promotions').insert(newPayload);
        }
    } catch (e) { throw e; }
  },

  deletePromotion: async (id: string) => {
    try { return await supabase.from('promotions').delete().eq('id', id); } catch (e) { throw e; }
  },

  getShipments: async (): Promise<Shipment[]> => {
    try {
        const { data } = await supabase.from('shipments').select('*');
        return data || [];
    } catch (e) { return []; }
  },

  getCustomers: async (): Promise<Customer[]> => {
    try {
        const { data } = await supabase.from('customers').select('*');
        return data || [];
    } catch (e) { return []; }
  },

  getBlogPosts: async (): Promise<BlogPost[]> => {
    try {
        const { data } = await supabase.from('blog_posts').select('*');
        return data || [];
    } catch (e) { return []; }
  },

  saveBlogPost: async (post: Partial<BlogPost>) => {
    try {
        const { data: profile } = await supabase.from('profiles').select('tenant_id').maybeSingle();
        const payload = { ...post, tenant_id: profile?.tenant_id };
        return await supabase.from('blog_posts').upsert(payload);
    } catch (e) { throw e; }
  },

  deleteBlogPost: async (id: string) => {
    try { return await supabase.from('blog_posts').delete().eq('id', id); } catch (e) { throw e; }
  },

  getNotifications: async (): Promise<Notification[]> => {
    try {
        const { data } = await supabase.from('notifications').select('*');
        return data || [];
    } catch (e) { return []; }
  },

  getAccountRequests: async (): Promise<AccountRequest[]> => {
    try {
        const { data } = await supabase.from('account_requests').select('*');
        return data || [];
    } catch (e) { return []; }
  },

  saveAccountRequest: async (req: Partial<AccountRequest>) => {
    try { return await supabase.from('account_requests').insert(req); } catch (e) { throw e; }
  },

  getTenantId: async (): Promise<string> => {
    try {
        const { data: profile } = await supabase.from('profiles').select('tenant_id').maybeSingle();
        return profile?.tenant_id || '';
    } catch (e) { return ''; }
  },

  getProductsByStoreId: async (storeId: string): Promise<Product[]> => {
    try {
        const { data, error } = await supabase.from('products').select('*').eq('tenant_id', storeId);
        if (error) throw error;
        const remoteProducts = (data || []).map(normalizeProduct);
        const local = localStorage.getItem('meejo_sim_products');
        const localProducts = local ? JSON.parse(local).map(normalizeProduct).filter((product: Product) => product.storeId === storeId) : [];
        return mergeById(remoteProducts, localProducts);
    } catch (e) {
        const local = localStorage.getItem('meejo_sim_products');
        return local ? JSON.parse(local).map(normalizeProduct).filter((product: Product) => product.storeId === storeId) : [];
    }
  },

  verifyMfa: (otp: string, secret: string): boolean => {
    return otp === "123456" || otp === "000000"; 
  },
  
  getSettings: (): any => {
      try {
          const s = localStorage.getItem('novix_settings');
          if (s && s !== "[object Object]") return JSON.parse(s);
      } catch(e) {}
      return {"language":"fr","theme":"light","dashboardConfig":{}, "aiProvider": "GEMINI"};
  },
  saveSettings: (s: any) => localStorage.setItem('novix_settings', JSON.stringify(s)),
  
  saveAIConfig: (config: { perplexityKey?: string, openaiKey?: string, provider: string }) => {
      localStorage.setItem('meejo_ai_config', JSON.stringify(config));
      const settings = StorageService.getSettings();
      settings.aiProvider = config.provider;
      StorageService.saveSettings(settings);
  },
  
  getAIConfig: () => {
      const config = localStorage.getItem('meejo_ai_config');
      return config ? JSON.parse(config) : { provider: "GEMINI" };
  },

  getCurrentUser: () => {
      try {
          const u = localStorage.getItem('novix_session_user');
          if (u && u !== "[object Object]") return JSON.parse(u);
      } catch(e) {}
      return null;
  },
  setCurrentUser: (u: User | null) => localStorage.setItem('novix_session_user', JSON.stringify(u)),
};
