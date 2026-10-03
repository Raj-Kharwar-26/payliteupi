import React from 'react';
import { BottomTabType } from '../types';

interface BottomNavProps {
  activeTab: BottomTabType;
  onTabChange: (tab: BottomTabType) => void;
  isDark?: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  isDark = false
}) => {
  return (
    <nav
      className={`fixed bottom-0 inset-x-0 z-40 pb-safe transition-colors duration-200 ${
        isDark
          ? 'bg-[#0B0F19]/95 border-t border-[#1E293B] text-white backdrop-blur-xl'
          : 'bg-[#faf8ff]/95 border-t border-[#eaedff] text-[#434655] backdrop-blur-xl shadow-[0_-1px_12px_rgba(0,0,0,0.05)]'
      }`}
    >
      <div className="flex justify-around items-center h-16 px-2 max-w-lg mx-auto">
        {/* Home / Wallet */}
        <button
          type="button"
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 transition-colors ${
            activeTab === 'home'
              ? 'text-[#004ac6] font-semibold'
              : 'text-[#434655] hover:text-[#131b2e]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{
              fontVariationSettings: activeTab === 'home' ? "'FILL' 1" : "'FILL' 0"
            }}
          >
            account_balance_wallet
          </span>
          <span className="text-[11px] font-semibold mt-0.5">Home</span>
        </button>

        {/* Scan Center Button */}
        <button
          type="button"
          onClick={() => onTabChange('scan')}
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 transition-transform active:scale-95"
        >
          <div className="w-11 h-11 -mt-4 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shadow-[0_2px_10px_rgba(37,99,235,0.4)] active:bg-[#003ea8]">
            <span className="material-symbols-outlined text-[24px]">qr_code_scanner</span>
          </div>
          <span
            className={`text-[11px] font-semibold mt-1 ${
              activeTab === 'scan' ? 'text-[#004ac6]' : 'text-[#434655]'
            }`}
          >
            Scan
          </span>
        </button>

        {/* Services Hub */}
        <button
          type="button"
          onClick={() => onTabChange('services')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 transition-colors ${
            activeTab === 'services'
              ? 'text-[#004ac6] font-semibold'
              : 'text-[#434655] hover:text-[#131b2e]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{
              fontVariationSettings: activeTab === 'services' ? "'FILL' 1" : "'FILL' 0"
            }}
          >
            grid_view
          </span>
          <span className="text-[11px] font-semibold mt-0.5">Services</span>
        </button>

        {/* Passbook / Ledger */}
        <button
          type="button"
          onClick={() => onTabChange('passbook')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 transition-colors ${
            activeTab === 'passbook'
              ? 'text-[#004ac6] font-semibold'
              : 'text-[#434655] hover:text-[#131b2e]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{
              fontVariationSettings: activeTab === 'passbook' ? "'FILL' 1" : "'FILL' 0"
            }}
          >
            receipt_long
          </span>
          <span className="text-[11px] font-semibold mt-0.5">Passbook</span>
        </button>
      </div>
    </nav>
  );
};
