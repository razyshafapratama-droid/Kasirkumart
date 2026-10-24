import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

const DATA_DIR = path.resolve(__dirname, 'data');
const DB_FILE = path.resolve(DATA_DIR, 'db.json');

interface DbSchema {
  products: any[];
  transactions: any[];
  settings: any;
  users: any[];
}

// Initial fallback seed
const defaultProducts = [
  { id: 'prod-1', name: 'Indomie Goreng', category: 'Makanan', price: 3500, cost: 2700, stock: 19, unit: 'pcs', barcode: '89988662001', icon: 'package', image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80' },
  { id: 'prod-2', name: 'Air Mineral 600ml', category: 'Minuman', price: 4000, cost: 2500, stock: 15, unit: 'botol', barcode: '89988662002', icon: 'cup', image: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=600&q=80' },
  { id: 'prod-3', name: 'Roti Cokelat', category: 'Makanan', price: 6000, cost: 4200, stock: 10, unit: 'pcs', barcode: '89988662003', icon: 'package', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80' },
  { id: 'prod-4', name: 'Susu Kotak 250ml', category: 'Minuman', price: 7000, cost: 5100, stock: 11, unit: 'kotak', barcode: '89988662004', icon: 'cup', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80' },
  { id: 'prod-5', name: 'Kopi Kenangan Mantan', category: 'Minuman', price: 10000, cost: 7200, stock: 14, unit: 'botol', barcode: '89988662005', icon: 'coffee', image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80' },
  { id: 'prod-6', name: 'Teh Pucuk Harum 350ml', category: 'Minuman', price: 4500, cost: 3200, stock: 24, unit: 'botol', barcode: '89988662006', icon: 'cup', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80' },
  { id: 'prod-7', name: 'Chitato Sapi Panggang 68g', category: 'Snack', price: 11500, cost: 8800, stock: 18, unit: 'bungkus', barcode: '89988662007', icon: 'package', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80' },
  { id: 'prod-8', name: 'SilverQueen Cashew 58g', category: 'Snack', price: 16500, cost: 13000, stock: 8, unit: 'bar', barcode: '89988662008', icon: 'box', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=600&q=80' },
  { id: 'prod-9', name: 'Beras Pandan Wangi 5kg', category: 'Sembako', price: 74000, cost: 65000, stock: 12, unit: 'karung', barcode: '89988662009', icon: 'shopping-bag', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80' },
  { id: 'prod-10', name: 'Minyak Goreng Bimoli 2L', category: 'Sembako', price: 35000, cost: 30500, stock: 16, unit: 'pouch', barcode: '89988662010', icon: 'package', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80' },
  { id: 'prod-11', name: 'Telur Ayam Negeri 1kg', category: 'Sembako', price: 28000, cost: 24000, stock: 22, unit: 'kg', barcode: '89988662011', icon: 'box', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80' },
  { id: 'prod-12', name: 'Gula Pasir Gulaku 1kg', category: 'Sembako', price: 17500, cost: 15200, stock: 25, unit: 'kg', barcode: '89988662012', icon: 'package', image: 'https://images.unsplash.com/photo-1581441363689-1f3c3c414635?auto=format&fit=crop&w=600&q=80' },
  { id: 'prod-13', name: 'Sabun Mandi Lifebuoy 85g', category: 'Kebutuhan', price: 4500, cost: 3400, stock: 30, unit: 'pcs', barcode: '89988662013', icon: 'sparkles', image: 'https://images.unsplash.com/photo-1607006314148-356a59600118?auto=format&fit=crop&w=600&q=80' },
  { id: 'prod-14', name: 'Pasta Gigi Pepsodent 120g', category: 'Kebutuhan', price: 13000, cost: 10200, stock: 15, unit: 'tube', barcode: '89988662014', icon: 'sparkles', image: 'https://images.unsplash.com/photo-1559591937-e1032b4b2cb5?auto=format&fit=crop&w=600&q=80' },
  { id: 'prod-15', name: 'Tissue Paseo Smart 250s', category: 'Kebutuhan', price: 14500, cost: 11300, stock: 9, unit: 'pack', barcode: '89988662015', icon: 'box', image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=600&q=80' },
  { id: 'prod-16', name: 'Biskuit Roma Kelapa 300g', category: 'Snack', price: 10500, cost: 8200, stock: 14, unit: 'pack', barcode: '89988662016', icon: 'package', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80' },
];

function initDatabase(): DbSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.error('Error reading db file, reinitializing', err);
  }

  // Create initial 32 transactions matching Rp1.250.000 omzet
  const today = new Date();
  const sampleTransactions: any[] = [];
  const baseItems = [
    { name: 'Indomie Goreng', p: 3500, c: 2700, q: 2 },
    { name: 'Air Mineral 600ml', p: 4000, c: 2500, q: 2 },
    { name: 'Roti Cokelat', p: 6000, c: 4200, q: 2 },
    { name: 'Susu Kotak 250ml', p: 7000, c: 5100, q: 1 },
    { name: 'Minyak Goreng Bimoli 2L', p: 35000, c: 30500, q: 1 },
    { name: 'Kopi Kenangan Mantan', p: 10000, c: 7200, q: 2 },
    { name: 'Beras Pandan Wangi 5kg', p: 74000, c: 65000, q: 1 },
    { name: 'Telur Ayam Negeri 1kg', p: 28000, c: 24000, q: 1 },
  ];

  let cumulativeTotal = 0;
  for (let i = 1; i <= 32; i++) {
    const d = new Date(today);
    d.setHours(8 + Math.floor(i / 3), (i * 17) % 60, 0);
    const itemA = baseItems[i % baseItems.length];
    const itemB = baseItems[(i + 2) % baseItems.length];
    
    // adjust for total sum ~1,250,000
    const qtyA = (i % 3) + 1;
    const qtyB = (i % 2);
    const subtotal = itemA.p * qtyA + (qtyB > 0 ? itemB.p * qtyB : 0);
    cumulativeTotal += subtotal;

    const items = [
      { productId: `prod-${(i % 16) + 1}`, name: itemA.name, price: itemA.p, cost: itemA.c, quantity: qtyA, unit: 'pcs', subtotal: itemA.p * qtyA },
    ];
    if (qtyB > 0) {
      items.push({ productId: `prod-${((i + 2) % 16) + 1}`, name: itemB.name, price: itemB.p, cost: itemB.c, quantity: qtyB, unit: 'pcs', subtotal: itemB.p * qtyB });
    }

    const method = i % 3 === 0 ? 'QRIS' : i % 7 === 0 ? 'TRANSFER' : 'TUNAI';
    const amountPaid = method === 'TUNAI' ? Math.ceil(subtotal / 10000) * 10000 : subtotal;

    sampleTransactions.push({
      id: `trx-${i}`,
      invoiceNumber: `TRK-${today.toISOString().slice(0, 10).replace(/-/g, '')}-${String(i).padStart(3, '0')}`,
      timestamp: d.toISOString(),
      items,
      subtotal,
      discount: 0,
      tax: 0,
      total: subtotal,
      paymentMethod: method,
      amountPaid,
      change: amountPaid - subtotal,
      cashierName: i % 2 === 0 ? 'Budi Santoso' : 'Siti Rahma',
      cashierRole: 'kasir',
    });
  }

  const initialData: DbSchema = {
    products: defaultProducts,
    transactions: sampleTransactions,
    settings: {
      storeName: 'KasirKu Mart',
      tagline: 'Minimarket & Toko Serba Ada',
      address: 'Jl. Merdeka No. 45, Jakarta Pusat',
      phone: '0812-3456-7890',
      receiptFooterMessage: 'Terima kasih atas kunjungan Anda!\nBarang yang sudah dibeli tidak dapat ditukar.',
      enableTax: false,
      taxRatePercent: 11,
    },
    users: [
      { id: 'user-admin', name: 'Admin Utama (Owner)', role: 'admin', avatarBg: 'bg-emerald-600', pin: '1234' },
      { id: 'user-kasir-1', name: 'Budi Santoso', role: 'kasir', avatarBg: 'bg-blue-600', pin: '0000' },
      { id: 'user-kasir-2', name: 'Siti Rahma', role: 'kasir', avatarBg: 'bg-amber-600', pin: '1111' },
    ],
  };

  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write initial db:', err);
  }

  return initialData;
}

let db = initDatabase();

function saveDatabase() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to persist database:', err);
  }
}

// REST Endpoints
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    serverTime: new Date().toISOString(),
    totalProducts: db.products.length,
    totalTransactions: db.transactions.length,
  });
});

app.get('/api/products', (req, res) => {
  res.json(db.products);
});

app.post('/api/products', (req, res) => {
  const newProduct = {
    ...req.body,
    id: req.body.id || `prod-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  db.products.unshift(newProduct);
  saveDatabase();
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Produk tidak ditemukan' });
  }
  db.products[index] = {
    ...db.products[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };
  saveDatabase();
  res.json(db.products[index]);
});

app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  db.products = db.products.filter((p) => p.id !== id);
  saveDatabase();
  res.json({ success: true, message: 'Produk berhasil dihapus' });
});

app.get('/api/transactions', (req, res) => {
  res.json(db.transactions);
});

app.post('/api/transactions', (req, res) => {
  const transaction = req.body;
  if (!transaction || !transaction.items || transaction.items.length === 0) {
    return res.status(400).json({ error: 'Transaksi tidak valid' });
  }

  // Deduct stock automatically
  transaction.items.forEach((item: any) => {
    const prod = db.products.find((p) => p.id === item.productId);
    if (prod) {
      prod.stock = Math.max(0, (prod.stock || 0) - item.quantity);
      prod.updatedAt = new Date().toISOString();
    }
  });

  const savedTransaction = {
    ...transaction,
    id: transaction.id || `trx-${Date.now()}`,
    timestamp: transaction.timestamp || new Date().toISOString(),
  };

  db.transactions.unshift(savedTransaction);
  saveDatabase();
  res.status(201).json(savedTransaction);
});

app.get('/api/settings', (req, res) => {
  res.json(db.settings);
});

app.put('/api/settings', (req, res) => {
  db.settings = { ...db.settings, ...req.body };
  saveDatabase();
  res.json(db.settings);
});

app.post('/api/reset', (req, res) => {
  try {
    if (fs.existsSync(DB_FILE)) {
      fs.unlinkSync(DB_FILE);
    }
  } catch (e) {}
  db = initDatabase();
  res.json({ success: true, message: 'Database reset to demo state' });
});

// Vite dev server mounting
async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KasirKu POS running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
