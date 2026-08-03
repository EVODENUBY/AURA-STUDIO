import mongoose, { Schema, Document } from 'mongoose';
import { Service } from '@shared/types';

export type ServiceDoc = Service & Document;

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

const ServiceSchema = new Schema<ServiceDoc>({
  id: { type: String, required: true, unique: true },
  category: { type: String, enum: ['lashes', 'tattoos'], required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  price: { type: Number, required: true },
  depositAmount: { type: Number, required: true },
  durationMinutes: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  popular: { type: Boolean, default: false },
  tags: [{ type: String }],
  features: [{ type: String }],
  defaultLashSpecs: { type: LashSpecsSchema },
  defaultTattooSpecs: { type: TattooSpecsSchema },
  prepNotes: [{ type: String }],
  aftercareNotes: [{ type: String }],
}, {
  timestamps: true,
  strictQuery: false,
});

export const ServiceModel = mongoose.model<ServiceDoc>('Service', ServiceSchema);
