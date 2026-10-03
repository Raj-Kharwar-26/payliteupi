import React, { useState } from 'react';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { BottomTabType, ScreenType, TransactionRecord } from '../types';
import { INITIAL_ACCOUNTS, INITIAL_TRANSACTIONS } from '../data/mockData';
import { UssdModal } from '../components/UssdModal';

interface ManageWalletScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenVoiceCall: () => void;
  onOpenDiagnostics: () => void;
}

export const ManageWalletScreen: React.FC<ManageWalletScreenProps> = ({
  onBack,
  onNavigate,
  onOpenVoiceCall,
  onOpenDiagnostics
}) => {
  const [isSbiMasked, setIsSbiMasked] = useState(false);
  const [deviceReserve, setDeviceReserve] = useState(2450.0);
  const [isTopupModalOpen, setIsTopupModalOpen] = useState(false);
  const [isLedgerLogOpen, setIsLedgerLogOpen] = useState(false);
  const [isUssdModalOpen, setIsUssdModalOpen] = useState(false);
  const [ussdSessionCode, setUssdSessionCode] = useState('*99*1*1#');
  const [ussdTitle, setUssdTitle] = useState('SIM 1 USSD Query');
  const [transactions, setTransactions] = useState<TransactionRecord[]>(INITIAL_TRANSACTIONS);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleQuerySbi = () => {
    setUssdTitle('State Bank of India USSD Query');
    setUssdSessionCode('*99*1*1#');
    setIsUssdModalOpen(true);
  };

  const handleDialUssdPin = () => {
    setUssdTitle('NPCI *99# UPI PIN Manager');
    setUssdSessionCode('*99*7#');
    setIsUssdModalOpen(true);
  };

  const handleTopup = (amt: number) => {
    setDeviceReserve((prev) => Math.min(prev + amt, 5000));
    setIsTopupModalOpen(false);
    showToast(`Added ₹${amt} to On-Device Reserve.`);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased">
      <Header
        title="Manage Offline Wallet"
        showBack
        onBack={onBack}
        badgeType="offline"
        onProfileClick={onOpenDiagnostics}
      />

      <main className="flex-1 w-full max-w-lg mx-auto pt-16 pb-24 px-4 flex flex-col gap-4">
        {/* Offline Network Banner */}
        <div className="mt-3 bg-[#e2e7ff] rounded-2xl p-4 flex items-center justify-between shadow-sm border border-[#dae2fd]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#004ac6] flex items-center justify-center text-white flex-shrink-0">
              <span className="material-symbols-outlined text-[18px]">satellite_alt</span>
            </div>
            <div className="min-w-0">
              <p className="text-[14px] font-bold text-[#131b2e] truncate">
                Offline Telephony Banking
              </p>
              <p className="text-[12px] text-[#434655] truncate">
                Encrypted USSD (*99#) & IVR Relay Active
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#dae2fd] text-[#004ac6] text-[11px] font-bold uppercase tracking-wider">
            Ready
          </span>
        </div>

        {/* Primary Account: State Bank of India */}
        <section className="bg-[#004ac6] text-white rounded-2xl p-4 flex flex-col gap-3 shadow-md relative overflow-hidden">
          {/* Ambient watermark shape */}
          <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-[#2563eb]/40 pointer-events-none" />

          {/* Top Row: Badge & Branding */}
          <div className="flex items-start justify-between gap-2 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#004ac6] flex items-center justify-center text-[18px] font-bold shadow-sm">
                SBI
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-[16px] font-bold text-white">State Bank of India</h2>
                  <span
                    className="material-symbols-outlined text-[16px] text-[#7bd0ff]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
                <p className="text-[12px] text-[#dbe1ff]">Savings A/C •••• 4219</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#2563eb] text-[#eeefff] text-[11px] font-bold whitespace-nowrap">
              Primary UPI
            </span>
          </div>

          {/* Zero-data badge */}
          <div className="inline-flex items-center gap-1.5 self-start px-2 py-0.5 rounded bg-white/10 text-[#dbe1ff] text-[11px] relative z-10 font-semibold">
            <span className="material-symbols-outlined text-[14px]">cell_tower</span>
            <span>Zero Data Query Active</span>
          </div>

          {/* Balance Card Module */}
          <div className="bg-white/10 rounded-xl p-3.5 flex flex-col gap-1 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[#dbe1ff] font-semibold tracking-wide">
                Available Balance
              </span>
              <button
                type="button"
                aria-label="Toggle SBI Balance Visibility"
                onClick={() => setIsSbiMasked(!isSbiMasked)}
                className="p-1 text-[#dbe1ff] hover:text-white transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isSbiMasked ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            <div className="flex items-baseline justify-between pt-0.5">
              <span className="text-[32px] font-extrabold tracking-tight text-white font-mono">
                {isSbiMasked ? '₹ ••••••••' : '₹14,820.50'}
              </span>
              <span className="text-[11px] text-[#7bd0ff] font-medium">Offline Sync 2m ago</span>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleQuerySbi}
            className="w-full h-11 rounded-xl bg-white text-[#004ac6] text-[13px] font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-sm relative z-10"
          >
            <span className="material-symbols-outlined text-[18px]">lock</span>
            <span>Query Balance via SIM 1 (Free)</span>
          </button>
        </section>

        {/* Secondary Account: HDFC Bank */}
        <section className="bg-white border border-[#eaedff] rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#006398] flex items-center justify-center text-[16px] font-bold">
                HDFC
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-[#131b2e]">HDFC Bank</h3>
                <p className="text-[12px] text-[#434655]">Savings A/C •••• 8821</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#e2e7ff] text-[#434655] text-[11px] font-medium">
              Jio SIM 2 Linked
            </span>
          </div>

          <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-[#434655] uppercase tracking-wider font-bold">
                Account State
              </p>
              <p className="text-[13px] text-[#131b2e] font-semibold mt-0.5">
                UPI 123PAY Encrypted Ready
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#dae2fd] flex items-center justify-center text-[#004ac6]">
              <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenVoiceCall}
            className="w-full h-11 rounded-xl bg-[#e2e7ff] text-[#131b2e] text-[13px] font-bold flex items-center justify-center gap-2 active:bg-[#dae2fd] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px] text-[#004ac6]">call</span>
            <span>Check Balance via 123PAY Call</span>
          </button>
        </section>

        {/* PayLite Device Ledger */}
        <section className="bg-white border border-[#eaedff] rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#004ac6]">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  wallet
                </span>
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-[#131b2e]">PayLite Device Ledger</h3>
                <p className="text-[12px] text-[#434655]">Local Secure Hardware Vault</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#005b7c] text-[11px] font-bold">
              Offline Cash
            </span>
          </div>

          {/* Limit progress bar */}
          <div className="flex flex-col gap-1 pt-1">
            <div className="flex justify-between items-baseline">
              <span className="text-[20px] font-extrabold text-[#131b2e] font-mono">
                ₹{deviceReserve.toFixed(2)}
              </span>
              <span className="text-[11px] text-[#434655]">Max Reserve Limit: ₹5,000.00</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#eaedff] overflow-hidden">
              <div
                className="h-full bg-[#004ac6] rounded-full transition-all duration-300"
                style={{ width: `${(deviceReserve / 5000) * 100}%` }}
              />
            </div>
            <p className="text-[12px] text-[#434655] pt-0.5">
              Usable for soundbox & offline tap payments without SIM ping.
            </p>
          </div>

          <div className="flex items-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => setIsTopupModalOpen(true)}
              className="flex-1 h-11 rounded-xl bg-[#2563eb] text-white text-[13px] font-bold flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">add_circle</span>
              <span>Top-up Reserve</span>
            </button>

            <button
              type="button"
              onClick={() => setIsLedgerLogOpen(!isLedgerLogOpen)}
              className={`h-11 px-4 rounded-xl text-[13px] font-semibold flex items-center justify-center transition-colors ${
                isLedgerLogOpen ? 'bg-[#dae2fd] text-[#004ac6]' : 'bg-[#eaedff] text-[#434655]'
              }`}
            >
              Ledger Log
            </button>
          </div>

          {/* Expandable Ledger Log View */}
          {isLedgerLogOpen && (
            <div className="mt-2 pt-2 border-t border-[#eaedff] flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#434655] uppercase">
                <span>Recent Offline Ledger Debits</span>
                <span>Audit Proof</span>
              </div>
              <div className="flex flex-col divide-y divide-[#f2f3ff]">
                {transactions.map((tx) => (
                  <div key={tx.id} className="py-2 flex items-center justify-between text-[12px]">
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-[#131b2e] truncate">{tx.merchantName}</span>
                      <span className="text-[11px] text-[#737686]">{tx.timestamp}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#ba1a1a] font-mono">
                        -₹{tx.amount.toFixed(2)}
                      </span>
                      <p className="text-[10px] text-[#005b7c] font-medium">{tx.channel}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* UPI Security & Telecom Binding */}
        <section className="bg-white border border-[#eaedff] rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
          <h3 className="text-[13px] text-[#131b2e] uppercase tracking-wider font-bold">
            UPI Security & Telecom Binding
          </h3>

          <div className="flex flex-col gap-2">
            {/* SIM Row */}
            <div className="flex items-center justify-between py-1 border-b border-[#eaedff]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#004ac6] text-[20px]">sim_card</span>
                <div>
                  <p className="text-[13px] font-semibold text-[#131b2e]">Primary SIM Binding</p>
                  <p className="text-[11px] text-[#434655]">Airtel 4G • Slot 1</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#eaedff] text-[#434655] text-[11px] font-bold">
                Active
              </span>
            </div>

            {/* NPCI Row */}
            <div className="flex items-center justify-between py-1 border-b border-[#eaedff]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#005b7c] text-[20px]">
                  verified_user
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-[#131b2e]">NPCI UPI Binding</p>
                  <p className="text-[11px] text-[#434655]">VPA Device Signature Validated</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#eaedff] text-[#005b7c] text-[11px] font-bold">
                Bound
              </span>
            </div>

            {/* USSD PIN Management Action */}
            <div className="mt-1 bg-[#f2f3ff] rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#434655] text-[20px]">password</span>
                <div>
                  <p className="text-[13px] font-semibold text-[#131b2e]">UPI PIN Management</p>
                  <p className="text-[11px] text-[#434655]">Dial *99# on handset keypad</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDialUssdPin}
                className="px-3 py-1.5 rounded-lg bg-[#dae2fd] text-[#004ac6] text-[11px] font-bold tracking-wide active:scale-95 transition-transform"
              >
                Dial *99#
              </button>
            </div>
          </div>
        </section>

        {/* Add Another Bank Account */}
        <button
          type="button"
          onClick={() => showToast('Opening NPCI Bank Registry across telecom switches...')}
          className="w-full h-12 rounded-xl bg-[#eaedff] text-[#004ac6] text-[13px] font-bold flex items-center justify-center gap-2 active:bg-[#dae2fd] transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-[20px]">account_balance</span>
          <span>Add Another Bank Account</span>
        </button>
      </main>

      {/* Topup Reserve Modal */}
      {isTopupModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#283044]/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xs bg-white rounded-2xl p-5 flex flex-col gap-3 shadow-2xl border border-[#eaedff]">
            <h4 className="font-bold text-[16px] text-[#131b2e]">Top-up Device Reserve</h4>
            <p className="text-[12px] text-[#434655]">
              Select amount to lock into your on-chip cryptographic vault:
            </p>

            <div className="grid grid-cols-2 gap-2 my-2">
              <button
                type="button"
                onClick={() => handleTopup(500)}
                className="h-11 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#004ac6] font-bold text-[14px]"
              >
                +₹500
              </button>
              <button
                type="button"
                onClick={() => handleTopup(1000)}
                className="h-11 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#004ac6] font-bold text-[14px]"
              >
                +₹1,000
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsTopupModalOpen(false)}
              className="w-full h-10 rounded-xl bg-[#eaedff] text-[#434655] font-semibold text-[12px]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* USSD Modal */}
      <UssdModal
        isOpen={isUssdModalOpen}
        onClose={() => setIsUssdModalOpen(false)}
        title={ussdTitle}
        sessionCode={ussdSessionCode}
        onConfirm={() => setIsUssdModalOpen(false)}
      />

      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-20 inset-x-4 max-w-sm mx-auto bg-[#283044] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 z-50">
          <span className="material-symbols-outlined text-[20px] text-[#5bb8fe]">info</span>
          <span className="text-[12px] font-medium">{toastMsg}</span>
        </div>
      )}

      {/* Bottom Nav */}
      <BottomNav
        activeTab="home"
        onTabChange={(tab: BottomTabType) => {
          if (tab === 'services') onNavigate('services');
          else if (tab === 'scan') onNavigate('scan');
          else if (tab === 'passbook') onNavigate('wallet');
        }}
      />
    </div>
  );
};
