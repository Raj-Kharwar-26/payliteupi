import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Merchant } from '../types';
import { UssdModal } from '../components/UssdModal';

interface UssdRailScreenProps {
  onBack: () => void;
  merchant: Merchant;
  amount: number;
  onProceedToOutcome: () => void;
  onSwitchToVoice: () => void;
  onOpenDiagnostics: () => void;
}

export const UssdRailScreen: React.FC<UssdRailScreenProps> = ({
  onBack,
  merchant,
  amount,
  onProceedToOutcome,
  onSwitchToVoice,
  onOpenDiagnostics
}) => {
  const [isUssdPromptOpen, setIsUssdPromptOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Automatically trigger the simulated telecom USSD prompt after 1.8 seconds to mimic genuine carrier handoff
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsUssdPromptOpen(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleUssdPinSubmit = (_pin: string) => {
    setIsUssdPromptOpen(false);
    triggerToast('Carrier response received. Closing telecom session...');
    setTimeout(() => {
      onProceedToOutcome();
    }, 800);
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

      <main className="flex-1 w-full max-w-lg mx-auto px-4 pt-20 pb-12 flex flex-col gap-4">
        {/* Connection Status Radar / Pulsing Indicator */}
        <div className="bg-[#eaedff] border border-[#dae2fd] rounded-2xl p-4 shadow-sm relative overflow-hidden">
          <div className="flex items-start gap-4 relative z-10">
            <div className="relative flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#004ac6] text-white">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#004ac6] opacity-30 animate-ping" />
              <span className="material-symbols-outlined text-[26px]">cell_tower</span>
            </div>

            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#006398] animate-pulse" />
                <span className="text-[11px] font-bold text-[#006398] uppercase tracking-wider">
                  GSM Banking Rail Active
                </span>
              </div>
              <p className="text-[14px] font-medium text-[#131b2e] truncate">
                SIM 1 (Airtel) dialing <span className="font-mono font-bold text-[#004ac6]">*99#</span>...
              </p>
              <p className="text-[12px] text-[#434655] mt-0.5">Encrypted telecom tunnel handoff</p>
            </div>
          </div>

          {/* Waveform & Encryption Banner */}
          <div className="mt-4 pt-2 flex items-center justify-between border-t border-[#dae2fd]">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-3 bg-[#004ac6] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-4 bg-[#004ac6] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-5 bg-[#004ac6] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="w-1.5 h-3 bg-[#004ac6] rounded-full animate-bounce" style={{ animationDelay: '450ms' }} />
            </div>
            <div className="flex items-center gap-1 text-[#434655]">
              <span className="material-symbols-outlined text-[16px] text-[#005b7c]">lock</span>
              <span className="text-[11px] font-semibold">Hardware Encrypted Session</span>
            </div>
          </div>
        </div>

        {/* Amount Being Authorized Banner */}
        <div className="bg-white border border-[#eaedff] rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-[13px] font-semibold text-[#434655]">Transferring to</span>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-7 h-7 rounded-full bg-[#e2e7ff] text-[#004ac6] font-bold text-[12px] flex items-center justify-center">
              {merchant.initials || 'RK'}
            </div>
            <span className="text-[16px] font-bold text-[#131b2e]">{merchant.name}</span>
          </div>

          <div className="mt-2 text-[#004ac6] flex items-baseline justify-center">
            <span className="text-[36px] font-extrabold tracking-tight">₹ {amount}.00</span>
          </div>

          <div className="mt-1 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#434655] text-[11px] font-mono">
            <span className="material-symbols-outlined text-[14px]">receipt_long</span>
            Ref: NPCI-99-84729
          </div>
        </div>

        {/* Numbered Copilot Guidance Checklist */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-[13px] font-bold text-[#131b2e]">What happens next</span>
            <span className="text-[12px] text-[#434655]">Step-by-step</span>
          </div>

          {/* Step 1 */}
          <div className="bg-white border border-[#eaedff] rounded-2xl p-3.5 shadow-sm flex gap-3 items-start">
            <div className="w-7 h-7 rounded-full bg-[#dbe1ff] text-[#00174b] flex items-center justify-center text-[13px] font-bold flex-shrink-0">
              1
            </div>
            <div className="flex flex-col min-w-0">
              <h2 className="text-[14px] font-bold text-[#131b2e]">Bank dialog prompt</h2>
              <p className="text-[12px] text-[#434655] mt-0.5 leading-snug">
                A native system prompt will appear on your phone screen in 2–5 seconds.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-[#eaedff] rounded-2xl p-3.5 shadow-sm flex gap-3 items-start">
            <div className="w-7 h-7 rounded-full bg-[#dbe1ff] text-[#00174b] flex items-center justify-center text-[13px] font-bold flex-shrink-0">
              2
            </div>
            <div className="flex flex-col min-w-0">
              <h2 className="text-[14px] font-bold text-[#131b2e]">Verify & Enter UPI PIN</h2>
              <p className="text-[12px] text-[#434655] mt-0.5 leading-snug">
                Confirm amount is <span className="font-bold text-[#131b2e]">₹{amount}</span> and
                input your regular 4 or 6-digit Bank PIN.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-[#eaedff] rounded-2xl p-3.5 shadow-sm flex gap-3 items-start">
            <div className="w-7 h-7 rounded-full bg-[#dbe1ff] text-[#00174b] flex items-center justify-center text-[13px] font-bold flex-shrink-0">
              3
            </div>
            <div className="flex flex-col min-w-0">
              <h2 className="text-[14px] font-bold text-[#131b2e]">Execute Transfer</h2>
              <p className="text-[12px] text-[#434655] mt-0.5 leading-snug">
                Tap <strong className="text-[#131b2e]">Send</strong> or{' '}
                <strong className="text-[#131b2e]">Submit</strong> on the dialog to complete payment
                instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Bank Safety Card */}
        <div className="bg-[#f2f3ff] border border-[#dae2fd] rounded-2xl p-3.5 shadow-sm flex gap-3 items-start">
          <div className="w-7 h-7 rounded-full bg-[#5bb8fe] text-[#00476e] flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[18px]">verified_user</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-bold text-[#00476e]">Zero-Knowledge Guarantee</span>
            <p className="text-[12px] text-[#434655] mt-0.5 leading-normal">
              PayLite never intercepts or sees your secret PIN. Entry happens exclusively in your
              telecom provider's isolated secure dialog box.
            </p>
          </div>
        </div>

        {/* Action Controls / Fallback Buttons */}
        <div className="flex flex-col gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => setIsUssdPromptOpen(true)}
            className="w-full h-12 rounded-xl bg-[#004ac6] text-white text-[13px] font-bold flex items-center justify-center gap-2 active:opacity-90 shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">dialpad</span>
            <span>Open System USSD Prompt</span>
          </button>

          <button
            type="button"
            onClick={onSwitchToVoice}
            className="w-full h-12 rounded-xl bg-[#e2e7ff] text-[#131b2e] text-[13px] font-bold flex items-center justify-center gap-2 active:bg-[#dae2fd] shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] text-[#005b7c]">call</span>
            <span>Switch to 123PAY Voice Call</span>
          </button>

          <p className="text-[11px] text-center text-[#737686]">
            Automatic voice rail handover available if USSD session times out
          </p>
        </div>
      </main>

      {/* Simulated System USSD Prompt Overlay */}
      <UssdModal
        isOpen={isUssdPromptOpen}
        onClose={() => setIsUssdPromptOpen(false)}
        title="State Bank of India Telecom Rail (*99#)"
        sessionCode={`*99*1*${amount}#`}
        promptText={`Payment of ₹${amount}.00 to ${merchant.name}`}
        isInputMode={true}
        confirmBtnText="Send (Submit PIN)"
        onConfirm={handleUssdPinSubmit}
      />

      {/* Floating Status Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 inset-x-4 max-w-sm mx-auto bg-[#283044] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between gap-2 z-50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#5bb8fe]">
              phone_in_talk
            </span>
            <span className="text-[12px] font-medium">{toastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-white/80 hover:text-white"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
};
