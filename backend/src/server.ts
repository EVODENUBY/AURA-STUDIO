import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import path from 'path';
import { connectDB } from './config/database';
import apiRoutes from './routes';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
const isDev = process.env.NODE_ENV !== 'production';
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

const app = express();

app.use(express.json({ limit: '10mb' }));

// CORS for development
if (isDev) {
  app.use((req: Request, res: Response, next: Function) => {
    res.header('Access-Control-Allow-Origin', frontendUrl);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    next();
  });
}

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', studio: 'AURA - Lash & Ink Atelier Kigali' });
});

// API routes
app.use('/api', apiRoutes);

// Production static file serving
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(process.cwd(), 'frontend/dist');
  app.use(express.static(distPath));
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

async function startServer() {
  await connectDB();

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`AURA Backend Server running on http://localhost:${PORT}`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      const altPort = PORT + 1;
      console.log(`Port ${PORT} is currently occupied. Retrying on http://localhost:${altPort}...`);
      app.listen(altPort, '0.0.0.0', () => {
        console.log(`AURA Backend Server running on http://localhost:${altPort}`);
      });
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer();
