import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Merchant } from '../types';
import { RECENT_MERCHANTS } from '../data/mockData';

interface ScanAndPayScreenProps {
  onBack: () => void;
  onSelectMerchant: (merchant: Merchant, amount?: number) => void;
  onOpenDiagnostics: () => void;
}

export const ScanAndPayScreen: React.FC<ScanAndPayScreenProps> = ({
  onBack,
  onSelectMerchant,
  onOpenDiagnostics
}) => {
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const [isDetected, setIsDetected] = useState(false);

  useEffect(() => {
    // Periodically show the simulated QR match pill
    const timer = setInterval(() => {
      setIsDetected(true);
      setTimeout(() => setIsDetected(false), 2400);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const handleManualProceed = () => {
    if (!manualInput.trim()) return;
    const customMerchant: Merchant = {
      id: `m-custom-${Date.now()}`,
      name: manualInput.includes('@') ? manualInput.split('@')[0].toUpperCase() : `Counter (+91 ${manualInput})`,
      initials: manualInput.slice(0, 2).toUpperCase(),
      upiId: manualInput.includes('@') ? manualInput : `${manualInput}@upi`,
      verified: true,
      category: 'Counter Merchant',
      suggestedAmount: 120
    };
    onSelectMerchant(customMerchant, 120);
  };

  const handleSimulateScanSuccess = () => {
    // Pick Ramesh Kirana
    const m = RECENT_MERCHANTS.find((x) => x.id === 'm6') || RECENT_MERCHANTS[0];
    onSelectMerchant(m, 120);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col antialiased select-none pb-12">
      <Header
        title="Scan And Pay"
        showBack
        onBack={onBack}
        badgeType="offline-safe"
        isDark
        onProfileClick={onOpenDiagnostics}
      />

      <main className="flex-1 w-full max-w-lg mx-auto pt-16 flex flex-col">
        {/* Scanner Canvas Container */}
        <div className="relative w-full aspect-[4/5] max-h-[500px] bg-[#070A12] overflow-hidden flex flex-col items-center justify-between p-4 shadow-2xl">
          {/* Ambient Glow & Torch Backlight */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-[#004ac6] blur-3xl opacity-25" />
            <div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-[#5bb8fe] blur-3xl opacity-20" />
            {isTorchOn && (
              <div className="absolute inset-0 bg-white/20 transition-opacity duration-300 pointer-events-none" />
            )}
          </div>

          {/* Top Floating Status Pill */}
          <div className="relative z-10 w-full flex justify-center pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131B2E]/90 border border-[#1E293B] backdrop-blur-md shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5bb8fe] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5bb8fe]" />
              </span>
              <span className="text-[11px] font-semibold text-[#cce5ff] tracking-wide">
                Offline Scanner Active <span className="opacity-40">•</span> Point at any UPI /
                BharatQR
              </span>
            </div>
          </div>

          {/* Center QR Viewfinder Frame */}
          <div
            onClick={handleSimulateScanSuccess}
            className="relative z-10 w-64 h-64 my-auto flex items-center justify-center cursor-pointer group"
            title="Tap viewfinder to simulate instant QR decode"
          >
            {/* 4 Corner Cyan Brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 rounded-tl-xl border-t-[3px] border-l-[3px] border-[#5bb8fe]" />
            <div className="absolute top-0 right-0 w-8 h-8 rounded-tr-xl border-t-[3px] border-r-[3px] border-[#5bb8fe]" />
            <div className="absolute bottom-0 left-0 w-8 h-8 rounded-bl-xl border-b-[3px] border-l-[3px] border-[#5bb8fe]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-br-xl border-b-[3px] border-r-[3px] border-[#5bb8fe]" />

            {/* Crosshairs */}
            <div className="absolute w-2 h-2 rounded-full bg-white/50" />
            <div className="w-full h-[1px] bg-white/10 absolute" />
            <div className="h-full w-[1px] bg-white/10 absolute" />

            {/* Scanning Laser Line */}
            <div className="absolute inset-x-2 h-0.5 bg-gradient-to-r from-transparent via-[#5bb8fe] to-transparent shadow-[0_0_12px_#5bb8fe] animate-bounce" />

            {/* Simulated Detection Badge */}
            <div
              className={`transition-all duration-300 px-3 py-1.5 rounded-full bg-[#2563eb] text-white text-[11px] font-bold shadow-lg flex items-center gap-1.5 ${
                isDetected ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">bolt</span>
              <span>Valid UPI Protocol Found (Tap)</span>
            </div>
          </div>

          {/* Instructional Overlay Banner */}
          <div className="relative z-10 w-full text-center pb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#131B2E]/80 border border-[#1E293B] backdrop-blur-sm text-[#dae2fd] text-[12px]">
              <span className="material-symbols-outlined text-[#5bb8fe] text-[16px]">
                verified_user
              </span>
              <span>Scans instantly without internet via offline VPA recognition</span>
            </div>
          </div>
        </div>

        {/* Viewport Utility Controls Strip */}
        <div className="w-full px-4 -mt-6 relative z-20">
          <div className="w-full bg-[#131B2E] border border-[#1E293B] rounded-2xl p-4 shadow-xl flex items-center justify-around">
            {/* Flashlight Toggle */}
            <button
              type="button"
              aria-label="Toggle Torch"
              onClick={() => setIsTorchOn(!isTorchOn)}
              className="group flex flex-col items-center gap-1.5 focus:outline-none"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all group-active:scale-95 shadow-md ${
                  isTorchOn ? 'bg-[#5bb8fe] text-[#001d31]' : 'bg-[#1F293D] text-[#faf8ff]'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">
                  {isTorchOn ? 'flashlight_on' : 'flashlight_off'}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[#94a3b8] group-hover:text-white">
                Flashlight
              </span>
            </button>

            <div className="w-[1px] h-8 bg-[#1F293D]" />

            {/* Enter UPI ID / Phone */}
            <button
              type="button"
              aria-label="Enter UPI ID or Phone"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="group flex flex-col items-center gap-1.5 focus:outline-none"
            >
              <div className="w-12 h-12 rounded-full bg-[#1F293D] flex items-center justify-center text-[#faf8ff] transition-all group-active:scale-95 shadow-md">
                <span className="material-symbols-outlined text-[22px]">keyboard</span>
              </div>
              <span className="text-[11px] font-semibold text-[#94a3b8] group-hover:text-white">
                Enter UPI / No
              </span>
            </button>

            <div className="w-[1px] h-8 bg-[#1F293D]" />

            {/* Upload from Gallery / Preset */}
            <button
              type="button"
              aria-label="Upload QR from Gallery"
              onClick={() => {
                const m = RECENT_MERCHANTS[0];
                onSelectMerchant(m, 150);
              }}
              className="group flex flex-col items-center gap-1.5 focus:outline-none"
            >
              <div className="w-12 h-12 rounded-full bg-[#1F293D] flex items-center justify-center text-[#faf8ff] transition-all group-active:scale-95 shadow-md">
                <span className="material-symbols-outlined text-[22px]">photo_library</span>
              </div>
              <span className="text-[11px] font-semibold text-[#94a3b8] group-hover:text-white">
                From Gallery
              </span>
            </button>
          </div>
        </div>

        {/* Manual Entry Drawer */}
        {isDrawerOpen && (
          <div className="px-4 pt-3 transition-all">
            <div className="bg-[#131B2E] border border-[#1E293B] p-4 rounded-2xl shadow-lg flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-white">
                  Instant Pay via UPI ID or Mobile
                </span>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-[#94a3b8] hover:text-white p-1"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <div className="flex items-center gap-2 bg-[#0B0F19] border border-[#1E293B] rounded-xl px-3 py-2">
                <span className="material-symbols-outlined text-[#5bb8fe] text-[20px]">
                  alternate_email
                </span>
                <input
                  type="text"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  placeholder="merchant@upi or 10-digit number"
                  className="bg-transparent text-white placeholder-[#737686] text-[13px] w-full focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleManualProceed}
                  className="px-3 py-1 rounded-lg bg-[#2563eb] text-white text-[11px] font-bold active:scale-95 transition-transform"
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recent Counter Payments Quick Strip */}
        <div className="w-full px-4 mt-5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#5bb8fe] text-[18px]">history</span>
              <h2 className="text-[14px] font-semibold text-white">Recent Counter Payments</h2>
            </div>
            <span className="text-[11px] font-semibold text-[#5bb8fe]">Tap to Re-pay</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 w-full">
            {/* Merchant 1: Ramesh Kirana */}
            <button
              type="button"
              onClick={() => onSelectMerchant(RECENT_MERCHANTS[5], 120)}
              className="group bg-[#131B2E] border border-[#1E293B] hover:bg-[#1A243D] active:scale-[0.98] transition-all p-3 rounded-2xl flex flex-col items-center text-center shadow-sm"
            >
              <div className="w-11 h-11 rounded-full bg-[#1E293B] text-[#cce5ff] flex items-center justify-center text-[16px] font-bold mb-1.5 group-hover:bg-[#2563eb] group-hover:text-white transition-colors">
                RK
              </div>
              <span className="text-[11px] font-medium text-white truncate w-full">
                Ramesh Kirana
              </span>
              <span className="text-[10px] text-[#94a3b8] mt-0.5">2h ago</span>
            </button>

            {/* Merchant 2: Pooja Dairy */}
            <button
              type="button"
              onClick={() => onSelectMerchant(RECENT_MERCHANTS[1], 60)}
              className="group bg-[#131B2E] border border-[#1E293B] hover:bg-[#1A243D] active:scale-[0.98] transition-all p-3 rounded-2xl flex flex-col items-center text-center shadow-sm"
            >
              <div className="w-11 h-11 rounded-full bg-[#1E293B] text-[#cce5ff] flex items-center justify-center text-[16px] font-bold mb-1.5 group-hover:bg-[#2563eb] group-hover:text-white transition-colors">
                PD
              </div>
              <span className="text-[11px] font-medium text-white truncate w-full">Pooja Dairy</span>
              <span className="text-[10px] text-[#94a3b8] mt-0.5">Yesterday</span>
            </button>

            {/* Merchant 3: Metro Recharge */}
            <button
              type="button"
              onClick={() => onSelectMerchant(RECENT_MERCHANTS[6], 100)}
              className="group bg-[#131B2E] border border-[#1E293B] hover:bg-[#1A243D] active:scale-[0.98] transition-all p-3 rounded-2xl flex flex-col items-center text-center shadow-sm"
            >
              <div className="w-11 h-11 rounded-full bg-[#1E293B] text-[#cce5ff] flex items-center justify-center text-[16px] font-bold mb-1.5 group-hover:bg-[#2563eb] group-hover:text-white transition-colors">
                MR
              </div>
              <span className="text-[11px] font-medium text-white truncate w-full">
                Metro Recharge
              </span>
              <span className="text-[10px] text-[#94a3b8] mt-0.5">3d ago</span>
            </button>
          </div>
        </div>

        {/* Offline Token Ledger Assurance Badge */}
        <div className="w-full px-4 mt-5">
          <div className="w-full py-2.5 px-3.5 rounded-xl bg-[#131B2E]/60 border border-[#1E293B] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#7bd0ff]">lock</span>
              <span className="text-[12px] text-[#94a3b8]">Hardware Cryptographic Enclave</span>
            </div>
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">
              100% P2P SECURED
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};
