import React, { useState } from 'react';
import { Lock, KeyRound, ShieldCheck, X, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: (pin: string) => Promise<boolean>;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticate
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) return;

    setLoading(true);
    const success = await onAuthenticate(pin);
    setLoading(false);

    if (!success) {
      setError(true);
      setPin('');
    } else {
      setError(false);
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A1A]/80 backdrop-blur-md flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className={`border max-w-md w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 shadow-2xl relative my-auto transition-colors ${
        isDark ? 'bg-[#101010] border-[#2A2A2A] text-[#F7F5F0]' : 'bg-[#FAF9F6] border-[#1A1A1A] text-[#1A1A1A]'
      }`}>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 sm:top-6 sm:right-6 w-8 h-8 flex items-center justify-center text-xs font-bold transition-colors z-10 ${
            isDark ? 'text-[#888888] hover:text-[#F7F5F0]' : 'text-[#8C8A82] hover:text-[#1A1A1A]'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-3">
          <div className={`w-12 h-12 border mx-auto flex items-center justify-center ${
            isDark ? 'border-[#333333] bg-[#181818]' : 'border-[#D1CEC3] bg-[#EBE9E1]'
          }`}>
            <Lock className="w-6 h-6 text-[#C49A8D]" />
          </div>
          <span className={`text-[10px] uppercase tracking-[0.25em] font-bold block ${
            isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
          }`}>
            Restricted Area
          </span>
          <h3 className="font-serif text-2xl font-normal">AURA Studio Admin Access</h3>
          <p className={`text-xs ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'}`}>
            The Studio Portal is restricted to authorized AURA Studio managers and staff in Kigali.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-[10px] uppercase tracking-[0.2em] font-bold mb-2 ${
              isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
            }`}>
              Enter Admin PIN
            </label>
            <div className="relative">
              <KeyRound className={`w-4 h-4 absolute left-3.5 top-3.5 ${
                isDark ? 'text-[#777777]' : 'text-[#8C8A82]'
              }`} />
              <input
                type="password"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="PIN"
                autoFocus
                className={`w-full border pl-10 pr-4 py-3 text-sm focus:outline-none font-mono ${
                  isDark 
                    ? 'bg-[#181818] border-[#333333] text-[#F7F5F0] focus:border-[#F7F5F0]' 
                    : 'bg-[#FFFFFF] border-[#D1CEC3] text-[#1A1A1A] focus:border-[#1A1A1A]'
                }`}
              />
            </div>
            {error && (
              <div className="flex items-center gap-1.5 text-rose-500 text-xs mt-2 font-semibold">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Invalid admin PIN. Please try again.</span>
              </div>
            )}
          </div>

          <div className={`p-3 border text-[11px] leading-relaxed flex items-start gap-2 ${
            isDark ? 'bg-[#181818] border-[#2A2A2A] text-[#A3A3A3]' : 'bg-[#F2F1EC] border-[#E5E2D9] text-[#6B6961]'
          }`}>
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <span>Authorized staff can review bookings, collect balance payments, and update client appointment statuses.</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 text-[10px] uppercase tracking-[0.25em] font-bold transition-all shadow-md active:scale-95 disabled:opacity-50 ${
              isDark 
                ? 'bg-[#F7F5F0] hover:bg-[#E2DFD7] text-[#101010]' 
                : 'bg-[#1A1A1A] hover:bg-[#333333] text-[#FAF9F6]'
            }`}
          >
            {loading ? 'Verifying PIN...' : 'Authenticate'}
          </button>
        </form>
      </div>
    </div>
  );
};
