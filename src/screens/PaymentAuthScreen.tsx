import React, { useState } from 'react';
import { Header } from '../components/Header';
import { Merchant } from '../types';
import { RECENT_MERCHANTS } from '../data/mockData';

interface PaymentAuthScreenProps {
  onBack: () => void;
  selectedMerchant: Merchant;
  initialAmount?: number;
  onProceedToDial: (merchant: Merchant, amount: number) => void;
  onOpenDiagnostics: () => void;
}

export const PaymentAuthScreen: React.FC<PaymentAuthScreenProps> = ({
  onBack,
  selectedMerchant: initialMerchant,
  initialAmount = 120,
  onProceedToDial,
  onOpenDiagnostics
}) => {
  const [merchant, setMerchant] = useState<Merchant>(initialMerchant);
  const [upiInput, setUpiInput] = useState<string>(initialMerchant.upiId);
  const [amount, setAmount] = useState<number>(initialAmount);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUpiInput(text);
        setMerchant((prev) => ({
          ...prev,
          name: text.split('@')[0].toUpperCase(),
          upiId: text
        }));
      }
    } catch {
      const fallback = 'sharma.kirana@okhdfcbank';
      setUpiInput(fallback);
    }
  };

  const handleSelectContact = (m: Merchant) => {
    setMerchant(m);
    setUpiInput(m.upiId);
    if (m.suggestedAmount) {
      setAmount(m.suggestedAmount);
    }
  };

  const handleContinue = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onProceedToDial(merchant, amount);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased">
      <Header
        title="Payment Authorization"
        showBack
        onBack={onBack}
        badgeType="offline"
        onProfileClick={onOpenDiagnostics}
      />

      <main className="flex-1 w-full max-w-lg mx-auto px-4 pt-20 pb-28 flex flex-col gap-4">
        {/* Offline Protocol Banner */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#eaedff] rounded-2xl border border-[#dae2fd] shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006398] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#006398]" />
            </span>
            <div className="flex flex-col min-w-0">
              <p className="text-[11px] font-bold text-[#131b2e] uppercase tracking-wide truncate">
                Offline Ready • Direct SIM 1 *99# routing active
              </p>
              <span className="text-[12px] text-[#434655] truncate">
                Zero internet fail-safe payment channel enabled
              </span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-xl bg-[#e2e7ff] flex items-center justify-center text-[#006398] flex-shrink-0">
            <span className="material-symbols-outlined text-[18px]">sim_card_download</span>
          </div>
        </div>

        {/* Payment Destination Input Box */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="upi-input" className="text-[14px] font-semibold text-[#131b2e] px-1">
            Pay to UPI ID or Mobile
          </label>
          <div className="relative flex items-center bg-white border border-[#c3c6d7] rounded-2xl shadow-sm p-1.5 focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/20 transition-all">
            <div className="w-10 h-10 flex items-center justify-center text-[#004ac6] flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">alternate_email</span>
            </div>
            <input
              id="upi-input"
              type="text"
              value={upiInput}
              onChange={(e) => {
                setUpiInput(e.target.value);
                setMerchant((prev) => ({
                  ...prev,
                  upiId: e.target.value,
                  name: e.target.value || 'Payee'
                }));
              }}
              placeholder="Enter UPI ID, Phone Number or Name"
              className="w-full bg-transparent text-[#131b2e] font-semibold text-[15px] focus:outline-none placeholder:text-[#737686] px-1"
            />
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                type="button"
                onClick={handlePaste}
                title="Paste from clipboard"
                className="px-2.5 py-1.5 bg-[#f2f3ff] text-[#131b2e] hover:bg-[#eaedff] rounded-lg text-[12px] font-semibold flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">content_paste</span>
                <span>Paste</span>
              </button>
              <button
                type="button"
                title="Open contacts"
                onClick={() => handleSelectContact(RECENT_MERCHANTS[1])}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#004ac6] hover:bg-[#f2f3ff] active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[22px]">contacts</span>
              </button>
            </div>
          </div>
        </div>

        {/* Verified Payee Preview Card */}
        <div className="relative bg-white border border-[#eaedff] rounded-2xl shadow-sm overflow-hidden p-4 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-12 h-12 rounded-2xl bg-[#2563eb] text-white font-bold text-[18px] flex items-center justify-center flex-shrink-0 shadow-sm">
                <span>{merchant.initials || 'SK'}</span>
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm">
                  <span
                    className="material-symbols-outlined text-[#004ac6] text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
              </div>
              <div className="flex flex-col min-w-0">
                <h2 className="text-[16px] font-bold text-[#131b2e] truncate">{merchant.name}</h2>
                <p className="text-[12px] text-[#434655] font-mono truncate">{merchant.upiId}</p>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[#004ac6] text-[11px] font-bold flex-shrink-0 flex items-center gap-1">
              <span
                className="material-symbols-outlined text-[13px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              Verified
            </span>
          </div>

          <div className="bg-[#f2f3ff] rounded-xl p-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#434655] min-w-0">
              <span className="material-symbols-outlined text-[18px] text-[#005b7c]">history</span>
              <span className="text-[12px] truncate">
                {merchant.lastPaidText || 'Last paid ₹80 yesterday • Grocery'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setAmount(80)}
              className="text-[12px] text-[#004ac6] font-bold cursor-pointer hover:underline"
            >
              Repeat
            </button>
          </div>
        </div>

        {/* Amount Input Box & Presets */}
        <div className="bg-white border border-[#eaedff] rounded-2xl p-4 shadow-sm flex flex-col gap-2">
          <label className="text-[13px] font-semibold text-[#434655]">Enter Amount to Pay</label>
          <div className="flex items-center gap-2 bg-[#f2f3ff] rounded-xl px-3 py-2">
            <span className="text-[28px] font-extrabold text-[#004ac6]">₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="bg-transparent text-[32px] font-extrabold tracking-tight text-[#131b2e] w-full focus:outline-none"
              placeholder="0"
            />
          </div>

          {/* Quick Amount Chips */}
          <div className="flex items-center gap-2 pt-1 overflow-x-auto no-scrollbar">
            {[50, 80, 120, 150, 200, 500].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setAmount(amt)}
                className={`px-3 py-1 rounded-lg text-[12px] font-semibold transition-colors flex-shrink-0 ${
                  amount === amt
                    ? 'bg-[#004ac6] text-white shadow-sm'
                    : 'bg-[#eaedff] text-[#131b2e] hover:bg-[#dae2fd]'
                }`}
              >
                +₹{amt}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Pay Recents and Frequent Contacts Section */}
        <div className="flex flex-col gap-2 mt-1">
          <div className="flex items-center justify-between px-1">
            <span className="text-[14px] font-bold text-[#131b2e]">
              Recent & Frequent UPI Contacts
            </span>
            <button type="button" className="text-[12px] font-bold text-[#004ac6] hover:underline">
              View All
            </button>
          </div>

          <div className="bg-white border border-[#eaedff] rounded-2xl shadow-sm overflow-hidden flex flex-col divide-y divide-[#eaedff]">
            {RECENT_MERCHANTS.slice(1, 5).map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleSelectContact(contact)}
                className="flex items-center justify-between p-3.5 hover:bg-[#f2f3ff] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#e2e7ff] text-[#004ac6] text-[15px] font-bold flex items-center justify-center flex-shrink-0">
                    {contact.initials}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[14px] font-semibold text-[#131b2e] truncate">
                        {contact.name}
                      </span>
                      {contact.category.includes('Friend') && (
                        <span className="text-[10px] font-bold text-[#005b7c] px-1.5 py-0.2 rounded bg-[#c4e7ff]">
                          Friend
                        </span>
                      )}
                    </div>
                    <span className="text-[12px] text-[#434655] truncate font-mono">
                      {contact.upiId}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectContact(contact);
                  }}
                  className="h-8 px-3 rounded-lg bg-[#eaedff] text-[#004ac6] text-[12px] font-bold hover:bg-[#004ac6] hover:text-white transition-colors flex items-center gap-1 flex-shrink-0"
                >
                  <span>Pay</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security Micro-Callout */}
        <div className="flex items-center justify-center gap-2 py-1 text-[#434655]">
          <span
            className="material-symbols-outlined text-[16px] text-[#005b7c]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            security
          </span>
          <span className="text-[12px]">Secured by NPCI 256-bit Offline Tokenization</span>
        </div>
      </main>

      {/* Sticky Bottom Thumb Sweep Action */}
      <div className="fixed bottom-0 inset-x-0 p-4 bg-[#faf8ff]/95 backdrop-blur-md border-t border-[#eaedff] z-40 max-w-lg mx-auto">
        <button
          type="button"
          onClick={handleContinue}
          disabled={isVerifying || amount <= 0}
          className="w-full h-13 rounded-xl bg-[#2563eb] text-white text-[16px] font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-[#004ac6] active:scale-[0.98] transition-all"
        >
          {isVerifying ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">
                progress_activity
              </span>
              <span>Verifying Offline Rail...</span>
            </>
          ) : (
            <>
              <span>Authorize ₹{amount}.00 via *99#</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
