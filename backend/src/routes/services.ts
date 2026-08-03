import { Router, Request, Response } from 'express';
import { ServiceModel } from '../models/Service';
import { CategoryType } from '@shared/types';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    if (category) {
      const services = await ServiceModel.find({ category });
      return res.json(services);
    }
    const services = await ServiceModel.find();
    res.json(services);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch services' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const service = await ServiceModel.findOne({ id: req.params.id });
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch service' });
  }
});

export default router;
