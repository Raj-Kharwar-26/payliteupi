import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Merchant } from '../types';

interface ReceiptViewScreenProps {
  onBack: () => void;
  merchant: Merchant;
  amount: number;
  onDone: () => void;
  onOpenDiagnostics: () => void;
}

export const ReceiptViewScreen: React.FC<ReceiptViewScreenProps> = ({
  onBack,
  merchant,
  amount,
  onDone,
  onOpenDiagnostics
}) => {
  const [liveIstTime, setLiveIstTime] = useState('10:42:15 IST');
  const [isPlayingSoundbox, setIsPlayingSoundbox] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setLiveIstTime(`${hrs}:${mins}:${secs} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSoundboxPlay = () => {
    setIsPlayingSoundbox(true);
    // Use Web Speech API if supported for genuine Hindi/English soundbox announcement
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `PayLite par ${amount} rupaye prapt hue.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.onend = () => setIsPlayingSoundbox(false);
      utterance.onerror = () => setIsPlayingSoundbox(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingSoundbox(false), 2000);
    }
  };

  const handleShare = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased">
      <Header
        title="Anti-Tamper Local Receipt"
        showBack
        onBack={onBack}
        badgeType="offline-safe"
        onProfileClick={onOpenDiagnostics}
      />

      <main className="flex-1 w-full max-w-lg mx-auto px-4 pt-20 pb-12 flex flex-col gap-4">
        {/* Anti-Tamper Verified Card */}
        <div className="relative bg-white border border-[#cce5ff] rounded-3xl p-6 shadow-xl overflow-hidden flex flex-col items-center text-center">
          {/* Ambient Security Seal Badge */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#10B981] via-[#004ac6] to-[#5bb8fe]" />

          {/* Success Check Ring */}
          <div className="relative w-18 h-18 rounded-full bg-[#ECFDF5] text-[#10B981] border-2 border-[#A7F3D0] flex items-center justify-center my-2 shadow-sm">
            <span className="absolute inset-0 rounded-full bg-[#10B981]/20 animate-ping opacity-75" />
            <span
              className="material-symbols-outlined text-[36px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>

          <span className="text-[12px] font-bold text-[#006398] uppercase tracking-wider bg-[#cce5ff] px-3 py-0.5 rounded-full mt-1">
            Proof of Pay • ECDSA Signed
          </span>

          <h2 className="text-[20px] font-bold text-[#131b2e] mt-2">Payment Completed</h2>
          <p className="text-[13px] text-[#434655]">Direct telecommunication settlement confirmed</p>

          {/* Amount Display */}
          <div className="my-3 text-[#004ac6] flex items-baseline justify-center">
            <span className="text-[40px] font-extrabold tracking-tight">₹{amount.toFixed(2)}</span>
          </div>

          {/* Payee Info */}
          <div className="w-full bg-[#f2f3ff] rounded-2xl p-3.5 flex items-center justify-between text-left my-1">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#2563eb] text-white flex items-center justify-center text-[15px] font-bold flex-shrink-0">
                {merchant.initials || 'SK'}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] font-bold text-[#131b2e] truncate">
                  {merchant.name}
                </span>
                <span className="text-[11px] text-[#434655] font-mono truncate">
                  {merchant.upiId}
                </span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-[#10B981] bg-[#ECFDF5] px-2 py-0.5 rounded">
              Verified
            </span>
          </div>

          {/* Dynamic Live Timestamp Reticle */}
          <div className="w-full mt-3 p-3 rounded-2xl bg-[#eaedff] flex flex-col gap-1.5 border border-[#dae2fd]">
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                <span className="font-bold text-[#131b2e] font-mono">
                  LIVE RETICLE: {liveIstTime}
                </span>
              </div>
              <span className="text-[#004ac6] font-bold">NPCI *99#</span>
            </div>

            <div className="flex justify-between items-center text-[11px] text-[#434655] font-mono pt-1 border-t border-[#dae2fd]">
              <span>TXN REF:</span>
              <span className="font-bold text-[#131b2e]">NPCI-99-84729-SEC</span>
            </div>

            <div className="flex justify-between items-center text-[11px] text-[#434655] font-mono">
              <span>BANK DEBIT:</span>
              <span className="font-semibold text-[#131b2e]">SBI (•••• 4219)</span>
            </div>

            <div className="flex justify-between items-center text-[10px] text-[#737686] font-mono pt-0.5 truncate">
              <span>ECDSA TOKEN:</span>
              <span className="truncate max-w-[190px]">0x7b2f91a0c8d4e51928374a56b7cd8e</span>
            </div>
          </div>

          {/* Soundbox Announcement Simulator */}
          <div className="w-full mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={handleSoundboxPlay}
              className="w-full h-11 rounded-xl bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#004ac6] text-[12px] font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
            >
              <span
                className={`material-symbols-outlined text-[18px] ${
                  isPlayingSoundbox ? 'animate-bounce text-[#006398]' : ''
                }`}
              >
                volume_up
              </span>
              <span>
                {isPlayingSoundbox
                  ? 'Playing Soundbox Broadcast...'
                  : 'Play Vendor Soundbox Announcement'}
              </span>
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col gap-2.5 pt-2">
          <button
            type="button"
            onClick={onDone}
            className="w-full h-12 rounded-xl bg-[#004ac6] text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#003ea8] active:scale-[0.99] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">home</span>
            <span>Return to Services Hub</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="w-full h-12 rounded-xl bg-white border border-[#dae2fd] text-[#131b2e] text-[13px] font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#f2f3ff] active:scale-[0.99] transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-[#005b7c]">share</span>
            <span>{isCopied ? 'Receipt Token Copied!' : 'Share Offline Proof'}</span>
          </button>
        </div>
      </main>
    </div>
  );
};
