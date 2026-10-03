import React, { useState, useEffect } from 'react';
import { ASSETS } from '../data/mockData';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  onSkipToHome: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onGetStarted,
  onSkipToHome
}) => {
  const [percent, setPercent] = useState(68);
  const [statusText, setStatusText] = useState('Checking SIM 1 & SIM 2 hardware keys...');
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setPercent(89);
      setStatusText('Handshaking USSD Gateway node...');
    }, 1100);

    const t2 = setTimeout(() => {
      setPercent(100);
      setStatusText('Hardware bound & offline ready!');
      setIsReady(true);
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleStart = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      onGetStarted();
    }, 600);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0B0F19] text-white flex flex-col justify-between px-4 py-8 overflow-hidden select-none">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#5bb8fe]/20 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#004ac6]/25 blur-2xl" />
      </div>

      {/* Top Bar Status */}
      <div className="w-full flex justify-between items-center z-10 pt-safe">
        <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#283044]/80 border border-[#1E293B]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="text-[11px] font-semibold tracking-wider uppercase text-[#eef0ff]">
            Offline Mesh Ready
          </span>
        </div>
        <div className="flex items-center space-x-1.5 text-[#dae2fd]">
          <span className="material-symbols-outlined text-[18px]">signal_cellular_alt</span>
          <span className="text-[11px] font-semibold text-[#d2d9f4] tracking-wide">
            DUAL-SIM ACTIVE
          </span>
        </div>
      </div>

      {/* Center Branding Content */}
      <div className="w-full flex flex-col items-center justify-center my-auto z-10 text-center py-6">
        <div className="relative flex items-center justify-center mb-6">
          <div className="absolute inset-0 rounded-full bg-[#5bb8fe]/30 scale-125 animate-ping opacity-25" />
          <div className="w-28 h-28 rounded-full bg-[#283044] p-1 shadow-2xl flex items-center justify-center relative border border-[#1E293B]">
            <div className="w-full h-full rounded-full bg-[#0F172A] flex items-center justify-center overflow-hidden">
              <img
                src={ASSETS.logo}
                alt="PayLite Logo"
                className="w-20 h-20 object-contain rounded-md"
              />
            </div>
          </div>
        </div>

        <h1 className="text-[32px] sm:text-[36px] font-extrabold tracking-tight text-white mb-1">
          PayLite
        </h1>

        <div className="flex items-center space-x-2 mb-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#5bb8fe]" />
          <p className="text-[18px] font-semibold text-[#dae2fd]">
            Zero-Data Payments for India
          </p>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#5bb8fe]" />
        </div>

        <p className="text-[12px] leading-relaxed text-[#d2d9f4] max-w-xs mt-1 px-2">
          Direct telecommunication layer settlement via secure SIM cryptoprocessors. No internet required.
        </p>

        {/* Quick jump to services hub for testing */}
        <button
          type="button"
          onClick={onSkipToHome}
          className="mt-3 text-[11px] text-[#5bb8fe] hover:underline"
        >
          Skip Intro → Enter Hub Directly
        </button>
      </div>

      {/* Bottom Capabilities & Actions */}
      <div className="w-full flex flex-col items-center space-y-4 z-10 pb-safe">
        {/* Badges Stack */}
        <div className="w-full flex flex-wrap items-center justify-center gap-2 max-w-sm">
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#283044]/90 text-[#e1f2ff] shadow-sm border border-[#1E293B]">
            <span className="material-symbols-outlined text-[15px] text-[#5bb8fe]">cloud_off</span>
            <span className="text-[11px] font-semibold tracking-wide">100% Offline Capable</span>
          </div>

          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#283044]/90 text-[#e1f2ff] shadow-sm border border-[#1E293B]">
            <span className="material-symbols-outlined text-[15px] text-[#10B981]">verified</span>
            <span className="text-[11px] font-semibold tracking-wide">NPCI & *99# USSD Certified</span>
          </div>

          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#283044]/90 text-[#e1f2ff] shadow-sm border border-[#1E293B]">
            <span className="material-symbols-outlined text-[15px] text-[#93ccff]">sim_card</span>
            <span className="text-[11px] font-semibold tracking-wide">SIM-Hardware Bound</span>
          </div>
        </div>

        {/* Security Hardware Ticker Box */}
        <div className="w-full bg-[#283044]/60 border border-[#1E293B] rounded-2xl p-3 flex flex-col space-y-2 max-w-xs backdrop-blur-sm">
          <div className="flex items-center justify-between text-[#e1f2ff]">
            <div className="flex items-center space-x-2 min-w-0">
              <span
                className={`material-symbols-outlined text-[16px] ${
                  isReady ? 'text-[#10B981]' : 'text-[#5bb8fe] animate-spin'
                }`}
              >
                {isReady ? 'verified_user' : 'sync'}
              </span>
              <span className="text-[11px] font-semibold text-[#eef0ff] truncate">
                {statusText}
              </span>
            </div>
            <span className="text-[11px] text-[#5bb8fe] font-mono font-bold">{percent}%</span>
          </div>

          <div className="w-full h-1.5 bg-[#0B0F19] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#5bb8fe] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={handleStart}
          disabled={isAuthenticating}
          className="w-full max-w-xs h-12 rounded-xl bg-[#2563eb] text-white text-[14px] font-bold flex items-center justify-center space-x-2 shadow-lg active:scale-95 hover:bg-[#004ac6] transition-all"
        >
          {isAuthenticating ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin">
                refresh
              </span>
              <span>Authenticating Enclave...</span>
            </>
          ) : (
            <>
              <span>Get Started</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </>
          )}
        </button>

        <div className="flex items-center space-x-1 text-[#d2d9f4] text-[12px] pt-1">
          <span className="material-symbols-outlined text-[14px] text-[#5bb8fe]">lock</span>
          <span>Secured with Hardware Root-of-Trust</span>
        </div>
      </div>
    </div>
  );
};
