import React, { useState } from 'react';
import { Header } from '../components/Header';
import { SIMCard } from '../types';
import { INITIAL_SIMS } from '../data/mockData';

interface SimBindingScreenProps {
  onBack: () => void;
  onSimBound: (sim: SIMCard) => void;
  onOpenDiagnostics: () => void;
}

export const SimBindingScreen: React.FC<SimBindingScreenProps> = ({
  onBack,
  onSimBound,
  onOpenDiagnostics
}) => {
  const [selectedSlot, setSelectedSlot] = useState<number>(1);
  const [isBinding, setIsBinding] = useState<boolean>(false);
  const [bindingSuccess, setBindingSuccess] = useState<boolean>(false);

  const selectedSim = INITIAL_SIMS.find((s) => s.slot === selectedSlot) || INITIAL_SIMS[0];

  const handleConfirmBinding = () => {
    setIsBinding(true);
    setTimeout(() => {
      setIsBinding(false);
      setBindingSuccess(true);
      setTimeout(() => {
        onSimBound(selectedSim);
      }, 900);
    }, 1400);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased">
      <Header
        title="Device & SIM Binding"
        showBack
        onBack={onBack}
        badgeType="offline-safe"
        onProfileClick={onOpenDiagnostics}
      />

      <main className="flex-1 w-full max-w-lg mx-auto px-4 pt-20 pb-28">
        {/* Intro Tag */}
        <div className="flex flex-col mb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e2e7ff] w-fit mb-2">
            <span
              className="material-symbols-outlined text-[15px] text-[#004ac6]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            <span className="text-[11px] font-bold text-[#131b2e] tracking-wide uppercase">
              Hardware Level Security
            </span>
          </div>

          <h2 className="text-[22px] font-bold text-[#131b2e] leading-snug">
            Device & SIM Binding
          </h2>
          <p className="text-[14px] text-[#434655] mt-1 leading-snug">
            Link your phone SIM to securely authorize payments without mobile data.
          </p>
        </div>

        {/* Visual Architecture Card */}
        <div className="rounded-2xl bg-white p-4 shadow-sm border border-[#eaedff] mb-5 relative overflow-hidden">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#004ac6]">
                <span className="material-symbols-outlined text-[20px]">cell_tower</span>
              </div>
              <span className="text-[14px] font-bold text-[#131b2e]">
                Offline Telecom Verification
              </span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#e2e7ff] text-[#004ac6] text-[11px] font-bold">
              Zero Internet
            </span>
          </div>

          <p className="text-[12px] text-[#434655] mb-4 leading-relaxed">
            Encrypted cryptographic handshakes route directly through cellular towers to ping your
            bank's secure server via NPCI rails.
          </p>

          {/* Interactive Vector Pipeline */}
          <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-center justify-between relative">
            {/* Device Node */}
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#004ac6] shadow-sm border border-[#dae2fd]">
                <span className="material-symbols-outlined text-[20px]">phone_android</span>
              </div>
              <span className="text-[11px] font-semibold text-[#131b2e]">SIM Chip</span>
            </div>

            {/* Connecting Offline Signal Wave Vector */}
            <div className="flex-1 px-2 flex flex-col items-center justify-center relative">
              <svg className="w-full h-8 overflow-visible" fill="none" viewBox="0 0 100 24">
                <path
                  className="text-[#c3c6d7]"
                  d="M 0 12 Q 25 2 50 12 T 100 12"
                  stroke="currentColor"
                  strokeDasharray="3 3"
                  strokeWidth="1.5"
                />
                <circle className="fill-[#004ac6] animate-pulse" cx="50" cy="12" r="4" />
              </svg>
              <span className="text-[11px] text-[#005b7c] font-bold -mt-1 bg-[#f2f3ff] px-1">
                USSD / SMS Rail
              </span>
            </div>

            {/* Bank Gateway Node */}
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#006398] shadow-sm border border-[#dae2fd]">
                <span className="material-symbols-outlined text-[20px]">account_balance</span>
              </div>
              <span className="text-[11px] font-semibold text-[#131b2e]">NPCI Core</span>
            </div>
          </div>
        </div>

        {/* Dual SIM Selector Section */}
        <div className="flex flex-col mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-bold text-[#131b2e] tracking-wide uppercase">
              Detected Active SIMs
            </span>
            <span className="text-[12px] text-[#737686]">Tap to choose primary</span>
          </div>

          <div className="flex flex-col gap-3">
            {INITIAL_SIMS.map((sim) => {
              const isSelected = selectedSlot === sim.slot;
              return (
                <div
                  key={sim.slot}
                  onClick={() => setSelectedSlot(sim.slot)}
                  className={`relative rounded-2xl p-4 transition-all cursor-pointer bg-white shadow-sm border ${
                    isSelected
                      ? 'border-[#004ac6] ring-2 ring-[#004ac6]/20 bg-[#faf8ff]'
                      : 'border-[#dae2fd] hover:border-[#c3c6d7]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                          isSelected ? 'bg-[#004ac6] text-white' : 'bg-[#e2e7ff] text-transparent'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      </div>

                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-bold text-[#131b2e]">
                            SIM {sim.slot}: {sim.carrier}
                          </span>
                          <span
                            className={`text-[11px] px-1.5 py-0.5 rounded font-semibold ${
                              isSelected
                                ? 'bg-[#004ac6] text-white'
                                : 'bg-[#e2e7ff] text-[#434655]'
                            }`}
                          >
                            Slot {sim.slot}
                          </span>
                        </div>
                        <span className="text-[14px] font-semibold tracking-wider text-[#131b2e] font-mono mt-0.5">
                          {sim.number}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`material-symbols-outlined text-[24px] ${
                        isSelected ? 'text-[#004ac6]' : 'text-[#737686]'
                      }`}
                    >
                      sim_card
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    {sim.features.map((f, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[11px] bg-[#e2e7ff] text-[#004ac6] font-semibold px-2 py-0.5 rounded"
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          {idx === 0 ? 'offline_bolt' : 'verified_user'}
                        </span>
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="mt-2.5 flex items-center justify-between bg-[#f2f3ff] px-2.5 py-1.5 rounded-lg text-[12px]">
                    <div className="flex items-center gap-1.5 text-[#434655]">
                      <span className="material-symbols-outlined text-[16px] text-[#737686]">
                        account_balance_wallet
                      </span>
                      <span>Bank Linked:</span>
                    </div>
                    <span className="font-semibold text-[#131b2e]">{sim.bankLinked}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security Microcopy */}
        <div className="flex items-start gap-2.5 px-2 py-1 mb-4">
          <span
            className="material-symbols-outlined text-[18px] text-[#004ac6] flex-shrink-0 mt-0.5"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            lock
          </span>
          <p className="text-[12px] text-[#434655] leading-relaxed">
            Your SIM acts as the secure physical token. PayLite never transmits or stores your UPI PIN.
          </p>
        </div>
      </main>

      {/* Sticky Bottom Container */}
      <div className="fixed bottom-0 inset-x-0 p-4 bg-[#faf8ff]/95 backdrop-blur-md border-t border-[#eaedff] z-40 max-w-lg mx-auto">
        <button
          type="button"
          onClick={handleConfirmBinding}
          disabled={isBinding}
          className="w-full h-12 rounded-xl bg-[#004ac6] text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#003ea8] active:scale-[0.99] transition-all"
        >
          {isBinding ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">
                progress_activity
              </span>
              <span>Pinging Carrier Token...</span>
            </>
          ) : bindingSuccess ? (
            <>
              <span className="material-symbols-outlined text-[20px] text-[#10B981]">
                check_circle
              </span>
              <span>SIM {selectedSlot} Bound & Verified!</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">phonelink_lock</span>
              <span>Confirm & Bind SIM {selectedSlot}</span>
            </>
          )}
        </button>

        <div className="flex justify-center mt-2">
          <span className="text-[11px] text-[#737686] font-medium">
            Authorized via Encrypted Device Telephony Handshake
          </span>
        </div>
      </div>
    </div>
  );
};
