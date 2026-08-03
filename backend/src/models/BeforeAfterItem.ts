import mongoose, { Schema, Document } from 'mongoose';
import { BeforeAfterItem } from '@shared/types';

export type BeforeAfterDoc = BeforeAfterItem & Document;

const BeforeAfterSchema = new Schema<BeforeAfterDoc>({
  id: { type: String, required: true, unique: true },
  category: { type: String, enum: ['lashes', 'tattoos'], required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  serviceId: { type: String, required: true },
  artistId: { type: String, required: true },
  artistName: { type: String, required: true },
  specs: { type: String, required: true },
  beforeImage: { type: String, required: true },
  afterImage: { type: String, required: true },
  description: { type: String, required: true },
  clientQuote: { type: String },
}, {
  timestamps: true,
});

export const BeforeAfterModel = mongoose.model<BeforeAfterDoc>('BeforeAfter', BeforeAfterSchema);
