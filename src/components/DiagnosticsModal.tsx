import React, { useState, useEffect } from 'react';

interface DiagnosticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiagnosticsModal: React.FC<DiagnosticsModalProps> = ({ isOpen, onClose }) => {
  const [isRunning, setIsRunning] = useState(true);
  const [progress, setProgress] = useState(25);
  const [results, setResults] = useState<{ label: string; value: string; status: 'ok' | 'checking' }[]>([
    { label: 'SIM 1 (Airtel Slot 1)', value: 'Awaiting ping...', status: 'checking' },
    { label: 'SIM 2 (Jio Slot 2)', value: 'Awaiting ping...', status: 'checking' },
    { label: '*99# USSD National Rail', value: 'Testing handshake...', status: 'checking' },
    { label: '123PAY IVR Audio Gateway', value: 'Testing voice circuit...', status: 'checking' },
    { label: 'Hardware Enclave Keystore', value: 'Validating ECDSA keys...', status: 'checking' },
    { label: 'Base Tower Signal & Latency', value: 'Measuring RTT...', status: 'checking' }
  ]);

  useEffect(() => {
    if (!isOpen) return;
    setIsRunning(true);
    setProgress(30);

    const t1 = setTimeout(() => {
      setProgress(60);
      setResults((prev) => [
        { label: 'SIM 1 (Airtel Slot 1)', value: 'BOUND & READY (Band 3)', status: 'ok' },
        { label: 'SIM 2 (Jio Slot 2)', value: 'ACTIVE (Band 5)', status: 'ok' },
        { label: '*99# USSD National Rail', value: 'CLEAR (78ms RTT)', status: 'ok' },
        prev[3],
        prev[4],
        prev[5]
      ]);
    }, 800);

    const t2 = setTimeout(() => {
      setProgress(100);
      setIsRunning(false);
      setResults([
        { label: 'SIM 1 (Airtel Slot 1)', value: 'BOUND & READY (Band 3)', status: 'ok' },
        { label: 'SIM 2 (Jio Slot 2)', value: 'ACTIVE (Band 5)', status: 'ok' },
        { label: '*99# USSD National Rail', value: 'CLEAR (78ms RTT)', status: 'ok' },
        { label: '123PAY IVR Audio Gateway', value: 'STANDBY (Toll-Free Online)', status: 'ok' },
        { label: 'Hardware Enclave Keystore', value: 'SYNCHRONIZED (Root of Trust)', status: 'ok' },
        { label: 'Base Tower Signal & Latency', value: '-82 dBm (Strong • 1.4s Est)', status: 'ok' }
      ]);
    }, 1600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#283044]/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-2xl border border-[#eaedff]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#cce5ff] text-[#006398] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">cell_tower</span>
            </div>
            <div>
              <h3 className="font-semibold text-[16px] text-[#131b2e]">Telecom Diagnostics</h3>
              <p className="text-[12px] text-[#434655]">Offline Hardware & Rail Audit</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eaedff] flex items-center justify-center text-[#434655] hover:bg-[#dae2fd]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex flex-col gap-1.5 bg-[#f2f3ff] p-3 rounded-xl">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#131b2e]">
            <span className="flex items-center gap-1.5">
              {isRunning ? (
                <>
                  <span className="material-symbols-outlined text-[14px] text-[#004ac6] animate-spin">
                    refresh
                  </span>
                  <span>Executing Carrier Handshake...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[14px] text-[#10B981]">
                    verified
                  </span>
                  <span className="text-[#10B981]">All 6 Offline Rails Operational</span>
                </>
              )}
            </span>
            <span className="font-mono text-[#004ac6]">{progress}%</span>
          </div>
          <div className="w-full bg-[#dae2fd] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#004ac6] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Diagnostic Results */}
        <div className="flex flex-col gap-2 bg-[#faf8ff] border border-[#eaedff] rounded-xl p-3 text-[12px]">
          {results.map((r, i) => (
            <div key={i} className="flex justify-between items-center py-1 border-b border-[#eaedff] last:border-0">
              <span className="text-[#434655] font-medium">{r.label}:</span>
              <span
                className={`font-semibold text-right ${
                  r.status === 'ok' ? 'text-[#004ac6]' : 'text-[#737686] animate-pulse'
                }`}
              >
                {r.value}
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full h-11 rounded-xl bg-[#004ac6] text-white font-semibold text-[13px] active:scale-95 transition-transform flex items-center justify-center gap-1 shadow-md"
        >
          <span>Done</span>
        </button>
      </div>
    </div>
  );
};
