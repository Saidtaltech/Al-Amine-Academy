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
  costPrice?: number | string;
  cost_price?: number | string;
};

export interface FinancialSummary {
  totalRevenue: number;
  grossMargin: number;
  totalExpenses: number;
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

const getBuyPrice = (item: SaleItemLike, productsById: Map<string, Product>): number => {
  const productId = getItemProductId(item);
  const product = productId ? productsById.get(productId) : undefined;
  return toNumber(item.buyPrice ?? item.buy_price ?? item.costPrice ?? item.cost_price ?? product?.buyPrice);
};

export const calculateSaleGrossMargin = (sale: Sale, productsById = new Map<string, Product>()): number => (
  (sale.items || []).reduce((sum, rawItem) => {
    const item = rawItem as SaleItemLike;
    const quantity = toNumber(item.quantity);
    const sellPrice = getSellPrice(item);
    const buyPrice = getBuyPrice(item, productsById);

    return sum + ((sellPrice - buyPrice) * quantity);
  }, 0)
);

export const calculateFinancialSummary = (
  sales: Sale[],
  expenses: Expense[],
  products: Product[] = []
): FinancialSummary => {
  const productsById = new Map(products.map(product => [product.id, product]));
  const totalRevenue = sales.reduce((sum, sale) => sum + toNumber(sale.total), 0);
  const grossMargin = sales.reduce((sum, sale) => sum + calculateSaleGrossMargin(sale, productsById), 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + toNumber(expense.amount), 0);

  return {
    totalRevenue,
    grossMargin,
    totalExpenses,
    netProfit: grossMargin - totalExpenses
  };
};
