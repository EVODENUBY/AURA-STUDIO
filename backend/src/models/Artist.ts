import mongoose, { Schema, Document } from 'mongoose';
import { Artist } from '@shared/types';

export type ArtistDoc = Artist & Document;

const ArtistSchema = new Schema<ArtistDoc>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  title: { type: String, required: true },
  categories: [{ type: String, enum: ['lashes', 'tattoos'] }],
  bio: { type: String, required: true },
  avatar: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewCount: { type: Number, required: true },
  specialties: [{ type: String }],
  portfolioImages: [{ type: String }],
  workingDays: [{ type: String }],
  availableHours: [{ type: String }],
}, {
  timestamps: true,
});

export const ArtistModel = mongoose.model<ArtistDoc>('Artist', ArtistSchema);
