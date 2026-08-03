import { Router, Request, Response } from 'express';
import { FaqModel } from '../models/Faq';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const faqs = await FaqModel.find().sort({ order: 1 });
    res.json(faqs);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch FAQs' });
  }
});

export default router;
