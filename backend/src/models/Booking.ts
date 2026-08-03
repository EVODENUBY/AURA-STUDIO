import mongoose, { Schema, Document } from 'mongoose';
import { Booking } from '@shared/types';

export type BookingDoc = Booking & Document;

const LashSpecsSchema = new Schema({
  curl: { type: String },
  lengthRange: { type: String },
  density: { type: String },
  mappingStyle: { type: String },
}, { _id: false });

const TattooSpecsSchema = new Schema({
  placement: { type: String },
  approxSizeInches: { type: String },
  styleCategory: { type: String },
  inkColor: { type: String },
}, { _id: false });

const BookingSchema = new Schema<BookingDoc>({
  id: { type: String, required: true, unique: true },
  bookingRef: { type: String, required: true, unique: true },
  serviceId: { type: String, required: true },
  serviceTitle: { type: String, required: true },
  category: { type: String, enum: ['lashes', 'tattoos'], required: true },
  artistId: { type: String, required: true },
  artistName: { type: String, required: true },
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  clientPhone: { type: String, required: true },
  appointmentDate: { type: String, required: true },
  appointmentTime: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  depositPaid: { type: Number, required: true },
  depositStatus: { type: String, enum: ['paid', 'pending', 'refunded'], default: 'paid' },
  status: { type: String, enum: ['confirmed', 'completed', 'cancelled'], default: 'confirmed' },
  lashSpecs: { type: LashSpecsSchema },
  tattooSpecs: { type: TattooSpecsSchema },
  clientNotes: { type: String },
  healthConsentsAccepted: { type: Boolean, required: true, default: false },
  createdAt: { type: String, required: true },
}, {
  timestamps: true,
});

BookingSchema.index({ artistId: 1, appointmentDate: 1, appointmentTime: 1 });

export const BookingModel = mongoose.model<BookingDoc>('Booking', BookingSchema);
