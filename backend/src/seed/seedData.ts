import dotenv from 'dotenv';
dotenv.config();

import { connectDB, disconnectDB } from '../config/database';
import { ServiceModel } from '../models/Service';
import { ArtistModel } from '../models/Artist';
import { BookingModel } from '../models/Booking';
import { TestimonialModel } from '../models/Testimonial';
import { BeforeAfterModel } from '../models/BeforeAfterItem';
import { FaqModel } from '../models/Faq';
import Logger from '../utils/logger';

import {
  INITIAL_SERVICES,
  INITIAL_ARTISTS,
  INITIAL_BOOKINGS,
  STUDIO_FAQS,
  INITIAL_BEFORE_AFTER,
  INITIAL_TESTIMONIALS,
} from '../../../frontend/src/data/mockData';

async function seedDatabase() {
  try {
    await connectDB();
    Logger.info('Starting database seeding...');

    // Clear existing data
    await ServiceModel.deleteMany({});
    await ArtistModel.deleteMany({});
    await BookingModel.deleteMany({});
    await TestimonialModel.deleteMany({});
    await BeforeAfterModel.deleteMany({});
    await FaqModel.deleteMany({});
    Logger.info('Existing data cleared.');

    // Seed Services
    await ServiceModel.insertMany(INITIAL_SERVICES);
    Logger.info(`Seeded ${INITIAL_SERVICES.length} services.`);

    // Seed Artists
    await ArtistModel.insertMany(INITIAL_ARTISTS);
    Logger.info(`Seeded ${INITIAL_ARTISTS.length} artists.`);

    // Seed Bookings
    await BookingModel.insertMany(INITIAL_BOOKINGS);
    Logger.info(`Seeded ${INITIAL_BOOKINGS.length} bookings.`);

    // Seed Testimonials
    await TestimonialModel.insertMany(INITIAL_TESTIMONIALS);
    Logger.info(`Seeded ${INITIAL_TESTIMONIALS.length} testimonials.`);

    // Seed Before & After items
    await BeforeAfterModel.insertMany(INITIAL_BEFORE_AFTER);
    Logger.info(`Seeded ${INITIAL_BEFORE_AFTER.length} before/after items.`);

    // Seed FAQs
    const faqDocs = STUDIO_FAQS.map((faq: { q: string; a: string }, idx: number) => ({
      question: faq.q,
      answer: faq.a,
      order: idx,
    }));
    await FaqModel.insertMany(faqDocs);
    Logger.info(`Seeded ${faqDocs.length} FAQs.`);

    Logger.info('Database seeding complete!', {
      collections: {
        services: INITIAL_SERVICES.length,
        artists: INITIAL_ARTISTS.length,
        bookings: INITIAL_BOOKINGS.length,
        testimonials: INITIAL_TESTIMONIALS.length,
        beforeAfters: INITIAL_BEFORE_AFTER.length,
        faqs: faqDocs.length,
      },
    });

    await disconnectDB();
    process.exit(0);
  } catch (error) {
    Logger.error('Seeding error', { error: error instanceof Error ? error.message : String(error) });
    await disconnectDB();
    process.exit(1);
  }
}

seedDatabase();
