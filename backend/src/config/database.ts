import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aura_studio';

let cachedConnection: typeof mongoose | null = null;

export async function connectDB(): Promise<typeof mongoose> {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI);
    cachedConnection = conn;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }

  return cachedConnection as typeof mongoose;
}

export async function disconnectDB(): Promise<void> {
  if (cachedConnection) {
    await cachedConnection.disconnect();
    cachedConnection = null;
  }
}
