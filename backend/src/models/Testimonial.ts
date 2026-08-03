import mongoose, { Schema, Document } from 'mongoose';
import { Testimonial } from '@shared/types';

export type TestimonialDoc = Testimonial & Document;

const TestimonialSchema = new Schema<TestimonialDoc>({
  id: { type: String, required: true, unique: true },
  clientName: { type: String, required: true },
  clientAvatar: { type: String, required: true },
  verifiedClient: { type: Boolean, default: true },
  category: { type: String, enum: ['lashes', 'tattoos'], required: true },
  serviceId: { type: String, required: true },
  serviceTitle: { type: String, required: true },
  artistId: { type: String, required: true },
  artistName: { type: String, required: true },
  rating: { type: Number, required: true },
  date: { type: String, required: true },
  quote: { type: String, required: true },
  vibeTag: { type: String, required: true },
  specsSummary: { type: String, required: true },
  beforeAfterId: { type: String },
}, {
  timestamps: true,
});

export const TestimonialModel = mongoose.model<TestimonialDoc>('Testimonial', TestimonialSchema);
