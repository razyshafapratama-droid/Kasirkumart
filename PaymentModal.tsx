import React, { useState, useEffect } from 'react';
import { X, Banknote, QrCode, Building2, CheckCircle2, AlertCircle, ArrowRight, Printer } from 'lucide-react';
import { PaymentMethod } from '../types';
import { formatRupiah } from '../utils/formatters';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  onCompletePayment: (paymentMethod: PaymentMethod, amountPaid: number, change: number) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  totalAmount,
  onCompletePayment,
}) => {
  const [method, setMethod] = useState<PaymentMethod>('TUNAI');
  const [cashGiven, setCashGiven] = useState<number>(0);
  const [customCashInput, setCustomCashInput] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Set default cash to exact amount when modal opens or total changes
  useEffect(() => {
    if (isOpen) {
      setMethod('TUNAI');
      setCashGiven(totalAmount);
      setCustomCashInput(String(totalAmount));
      setIsProcessing(false);
    }
  }, [isOpen, totalAmount]);

  if (!isOpen) return null;

  const currentCash = method === 'TUNAI' ? cashGiven : totalAmount;
  const change = Math.max(0, currentCash - totalAmount);
  const shortfall = Math.max(0, totalAmount - currentCash);
  const isPayable = method !== 'TUNAI' || currentCash >= totalAmount;

  // Preset quick cash buttons
  const quickCashOptions = [
    { label: 'Uang Pas', amount: totalAmount },
    { label: '10.000', amount: 10000 },
    { label: '20.000', amount: 20000 },
    { label: '50.000', amount: 50000 },
    { label: '100.000', amount: 100000 },
    { label: '200.000', amount: 200000 },
  ];

  const handleQuickCash = (amt: number) => {
    setCashGiven(amt);
    setCustomCashInput(String(amt));
  };

  const handleCustomCashChange = (val: string) => {
    setCustomCashInput(val);
    const num = parseInt(val.replace(/\D/g, ''), 10) || 0;
    setCashGiven(num);
  };

  const handleSubmit = () => {
    if (!isPayable) return;
    setIsProcessing(true);
    setTimeout(() => {
      onCompletePayment(method, currentCash, change);
      setIsProcessing(false);
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-white">Pembayaran Transaksi</h3>
            <p className="text-xs text-slate-400">Pilih metode bayar & terima uang pelanggan</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {/* Total Tagihan Banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Tagihan Belanja
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-1 font-['Plus_Jakarta_Sans']">
              {formatRupiah(totalAmount)}
            </div>
          </div>

          {/* Payment Method Tabs */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Metode Pembayaran
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMethod('TUNAI')}
                className={`py-3 px-3 rounded-xl border flex flex-col items-center gap-1 text-xs font-bold transition-all cursor-pointer ${
                  method === 'TUNAI'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/30'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Banknote className="w-5 h-5 text-emerald-600" />
                <span>Tunai (Cash)</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('QRIS')}
                className={`py-3 px-3 rounded-xl border flex flex-col items-center gap-1 text-xs font-bold transition-all cursor-pointer ${
                  method === 'QRIS'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/30'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <QrCode className="w-5 h-5 text-indigo-600" />
                <span>QRIS Instant</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod('TRANSFER')}
                className={`py-3 px-3 rounded-xl border flex flex-col items-center gap-1 text-xs font-bold transition-all cursor-pointer ${
                  method === 'TRANSFER'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/30'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>Transfer Bank</span>
              </button>
            </div>
          </div>

          {/* Method Content */}
          {method === 'TUNAI' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Quick Cash Buttons */}
              <div>
                <span className="block text-xs font-medium text-slate-600 mb-1.5">
                  Pilihan Uang Cepat:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {quickCashOptions.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickCash(opt.amount)}
                      className={`py-2 px-2.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        cashGiven === opt.amount
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                      }`}
                    >
                      {opt.label === 'Uang Pas' ? 'Uang Pas' : formatRupiah(opt.amount)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Cash Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Jumlah Uang Diterima (Rp)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                    Rp
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={customCashInput ? parseInt(customCashInput, 10).toLocaleString('id-ID') : ''}
                    onChange={(e) => handleCustomCashChange(e.target.value)}
                    placeholder="0"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-slate-200 text-slate-900 font-extrabold text-lg focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              {/* Kembalian / Kurang Status Display */}
              <div
                className={`p-3.5 rounded-xl border flex items-center justify-between ${
                  shortfall > 0
                    ? 'bg-rose-50 border-rose-200 text-rose-800'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  {shortfall > 0 ? (
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider block">
                      {shortfall > 0 ? 'Uang Masih Kurang' : 'Kembalian Pelanggan'}
                    </span>
                    <span className="text-xl font-black font-['Plus_Jakarta_Sans']">
                      {shortfall > 0 ? formatRupiah(shortfall) : formatRupiah(change)}
                    </span>
                  </div>
                </div>

                {change > 0 && (
                  <span className="text-xs font-bold bg-emerald-600 text-white px-2.5 py-1 rounded-full">
                    Kembalian Pas
                  </span>
                )}
              </div>
            </div>
          )}

          {method === 'QRIS' && (
            <div className="text-center p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 animate-in fade-in duration-150">
              <div className="inline-block p-3 bg-white rounded-xl shadow-xs border border-slate-200">
                {/* Simulated QRIS code visual */}
                <div className="w-36 h-36 bg-slate-900 rounded-lg p-2 flex flex-col items-center justify-center text-white relative">
                  <QrCode className="w-28 h-28 text-white" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400 absolute bottom-1">
                    QRIS RESMI
                  </span>
                </div>
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">KasirKu Mart &bull; QRIS Standar</p>
                <p className="text-xs text-slate-500">NMID: ID1020304050607</p>
                <p className="text-xs text-emerald-600 font-medium mt-1">
                  Mendukung GoPay, OVO, DANA, ShopeePay, BCA, Mandiri Mobile
                </p>
              </div>
              <div className="pt-2">
                <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-3 py-1 rounded-full">
                  Status: Siap Terima {formatRupiah(totalAmount)}
                </span>
              </div>
            </div>
          )}

          {method === 'TRANSFER' && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 animate-in fade-in duration-150 text-xs">
              <p className="font-bold text-slate-800 text-sm">Pilihan Rekening Toko:</p>
              <div className="space-y-2">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-blue-700 block">BCA (Bank Central Asia)</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">882-019-3341</span>
                    <span className="text-slate-500 block text-[11px]">a/n KasirKu Official</span>
                  </div>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-bold">
                    Aktif
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-amber-700 block">Bank Mandiri</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">137-00-1289410-2</span>
                    <span className="text-slate-500 block text-[11px]">a/n KasirKu Official</span>
                  </div>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-bold">
                    Aktif
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action Button: Selesaikan & Cetak Struk */}
          <button
            type="button"
            disabled={!isPayable || isProcessing}
            onClick={handleSubmit}
            className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
              !isPayable
                ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30 active:scale-[0.99]'
            }`}
          >
            <Printer className="w-5 h-5" />
            <span>
              {isProcessing ? 'Memproses Transaksi...' : 'Selesaikan Transaksi & Cetak Struk'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
