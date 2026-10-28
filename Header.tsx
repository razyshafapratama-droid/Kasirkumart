import React from 'react';
import { ShoppingCart, ShieldCheck, UserCheck, RefreshCw, Settings, Store, Sparkles } from 'lucide-react';
import { StoreSettings, UserAccount } from '../types';

interface HeaderProps {
  currentUser: UserAccount;
  storeSettings: StoreSettings;
  activeTab: 'kasir' | 'produk' | 'laporan' | 'riwayat';
  setActiveTab: (tab: 'kasir' | 'produk' | 'laporan' | 'riwayat') => void;
  onOpenRoleModal: () => void;
  onOpenSettingsModal: () => void;
  onResetDemo: () => void;
  serverOnline: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  storeSettings,
  activeTab,
  setActiveTab,
  onOpenRoleModal,
  onOpenSettingsModal,
  onResetDemo,
  serverOnline,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
      {/* Top Banner / Brand row matching Screenshot 1 & 2 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Logo & Brand title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/20 font-bold">
              <ShoppingCart className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-['Plus_Jakarta_Sans']">
                  {storeSettings.storeName || 'KasirKu'}
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {serverOnline ? 'Online-ready' : 'Mode Lokal'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Integrated Point of Sale System &bull; <span className="text-slate-300">{storeSettings.tagline}</span>
              </p>
            </div>
          </div>

          {/* Right Action Controls: User Profile & Settings */}
          <div className="flex items-center gap-2.5 self-end sm:self-center">
            {/* User switch button */}
            <button
              onClick={onOpenRoleModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-200 transition-colors shadow-sm"
              title="Ganti Peran Pengguna / Kasir"
            >
              <div className={`w-6 h-6 rounded-lg ${currentUser.avatarBg} flex items-center justify-center text-white text-[11px] font-bold`}>
                {currentUser.role === 'admin' ? (
                  <ShieldCheck className="w-3.5 h-3.5" />
                ) : (
                  <UserCheck className="w-3.5 h-3.5" />
                )}
              </div>
              <div className="text-left hidden xs:block">
                <span className="block font-semibold text-white leading-tight">
                  {currentUser.name}
                </span>
                <span className="block text-[10px] text-emerald-400 uppercase tracking-wider">
                  {currentUser.role === 'admin' ? 'Administrator' : 'Kasir Toko'}
                </span>
              </div>
              <span className="text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded ml-1">
                Ganti
              </span>
            </button>

            {/* Store Settings button */}
            <button
              onClick={onOpenSettingsModal}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Pengaturan Toko & Printer Struk"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Reset Demo Data button */}
            <button
              onClick={onResetDemo}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-amber-400 transition-colors"
              title="Reset Demo Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs matching Screenshot 2: [Kasir] [Produk] [Laporan] [Riwayat] */}
        <div className="flex items-center gap-2 pt-3 mt-3 border-t border-slate-800/80 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('kasir')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'kasir'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700/60'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Kasir
          </button>

          <button
            onClick={() => setActiveTab('produk')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'produk'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700/60'
            }`}
          >
            <Store className="w-4 h-4" />
            Produk & Stok
          </button>

          <button
            onClick={() => setActiveTab('laporan')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'laporan'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700/60'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Laporan Penjualan
          </button>

          <button
            onClick={() => setActiveTab('riwayat')}
            className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'riwayat'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 font-bold'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-750 hover:text-white border border-slate-700/60'
            }`}
          >
            <span>Riwayat Transaksi</span>
          </button>
        </div>
      </div>
    </header>
  );
};
