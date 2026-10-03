import React, { useState, useEffect } from 'react';

interface VoiceCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchantName?: string;
  amount?: number;
  onPaymentSuccess?: () => void;
}

export const VoiceCallModal: React.FC<VoiceCallModalProps> = ({
  isOpen,
  onClose,
  merchantName = 'Ramesh Kirana Store',
  amount = 120,
  onPaymentSuccess
}) => {
  const [seconds, setSeconds] = useState(0);
  const [pinDigits, setPinDigits] = useState('');
  const [isKeypadVisible, setIsKeypadVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [ivrStep, setIvrStep] = useState<'prompt' | 'pin' | 'verifying' | 'success'>('prompt');

  useEffect(() => {
    if (!isOpen) {
      setSeconds(0);
      setPinDigits('');
      setIvrStep('prompt');
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    const stepTimer = setTimeout(() => {
      setIvrStep('pin');
    }, 2500);

    return () => {
      clearInterval(timer);
      clearTimeout(stepTimer);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const formatDuration = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleKeyPress = (digit: string) => {
    if (pinDigits.length < 6) {
      const next = pinDigits + digit;
      setPinDigits(next);
      if (next.length >= 4) {
        setIvrStep('verifying');
        setTimeout(() => {
          setIvrStep('success');
          setTimeout(() => {
            if (onPaymentSuccess) {
              onPaymentSuccess();
            } else {
              onClose();
            }
          }, 1500);
        }, 1200);
      }
    }
  };

  const handleDeleteDigit = () => {
    setPinDigits((prev) => prev.slice(0, -1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-fade-in text-white">
      <div className="w-full max-w-sm bg-[#0B0F19] rounded-3xl p-6 flex flex-col justify-between min-h-[580px] border border-[#1E293B] shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#006398]/30 rounded-full blur-3xl pointer-events-none" />

        {/* Call Info Header */}
        <div className="flex flex-col items-center text-center pt-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#131B2E] border border-[#1E293B] text-[11px] font-semibold text-[#5bb8fe] uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span>123PAY IVR Audio Rail Active</span>
          </div>

          <h2 className="text-[20px] font-bold tracking-tight text-white">
            NPCI 123PAY National IVR
          </h2>
          <p className="text-[13px] text-[#94a3b8] font-mono mt-0.5">Toll-Free: 080-4516-3666</p>
          <span className="text-[12px] font-mono text-[#5bb8fe] mt-1 font-semibold">
            {formatDuration(seconds)}
          </span>
        </div>

        {/* Audio Wave & Interactive Prompt Voice Simulation */}
        <div className="my-auto py-3 flex flex-col items-center text-center relative z-10">
          {/* Animated Waveform */}
          <div className="flex items-center gap-1.5 h-10 mb-4">
            {[4, 8, 14, 24, 32, 20, 28, 12, 6, 18, 26, 10, 4].map((h, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-[#5bb8fe] animate-pulse"
                style={{
                  height: `${h}px`,
                  animationDuration: `${0.6 + (i % 4) * 0.2}s`
                }}
              />
            ))}
          </div>

          <div className="bg-[#131B2E] border border-[#1E293B] rounded-2xl p-4 w-full shadow-inner">
            <div className="flex items-center justify-between text-[11px] text-[#94a3b8] uppercase font-semibold mb-2">
              <span>Voice Prompt (Hindi / English)</span>
              <span className="text-[#5bb8fe]">Audio Live</span>
            </div>

            {ivrStep === 'prompt' && (
              <p className="text-[13px] text-white leading-relaxed font-medium animate-pulse">
                "PayLite 123PAY में स्वागत है। {merchantName} को ₹{amount} का भुगतान करने के लिए
                कीपैड पर अपना 4 या 6 अंकों का UPI PIN दर्ज करें।"
              </p>
            )}

            {ivrStep === 'pin' && (
              <div className="flex flex-col items-center gap-2">
                <p className="text-[13px] text-white font-medium">
                  Enter UPI PIN on keypad for ₹{amount}
                </p>
                <div className="flex gap-2 my-1">
                  {[0, 1, 2, 3].map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-4 h-4 rounded-full border border-[#5bb8fe] flex items-center justify-center transition-all ${
                        pinDigits.length > idx ? 'bg-[#5bb8fe] scale-110' : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {ivrStep === 'verifying' && (
              <div className="flex items-center justify-center gap-2 text-[#5bb8fe] py-2">
                <span className="material-symbols-outlined text-[20px] animate-spin">
                  progress_activity
                </span>
                <span className="text-[13px] font-semibold">Dual-Tone DTMF Verifying...</span>
              </div>
            )}

            {ivrStep === 'success' && (
              <div className="flex items-center justify-center gap-2 text-[#10B981] py-2">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span className="text-[13px] font-bold">123PAY Authorization Succeeded!</span>
              </div>
            )}
          </div>
        </div>

        {/* DTMF Keypad Grid */}
        {isKeypadVisible && (
          <div className="grid grid-cols-3 gap-2.5 max-w-[280px] mx-auto w-full mb-4">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => handleKeyPress(key)}
                className="h-11 rounded-xl bg-[#131B2E] border border-[#1E293B] text-[18px] font-bold text-white hover:bg-[#1E293B] active:bg-[#2563eb] active:scale-95 transition-all shadow-sm"
              >
                {key}
              </button>
            ))}
          </div>
        )}

        {/* Call Controls */}
        <div className="flex items-center justify-around pt-2 border-t border-[#1E293B]">
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
              isMuted ? 'bg-[#ba1a1a] text-white' : 'bg-[#131B2E] text-white hover:bg-[#1E293B]'
            }`}
            title="Mute"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isMuted ? 'mic_off' : 'mic'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsKeypadVisible(!isKeypadVisible)}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
              isKeypadVisible ? 'bg-[#2563eb] text-white' : 'bg-[#131B2E] text-white hover:bg-[#1E293B]'
            }`}
            title="Toggle Keypad"
          >
            <span className="material-symbols-outlined text-[20px]">dialpad</span>
          </button>

          <button
            type="button"
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
              isSpeaker ? 'bg-[#00759f] text-white' : 'bg-[#131B2E] text-white hover:bg-[#1E293B]'
            }`}
            title="Speaker"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isSpeaker ? 'volume_up' : 'volume_down'}
            </span>
          </button>

          {/* End Call Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shadow-lg active:scale-95 hover:bg-[#93000a] transition-all"
            title="End Call"
          >
            <span className="material-symbols-outlined text-[24px]">call_end</span>
          </button>
        </div>
      </div>
    </div>
  );
};
