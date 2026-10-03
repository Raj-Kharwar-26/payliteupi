import React, { useState } from 'react';
import { ScreenType, Merchant, SIMCard } from './types';
import { RECENT_MERCHANTS, INITIAL_SIMS } from './data/mockData';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { SimBindingScreen } from './screens/SimBindingScreen';
import { ServicesHubScreen } from './screens/ServicesHubScreen';
import { ScanAndPayScreen } from './screens/ScanAndPayScreen';
import { PaymentAuthScreen } from './screens/PaymentAuthScreen';
import { UssdRailScreen } from './screens/UssdRailScreen';
import { PaymentOutcomeScreen } from './screens/PaymentOutcomeScreen';
import { ReceiptViewScreen } from './screens/ReceiptViewScreen';
import { ManageWalletScreen } from './screens/ManageWalletScreen';
import { VoiceCallModal } from './components/VoiceCallModal';
import { DiagnosticsModal } from './components/DiagnosticsModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('services');
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant>(RECENT_MERCHANTS[0]);
  const [paymentAmount, setPaymentAmount] = useState<number>(120);
  const [activeSim, setActiveSim] = useState<SIMCard>(INITIAL_SIMS[0]);
  const [isVoiceCallOpen, setIsVoiceCallOpen] = useState(false);
  const [isDiagnosticsOpen, setIsDiagnosticsOpen] = useState(false);
  const [isQuickSwitcherOpen, setIsQuickSwitcherOpen] = useState(false);

  // Navigation handlers
  const handleSelectMerchant = (merchant: Merchant, amount?: number) => {
    setSelectedMerchant(merchant);
    if (amount) setPaymentAmount(amount);
    setCurrentScreen('payment-auth');
  };

  const handleProceedToDial = (merchant: Merchant, amount: number) => {
    setSelectedMerchant(merchant);
    setPaymentAmount(amount);
    setCurrentScreen('ussd-rail');
  };

  return (
    <div className="relative min-h-screen bg-[#faf8ff] text-[#131b2e] font-sans antialiased overflow-x-hidden">
      {/* Quick Screen Switcher Pill (Floating badge for immediate review of all 8 screens) */}
      <aside aria-label="Demo Navigation" className="fixed top-20 right-3 z-50">
        <button
          type="button"
          onClick={() => setIsQuickSwitcherOpen(!isQuickSwitcherOpen)}
          className="px-2.5 py-1 rounded-full bg-[#131b2e]/90 text-white border border-[#283044] text-[11px] font-bold shadow-lg backdrop-blur-md flex items-center gap-1 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[14px] text-[#5bb8fe]">layers</span>
          <span>Screens ({currentScreen})</span>
        </button>

        {isQuickSwitcherOpen && (
          <div className="absolute right-0 top-8 mt-1 w-56 bg-white border border-[#dae2fd] rounded-2xl p-2 shadow-2xl flex flex-col gap-1 text-[12px] text-[#131b2e] animate-fade-in z-50">
            <div className="px-2 py-1 font-bold text-[10px] text-[#737686] uppercase tracking-wider border-b border-[#eaedff]">
              Jump to Screen View
            </div>

            <button
              type="button"
              onClick={() => {
                setCurrentScreen('welcome');
                setIsQuickSwitcherOpen(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded-xl font-medium flex items-center justify-between ${
                currentScreen === 'welcome' ? 'bg-[#004ac6] text-white font-bold' : 'hover:bg-[#f2f3ff]'
              }`}
            >
              <span>1. Welcome / Intro</span>
              <span className="text-[10px] opacity-70">Dark</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentScreen('sim-binding');
                setIsQuickSwitcherOpen(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded-xl font-medium flex items-center justify-between ${
                currentScreen === 'sim-binding' ? 'bg-[#004ac6] text-white font-bold' : 'hover:bg-[#f2f3ff]'
              }`}
            >
              <span>2. Device & SIM Binding</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentScreen('services');
                setIsQuickSwitcherOpen(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded-xl font-medium flex items-center justify-between ${
                currentScreen === 'services' ? 'bg-[#004ac6] text-white font-bold' : 'hover:bg-[#f2f3ff]'
              }`}
            >
              <span>3. Services Hub (Home)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentScreen('scan');
                setIsQuickSwitcherOpen(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded-xl font-medium flex items-center justify-between ${
                currentScreen === 'scan' ? 'bg-[#004ac6] text-white font-bold' : 'hover:bg-[#f2f3ff]'
              }`}
            >
              <span>4. Scan And Pay</span>
              <span className="text-[10px] opacity-70">Dark</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentScreen('payment-auth');
                setIsQuickSwitcherOpen(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded-xl font-medium flex items-center justify-between ${
                currentScreen === 'payment-auth' ? 'bg-[#004ac6] text-white font-bold' : 'hover:bg-[#f2f3ff]'
              }`}
            >
              <span>5. Payment Authorization</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentScreen('ussd-rail');
                setIsQuickSwitcherOpen(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded-xl font-medium flex items-center justify-between ${
                currentScreen === 'ussd-rail' ? 'bg-[#004ac6] text-white font-bold' : 'hover:bg-[#f2f3ff]'
              }`}
            >
              <span>6. USSD Banking Rail</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentScreen('payment-outcome');
                setIsQuickSwitcherOpen(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded-xl font-medium flex items-center justify-between ${
                currentScreen === 'payment-outcome' ? 'bg-[#004ac6] text-white font-bold' : 'hover:bg-[#f2f3ff]'
              }`}
            >
              <span>7. Outcome Verification</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentScreen('receipt');
                setIsQuickSwitcherOpen(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded-xl font-medium flex items-center justify-between ${
                currentScreen === 'receipt' ? 'bg-[#004ac6] text-white font-bold' : 'hover:bg-[#f2f3ff]'
              }`}
            >
              <span>8. Local Anti-Tamper Receipt</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setCurrentScreen('wallet');
                setIsQuickSwitcherOpen(false);
              }}
              className={`w-full text-left px-2.5 py-1.5 rounded-xl font-medium flex items-center justify-between ${
                currentScreen === 'wallet' ? 'bg-[#004ac6] text-white font-bold' : 'hover:bg-[#f2f3ff]'
              }`}
            >
              <span>9. Manage Offline Wallet</span>
            </button>

            <div className="mt-1 pt-1 border-t border-[#eaedff] flex flex-col gap-1">
              <button
                type="button"
                onClick={() => {
                  setIsVoiceCallOpen(true);
                  setIsQuickSwitcherOpen(false);
                }}
                className="w-full text-left px-2 py-1 rounded-lg text-[#006398] font-bold hover:bg-[#e2e7ff] flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[15px]">call</span>
                <span>Open 123PAY Voice Simulator</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsDiagnosticsOpen(true);
                  setIsQuickSwitcherOpen(false);
                }}
                className="w-full text-left px-2 py-1 rounded-lg text-[#004ac6] font-bold hover:bg-[#e2e7ff] flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[15px]">settings</span>
                <span>Run Telecom Diagnostics</span>
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Screen Router */}
      {currentScreen === 'welcome' && (
        <WelcomeScreen
          onGetStarted={() => setCurrentScreen('sim-binding')}
          onSkipToHome={() => setCurrentScreen('services')}
        />
      )}

      {currentScreen === 'sim-binding' && (
        <SimBindingScreen
          onBack={() => setCurrentScreen('welcome')}
          onSimBound={(sim) => {
            setActiveSim(sim);
            setCurrentScreen('services');
          }}
          onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
        />
      )}

      {currentScreen === 'services' && (
        <ServicesHubScreen
          onNavigate={(screen) => setCurrentScreen(screen)}
          onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
          onOpenVoiceCall={() => setIsVoiceCallOpen(true)}
        />
      )}

      {currentScreen === 'scan' && (
        <ScanAndPayScreen
          onBack={() => setCurrentScreen('services')}
          onSelectMerchant={handleSelectMerchant}
          onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
        />
      )}

      {currentScreen === 'payment-auth' && (
        <PaymentAuthScreen
          onBack={() => setCurrentScreen('services')}
          selectedMerchant={selectedMerchant}
          initialAmount={paymentAmount}
          onProceedToDial={handleProceedToDial}
          onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
        />
      )}

      {currentScreen === 'ussd-rail' && (
        <UssdRailScreen
          onBack={() => setCurrentScreen('payment-auth')}
          merchant={selectedMerchant}
          amount={paymentAmount}
          onProceedToOutcome={() => setCurrentScreen('payment-outcome')}
          onSwitchToVoice={() => setIsVoiceCallOpen(true)}
          onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
        />
      )}

      {currentScreen === 'payment-outcome' && (
        <PaymentOutcomeScreen
          onBack={() => setCurrentScreen('ussd-rail')}
          merchant={selectedMerchant}
          amount={paymentAmount}
          onSuccessViewReceipt={() => setCurrentScreen('receipt')}
          onSavePending={() => setCurrentScreen('wallet')}
          onRetry={() => setCurrentScreen('ussd-rail')}
          onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
        />
      )}

      {currentScreen === 'receipt' && (
        <ReceiptViewScreen
          onBack={() => setCurrentScreen('services')}
          merchant={selectedMerchant}
          amount={paymentAmount}
          onDone={() => setCurrentScreen('services')}
          onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
        />
      )}

      {currentScreen === 'wallet' && (
        <ManageWalletScreen
          onBack={() => setCurrentScreen('services')}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onOpenVoiceCall={() => setIsVoiceCallOpen(true)}
          onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
        />
      )}

      {/* Global 123PAY Voice Call Modal */}
      <VoiceCallModal
        isOpen={isVoiceCallOpen}
        onClose={() => setIsVoiceCallOpen(false)}
        merchantName={selectedMerchant.name}
        amount={paymentAmount}
        onPaymentSuccess={() => {
          setIsVoiceCallOpen(false);
          setCurrentScreen('receipt');
        }}
      />

      {/* Global Diagnostics Modal */}
      <DiagnosticsModal
        isOpen={isDiagnosticsOpen}
        onClose={() => setIsDiagnosticsOpen(false)}
      />
    </div>
  );
}
