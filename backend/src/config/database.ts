import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Logger from '../utils/logger';

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
    Logger.info(`MongoDB Connected: ${conn.connection.host}`, {
      host: conn.connection.host,
      dbName: conn.connection.name,
    });
    return conn;
  } catch (error) {
    Logger.error('MongoDB connection error', { error: String(error) });
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
