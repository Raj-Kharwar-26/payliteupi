import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Merchant } from '../types';
import { ASSETS } from '../data/mockData';
import { UssdModal } from '../components/UssdModal';

interface PaymentOutcomeScreenProps {
  onBack: () => void;
  merchant: Merchant;
  amount: number;
  onSuccessViewReceipt: () => void;
  onSavePending: () => void;
  onRetry: () => void;
  onOpenDiagnostics: () => void;
}

export const PaymentOutcomeScreen: React.FC<PaymentOutcomeScreenProps> = ({
  onBack,
  merchant,
  amount,
  onSuccessViewReceipt,
  onSavePending,
  onRetry,
  onOpenDiagnostics
}) => {
  const [selectedOutcome, setSelectedOutcome] = useState<'success' | 'pending' | 'failed'>('success');
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (text: string) => {
    setToastMsg(text);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAction = () => {
    if (selectedOutcome === 'success') {
      onSuccessViewReceipt();
    } else if (selectedOutcome === 'pending') {
      showToast('Saved as Pending to Offline Ledger.');
      setTimeout(() => {
        onSavePending();
      }, 700);
    } else {
      showToast('Session cancelled. Ready to retry.');
      setTimeout(() => {
        onRetry();
      }, 700);
    }
  };

  const handlePingMerchant = () => {
    showToast(`${merchant.name}: Alert soundbox pinged successfully.`);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased">
      <Header
        title="Payment Authorize"
        showBack
        onBack={onBack}
        badgeType="offline-safe"
        onProfileClick={onOpenDiagnostics}
      />

      <main className="flex-1 w-full max-w-lg mx-auto px-4 pt-20 pb-12 flex flex-col gap-3">
        {/* Status Backdrop Context / Micro-Receipt */}
        <div className="w-full bg-[#f2f3ff] border border-[#eaedff] rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#dae2fd] flex items-center justify-center text-[#004ac6]">
                <span className="material-symbols-outlined text-[20px]">account_balance</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-semibold text-[#434655] uppercase tracking-wider">
                  Session Ref: #USSD-9482
                </span>
                <span className="text-[14px] font-bold text-[#131b2e] truncate">
                  State Bank of India
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[20px] font-extrabold text-[#004ac6]">
                ₹{amount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Primary Verification Card Container */}
        <div className="w-full bg-white border border-[#eaedff] rounded-2xl shadow-lg p-4 flex flex-col gap-4">
          {/* Header */}
          <div className="flex flex-col gap-1 text-left">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 py-0.5 px-2.5 rounded-full bg-[#cce5ff] text-[#001d31] text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[14px]">cell_tower</span>
                Telecom Session Closed
              </span>
              <span className="text-[12px] text-[#434655] font-medium font-mono">10:42 AM</span>
            </div>

            <h2 className="text-[20px] font-bold text-[#131b2e] tracking-tight mt-1">
              Did your payment of ₹{amount} go through?
            </h2>
            <p className="text-[13px] text-[#434655] leading-relaxed">
              The telecom session with State Bank of India has concluded. Please select your outcome:
            </p>
          </div>

          {/* 3 Outcome Options */}
          <div className="flex flex-col gap-2.5">
            {/* Option 1: Success */}
            <button
              type="button"
              onClick={() => setSelectedOutcome('success')}
              className={`w-full text-left p-3.5 rounded-2xl transition-all flex flex-col gap-1 shadow-sm border ${
                selectedOutcome === 'success'
                  ? 'bg-[#dae2fd] border-[#004ac6] ring-2 ring-[#004ac6]/20'
                  : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#2563eb] text-white flex items-center justify-center shadow-sm">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#131b2e]">
                      Yes, Payment Succeeded
                    </span>
                    <span className="text-[11px] font-bold text-[#004ac6]">Immediate Settlement</span>
                  </div>
                </div>

                <span className="py-0.5 px-2 rounded-full bg-[#dbe1ff] text-[#00174b] text-[11px] font-bold tracking-wide">
                  Recommended
                </span>
              </div>
              <p className="text-[12px] text-[#434655] pl-12 leading-relaxed">
                Money debited and operator confirmation received. Generate verified digital receipt.
              </p>
            </button>

            {/* Option 2: Pending */}
            <button
              type="button"
              onClick={() => setSelectedOutcome('pending')}
              className={`w-full text-left p-3.5 rounded-2xl transition-all flex flex-col gap-1 shadow-sm border ${
                selectedOutcome === 'pending'
                  ? 'bg-[#dae2fd] border-[#006398] ring-2 ring-[#006398]/20'
                  : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#cce5ff] text-[#001d31] flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">sms</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#131b2e]">
                      Awaiting Bank SMS / Not Sure
                    </span>
                    <span className="text-[11px] font-bold text-[#006398]">Offline Auto-Sync</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#737686] text-[20px]">
                  schedule
                </span>
              </div>
              <p className="text-[12px] text-[#434655] pl-12 leading-relaxed">
                Save to offline ledger as Pending. PayLite will auto-reconcile when operator SMS
                arrives.
              </p>
            </button>

            {/* Option 3: Failed */}
            <button
              type="button"
              onClick={() => setSelectedOutcome('failed')}
              className={`w-full text-left p-3.5 rounded-2xl transition-all flex flex-col gap-1 shadow-sm border ${
                selectedOutcome === 'failed'
                  ? 'bg-[#dae2fd] border-[#ba1a1a] ring-2 ring-[#ba1a1a]/20'
                  : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#dae2fd] text-[#131b2e] flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">cancel</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-[#131b2e]">No, Payment Failed</span>
                    <span className="text-[11px] font-medium text-[#434655]">
                      Session Terminated
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[#737686] text-[20px]">block</span>
              </div>
              <p className="text-[12px] text-[#434655] pl-12 leading-relaxed">
                Session timed out or cancelled. No funds debited from your bank account.
              </p>
            </button>
          </div>

          {/* Action Button */}
          <div className="pt-1 flex flex-col">
            <button
              type="button"
              onClick={handleAction}
              className={`w-full h-12 text-white font-bold text-[13px] rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all ${
                selectedOutcome === 'success'
                  ? 'bg-[#004ac6] hover:bg-[#003ea8]'
                  : selectedOutcome === 'pending'
                  ? 'bg-[#006398] hover:bg-[#004c69]'
                  : 'bg-[#434655] hover:bg-[#283044]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>
                {selectedOutcome === 'success'
                  ? 'Confirm Success & View Receipt'
                  : selectedOutcome === 'pending'
                  ? 'Save as Pending to Ledger'
                  : 'Mark as Failed & Retry'}
              </span>
            </button>
          </div>

          {/* Context & Merchant Visual Cue */}
          <div className="bg-[#f2f3ff] rounded-xl p-2.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={ASSETS.anandKirana}
                alt={merchant.name}
                className="w-9 h-9 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-bold text-[#131b2e] truncate">
                  {merchant.name}
                </span>
                <span className="text-[11px] text-[#434655] truncate font-mono">
                  ID: 98490-PAY-2
                </span>
              </div>
            </div>
            <span className="text-[11px] text-[#005b7c] font-bold flex-shrink-0">Vendor Nearby</span>
          </div>

          {/* Secondary Emergency Queries */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsBalanceModalOpen(true)}
              className="h-10 px-3 rounded-xl bg-[#eaedff] hover:bg-[#dae2fd] transition-colors flex items-center justify-center gap-1.5 text-[#131b2e]"
            >
              <span className="material-symbols-outlined text-[16px] text-[#004ac6]">dialpad</span>
              <span className="text-[11px] font-bold truncate">Check *99# Balance</span>
            </button>

            <button
              type="button"
              onClick={handlePingMerchant}
              className="h-10 px-3 rounded-xl bg-[#eaedff] hover:bg-[#dae2fd] transition-colors flex items-center justify-center gap-1.5 text-[#131b2e]"
            >
              <span className="material-symbols-outlined text-[16px] text-[#006398]">
                support_agent
              </span>
              <span className="text-[11px] font-bold truncate">Contact Merchant</span>
            </button>
          </div>
        </div>
      </main>

      {/* Balance Query Modal */}
      <UssdModal
        isOpen={isBalanceModalOpen}
        onClose={() => setIsBalanceModalOpen(false)}
        title="Check Balance via *99#"
        sessionCode="*99*1*1#"
        promptText="State Bank of India Savings A/C •••• 4219"
        confirmBtnText="Done"
        onConfirm={() => setIsBalanceModalOpen(false)}
      />

      {/* Feedback Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 inset-x-4 max-w-sm mx-auto bg-[#283044] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 z-50 animate-fade-in">
          <span className="material-symbols-outlined text-[20px] text-[#5bb8fe]">info</span>
          <span className="text-[12px] font-medium">{toastMsg}</span>
        </div>
      )}
    </div>
  );
};
