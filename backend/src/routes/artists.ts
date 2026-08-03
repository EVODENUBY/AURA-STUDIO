import { Router, Request, Response } from 'express';
import { ArtistModel } from '../models/Artist';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    if (category) {
      const artists = await ArtistModel.find({ categories: category });
      return res.json(artists);
    }
    const artists = await ArtistModel.find();
    res.json(artists);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch artists' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const artist = await ArtistModel.findOne({ id: req.params.id });
    if (!artist) {
      return res.status(404).json({ error: 'Artist not found' });
    }
    res.json(artist);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch artist' });
  }
});

export default router;
