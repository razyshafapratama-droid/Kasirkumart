export type UserRole = 'admin' | 'kasir';

export interface UserAccount {
  id: string;
  name: string;
  role: UserRole;
  avatarBg: string;
  pin: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  cost: number; // Harga modal untuk laporan laba/rugi
  stock: number;
  unit: string;
  barcode: string;
  icon?: 'package' | 'cup' | 'coffee' | 'utensils' | 'shopping-bag' | 'sparkles' | 'box';
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentMethod = 'TUNAI' | 'QRIS' | 'TRANSFER';

export interface TransactionItem {
  productId: string;
  name: string;
  price: number;
  cost: number;
  quantity: number;
  unit: string;
  subtotal: number;
}

export interface Transaction {
  id: string;
  invoiceNumber: string;
  timestamp: string;
  items: TransactionItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  amountPaid: number;
  change: number;
  cashierName: string;
  cashierRole: UserRole;
  notes?: string;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  address: string;
  phone: string;
  receiptFooterMessage: string;
  enableTax: boolean;
  taxRatePercent: number; // e.g. 11%
}
