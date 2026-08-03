import React, { useState } from 'react';
import { Booking } from '../types';
import { Search, Calendar, Clock, User, QrCode, Trash2, CheckCircle2, ShieldAlert, ArrowLeft } from 'lucide-react';

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
}

export const MyBookingsModal: React.FC<MyBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onCancelBooking
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  if (!isOpen) return null;

  const filteredBookings = bookings.filter(b => 
    !searchQuery.trim() ||
    b.bookingRef.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
    b.clientPhone.includes(searchQuery.trim()) ||
    b.clientEmail.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
    b.clientName.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div className="fixed inset-0 z-50 bg-[#1A1A1A]/80 backdrop-blur-sm flex items-start sm:items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
      <div className="bg-[#FAF9F6] border border-[#1A1A1A] max-w-2xl w-full max-h-[92vh] flex flex-col p-4 sm:p-6 md:p-8 space-y-4 text-[#1A1A1A] shadow-lg relative my-auto overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E5E2D9] pb-4 shrink-0">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C8A82] block font-bold">
              Client Portal
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1A1A1A]">
              My Studio Pass & Appointments
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-none bg-[#1A1A1A] text-[#FAF9F6] flex items-center justify-center text-sm font-bold hover:bg-[#333333] shrink-0"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 pr-1 space-y-4 sm:space-y-6">

        {/* Search Input */}
        {!selectedBooking && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8C8A82] absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by AURA-XXXX reference code, phone number, or email..."
                className="w-full bg-[#FAF9F6] border border-[#D1CEC3] pl-11 pr-4 py-3 text-xs text-[#1A1A1A] placeholder-[#8C8A82] font-semibold focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>

            {/* List of Bookings */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#8C8A82] font-medium">
                  No matching active atelier passes found.
                </div>
              ) : (
                filteredBookings.map(b => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBooking(b)}
                    className="p-4 bg-[#EBE9E1] border border-[#D1CEC3] hover:border-[#1A1A1A] cursor-pointer transition-all flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-base text-[#1A1A1A] font-medium">{b.serviceTitle}</span>
                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase ${
                          b.status === 'confirmed' ? 'bg-[#1A1A1A] text-[#FAF9F6]' : 'bg-[#D1CEC3] text-[#1A1A1A]'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                      <div className="text-xs text-[#6B6961] flex items-center gap-3 font-semibold">
                        <span>Ref: <strong className="text-[#1A1A1A] font-mono">{b.bookingRef}</strong></span>
                        <span>•</span>
                        <span>{b.appointmentDate} at {b.appointmentTime}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono text-[#1A1A1A] font-bold block">${b.totalPrice} USD</span>
                      <span className="text-[10px] text-[#8C8A82] uppercase font-bold block">Artist: {b.artistName}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Selected Pass View */}
        {selectedBooking && (
          <div className="space-y-6">
            <button
              onClick={() => setSelectedBooking(null)}
              className="flex items-center gap-2 text-xs text-[#1A1A1A] font-bold uppercase tracking-wider hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all passes</span>
            </button>

            <div className="bg-[#EBE9E1] p-6 border border-[#1A1A1A] space-y-4">
              <div className="flex items-center justify-between border-b border-[#D1CEC3] pb-3">
                <div>
                  <span className="text-[9px] text-[#8C8A82] uppercase block font-bold">Studio Pass</span>
                  <h4 className="font-serif text-xl text-[#1A1A1A] font-normal">{selectedBooking.serviceTitle}</h4>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[#1A1A1A] text-lg font-bold">{selectedBooking.bookingRef}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[9px] text-[#8C8A82] uppercase block font-bold">Client Name</span>
                  <span className="text-[#1A1A1A] font-semibold">{selectedBooking.clientName}</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#8C8A82] uppercase block font-bold">Master Artist</span>
                  <span className="text-[#1A1A1A] font-semibold">{selectedBooking.artistName}</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#8C8A82] uppercase block font-bold">Date & Time</span>
                  <span className="text-[#1A1A1A] font-semibold">{selectedBooking.appointmentDate} at {selectedBooking.appointmentTime}</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#8C8A82] uppercase block font-bold">Deposit Status</span>
                  <span className="text-[#1A1A1A] font-bold uppercase">Paid (${selectedBooking.depositPaid} USD)</span>
                </div>
              </div>

              {selectedBooking.lashSpecs && (
                <div className="bg-[#FAF9F6] p-3 border border-[#D1CEC3] text-xs text-[#6B6961]">
                  <span className="text-[#1A1A1A] font-bold block text-[9px] uppercase mb-1">Lash Specifications</span>
                  Curl: {selectedBooking.lashSpecs.curl} • Length: {selectedBooking.lashSpecs.lengthRange} • Style: {selectedBooking.lashSpecs.mappingStyle}
                </div>
              )}

              {selectedBooking.tattooSpecs && (
                <div className="bg-[#FAF9F6] p-3 border border-[#D1CEC3] text-xs text-[#6B6961]">
                  <span className="text-[#1A1A1A] font-bold block text-[9px] uppercase mb-1">Tattoo Placement Specs</span>
                  Placement: {selectedBooking.tattooSpecs.placement} • Size: {selectedBooking.tattooSpecs.approxSizeInches} • Tone: {selectedBooking.tattooSpecs.inkColor}
                </div>
              )}
            </div>

            {/* Actions */}
            {selectedBooking.status === 'confirmed' && (
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    onCancelBooking(selectedBooking.id);
                    setSelectedBooking(null);
                  }}
                  className="px-4 py-2.5 bg-[#1A1A1A] hover:bg-[#333333] text-[#FAF9F6] text-[10px] font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Cancel Reservation</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#EBE9E1] hover:bg-[#D1CEC3] border border-[#1A1A1A] text-[#1A1A1A] font-bold text-[10px] uppercase tracking-wider"
                >
                  Close Pass
                </button>
              </div>
            )}
          </div>
        )}

        </div>
      </div>
    </div>
  );
};
