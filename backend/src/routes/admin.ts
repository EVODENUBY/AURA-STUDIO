import { Router, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

router.post('/verify-pin', (req: Request, res: Response) => {
  const { pin } = req.body || {};
  const adminPin = process.env.ADMIN_PIN || '1234';
  if (typeof pin === 'string' && pin.trim() === adminPin.trim()) {
    return res.json({ success: true });
  }
  return res.status(401).json({ success: false, error: 'Invalid PIN' });
});

export default router;
