import { Router, Request, Response } from 'express';
import { TestimonialModel } from '../models/Testimonial';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    if (category) {
      const testimonials = await TestimonialModel.find({ category });
      return res.json(testimonials);
    }
    const testimonials = await TestimonialModel.find();
    res.json(testimonials);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch testimonials' });
  }
});

export default router;
