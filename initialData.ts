import { Product, StoreSettings, Transaction, UserAccount } from '../types';

export const INITIAL_USERS: UserAccount[] = [
  {
    id: 'user-admin',
    name: 'Admin Utama (Owner)',
    role: 'admin',
    avatarBg: 'bg-emerald-600',
    pin: '1234',
  },
  {
    id: 'user-kasir-1',
    name: 'Budi Santoso',
    role: 'kasir',
    avatarBg: 'bg-blue-600',
    pin: '0000',
  },
  {
    id: 'user-kasir-2',
    name: 'Siti Rahma',
    role: 'kasir',
    avatarBg: 'bg-amber-600',
    pin: '1111',
  },
];

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'KasirKu Mart',
  tagline: 'Minimarket & Toko Serba Ada',
  address: 'Jl. Merdeka No. 45, Jakarta Pusat',
  phone: '0812-3456-7890',
  receiptFooterMessage: 'Terima kasih telah berbelanja di KasirKu!\nBarang yang sudah dibeli tidak dapat ditukar kecuali ada perjanjian.',
  enableTax: false,
  taxRatePercent: 11,
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Indomie Goreng',
    category: 'Makanan',
    price: 3500,
    cost: 2700,
    stock: 19,
    unit: 'pcs',
    barcode: '89988662001',
    icon: 'package',
    image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-2',
    name: 'Air Mineral 600ml',
    category: 'Minuman',
    price: 4000,
    cost: 2500,
    stock: 15,
    unit: 'botol',
    barcode: '89988662002',
    icon: 'cup',
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-3',
    name: 'Roti Cokelat',
    category: 'Makanan',
    price: 6000,
    cost: 4200,
    stock: 10,
    unit: 'pcs',
    barcode: '89988662003',
    icon: 'package',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-4',
    name: 'Susu Kotak 250ml',
    category: 'Minuman',
    price: 7000,
    cost: 5100,
    stock: 11,
    unit: 'kotak',
    barcode: '89988662004',
    icon: 'cup',
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-5',
    name: 'Kopi Kenangan Mantan',
    category: 'Minuman',
    price: 10000,
    cost: 7200,
    stock: 14,
    unit: 'botol',
    barcode: '89988662005',
    icon: 'coffee',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-6',
    name: 'Teh Pucuk Harum 350ml',
    category: 'Minuman',
    price: 4500,
    cost: 3200,
    stock: 24,
    unit: 'botol',
    barcode: '89988662006',
    icon: 'cup',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-7',
    name: 'Chitato Sapi Panggang 68g',
    category: 'Snack',
    price: 11500,
    cost: 8800,
    stock: 18,
    unit: 'bungkus',
    barcode: '89988662007',
    icon: 'package',
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-8',
    name: 'SilverQueen Cashew 58g',
    category: 'Snack',
    price: 16500,
    cost: 13000,
    stock: 8,
    unit: 'bar',
    barcode: '89988662008',
    icon: 'box',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-9',
    name: 'Beras Pandan Wangi 5kg',
    category: 'Sembako',
    price: 74000,
    cost: 65000,
    stock: 12,
    unit: 'karung',
    barcode: '89988662009',
    icon: 'shopping-bag',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-10',
    name: 'Minyak Goreng Bimoli 2L',
    category: 'Sembako',
    price: 35000,
    cost: 30500,
    stock: 16,
    unit: 'pouch',
    barcode: '89988662010',
    icon: 'package',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-11',
    name: 'Telur Ayam Negeri 1kg',
    category: 'Sembako',
    price: 28000,
    cost: 24000,
    stock: 22,
    unit: 'kg',
    barcode: '89988662011',
    icon: 'box',
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-12',
    name: 'Gula Pasir Gulaku 1kg',
    category: 'Sembako',
    price: 17500,
    cost: 15200,
    stock: 25,
    unit: 'kg',
    barcode: '89988662012',
    icon: 'package',
    image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-13',
    name: 'Sabun Mandi Lifebuoy 85g',
    category: 'Kebutuhan',
    price: 4500,
    cost: 3400,
    stock: 30,
    unit: 'pcs',
    barcode: '89988662013',
    icon: 'sparkles',
    image: 'https://images.unsplash.com/photo-1607006314148-356a59600118?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-14',
    name: 'Pasta Gigi Pepsodent 120g',
    category: 'Kebutuhan',
    price: 13000,
    cost: 10200,
    stock: 15,
    unit: 'tube',
    barcode: '89988662014',
    icon: 'sparkles',
    image: 'https://images.unsplash.com/photo-1559591937-e1032b4b2cb5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-15',
    name: 'Tissue Paseo Smart 250s',
    category: 'Kebutuhan',
    price: 14500,
    cost: 11300,
    stock: 9,
    unit: 'pack',
    barcode: '89988662015',
    icon: 'box',
    image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prod-16',
    name: 'Biskuit Roma Kelapa 300g',
    category: 'Snack',
    price: 10500,
    cost: 8200,
    stock: 14,
    unit: 'pack',
    barcode: '89988662016',
    icon: 'package',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80',
  },
];

