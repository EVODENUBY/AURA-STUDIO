import { Router, Request, Response } from 'express';
import { BeforeAfterModel } from '../models/BeforeAfterItem';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    if (category) {
      const items = await BeforeAfterModel.find({ category });
      return res.json(items);
    }
    const items = await BeforeAfterModel.find();
    res.json(items);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch before/after items' });
  }
});

export default router;
