import { Router, Request, Response } from 'express';
import { BookingModel } from '../models/Booking';
import { ArtistModel } from '../models/Artist';
import { Booking } from '@shared/types';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const query = (req.query.query as string || '').toLowerCase().trim();
    if (query) {
      const bookings = await BookingModel.find({
        $or: [
          { bookingRef: { $regex: query, $options: 'i' } },
          { clientName: { $regex: query, $options: 'i' } },
          { clientEmail: { $regex: query, $options: 'i' } },
          { clientPhone: { $regex: query, $options: 'i' } },
        ],
      });
      return res.json(bookings);
    }
    const bookings = await BookingModel.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch bookings' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const bookingRef = `AURA-${randomNum}`;

    const newBooking: Partial<Booking> = {
      id: `bk-${Date.now()}`,
      bookingRef,
      serviceId: body.serviceId,
      serviceTitle: body.serviceTitle,
      category: body.category,
      artistId: body.artistId,
      artistName: body.artistName,
      clientName: body.clientName,
      clientEmail: body.clientEmail,
      clientPhone: body.clientPhone,
      appointmentDate: body.appointmentDate,
      appointmentTime: body.appointmentTime,
      totalPrice: body.totalPrice,
      depositPaid: body.depositPaid,
      depositStatus: 'paid',
      status: 'confirmed',
      lashSpecs: body.lashSpecs,
      tattooSpecs: body.tattooSpecs,
      clientNotes: body.clientNotes || '',
      healthConsentsAccepted: Boolean(body.healthConsentsAccepted),
      createdAt: new Date().toISOString(),
    };

    const booking = new BookingModel(newBooking);
    await booking.save();
    res.status(201).json({ success: true, booking });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to create booking' });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const booking = await BookingModel.findOneAndUpdate(
      { $or: [{ id }, { bookingRef: id }] },
      { status: 'cancelled' },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ success: true, cancelledBooking: booking });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to cancel booking' });
  }
});

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const booking = await BookingModel.findOneAndUpdate(
      { $or: [{ id }, { bookingRef: id }] },
      { ...req.body },
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ success: true, booking });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to update booking' });
  }
});

export default router;
