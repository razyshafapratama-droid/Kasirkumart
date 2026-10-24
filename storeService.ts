import { Product, StoreSettings, Transaction, UserAccount } from '../types';
import { INITIAL_PRODUCTS, INITIAL_SETTINGS, INITIAL_USERS, generateInitialTransactions } from '../data/initialData';

const LOCAL_STORAGE_KEYS = {
  PRODUCTS: 'kasirku_products_v1',
  TRANSACTIONS: 'kasirku_transactions_v1',
  SETTINGS: 'kasirku_settings_v1',
  CURRENT_USER: 'kasirku_current_user_v1',
};

// Check if running against our express backend
async function fetchFromServer<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    // Backend offline or fallback
    return null;
  }
}

export class StoreService {
  private static listeners: Set<() => void> = new Set();

  public static subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private static notify() {
    this.listeners.forEach((fn) => fn());
  }

  // Load Initial or Cached Products
  public static async loadProducts(): Promise<Product[]> {
    const serverData = await fetchFromServer<Product[]>('/api/products');
    if (serverData && Array.isArray(serverData) && serverData.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.PRODUCTS, JSON.stringify(serverData));
      return serverData;
    }

    const localData = localStorage.getItem(LOCAL_STORAGE_KEYS.PRODUCTS);
    if (localData) {
      try {
        const parsed = JSON.parse(localData);
        // Backfill image from INITIAL_PRODUCTS if missing
        const enriched = parsed.map((p: Product) => {
          if (!p.image) {
            const initMatch = INITIAL_PRODUCTS.find((ip) => ip.id === p.id || ip.name.toLowerCase() === p.name.toLowerCase());
            if (initMatch && initMatch.image) {
              return { ...p, image: initMatch.image };
            }
          }
          return p;
        });
        localStorage.setItem(LOCAL_STORAGE_KEYS.PRODUCTS, JSON.stringify(enriched));
        return enriched;
      } catch (e) {}
    }

    // Default seed
    localStorage.setItem(LOCAL_STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }

  // Save / Update product
  public static async saveProduct(product: Partial<Product> & { name: string; price: number }): Promise<Product> {
    const isEdit = Boolean(product.id);
    let result: Product | null = null;

    if (isEdit && product.id) {
      result = await fetchFromServer<Product>(`/api/products/${product.id}`, {
        method: 'PUT',
        body: JSON.stringify(product),
      });
    } else {
      result = await fetchFromServer<Product>('/api/products', {
        method: 'POST',
        body: JSON.stringify(product),
      });
    }

    // Update local store
    const current = await this.loadProducts();
    let updated: Product[];

    if (isEdit && product.id) {
      const savedProd = result || (product as Product);
      updated = current.map((p) => (p.id === product.id ? { ...p, ...savedProd, updatedAt: new Date().toISOString() } : p));
    } else {
      const newProd: Product = result || {
        ...(product as any),
        id: `prod-${Date.now()}`,
        cost: product.cost || Math.round(product.price * 0.75),
        stock: product.stock ?? 10,
        unit: product.unit || 'pcs',
        barcode: product.barcode || String(Math.floor(10000000000 + Math.random() * 90000000000)),
        category: product.category || 'Umum',
        icon: product.icon || 'package',
        image: product.image,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      updated = [newProd, ...current];
    }

    localStorage.setItem(LOCAL_STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    this.notify();
    return result || updated[0];
  }

  // Delete product
  public static async deleteProduct(id: string): Promise<boolean> {
    await fetchFromServer(`/api/products/${id}`, { method: 'DELETE' });
    const current = await this.loadProducts();
    const updated = current.filter((p) => p.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    this.notify();
    return true;
  }

  // Restock product quantity
  public static async restockProduct(id: string, additionalQty: number): Promise<void> {
    const current = await this.loadProducts();
    const target = current.find((p) => p.id === id);
    if (!target) return;

    const newStock = Math.max(0, target.stock + additionalQty);
    await this.saveProduct({ ...target, stock: newStock });
  }

  // Load Transactions
  public static async loadTransactions(): Promise<Transaction[]> {
    const serverData = await fetchFromServer<Transaction[]>('/api/transactions');
    if (serverData && Array.isArray(serverData)) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.TRANSACTIONS, JSON.stringify(serverData));
      return serverData;
    }

    const localData = localStorage.getItem(LOCAL_STORAGE_KEYS.TRANSACTIONS);
    if (localData) {
      try {
        return JSON.parse(localData);
      } catch (e) {}
    }

    const seedTrx = generateInitialTransactions();
    localStorage.setItem(LOCAL_STORAGE_KEYS.TRANSACTIONS, JSON.stringify(seedTrx));
    return seedTrx;
  }

  // Record Transaction & Automatically Deduct Stock
  public static async recordTransaction(transactionData: Omit<Transaction, 'id'>): Promise<Transaction> {
    const payload = {
      ...transactionData,
      id: `trx-${Date.now()}`,
    };

    const serverResult = await fetchFromServer<Transaction>('/api/transactions', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const recordedTrx = serverResult || (payload as Transaction);

    // Save to local transactions list
    const transactions = await this.loadTransactions();
    const updatedTransactions = [recordedTrx, ...transactions];
    localStorage.setItem(LOCAL_STORAGE_KEYS.TRANSACTIONS, JSON.stringify(updatedTransactions));

    // Deduct stock locally as well
    const products = await this.loadProducts();
    const updatedProducts = products.map((prod) => {
      const soldItem = recordedTrx.items.find((item) => item.productId === prod.id);
      if (soldItem) {
        return {
          ...prod,
          stock: Math.max(0, prod.stock - soldItem.quantity),
          updatedAt: new Date().toISOString(),
        };
      }
      return prod;
    });
    localStorage.setItem(LOCAL_STORAGE_KEYS.PRODUCTS, JSON.stringify(updatedProducts));

    this.notify();
    return recordedTrx;
  }

  // Settings
  public static async loadSettings(): Promise<StoreSettings> {
    const serverData = await fetchFromServer<StoreSettings>('/api/settings');
    if (serverData) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.SETTINGS, JSON.stringify(serverData));
      return serverData;
    }

    const localData = localStorage.getItem(LOCAL_STORAGE_KEYS.SETTINGS);
    if (localData) {
      try {
        return JSON.parse(localData);
      } catch (e) {}
    }

    localStorage.setItem(LOCAL_STORAGE_KEYS.SETTINGS, JSON.stringify(INITIAL_SETTINGS));
    return INITIAL_SETTINGS;
  }

  public static async saveSettings(settings: StoreSettings): Promise<StoreSettings> {
    await fetchFromServer('/api/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
    localStorage.setItem(LOCAL_STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    this.notify();
    return settings;
  }

  // Current Active User (Admin vs Kasir)
  public static getCurrentUser(): UserAccount {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    // Default to admin for convenient initial view, or kasir
    return INITIAL_USERS[0];
  }

  public static setCurrentUser(user: UserAccount) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    this.notify();
  }

  public static getAllUsers(): UserAccount[] {
    return INITIAL_USERS;
  }

  // Reset to demo state
  public static async resetDemo(): Promise<void> {
    await fetchFromServer('/api/reset', { method: 'POST' });
    localStorage.removeItem(LOCAL_STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TRANSACTIONS);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.SETTINGS);
    this.notify();
  }
}
