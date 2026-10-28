import React from 'react';
import { Wallet, ReceiptText, Package, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import { Product, Transaction } from '../types';
import { formatRupiah } from '../utils/formatters';

interface DashboardStatsProps {
  products: Product[];
  transactions: Transaction[];
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  products,
  transactions,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  // Calculate today's sales
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayTransactions = transactions.filter((t) => t.timestamp.startsWith(todayStr));

  const todayRevenue = todayTransactions.reduce((acc, t) => acc + (t.total || 0), 0);
  const todayTxCount = todayTransactions.length;
  const productCount = products.length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 text-white shadow-xl transition-all mb-6">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
            Ringkasan Operasional Hari Ini
          </h2>
          <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700">
            Terpusat
          </span>
        </div>
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {isCollapsed ? (
              <>
                Tampilkan <ChevronDown className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                Sembunyikan <ChevronUp className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        )}
      </div>

      {!isCollapsed && (
        <>
          {/* 4 Cards Grid - Exactly matching Screenshot 1 layout & aesthetic */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Card 1: Penjualan hari ini */}
            <div className="bg-slate-850/80 hover:bg-slate-800/70 border border-slate-800 rounded-xl p-3.5 sm:p-4 transition-all flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <Wallet className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-emerald-400/90 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                  Hari ini
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Penjualan hari ini</p>
                <p className="text-lg sm:text-2xl font-black text-white tracking-tight mt-0.5 font-['Plus_Jakarta_Sans'] break-words">
                  {formatRupiah(todayRevenue)}
                </p>
                <p className="text-[11px] text-emerald-400/80 mt-1 flex items-center gap-1">
                  &bull; Real-time dari kasir
                </p>
              </div>
            </div>

            {/* Card 2: Transaksi */}
            <div className="bg-slate-850/80 hover:bg-slate-800/70 border border-slate-800 rounded-xl p-3.5 sm:p-4 transition-all flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
                  <ReceiptText className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-blue-400/90 bg-blue-950/50 px-2 py-0.5 rounded border border-blue-800/40">
                  Struk
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Transaksi</p>
                <p className="text-lg sm:text-2xl font-black text-white tracking-tight mt-0.5 font-['Plus_Jakarta_Sans']">
                  {todayTxCount}
                </p>
                <p className="text-[11px] text-blue-400/80 mt-1">
                  Nota berhasil dicetak
                </p>
              </div>
            </div>

            {/* Card 3: Jenis produk */}
            <div className="bg-slate-850/80 hover:bg-slate-800/70 border border-slate-800 rounded-xl p-3.5 sm:p-4 transition-all flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
                  <Package className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-amber-400/90 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/40">
                  Katalog
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Jenis produk</p>
                <p className="text-lg sm:text-2xl font-black text-white tracking-tight mt-0.5 font-['Plus_Jakarta_Sans']">
                  {productCount}
                </p>
                <p className="text-[11px] text-amber-400/80 mt-1">
                  Aktif di etalase
                </p>
              </div>
            </div>

            {/* Card 4: Laporan */}
            <div className="bg-slate-850/80 hover:bg-slate-800/70 border border-slate-800 rounded-xl p-3.5 sm:p-4 transition-all flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-purple-400/90 bg-purple-950/50 px-2 py-0.5 rounded border border-purple-800/40">
                  Otomatis
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Laporan</p>
                <p className="text-lg sm:text-2xl font-black text-white tracking-tight mt-0.5 font-['Plus_Jakarta_Sans']">
                  Harian
                </p>
                <p className="text-[11px] text-purple-400/80 mt-1">
                  Sinkron database
                </p>
              </div>
            </div>
          </div>

          {/* Footer note matching screenshot */}
          <div className="mt-3.5 pt-2.5 border-t border-slate-800/60 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
            <p>
              Pratinjau dashboard — data tersimpan di server terpusat & otomatis mengupdate stok dan omzet.
            </p>
            <span className="text-[11px] text-slate-400 font-mono">
              Update: {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </>
      )}
    </div>
  );
};
