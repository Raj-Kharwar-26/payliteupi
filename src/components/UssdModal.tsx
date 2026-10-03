import React, { useState } from 'react';

interface UssdModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  sessionCode?: string;
  promptText?: string;
  isInputMode?: boolean;
  onConfirm?: (inputVal: string) => void;
  defaultInput?: string;
  confirmBtnText?: string;
}

export const UssdModal: React.FC<UssdModalProps> = ({
  isOpen,
  onClose,
  title = 'SIM 1 USSD Query',
  sessionCode = '*99*1*1#',
  promptText = 'Connecting directly to NPCI Switch...',
  isInputMode = false,
  onConfirm,
  defaultInput = '',
  confirmBtnText = 'Call Carrier'
}) => {
  const [val, setVal] = useState(defaultInput);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleAction = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (onConfirm) {
        onConfirm(val);
      } else {
        onClose();
      }
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-[#283044]/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-2xl border border-[#eaedff]">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#eaedff] flex items-center justify-center text-[#004ac6] flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]">ring_volume</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-[16px] text-[#131b2e]">{title}</h4>
            <p className="text-[12px] text-[#434655] truncate">{promptText}</p>
          </div>
        </div>

        {/* Telecom Box */}
        <div className="bg-[#f2f3ff] rounded-xl p-4 flex flex-col gap-2 text-center font-mono text-[#131b2e]">
          <span className="text-[11px] text-[#434655] font-sans uppercase tracking-wider font-semibold">
            Handset Telecom Session
          </span>
          <span className="font-bold text-[22px] text-[#004ac6] tracking-widest">
            {sessionCode}
          </span>
          <span className="text-[12px] text-[#434655] font-sans">
            Encrypted GSM tunnel processed by base-tower transceiver.
          </span>

          {isInputMode && (
            <div className="mt-2 text-left font-sans">
              <label className="text-[11px] font-semibold text-[#434655] block mb-1">
                Enter Bank UPI PIN / Response:
              </label>
              <input
                type="password"
                maxLength={6}
                value={val}
                onChange={(e) => setVal(e.target.value)}
                placeholder="4 or 6-digit PIN"
                autoFocus
                className="w-full h-11 px-3 bg-white border border-[#c3c6d7] rounded-lg text-center font-mono text-[20px] tracking-widest text-[#131b2e] focus:border-[#2563eb] focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 h-11 rounded-xl bg-[#eaedff] text-[#131b2e] font-semibold text-[13px] active:bg-[#dae2fd] transition-colors"
          >
            Dismiss
          </button>
          <button
            type="button"
            onClick={handleAction}
            disabled={isProcessing}
            className="flex-1 h-11 rounded-xl bg-[#004ac6] text-white font-semibold text-[13px] active:scale-95 transition-transform flex items-center justify-center gap-1.5 shadow-md"
          >
            {isProcessing ? (
              <span className="material-symbols-outlined text-[18px] animate-spin">
                progress_activity
              </span>
            ) : (
              confirmBtnText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