// Helper to generate seed transactions that total ~Rp 1.250.000 across 32 transactions today
export const generateInitialTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const today = new Date();
  
  // Create 32 transactions for today with varying times and amounts that sum to ~1,250,000
  const sampleAmounts = [
    { items: [{ id: 'prod-1', qty: 2 }, { id: 'prod-2', qty: 2 }], method: 'TUNAI' as const, time: '08:15' },
    { items: [{ id: 'prod-3', qty: 2 }, { id: 'prod-4', qty: 2 }], method: 'QRIS' as const, time: '08:32' },
    { items: [{ id: 'prod-5', qty: 2 }, { id: 'prod-7', qty: 1 }], method: 'TUNAI' as const, time: '08:50' },
    { items: [{ id: 'prod-9', qty: 1 }], method: 'TRANSFER' as const, time: '09:10' },
    { items: [{ id: 'prod-10', qty: 1 }, { id: 'prod-1', qty: 4 }], method: 'TUNAI' as const, time: '09:25' },
    { items: [{ id: 'prod-6', qty: 3 }, { id: 'prod-16', qty: 1 }], method: 'QRIS' as const, time: '09:44' },
    { items: [{ id: 'prod-8', qty: 2 }, { id: 'prod-4', qty: 1 }], method: 'TUNAI' as const, time: '10:05' },
    { items: [{ id: 'prod-11', qty: 2 }], method: 'TUNAI' as const, time: '10:20' },
    { items: [{ id: 'prod-12', qty: 2 }, { id: 'prod-10', qty: 1 }], method: 'QRIS' as const, time: '10:45' },
    { items: [{ id: 'prod-13', qty: 4 }, { id: 'prod-14', qty: 1 }], method: 'TUNAI' as const, time: '11:15' },
    { items: [{ id: 'prod-2', qty: 5 }, { id: 'prod-7', qty: 2 }], method: 'QRIS' as const, time: '11:38' },
    { items: [{ id: 'prod-1', qty: 6 }, { id: 'prod-6', qty: 2 }], method: 'TUNAI' as const, time: '12:02' },
    { items: [{ id: 'prod-15', qty: 2 }], method: 'TUNAI' as const, time: '12:25' },
    { items: [{ id: 'prod-3', qty: 3 }, { id: 'prod-5', qty: 1 }], method: 'QRIS' as const, time: '12:50' },
    { items: [{ id: 'prod-9', qty: 1 }, { id: 'prod-12', qty: 1 }], method: 'TRANSFER' as const, time: '13:14' },
    { items: [{ id: 'prod-8', qty: 1 }, { id: 'prod-2', qty: 2 }], method: 'TUNAI' as const, time: '13:35' },
    { items: [{ id: 'prod-11', qty: 1 }, { id: 'prod-1', qty: 2 }], method: 'TUNAI' as const, time: '13:58' },
    { items: [{ id: 'prod-10', qty: 1 }], method: 'QRIS' as const, time: '14:15' },
    { items: [{ id: 'prod-4', qty: 3 }, { id: 'prod-16', qty: 2 }], method: 'TUNAI' as const, time: '14:32' },
    { items: [{ id: 'prod-5', qty: 3 }], method: 'QRIS' as const, time: '14:50' },
    { items: [{ id: 'prod-7', qty: 2 }, { id: 'prod-2', qty: 3 }], method: 'TUNAI' as const, time: '15:10' },
    { items: [{ id: 'prod-13', qty: 2 }, { id: 'prod-15', qty: 1 }], method: 'TUNAI' as const, time: '15:30' },
    { items: [{ id: 'prod-1', qty: 5 }], method: 'QRIS' as const, time: '15:48' },
    { items: [{ id: 'prod-14', qty: 2 }], method: 'TUNAI' as const, time: '16:05' },
    { items: [{ id: 'prod-6', qty: 4 }], method: 'TUNAI' as const, time: '16:22' },
    { items: [{ id: 'prod-11', qty: 1 }, { id: 'prod-12', qty: 2 }], method: 'QRIS' as const, time: '16:45' },
    { items: [{ id: 'prod-3', qty: 2 }, { id: 'prod-4', qty: 2 }], method: 'TUNAI' as const, time: '17:03' },
    { items: [{ id: 'prod-9', qty: 1 }], method: 'TRANSFER' as const, time: '17:20' },
    { items: [{ id: 'prod-8', qty: 2 }], method: 'TUNAI' as const, time: '17:42' },
    { items: [{ id: 'prod-10', qty: 1 }, { id: 'prod-2', qty: 3 }], method: 'QRIS' as const, time: '18:10' },
    { items: [{ id: 'prod-1', qty: 4 }, { id: 'prod-5', qty: 1 }], method: 'TUNAI' as const, time: '18:45' },
    { items: [{ id: 'prod-16', qty: 2 }, { id: 'prod-6', qty: 2 }], method: 'QRIS' as const, time: '19:15' },
  ];

  sampleAmounts.forEach((sample, index) => {
    const num = index + 1;
    const invNumber = `TRK-${today.toISOString().slice(0, 10).replace(/-/g, '')}-${String(num).padStart(3, '0')}`;
    
    const [h, m] = sample.time.split(':').map(Number);
    const dateObj = new Date(today);
    dateObj.setHours(h, m, Math.floor(Math.random() * 50));

    const lineItems = sample.items.map((itemDef) => {
      const p = INITIAL_PRODUCTS.find((x) => x.id === itemDef.id)!;
      return {
        productId: p.id,
        name: p.name,
        price: p.price,
        cost: p.cost,
        quantity: itemDef.qty,
        unit: p.unit,
        subtotal: p.price * itemDef.qty,
      };
    });

    const subtotal = lineItems.reduce((acc, cur) => acc + cur.subtotal, 0);
    const total = subtotal;
    const amountPaid = sample.method === 'TUNAI' ? Math.ceil(total / 10000) * 10000 : total;
    const change = amountPaid - total;

    transactions.push({
      id: `trx-${num}`,
      invoiceNumber: invNumber,
      timestamp: dateObj.toISOString(),
      items: lineItems,
      subtotal,
      discount: 0,
      tax: 0,
      total,
      paymentMethod: sample.method,
      amountPaid,
      change,
      cashierName: num % 2 === 0 ? 'Budi Santoso' : 'Siti Rahma',
      cashierRole: 'kasir',
    });
  });

  return transactions;
};
