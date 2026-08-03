import mongoose, { Schema, Document } from 'mongoose';

export interface FaqDoc extends Document {
  question: string;
  answer: string;
  order: number;
}

const FaqSchema = new Schema<FaqDoc>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  order: { type: Number, default: 0 },
}, {
  timestamps: true,
});

export const FaqModel = mongoose.model<FaqDoc>('Faq', FaqSchema);
