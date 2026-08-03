import { Router, Request, Response } from 'express';
import { ArtistModel } from '../models/Artist';
import { BookingModel } from '../models/Booking';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const artistId = req.query.artistId as string;
    const dateStr = req.query.date as string;

    if (!artistId || !dateStr) {
      return res.json({ availableHours: [], allHours: [] });
    }

    const artist = await ArtistModel.findOne({ id: artistId });
    if (!artist) {
      return res.json({ availableHours: ['10:00 AM', '01:00 PM', '03:30 PM', '05:30 PM'] });
    }

    const bookedTimes = await BookingModel.find({
      artistId,
      appointmentDate: dateStr,
      status: { $ne: 'cancelled' },
    });

    const occupiedTimes = bookedTimes.map(b => b.appointmentTime);
    const available = artist.availableHours.filter(time => !occupiedTimes.includes(time));

    res.json({ availableHours: available, allHours: artist.availableHours });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch availability' });
  }
});

export default router;
