import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Gift, 
  Copy, 
  Check, 
  Share2, 
  Sparkles, 
  MessageSquare, 
  Mail, 
  Send, 
  QrCode, 
  Users, 
  Ticket, 
  X,
  Eye,
  Feather,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface ReferAFriendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReferAFriendModal: React.FC<ReferAFriendModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // State for user custom style profile
  const [clientName, setClientName] = useState<string>('Sophia Laurent');
  const [favLashCurl, setFavLashCurl] = useState<string>('CC-Curl Wispy Volume');
  const [favTattooStyle, setFavTattooStyle] = useState<string>('Single-Needle Botanical');
  const [favArtist, setFavArtist] = useState<string>('Elena Rostova (Master)');
  
  // Link state
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Referral code & URL generation
  const sanitizeName = clientName.trim().toUpperCase().replace(/[^A-Z0-9]/g, '') || 'SOPHIA';
  const refCode = `AURA-${sanitizeName}-20`;
  const shareableUrl = `https://aura-atelier.app/ref/${refCode}?style=${encodeURIComponent(favLashCurl)}`;

  // Mock Referral History
  const [referrals, setReferrals] = useState([
    { id: '1', friendName: 'Chloe M.', date: '2 days ago', status: 'Booked & Completed', reward: '$20 Credit Claimed', codeUsed: 'AURA-SOPHIA-20' },
    { id: '2', friendName: 'Jessica T.', date: '1 week ago', status: 'Booked & Completed', reward: '$20 Credit Claimed', codeUsed: 'AURA-SOPHIA-20' },
  ]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(refCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${clientName}'s AURA Atelier Style Profile`,
        text: `Use my referral link to get $20 OFF your first Lash or Fine-Line Ink appointment at AURA Atelier!`,
        url: shareableUrl,
      }).catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A1A]/85 backdrop-blur-sm flex items-start sm:items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className={`border max-w-2xl w-full max-h-[92vh] flex flex-col p-4 sm:p-6 md:p-8 space-y-4 shadow-2xl relative my-auto overflow-hidden transition-colors duration-300 ${
        isDark 
          ? 'bg-[#101010] border-[#2A2A2A] text-[#F7F5F0]' 
          : 'bg-[#FAF9F6] border-[#1A1A1A] text-[#1A1A1A]'
      }`}>
        
        {/* Top Header */}
        <div className={`flex items-center justify-between border-b pb-4 shrink-0 ${
          isDark ? 'border-[#262626]' : 'border-[#E5E2D9]'
        }`}>
          <div className="flex items-center gap-3 pr-8">
            <div className={`w-10 h-10 border flex items-center justify-center shrink-0 ${
              isDark ? 'bg-[#181818] border-[#333333] text-[#F7F5F0]' : 'bg-[#EBE9E1] border-[#1A1A1A] text-[#1A1A1A]'
            }`}>
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <span className={`text-[10px] uppercase tracking-[0.25em] block font-bold ${
                isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
              }`}>
                AURA Circle Program
              </span>
              <h3 className={`font-serif text-xl sm:text-2xl font-normal ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                Refer a Friend & Share Style
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-none border flex items-center justify-center text-sm font-bold transition-colors shrink-0 ${
              isDark ? 'bg-[#181818] border-[#333333] text-[#F7F5F0]' : 'bg-[#1A1A1A] border-[#1A1A1A] text-[#FAF9F6]'
            }`}
          >
            ✕
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-4 sm:space-y-6">

          <button
            onClick={onClose}
            className={`w-8 h-8 rounded-none flex items-center justify-center text-sm font-bold transition-colors ${
              isDark 
                ? 'bg-[#F7F5F0] text-[#101010] hover:bg-[#E0DDD5]' 
                : 'bg-[#1A1A1A] text-[#FAF9F6] hover:bg-[#333333]'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Incentive Highlight Banner */}
        <div className={`p-4 border flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isDark ? 'bg-[#181818] border-[#333333]' : 'bg-[#EBE9E1] border-[#D1CEC3]'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
              isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
            }`}>
              $20
            </div>
            <div>
              <span className={`text-[10px] uppercase font-bold tracking-wider block ${
                isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
              }`}>
                Double Reward Voucher
              </span>
              <p className={`text-xs ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'}`}>
                Give your friend <strong>$20 OFF</strong> their first session • Earn <strong>$20 Credit</strong> on your next fill or ink session.
              </p>
            </div>
          </div>

          <div className={`px-3 py-1.5 border text-center shrink-0 ${
            isDark ? 'bg-[#101010] border-[#333333]' : 'bg-[#FAF9F6] border-[#D1CEC3]'
          }`}>
            <span className={`text-[9px] uppercase tracking-wider block font-bold ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>Your Balance</span>
            <span className={`font-mono text-base font-bold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>$40 USD</span>
          </div>
        </div>

        {/* Customized Style Profile Card Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className={`text-[10px] uppercase tracking-[0.2em] font-bold block ${
              isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
            }`}>
              1. Customize Your Personal Style Profile Card
            </label>
            <span className={`text-[9px] uppercase ${isDark ? 'text-[#777777]' : 'text-[#8C8A82]'}`}>
              Included in share link
            </span>
          </div>

          <div className={`p-4 border space-y-3 ${
            isDark ? 'bg-[#141414] border-[#2A2A2A]' : 'bg-[#F5F4EF] border-[#E0DDD3]'
          }`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={`text-[9px] uppercase font-bold block mb-1 ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
                  Your Name
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className={`w-full p-2 text-xs font-semibold border focus:outline-none ${
                    isDark 
                      ? 'bg-[#101010] border-[#333333] text-[#F7F5F0] focus:border-[#F7F5F0]' 
                      : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A] focus:border-[#1A1A1A]'
                  }`}
                />
              </div>

              <div>
                <label className={`text-[9px] uppercase font-bold block mb-1 ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
                  Favorite Lash Style
                </label>
                <select
                  value={favLashCurl}
                  onChange={e => setFavLashCurl(e.target.value)}
                  className={`w-full p-2 text-xs font-semibold border focus:outline-none ${
                    isDark 
                      ? 'bg-[#101010] border-[#333333] text-[#F7F5F0] focus:border-[#F7F5F0]' 
                      : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A] focus:border-[#1A1A1A]'
                  }`}
                >
                  <option value="CC-Curl Wispy Volume">CC-Curl Wispy Volume</option>
                  <option value="C-Curl Natural Lash Lift">C-Curl Natural Lash Lift</option>
                  <option value="D-Curl Drama Cat Eye">D-Curl Drama Cat Eye</option>
                  <option value="L-Curl Wet Look Sets">L-Curl Wet Look Sets</option>
                </select>
              </div>

              <div>
                <label className={`text-[9px] uppercase font-bold block mb-1 ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
                  Favorite Tattoo Style
                </label>
                <select
                  value={favTattooStyle}
                  onChange={e => setFavTattooStyle(e.target.value)}
                  className={`w-full p-2 text-xs font-semibold border focus:outline-none ${
                    isDark 
                      ? 'bg-[#101010] border-[#333333] text-[#F7F5F0] focus:border-[#F7F5F0]' 
                      : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A] focus:border-[#1A1A1A]'
                  }`}
                >
                  <option value="Single-Needle Botanical">Single-Needle Botanical</option>
                  <option value="Micro-Script & Typography">Micro-Script & Typography</option>
                  <option value="Celestial & Geometric Lines">Celestial & Geometric Lines</option>
                  <option value="Fine Grey Wash Realism">Fine Grey Wash Realism</option>
                </select>
              </div>

              <div>
                <label className={`text-[9px] uppercase font-bold block mb-1 ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
                  Preferred Atelier Master Artist
                </label>
                <select
                  value={favArtist}
                  onChange={e => setFavArtist(e.target.value)}
                  className={`w-full p-2 text-xs font-semibold border focus:outline-none ${
                    isDark 
                      ? 'bg-[#101010] border-[#333333] text-[#F7F5F0] focus:border-[#F7F5F0]' 
                      : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A] focus:border-[#1A1A1A]'
                  }`}
                >
                  <option value="Elena Rostova (Master)">Elena Rostova (Master)</option>
                  <option value="Maya Lin (Lash Lead)">Maya Lin (Lash Lead)</option>
                  <option value="Kaelen Vance (Tattoo Lead)">Kaelen Vance (Tattoo Lead)</option>
                </select>
              </div>
            </div>

            {/* Profile Preview Tag */}
            <div className={`p-3 border flex items-center justify-between text-xs font-mono ${
              isDark ? 'bg-[#181818] border-[#2A2A2A]' : 'bg-[#FAF9F6] border-[#D1CEC3]'
            }`}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#C49A8D]" />
                <span>Card Preview: <strong>{clientName}</strong> recommends <strong>{favLashCurl}</strong> & <strong>{favTattooStyle}</strong></span>
              </div>
              <span className="text-[9px] font-bold text-[#C49A8D] uppercase">Verified Curator</span>
            </div>
          </div>
        </div>

        {/* Unique Link & Promo Code Section */}
        <div className="space-y-3">
          <label className={`text-[10px] uppercase tracking-[0.2em] font-bold block ${
            isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
          }`}>
            2. Your Unique Shareable Referral Link & Discount Code
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Promo Code Box */}
            <div className={`p-3 border flex flex-col justify-between ${
              isDark ? 'bg-[#181818] border-[#333333]' : 'bg-[#EBE9E1] border-[#D1CEC3]'
            }`}>
              <span className={`text-[9px] uppercase font-bold block ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
                Discount Code
              </span>
              <span className={`font-mono text-sm font-bold tracking-wider my-1 ${
                isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'
              }`}>
                {refCode}
              </span>
              <button
                onClick={handleCopyCode}
                className={`py-1.5 px-2 text-[9px] font-bold uppercase tracking-wider border flex items-center justify-center gap-1.5 transition-all ${
                  copiedCode
                    ? isDark ? 'bg-[#1F2E1F] text-[#81C784] border-[#2E4A2E]' : 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]'
                    : isDark ? 'bg-[#101010] hover:bg-[#222222] border-[#333333] text-[#F7F5F0]' : 'bg-[#FAF9F6] hover:bg-[#FAF9F6] border-[#1A1A1A] text-[#1A1A1A]'
                }`}
              >
                {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCode ? 'Code Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Link Input & Direct Copy */}
            <div className={`sm:col-span-2 p-3 border flex flex-col justify-between ${
              isDark ? 'bg-[#181818] border-[#333333]' : 'bg-[#EBE9E1] border-[#D1CEC3]'
            }`}>
              <span className={`text-[9px] uppercase font-bold block ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
                Direct Style Profile URL
              </span>
              <div className="my-1 overflow-x-auto whitespace-nowrap">
                <span className={`font-mono text-xs ${isDark ? 'text-[#A3A3A3]' : 'text-[#6B6961]'}`}>
                  {shareableUrl}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className={`flex-1 py-1.5 px-3 text-[9px] font-bold uppercase tracking-wider border flex items-center justify-center gap-1.5 transition-all ${
                    copiedLink
                      ? isDark ? 'bg-[#1F2E1F] text-[#81C784] border-[#2E4A2E]' : 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]'
                      : isDark ? 'bg-[#F7F5F0] text-[#101010] border-[#F7F5F0] hover:bg-[#E2DFD7]' : 'bg-[#1A1A1A] text-[#FAF9F6] border-[#1A1A1A] hover:bg-[#333333]'
                  }`}
                >
                  {copiedLink ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Copy Share Link'}</span>
                </button>

                <button
                  onClick={handleNativeShare}
                  className={`py-1.5 px-3 text-[9px] font-bold uppercase tracking-wider border flex items-center justify-center gap-1 transition-all ${
                    isDark ? 'bg-[#101010] hover:bg-[#222222] border-[#333333] text-[#F7F5F0]' : 'bg-[#FAF9F6] hover:bg-[#EBE9E1] border-[#1A1A1A] text-[#1A1A1A]'
                  }`}
                  title="Share via native app"
                >
                  <Share2 className="w-3 h-3" />
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Social & Direct Share Options */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Hey! Here is $20 OFF your first Lash or Fine-Line Ink session at AURA Atelier. View my style profile here: ${shareableUrl}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2.5 border text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              isDark ? 'bg-[#181818] border-[#333333] hover:border-[#F7F5F0] text-[#F7F5F0]' : 'bg-[#FAF9F6] border-[#D1CEC3] hover:border-[#1A1A1A] text-[#1A1A1A]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`sms:?&body=${encodeURIComponent(`Check out my AURA Atelier style profile and get $20 OFF your first reservation: ${shareableUrl}`)}`}
            className={`p-2.5 border text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              isDark ? 'bg-[#181818] border-[#333333] hover:border-[#F7F5F0] text-[#F7F5F0]' : 'bg-[#FAF9F6] border-[#D1CEC3] hover:border-[#1A1A1A] text-[#1A1A1A]'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>iMessage / SMS</span>
          </a>

          <a
            href={`mailto:?subject=${encodeURIComponent(`${clientName} invited you to AURA Atelier ($20 Gift)`)}&body=${encodeURIComponent(`Hi!\n\nI wanted to invite you to AURA Lash & Fine-Line Ink Atelier. You can claim $20 OFF your first appointment using my style profile link below:\n\n${shareableUrl}\n\nPromo Code: ${refCode}`)}`}
            className={`p-2.5 border text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              isDark ? 'bg-[#181818] border-[#333333] hover:border-[#F7F5F0] text-[#F7F5F0]' : 'bg-[#FAF9F6] border-[#D1CEC3] hover:border-[#1A1A1A] text-[#1A1A1A]'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>

          <button
            onClick={handleCopyLink}
            className={`p-2.5 border text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              isDark ? 'bg-[#181818] border-[#333333] hover:border-[#F7F5F0] text-[#F7F5F0]' : 'bg-[#FAF9F6] border-[#D1CEC3] hover:border-[#1A1A1A] text-[#1A1A1A]'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>QR Code Link</span>
          </button>
        </div>

        {/* Live Referral Log & Claims */}
        <div className="space-y-3 pt-2 border-t border-dashed border-[#8C8A82]/30">
          <div className="flex items-center justify-between">
            <span className={`text-[10px] uppercase tracking-[0.2em] font-bold block ${
              isDark ? 'text-[#888888]' : 'text-[#8C8A82]'
            }`}>
              Your Referral Activity & Claimed Rewards
            </span>
            <span className={`text-[10px] font-mono font-bold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
              2 Successful Referrals
            </span>
          </div>

          <div className="space-y-2">
            {referrals.map(ref => (
              <div
                key={ref.id}
                className={`p-3 border flex items-center justify-between text-xs ${
                  isDark ? 'bg-[#141414] border-[#222222]' : 'bg-[#FAF9F6] border-[#E5E2D9]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isDark ? 'bg-[#1F2E1F] text-[#81C784]' : 'bg-[#E8F5E9] text-[#2E7D32]'
                  }`}>
                    ✓
                  </div>
                  <div>
                    <span className={`font-bold block ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>{ref.friendName}</span>
                    <span className={`text-[9px] uppercase ${isDark ? 'text-[#777777]' : 'text-[#8C8A82]'}`}>{ref.date} • Code {ref.codeUsed}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 border ${
                    isDark ? 'bg-[#1F2E1F] text-[#81C784] border-[#2E4A2E]' : 'bg-[#E8F5E9] text-[#2E7D32] border-[#A5D6A7]'
                  }`}>
                    {ref.reward}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
