
export enum PaymentMethod {
  CASH = 'ESPÈCES',
  WAVE = 'WAVE',
  ORANGE_MONEY = 'ORANGE MONEY',
  FREE_MONEY = 'FREE MONEY',
  CHEQUE = 'CHÈQUE',
  VIREMENT = 'VIREMENT BANCAIRE'
}

export enum Source {
  POS = 'MAGASIN',
  WEB = 'SITE WEB',
  WHATSAPP = 'WHATSAPP',
  FACEBOOK = 'FACEBOOK',
  TIKTOK = 'TIKTOK',
  MARKETPLACE = 'MEEJO MARKET'
}

export type SubscriptionPack = 'STARTER' | 'PRO' | 'PREMIUM';
export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
export type UserRole = 'ADMIN' | 'GERANT' | 'ASSISTANT' | 'DEVELOPER' | 'SHAREHOLDER';
export type PaymentStatus = 'PAID' | 'PARTIAL' | 'PENDING';
export type Language = 'fr' | 'en' | 'ar';
export type Theme = 'light' | 'dark';
export type ShipmentStatus = 'FACTORY' | 'WAREHOUSE_CHINA' | 'CARGO_TRANSIT' | 'ARRIVED_SENEGAL' | 'IN_STORE';

export interface Category {
  id: string;
  storeId?: string; // If null, it's a system category
  name: string;
  icon: string;
  isSystem: boolean;
}

export interface DashboardConfig {
  showRevenueToday: boolean;
  showRevenueMonth: boolean;
  showProductCount: boolean;
  showLowStock: boolean;
  showSalesChart: boolean;
  showTopProducts: boolean;
}

export interface WebStoreConfig {
  heroBannerUrl?: string;
  heroTitle?: string;
  welcomeMessage: string;
  aboutText: string;
  showPrices: boolean;
  accentColor: string;
  sliderImages: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface PaymentConfig {
  waveQrUrl?: string;
  wavePaymentLink?: string;
  orangeMoneyQrUrl?: string;
  orangeMoneyPaymentLink?: string;
  freeMoneyQrUrl?: string;
  freeMoneyPaymentLink?: string;
}

export interface Store {
  id: string;
  name: string;
  slug: string; // For meejomanage.com/store/[slug]
  pack: SubscriptionPack;
  domain?: string; // Custom domain
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  address: string;
  phone: string;
  email: string;
  invoiceHeader: string;
  invoiceFooter: string;
  syncStockToWeb: boolean;
  shippingRateKg: number;
  shippingRateCbm: number;
  webConfig: WebStoreConfig;
  paymentConfig?: PaymentConfig;
  createdAt: number;
}

export interface AppSettings {
  language: Language;
  theme: Theme;
  aiApiKey?: string; 
  activeStoreId: string; 
  dashboardConfig: DashboardConfig;
}

export interface User {
  id: string;
  storeId: string;
  name: string;
  role: UserRole;
  email: string;
  pin: string; // Password
  mfaSecret?: string; // Real Base32 Secret
  mfaEnabled: boolean;
  sharePercentage?: number; 
}

export interface Customer {
  id: string;
  storeId: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  totalSpent: number;
  loyaltyPoints: number;
  lastVisit: string;
}

export interface SalaryAdjustment {
    id: string;
    date: string;
    amount: number;
    note: string;
}

export interface Employee {
  id: string;
  storeId: string;
  firstName: string;
  lastName: string;
  role: string;
  salary: number;
  status: 'ACTIVE' | 'INACTIVE';
  hireDate: string;
  phone: string;
  salaryHistory?: SalaryAdjustment[];
}

export interface Product {
  id: string;
  storeId: string;
  categoryId?: string;
  reference: string;
  name: string;
  barcode: string;
  stock: number;
  buyPrice: number;
  sellPrice: number;
  discount_price?: number; // Prix promo
  wholesalePrice: number;
  wholesaleThreshold: number;
  minMargin: number;
  imageUrl?: string;
  alertThreshold: number;
  isFeaturedMarket?: boolean; // Curated by Admin
}

export interface Promotion {
  id: string;
  storeId: string;
  name: string;
  type: 'PERCENTAGE' | 'FIXED';
  value: number;
  startDate: string;
  endDate: string;
  productIds: string[];
  active: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  discountedPrice: number;
  appliedPromo?: string;
}

export interface Sale {
  id: string;
  storeId: string;
  date: string;
  paymentDate: string;
  items: CartItem[];
  total: number;
  discountTotal: number;
  manualDiscount: number; 
  amountPaid: number;
  changeReturned: number;
  remainingAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  source: Source; 
  status: OrderStatus;
  customerPhone?: string;
  customerEmail?: string;
  receiptNumber: string;
  cashierName: string;
}

export interface Expense {
  id: string;
  storeId: string;
  description: string;
  amount: number;
  date: string;
  category: string;
}

export interface ShipmentItem {
  name: string;
  quantity: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  weightKg: number;
}

export interface AlibabaOrder {
    id: string;
    orderNumber: string;
    supplier: string;
    totalUsd: number;
    status: string;
    orderDate: string;
    items: {
        name: string;
        image: string;
        quantity: number;
        priceUsd: number;
    }[];
}

export interface Shipment {
  id: string;
  storeId: string;
  name: string;
  supplier: string;
  trackingNumber: string;
  items: ShipmentItem[];
  totalCbm: number;
  totalWeight: number;
  costProduct: number;
  costShipping: number;
  status: ShipmentStatus;
  orderDate: string;
  estimatedArrival: string;
  alibabaOrder?: AlibabaOrder;
}

export interface BlogPost {
  id: string;
  storeId: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: string;
  date: string;
  published: boolean;
  tags: string[];
}

export interface DashboardStats {
  revenueToday: number;
  revenueTodayTrend: number; 
  revenueMonth: number;
  revenueMonthTrend: number; 
  totalProducts: number;
  lowStockCount: number;
  topProducts: { name: string; quantity: number }[];
  channelStats: { name: string; value: number }[];
}

export interface Notification {
  id: string;
  storeId: string;
  type: 'LOW_STOCK' | 'SYSTEM' | 'ORDER';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface AccountRequest {
  id: string;
  shopName: string;
  ownerName: string;
  phone: string;
  email: string;
  pack: string;
  message: string;
  date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}
