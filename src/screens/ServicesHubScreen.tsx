import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { BottomTabType, ScreenType } from '../types';

interface ServicesHubScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenDiagnostics: () => void;
  onOpenVoiceCall: () => void;
}

export const ServicesHubScreen: React.FC<ServicesHubScreenProps> = ({
  onNavigate,
  onOpenDiagnostics,
  onOpenVoiceCall
}) => {
  const [liveIstTime, setLiveIstTime] = useState<string>('01:54:09 IST');
  const [isSimModalOpen, setIsSimModalOpen] = useState(false);
  const [simModalTitle, setSimModalTitle] = useState('Offline Handshake Simulation');
  const [simModalStep, setSimModalStep] = useState<number>(1);
  const [isSimProcessing, setIsSimProcessing] = useState(false);

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

  const handleTriggerDemo = () => {
    setSimModalTitle('Offline Payment Demo (Sharma Chai)');
    setSimModalStep(1);
    setIsSimModalOpen(true);
  };

  const handleSimModalAction = () => {
    setIsSimProcessing(true);
    setTimeout(() => {
      setIsSimProcessing(false);
      setSimModalStep(2);
      setTimeout(() => {
        setIsSimModalOpen(false);
        onNavigate('receipt');
      }, 900);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased selection:bg-[#dbe1ff]">
      <Header
        badgeType="ussd-nfc"
        onProfileClick={onOpenDiagnostics}
      />

      <main className="flex-1 w-full max-w-lg mx-auto pt-16 pb-24 px-4 flex flex-col">
        {/* Top Operational Status Card */}
        <div className="w-full mt-3 rounded-2xl bg-[#004ac6] text-white p-4 shadow-md relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#5bb8fe]/20 pointer-events-none" />

          <div className="flex items-center justify-between gap-1 mb-2">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#c4e7ff] animate-ping" />
              <span className="w-2 h-2 -ml-3.5 rounded-full bg-[#c4e7ff]" />
              <span className="text-[11px] text-white font-semibold uppercase tracking-wider">
                Engine Active
              </span>
            </div>

            <div className="flex items-center gap-1 text-white/90">
              <span className="material-symbols-outlined text-[16px]">sim_card</span>
              <span className="text-[11px] font-semibold">SIM 1 (Jio 4G / Airtel)</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-[18px] font-bold tracking-tight text-white">
              Zero-Data Payment Engine
            </h2>
            <p className="text-[12px] text-white/80 leading-relaxed">
              Military-grade GSM tunnel routing transactions via secure *99# USSD and localized
              hardware enclave.
            </p>
          </div>

          <div className="mt-3 pt-2 flex items-center justify-between border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#c4e7ff]">lock</span>
              <span className="text-[11px] text-[#c4e7ff] font-semibold tracking-wide">
                A5/3 GSM Encrypted
              </span>
            </div>
            <span className="text-[11px] text-white/70">Latency: ~1.4s</span>
          </div>
        </div>

        {/* Interactive Telemetry Pill Bar */}
        <div className="w-full flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e2e7ff] text-[#131b2e] whitespace-nowrap shadow-sm">
            <span className="material-symbols-outlined text-[16px] text-[#004ac6]">cell_tower</span>
            <span className="text-[11px] font-semibold">Tower: Band 3 (Strong)</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e2e7ff] text-[#131b2e] whitespace-nowrap shadow-sm">
            <span className="material-symbols-outlined text-[16px] text-[#005b7c]">key</span>
            <span className="text-[11px] font-semibold">Hardware Keystore Ready</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e2e7ff] text-[#131b2e] whitespace-nowrap shadow-sm">
            <span className="material-symbols-outlined text-[16px] text-[#004ac6]">
              verified_user
            </span>
            <span className="text-[11px] font-semibold">NPCI Protocol 2.0</span>
          </div>
        </div>

        {/* Section Title */}
        <div className="flex items-center justify-between mt-1 mb-2">
          <h3 className="text-[16px] font-bold text-[#131b2e] tracking-tight">
            Offline Payment Capabilities
          </h3>
          <span className="text-[11px] text-[#004ac6] font-bold uppercase tracking-wider">
            5 Protocols
          </span>
        </div>

        {/* Capabilities Stack */}
        <div className="flex flex-col gap-2.5 w-full">
          {/* Protocol 1: Scan & Pay Without Internet */}
          <div
            onClick={() => onNavigate('scan')}
            className="w-full flex flex-col p-4 rounded-2xl bg-white border border-[#eaedff] shadow-sm hover:border-[#cce5ff] active:bg-[#f2f3ff] transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#004ac6] flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px]">qr_code_scanner</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#131b2e]">
                      Scan & Pay Without Internet
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#cce5ff] text-[#001d31] text-[11px] font-bold">
                      Instant
                    </span>
                  </div>
                  <span className="text-[12px] text-[#434655] font-medium mt-0.5">
                    Universal BharatQR, PhonePe, GPay
                  </span>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#434655] flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </div>
            </div>

            <p className="text-[12px] text-[#434655] mt-2 leading-relaxed">
              Point device camera at any standard merchant QR code. PayLite extracts merchant VPA
              data locally and executes silent USSD burst verification within 3 seconds.
            </p>

            <div className="mt-2.5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#004ac6] bg-[#e2e7ff] px-2 py-0.5 rounded">
                <span className="material-symbols-outlined text-[13px]">graphic_eq</span>
                Acoustic Bridge
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#005b7c] bg-[#e2e7ff] px-2 py-0.5 rounded">
                <span className="material-symbols-outlined text-[13px]">phone</span>
                *99# Fallback
              </span>
            </div>
          </div>

          {/* Protocol 2: Send to Phone / UPI ID */}
          <div
            onClick={() => onNavigate('payment-auth')}
            className="w-full flex flex-col p-4 rounded-2xl bg-white border border-[#eaedff] shadow-sm hover:border-[#cce5ff] active:bg-[#f2f3ff] transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#004ac6] flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px]">contactless</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#131b2e]">
                      Send to Phone / UPI ID
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#e2e7ff] text-[#00174b] text-[11px] font-bold">
                      P2P Ready
                    </span>
                  </div>
                  <span className="text-[12px] text-[#434655] font-medium mt-0.5">
                    Automated Telecom Tunnel
                  </span>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#434655] flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </div>
            </div>

            <p className="text-[12px] text-[#434655] mt-2 leading-relaxed">
              Enter recipient mobile contact or VPA handle. The transaction bypasses cellular data
              towers and routes directly across national banking switches using operator
              control-plane channels.
            </p>

            <div className="mt-2.5 flex items-center justify-between pt-1">
              <div className="flex items-center gap-1 text-[11px] text-[#005b7c] font-semibold">
                <span className="material-symbols-outlined text-[14px] text-[#10B981]">
                  check_circle
                </span>
                Zero mobile balance consumed
              </div>
              <span className="text-[11px] text-[#004ac6] font-bold flex items-center gap-0.5">
                View Limit (₹5,000)
                <span className="material-symbols-outlined text-[13px]">chevron_right</span>
              </span>
            </div>
          </div>

          {/* Protocol 3: 123PAY Voice Backup */}
          <div
            onClick={onOpenVoiceCall}
            className="w-full flex flex-col p-4 rounded-2xl bg-white border border-[#eaedff] shadow-sm hover:border-[#cce5ff] active:bg-[#f2f3ff] transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#004ac6] flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px]">record_voice_over</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#131b2e]">
                      123PAY Voice Backup
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#c4e7ff] text-[#001e2c] text-[11px] font-bold">
                      IVR Audio
                    </span>
                  </div>
                  <span className="text-[12px] text-[#434655] font-medium mt-0.5">
                    Dual-Tone Congestion Failover
                  </span>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#434655] flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </div>
            </div>

            <p className="text-[12px] text-[#434655] mt-2 leading-relaxed">
              When cellular cell towers experience heavy USSD queue congestion, PayLite seamlessly
              initiates an automated 123PAY voice call back for secure DTMF PIN input in 10 Indian
              languages.
            </p>

            <div className="mt-2.5 flex items-center justify-between pt-1">
              <div className="flex items-center gap-1 text-[11px] text-[#434655] font-semibold">
                <span className="material-symbols-outlined text-[14px] text-[#005b7c]">
                  translate
                </span>
                Hindi, English, Tamil, Telugu +6
              </div>
              <span className="text-[11px] text-[#004ac6] font-bold">Toll-Free</span>
            </div>
          </div>

          {/* Protocol 4: On-Device Cash Reserve */}
          <div
            onClick={() => onNavigate('wallet')}
            className="w-full flex flex-col p-4 rounded-2xl bg-white border border-[#eaedff] shadow-sm hover:border-[#cce5ff] active:bg-[#f2f3ff] transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#004ac6] flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#131b2e]">
                      On-Device Cash Reserve
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#dbe1ff] text-[#00174b] text-[11px] font-bold">
                      ₹1,850 Loaded
                    </span>
                  </div>
                  <span className="text-[12px] text-[#434655] font-medium mt-0.5">
                    Hardware PIN Protected Ledger
                  </span>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#434655] flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </div>
            </div>

            <p className="text-[12px] text-[#434655] mt-2 leading-relaxed">
              Reserve funds directly in your secure on-chip cryptographic vault. Tap or authorize
              instant offline micro-payments up to ₹500 each with zero network wait time.
            </p>

            <div className="mt-3 flex flex-col gap-1">
              <div className="w-full h-1.5 rounded-full bg-[#eaedff] overflow-hidden">
                <div className="h-full bg-[#004ac6] rounded-full" style={{ width: '74%' }} />
              </div>
              <div className="flex justify-between text-[11px] text-[#434655] font-medium pt-0.5">
                <span>Daily Max: ₹2,000</span>
                <span className="text-[#005b7c] font-semibold">Auto-Syncs On Network</span>
              </div>
            </div>
          </div>

          {/* Protocol 5: Anti-Tamper Local Receipts */}
          <div
            onClick={() => onNavigate('receipt')}
            className="w-full flex flex-col p-4 rounded-2xl bg-white border border-[#eaedff] shadow-sm hover:border-[#cce5ff] active:bg-[#f2f3ff] transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#004ac6] flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#131b2e]">
                      Anti-Tamper Local Receipts
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#cce5ff] text-[#001d31] text-[11px] font-bold">
                      Proof of Pay
                    </span>
                  </div>
                  <span className="text-[12px] text-[#434655] font-medium mt-0.5">
                    ECDSA Signed Audit Tokens
                  </span>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#434655] flex-shrink-0">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </div>
            </div>

            <p className="text-[12px] text-[#434655] mt-2 leading-relaxed">
              Every completed transaction renders a cryptographically signed badge featuring an
              animated timestamp reticle and NPCI reference ID that vendors can verify with zero
              connectivity.
            </p>

            <div className="mt-3 flex items-center justify-between bg-[#f2f3ff] px-3 py-1.5 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#005b7c] animate-pulse" />
                <span className="text-[11px] font-mono font-bold text-[#131b2e]">
                  TXN: #PL-8924-N9 LIVE: {liveIstTime}
                </span>
              </div>
              <span className="px-2 py-0.5 bg-[#dbe1ff] text-[#00174b] rounded text-[11px] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">badge</span>
                Valid
              </span>
            </div>
          </div>
        </div>

        {/* Regulatory & Compliance Strip */}
        <div className="mt-5 w-full rounded-2xl bg-[#e2e7ff] p-4 flex flex-col gap-2 border border-[#dae2fd]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-[#005b7c]">
                assured_workload
              </span>
              <span className="text-[14px] font-bold text-[#131b2e]">
                Official Mandate Compliance
              </span>
            </div>
            <span className="text-[11px] font-semibold text-[#434655]">RBI / NPCI</span>
          </div>

          <p className="text-[12px] text-[#434655] leading-relaxed">
            Operates fully under the Reserve Bank of India Framework for Offline Digital Payments
            and National Payments Corporation of India (NPCI) *99# USSD telecommunication standards.
          </p>

          <div className="flex items-center gap-4 pt-1">
            <div className="flex items-center gap-1 text-[#434655] text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[14px] text-[#004ac6]">security</span>
              Zero Cloud Leakage
            </div>
            <div className="flex items-center gap-1 text-[#434655] text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[14px] text-[#004ac6]">sync</span>
              Auto Reconciliation
            </div>
          </div>
        </div>

        {/* Tactical Demo & Test Actions */}
        <div className="mt-5 flex flex-col gap-2.5 w-full">
          <button
            type="button"
            onClick={handleTriggerDemo}
            className="w-full h-12 rounded-xl bg-[#004ac6] text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#003ea8] active:scale-[0.99] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">bolt</span>
            <span>Try Offline Payment Demo</span>
          </button>

          <button
            type="button"
            onClick={onOpenDiagnostics}
            className="w-full h-12 rounded-xl bg-white border border-[#dae2fd] text-[#131b2e] text-[13px] font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#f2f3ff] active:scale-[0.99] transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-[#005b7c]">settings</span>
            <span>Run SIM & USSD Diagnostics</span>
          </button>
        </div>
      </main>

      {/* Interactive Simulation Modal */}
      {isSimModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#131b2e]/70 backdrop-blur-sm flex items-end justify-center p-0 transition-opacity">
          <div className="w-full max-w-md bg-white rounded-t-3xl p-5 flex flex-col gap-4 animate-slide-up shadow-2xl">
            <div className="w-12 h-1 rounded-full bg-[#c3c6d7] mx-auto" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#cce5ff] text-[#001d31] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">terminal</span>
                </div>
                <span className="text-[16px] font-bold text-[#131b2e]">{simModalTitle}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsSimModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#eaedff] flex items-center justify-center text-[#434655]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="rounded-xl bg-[#f2f3ff] p-4 flex flex-col gap-2 font-mono text-[13px] text-[#131b2e]">
              {simModalStep === 1 ? (
                <>
                  <div className="flex items-center gap-2 text-[#004ac6] font-bold font-sans">
                    <span className="material-symbols-outlined text-[16px] animate-spin">
                      refresh
                    </span>
                    <span>Emulating Vendor Tap (₹150.00)...</span>
                  </div>
                  <p className="text-[#434655] font-sans text-[11px]">
                    Merchant: Sharma Chai Corner • Band 3 Base-Tower
                  </p>
                  <p className="text-[#131b2e] font-sans text-[12px] font-semibold">
                    Ledger: Deducting from On-Device Reserve
                  </p>
                  <div className="mt-1 text-[#005b7c] flex items-center gap-1 font-sans text-[11px] font-semibold">
                    <span className="material-symbols-outlined text-[14px]">shield</span>
                    Local Signature: Verified Valid
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-[#10B981] font-bold font-sans">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>ECDSA Receipt Token Generated!</span>
                  </div>
                  <p className="text-[#434655] font-sans text-[11px]">
                    Ref: NPCI-99-DEMO-8821 • Non-reputable audit proof
                  </p>
                </>
              )}

              <div className="w-full bg-[#eaedff] rounded-full h-1.5 mt-2 overflow-hidden">
                <div
                  className="bg-[#004ac6] h-full rounded-full transition-all duration-500"
                  style={{ width: isSimProcessing ? '90%' : '35%' }}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSimModalAction}
              disabled={isSimProcessing}
              className="w-full h-12 rounded-xl bg-[#004ac6] text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
            >
              {isSimProcessing ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">
                    progress_activity
                  </span>
                  <span>Generating Signature...</span>
                </>
              ) : (
                <span>Confirm & Render Receipt</span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <BottomNav
        activeTab="services"
        onTabChange={(tab: BottomTabType) => {
          if (tab === 'home') onNavigate('wallet');
          else if (tab === 'scan') onNavigate('scan');
          else if (tab === 'passbook') onNavigate('wallet');
        }}
      />
    </div>
  );
};
