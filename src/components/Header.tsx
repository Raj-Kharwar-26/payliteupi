import React from 'react';
import { ASSETS } from '../data/mockData';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  badgeType?: 'ussd-nfc' | 'offline' | 'offline-safe';
  isDark?: boolean;
  onProfileClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBack,
  badgeType = 'ussd-nfc',
  isDark = false,
  onProfileClick
}) => {
  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 pt-safe transition-colors duration-200 ${
        isDark
          ? 'bg-[#0B0F19]/90 text-white backdrop-blur-xl border-b border-[#1E293B]'
          : 'bg-[#faf8ff]/90 text-[#131b2e] backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]'
      }`}
    >
      <div className="h-16 px-4 flex items-center justify-between gap-2 max-w-lg mx-auto">
        <div className="flex items-center gap-2 min-w-0">
          {showBack && (
            <button
              type="button"
              aria-label="Go Back"
              onClick={onBack}
              className={`w-10 h-10 -ml-2 rounded-xl flex items-center justify-center transition-colors active:scale-95 ${
                isDark
                  ? 'text-white hover:bg-[#1E293B]'
                  : 'text-[#131b2e] hover:bg-[#eaedff]'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          )}

          <img
            src={ASSETS.logo}
            alt="PayLite Brand Logo"
            className="h-8 w-auto object-contain flex-shrink-0"
          />

          {title ? (
            <h1 className="font-semibold text-[16px] leading-[22px] truncate tracking-tight">
              {title}
            </h1>
          ) : (
            <div className="flex flex-col">
              <span className="font-semibold text-[16px] leading-tight tracking-tight">
                PayLite
              </span>
              <span className="text-[11px] font-semibold text-[#004ac6] tracking-wide uppercase mt-0.5">
                UPI OFFLINE
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {badgeType === 'ussd-nfc' && (
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase ${
                isDark ? 'bg-[#1E293B] text-[#93ccff]' : 'bg-[#e2e7ff] text-[#434655]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#005b7c] animate-pulse"></span>
              <span>USSD/NFC</span>
            </div>
          )}

          {badgeType === 'offline' && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#dae2fd] text-[#434655] text-[11px] font-semibold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[14px] text-[#005b7c]">
                cloud_off
              </span>
              <span>Offline</span>
            </div>
          )}

          {badgeType === 'offline-safe' && (
            <div
              className={`inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full text-[11px] font-medium ${
                isDark
                  ? 'bg-[#1E293B] text-[#93ccff]'
                  : 'bg-[#e2e7ff] text-[#131b2e]'
              }`}
            >
              <span className="material-symbols-outlined text-[13px] text-[#005b7c]">
                offline_bolt
              </span>
              <span>Offline Safe</span>
            </div>
          )}

          <button
            type="button"
            onClick={onProfileClick}
            className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-transparent active:ring-[#2563eb] transition-all"
            title="Profile & Diagnostics"
          >
            <img
              src={ASSETS.profile}
              alt="User Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
