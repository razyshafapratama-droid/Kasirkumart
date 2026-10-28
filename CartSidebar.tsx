import React, { useState } from 'react';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Percent, Tag, X } from 'lucide-react';
import { CartItem, StoreSettings } from '../types';
import { formatRupiah } from '../utils/formatters';

interface CartSidebarProps {
  cart: CartItem[];
  storeSettings: StoreSettings;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onProceedToPayment: (discountAmount: number, taxAmount: number) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  cart,
  storeSettings,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToPayment,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const [discountType, setDiscountType] = useState<'percent' | 'nominal'>('nominal');
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [showDiscountInput, setShowDiscountInput] = useState<boolean>(false);

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const rawSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // Discount calculation
  const calculatedDiscount =
    discountType === 'percent'
      ? Math.round((rawSubtotal * Math.min(100, Math.max(0, discountValue))) / 100)
      : Math.min(rawSubtotal, Math.max(0, discountValue));

  const subtotalAfterDiscount = Math.max(0, rawSubtotal - calculatedDiscount);

  // Tax calculation
  const calculatedTax = storeSettings.enableTax
    ? Math.round((subtotalAfterDiscount * (storeSettings.taxRatePercent || 11)) / 100)
    : 0;

  const grandTotal = subtotalAfterDiscount + calculatedTax;

  const handleCheckoutClick = () => {
    if (cart.length === 0) return;
    onProceedToPayment(calculatedDiscount, calculatedTax);
  };

  return (
    <div
      className={`bg-white border-l border-slate-200 flex flex-col h-full shadow-lg ${
        isOpenMobile ? 'fixed inset-0 z-50' : 'w-full h-full'
      }`}
    >
      {/* Cart Header */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-sm sm:text-base leading-tight">Keranjang Belanja</h2>
            <p className="text-xs text-slate-400">
              {totalItemsCount} barang terpilih
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {cart.length > 0 && (
            <button
              onClick={onClearCart}
              className="text-xs text-slate-400 hover:text-red-400 p-1.5 rounded hover:bg-slate-800 transition-colors cursor-pointer"
              title="Kosongkan Keranjang"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          {isOpenMobile && onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 text-slate-400 hover:text-white rounded"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Cart Item List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3">
              <ShoppingBag className="w-8 h-8 text-slate-300" />
            </div>
            <p className="font-semibold text-slate-700 text-sm">Keranjang masih kosong</p>
            <p className="text-xs text-slate-400 mt-1 max-w-[200px]">
              Klik tombol "+ Tambah" pada produk di samping untuk memulai transaksi kasir.
            </p>
          </div>
        ) : (
          cart.map((item) => {
            const itemTotal = item.product.price * item.quantity;
            return (
              <div key={item.product.id} className="pt-3 first:pt-0">
                <div className="flex items-start justify-between gap-2.5">
                  {/* Product Thumbnail */}
                  {item.product.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200 shrink-0 text-xs font-bold">
                      {item.product.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 text-sm truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {formatRupiah(item.product.price)} / {item.product.unit}
                    </p>
                  </div>
                  <span className="font-bold text-slate-900 text-sm font-['Plus_Jakarta_Sans'] whitespace-nowrap">
                    {formatRupiah(itemTotal)}
                  </span>
                </div>

                {/* Quantity Controls & Delete */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 overflow-hidden">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center hover:bg-slate-200 text-slate-700 transition-colors"
                      title="Kurangi"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={item.product.stock}
                      value={item.quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) {
                          onUpdateQuantity(item.product.id, val);
                        }
                      }}
                      className="w-10 text-center text-xs font-bold text-slate-800 bg-transparent border-x border-slate-200 focus:outline-none"
                    />
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                      className="w-7 h-7 flex items-center justify-center hover:bg-slate-200 text-slate-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Tambah"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
                    title="Hapus barang ini"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Cart Summary & Checkout */}
      {cart.length > 0 && (
        <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
          {/* Discount Trigger / Input */}
          <div className="text-xs">
            {!showDiscountInput ? (
              <button
                onClick={() => setShowDiscountInput(true)}
                className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Tag className="w-3.5 h-3.5" />
                {calculatedDiscount > 0
                  ? `Diskon terpasang: ${formatRupiah(calculatedDiscount)} (Ubah)`
                  : '+ Tambah Diskon/Kupon'}
              </button>
            ) : (
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Diskon Transaksi</span>
                  <button
                    onClick={() => setShowDiscountInput(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setDiscountType('nominal')}
                    className={`px-2 py-1 rounded text-[11px] font-bold ${
                      discountType === 'nominal'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Nominal (Rp)
                  </button>
                  <button
                    onClick={() => setDiscountType('percent')}
                    className={`px-2 py-1 rounded text-[11px] font-bold ${
                      discountType === 'percent'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Persen (%)
                  </button>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={discountValue || ''}
                    onChange={(e) => setDiscountValue(Number(e.target.value) || 0)}
                    className="flex-1 px-2 py-1 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Breakdown calculation */}
          <div className="space-y-1.5 text-xs text-slate-600 pt-1 border-t border-slate-200/80">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-slate-900">{formatRupiah(rawSubtotal)}</span>
            </div>
            {calculatedDiscount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Diskon</span>
                <span>-{formatRupiah(calculatedDiscount)}</span>
              </div>
            )}
            {storeSettings.enableTax && (
              <div className="flex justify-between">
                <span>PPN ({storeSettings.taxRatePercent}%)</span>
                <span>{formatRupiah(calculatedTax)}</span>
              </div>
            )}
            <div className="flex justify-between items-baseline pt-2 border-t border-slate-200">
              <span className="font-bold text-slate-900 text-sm">Total Belanja</span>
              <span className="font-extrabold text-xl text-emerald-700 font-['Plus_Jakarta_Sans']">
                {formatRupiah(grandTotal)}
              </span>
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={handleCheckoutClick}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 cursor-pointer transition-all active:scale-[0.99]"
          >
            <span>Bayar Sekarang</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      )}
    </div>
  );
};
