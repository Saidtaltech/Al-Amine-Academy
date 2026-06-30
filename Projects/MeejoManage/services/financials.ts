import { Expense, Product, Sale } from '../types';

type SaleItemLike = {
  id?: string;
  productId?: string;
  product_id?: string;
  quantity?: number | string;
  discountedPrice?: number | string;
  discounted_price?: number | string;
  sellPrice?: number | string;
  sell_price?: number | string;
  price?: number | string;
  unitPrice?: number | string;
  unit_price?: number | string;
  buyPrice?: number | string;
  buy_price?: number | string;
  unitCost?: number | string;
  unit_cost?: number | string;
  costAtSale?: number | string;
  cost_at_sale?: number | string;
  costPrice?: number | string;
  cost_price?: number | string;
};

export interface FinancialSummary {
  totalRevenue: number;
  grossMargin: number;
  totalExpenses: number;
  operatingExpenses: number;
  inventoryExpenses: number;
  pendingRevenue: number;
  estimatedCostAmount: number;
  missingCostRevenue: number;
  missingCostItems: number;
  netProfit: number;
}

const toNumber = (value: unknown): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const getItemProductId = (item: SaleItemLike): string | undefined => (
  item.productId || item.product_id || item.id
);

const getSellPrice = (item: SaleItemLike): number => (
  toNumber(item.discountedPrice ?? item.discounted_price ?? item.sellPrice ?? item.sell_price ?? item.unitPrice ?? item.unit_price ?? item.price)
);

const normalizeText = (value: unknown): string => (
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
);

export const isInventoryExpense = (expense: Expense): boolean => {
  const category = normalizeText(expense.category);
  return ['stock', 'inventaire', 'achat stock', 'achats stock', 'marchandise', 'marchandises'].includes(category);
};

export const isRecognizedSale = (sale: Sale): boolean => (
  sale.paymentStatus === 'PAID' && sale.status === 'DELIVERED'
);

const getCostInfo = (
  item: SaleItemLike,
  productsById: Map<string, Product>
): { buyPrice: number; source: 'sale' | 'catalog' | 'missing' } => {
  const costAtSale = item.unitCost ?? item.unit_cost ?? item.costAtSale ?? item.cost_at_sale ?? item.buyPrice ?? item.buy_price ?? item.costPrice ?? item.cost_price;
  if (costAtSale !== undefined && costAtSale !== null && costAtSale !== '') {
    return { buyPrice: toNumber(costAtSale), source: 'sale' };
  }

  const productId = getItemProductId(item);
  const product = productId ? productsById.get(productId) : undefined;

  if (product && product.buyPrice !== undefined && product.buyPrice !== null) {
    return { buyPrice: toNumber(product.buyPrice), source: 'catalog' };
  }

  return { buyPrice: getSellPrice(item), source: 'missing' };
};

export const calculateSaleGrossMargin = (sale: Sale, productsById = new Map<string, Product>()): number => (
  (sale.items || []).reduce((sum, rawItem) => {
    const item = rawItem as SaleItemLike;
    const quantity = toNumber(item.quantity);
    const sellPrice = getSellPrice(item);
    const { buyPrice } = getCostInfo(item, productsById);

    return sum + ((sellPrice - buyPrice) * quantity);
  }, 0)
);

export const calculateFinancialSummary = (
  sales: Sale[],
  expenses: Expense[],
  products: Product[] = []
): FinancialSummary => {
  const productsById = new Map(products.map(product => [product.id, product]));
  const recognizedSales = sales.filter(isRecognizedSale);
  const pendingRevenue = sales
    .filter(sale => !isRecognizedSale(sale))
    .reduce((sum, sale) => sum + toNumber(sale.total), 0);

  let estimatedCostAmount = 0;
  let missingCostRevenue = 0;
  let missingCostItems = 0;

  const totalRevenue = recognizedSales.reduce((sum, sale) => sum + toNumber(sale.total), 0);
  const grossMargin = recognizedSales.reduce((saleSum, sale) => saleSum + (sale.items || []).reduce((itemSum, rawItem) => {
    const item = rawItem as SaleItemLike;
    const quantity = toNumber(item.quantity);
    const sellPrice = getSellPrice(item);
    const { buyPrice, source } = getCostInfo(item, productsById);

    if (source === 'catalog') estimatedCostAmount += buyPrice * quantity;
    if (source === 'missing') {
      missingCostItems += 1;
      missingCostRevenue += sellPrice * quantity;
    }

    return itemSum + ((sellPrice - buyPrice) * quantity);
  }, 0), 0);

  const operatingExpenses = expenses
    .filter(expense => !isInventoryExpense(expense))
    .reduce((sum, expense) => sum + toNumber(expense.amount), 0);
  const inventoryExpenses = expenses
    .filter(isInventoryExpense)
    .reduce((sum, expense) => sum + toNumber(expense.amount), 0);

  return {
    totalRevenue,
    grossMargin,
    totalExpenses: operatingExpenses,
    operatingExpenses,
    inventoryExpenses,
    pendingRevenue,
    estimatedCostAmount,
    missingCostRevenue,
    missingCostItems,
    netProfit: grossMargin - operatingExpenses
  };
};
