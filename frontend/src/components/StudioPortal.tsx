import React, { useState } from 'react';
import { Booking } from '../types';
import { LayoutDashboard, Calendar, DollarSign, UserCheck, Eye, Feather, Search, Filter, CheckCircle2, XCircle, Clock, FileText, LogOut, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface StudioPortalProps {
  bookings: Booking[];
  onUpdateBookingStatus: (id: string, status: 'confirmed' | 'completed' | 'cancelled') => void;
  onLogoutAdmin?: () => void;
}

export const StudioPortal: React.FC<StudioPortalProps> = ({
  bookings,
  onUpdateBookingStatus,
  onLogoutAdmin
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const totalDeposits = bookings.reduce((sum, b) => sum + (b.status !== 'cancelled' ? b.depositPaid : 0), 0);
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.status !== 'cancelled' ? b.totalPrice : 0), 0);
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;

  const filteredBookings = bookings.filter(b => {
    if (filterCategory !== 'all' && b.category !== filterCategory) return false;
    if (filterStatus !== 'all' && b.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return b.bookingRef.toLowerCase().includes(q) ||
             b.clientName.toLowerCase().includes(q) ||
             b.artistName.toLowerCase().includes(q) ||
             b.clientEmail.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <section className={`py-12 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-300 ${
      isDark 
        ? 'bg-[#101010] text-[#F7F5F0] border-[#262626]' 
        : 'bg-[#FAF9F6] text-[#1A1A1A] border-[#E5E2D9]'
    }`}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 ${
          isDark ? 'border-[#262626]' : 'border-[#E5E2D9]'
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-[0.2em] ${
                isDark ? 'bg-[#F7F5F0] text-[#101010]' : 'bg-[#1A1A1A] text-[#FAF9F6]'
              }`}>
                Management Portal
              </span>
              <span className={`text-xs font-semibold flex items-center gap-1 ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>• Studio Admin Mode</span>
              </span>
            </div>
            <h2 className={`font-serif text-3xl font-normal mt-1 ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
              Atelier Appointment Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            {onLogoutAdmin && (
              <button
                onClick={onLogoutAdmin}
                className={`flex items-center gap-2 px-3.5 py-3 border text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${
                  isDark ? 'border-[#333333] hover:bg-[#222222] text-[#F7F5F0]' : 'border-[#D1CEC3] hover:bg-[#EBE9E1] text-[#1A1A1A]'
                }`}
                title="Lock Studio Admin Session"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Lock Admin</span>
              </button>
            )}

            <div className={`p-3 border ${
              isDark ? 'bg-[#181818] border-[#333333]' : 'bg-[#EBE9E1] border-[#D1CEC3]'
            }`}>
              <span className={`block text-[9px] uppercase font-bold ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
                Deposits Collected
              </span>
              <span className={`font-bold text-base ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                ${totalDeposits} USD
              </span>
            </div>
            <div className={`p-3 border ${
              isDark ? 'bg-[#181818] border-[#333333]' : 'bg-[#EBE9E1] border-[#D1CEC3]'
            }`}>
              <span className={`block text-[9px] uppercase font-bold ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
                Est. Total Revenue
              </span>
              <span className={`font-bold text-base ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
                ${totalRevenue} USD
              </span>
            </div>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className={`p-5 border ${isDark ? 'bg-[#181818] border-[#2A2A2A]' : 'bg-[#FAF9F6] border-[#E5E2D9]'}`}>
            <span className={`text-[10px] uppercase tracking-wider font-bold block ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
              Active Confirmed
            </span>
            <span className={`font-serif text-2xl font-normal mt-1 block ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
              {confirmedCount}
            </span>
          </div>

          <div className={`p-5 border ${isDark ? 'bg-[#181818] border-[#2A2A2A]' : 'bg-[#FAF9F6] border-[#E5E2D9]'}`}>
            <span className={`text-[10px] uppercase tracking-wider font-bold block ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
              Completed Sessions
            </span>
            <span className={`font-serif text-2xl font-normal mt-1 block ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
              {completedCount}
            </span>
          </div>

          <div className={`p-5 border ${isDark ? 'bg-[#181818] border-[#2A2A2A]' : 'bg-[#FAF9F6] border-[#E5E2D9]'}`}>
            <span className={`text-[10px] uppercase tracking-wider font-bold block ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
              Lash Appointments
            </span>
            <span className={`font-serif text-2xl font-normal mt-1 block ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
              {bookings.filter(b => b.category === 'lashes' && b.status !== 'cancelled').length}
            </span>
          </div>

          <div className={`p-5 border ${isDark ? 'bg-[#181818] border-[#2A2A2A]' : 'bg-[#FAF9F6] border-[#E5E2D9]'}`}>
            <span className={`text-[10px] uppercase tracking-wider font-bold block ${isDark ? 'text-[#888888]' : 'text-[#8C8A82]'}`}>
              Ink Appointments
            </span>
            <span className={`font-serif text-2xl font-normal mt-1 block ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>
              {bookings.filter(b => b.category === 'tattoos' && b.status !== 'cancelled').length}
            </span>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className={`p-4 border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 ${
          isDark ? 'bg-[#181818] border-[#333333]' : 'bg-[#EBE9E1] border-[#D1CEC3]'
        }`}>
          <div className="relative flex-1">
            <Search className={`w-4 h-4 absolute left-3.5 top-3 ${isDark ? 'text-[#777777]' : 'text-[#8C8A82]'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by client name, email, artist, or ref code..."
              className={`w-full border pl-10 pr-4 py-2 text-xs focus:outline-none ${
                isDark 
                  ? 'bg-[#101010] border-[#333333] text-[#F7F5F0] focus:border-[#F7F5F0]' 
                  : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A] focus:border-[#1A1A1A]'
              }`}
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className={`border px-3 py-2 text-xs font-semibold ${
                isDark 
                  ? 'bg-[#101010] border-[#333333] text-[#F7F5F0]' 
                  : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A]'
              }`}
            >
              <option value="all">All Categories</option>
              <option value="lashes">Eye Lashes Only</option>
              <option value="tattoos">Fine-Line Tattoos Only</option>
            </select>

            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className={`border px-3 py-2 text-xs font-semibold ${
                isDark 
                  ? 'bg-[#101010] border-[#333333] text-[#F7F5F0]' 
                  : 'bg-[#FAF9F6] border-[#D1CEC3] text-[#1A1A1A]'
              }`}
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Appointments Table */}
        <div className={`border overflow-hidden ${isDark ? 'bg-[#101010] border-[#2A2A2A]' : 'bg-[#FAF9F6] border-[#1A1A1A]'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`uppercase text-[9px] tracking-[0.2em] border-b ${
                isDark 
                  ? 'bg-[#181818] text-[#F7F5F0] border-[#2A2A2A]' 
                  : 'bg-[#EBE9E1] text-[#1A1A1A] border-[#D1CEC3]'
              }`}>
                <tr>
                  <th className="py-3.5 px-4 font-bold">Ref Code</th>
                  <th className="py-3.5 px-4 font-bold">Client</th>
                  <th className="py-3.5 px-4 font-bold">Service & Specs</th>
                  <th className="py-3.5 px-4 font-bold">Artist</th>
                  <th className="py-3.5 px-4 font-bold">Date & Time</th>
                  <th className="py-3.5 px-4 font-bold">Deposit</th>
                  <th className="py-3.5 px-4 font-bold">Status</th>
                  <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${
                isDark ? 'divide-[#222222] text-[#F7F5F0]' : 'divide-[#E5E2D9] text-[#1A1A1A]'
              }`}>
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={8} className={`py-8 text-center ${isDark ? 'text-[#777777]' : 'text-[#8C8A82]'}`}>
                      No appointments match the current filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map(b => (
                    <tr key={b.id} className={`transition-colors ${isDark ? 'hover:bg-[#181818]' : 'hover:bg-[#F2F1EC]'}`}>
                      <td className={`py-4 px-4 font-mono font-bold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>{b.bookingRef}</td>
                      <td className="py-4 px-4">
                        <span className={`font-bold block ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>{b.clientName}</span>
                        <span className={`text-[10px] block ${isDark ? 'text-[#888888]' : 'text-[#6B6961]'}`}>{b.clientPhone}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`font-semibold block ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>{b.serviceTitle}</span>
                        <span className={`text-[10px] block ${isDark ? 'text-[#888888]' : 'text-[#6B6961]'}`}>
                          {b.category === 'lashes' && b.lashSpecs ? `${b.lashSpecs.curl} • ${b.lashSpecs.lengthRange}` : ''}
                          {b.category === 'tattoos' && b.tattooSpecs ? `${b.tattooSpecs.placement} • ${b.tattooSpecs.approxSizeInches}` : ''}
                        </span>
                      </td>
                      <td className={`py-4 px-4 font-semibold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>{b.artistName}</td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`block font-semibold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>{b.appointmentDate}</span>
                        <span className={`text-[10px] block ${isDark ? 'text-[#888888]' : 'text-[#6B6961]'}`}>{b.appointmentTime}</span>
                      </td>
                      <td className="py-4 px-4 font-mono">
                        <span className={`font-bold ${isDark ? 'text-[#F7F5F0]' : 'text-[#1A1A1A]'}`}>${b.depositPaid} USD</span>
                        <span className={`text-[10px] block ${isDark ? 'text-[#888888]' : 'text-[#6B6961]'}`}>of ${b.totalPrice}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] border ${
                          b.status === 'confirmed'
                            ? isDark ? 'bg-[#F7F5F0] text-[#101010] border-[#F7F5F0]' : 'bg-[#1A1A1A] text-[#FAF9F6] border-[#1A1A1A]'
                            : b.status === 'completed'
                            ? isDark ? 'bg-[#222222] text-[#A3A3A3] border-[#333333]' : 'bg-[#EBE9E1] text-[#1A1A1A] border-[#D1CEC3]'
                            : isDark ? 'bg-[#101010] text-[#666666] border-[#222222] line-through' : 'bg-[#FAF9F6] text-[#8C8A82] border-[#D1CEC3] line-through'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {b.status === 'confirmed' && (
                            <button
                              onClick={() => onUpdateBookingStatus(b.id, 'completed')}
                              className={`px-2.5 py-1 text-[9px] uppercase tracking-wider font-bold ${
                                isDark 
                                  ? 'bg-[#F7F5F0] hover:bg-[#E0DDD5] text-[#101010]' 
                                  : 'bg-[#1A1A1A] hover:bg-[#333333] text-[#FAF9F6]'
                              }`}
                            >
                              Complete
                            </button>
                          )}
                          {b.status !== 'cancelled' && (
                            <button
                              onClick={() => onUpdateBookingStatus(b.id, 'cancelled')}
                              className={`px-2.5 py-1 text-[9px] uppercase tracking-wider font-bold ${
                                isDark 
                                  ? 'bg-[#222222] hover:bg-[#333333] text-[#F7F5F0]' 
                                  : 'bg-[#EBE9E1] hover:bg-[#D1CEC3] text-[#1A1A1A]'
                              }`}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};

