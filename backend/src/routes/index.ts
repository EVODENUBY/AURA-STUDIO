import { Router } from 'express';
import servicesRouter from './services';
import artistsRouter from './artists';
import bookingsRouter from './bookings';
import availabilityRouter from './availability';
import adminRouter from './admin';
import consultationRouter from './consultation';
import testimonialsRouter from './testimonials';
import beforeAfterRouter from './beforeAfter';
import faqsRouter from './faqs';

const router = Router();

router.use('/services', servicesRouter);
router.use('/artists', artistsRouter);
router.use('/bookings', bookingsRouter);
router.use('/availability', availabilityRouter);
router.use('/admin', adminRouter);
router.use('/consultation', consultationRouter);
router.use('/testimonials', testimonialsRouter);
router.use('/before-after', beforeAfterRouter);
router.use('/faqs', faqsRouter);

export default router;
