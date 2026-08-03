import dotenv from 'dotenv';
dotenv.config();

import { connectDB, disconnectDB } from '../config/database';
import { ServiceModel } from '../models/Service';
import { ArtistModel } from '../models/Artist';
import { BookingModel } from '../models/Booking';
import { TestimonialModel } from '../models/Testimonial';
import { BeforeAfterModel } from '../models/BeforeAfterItem';
import { FaqModel } from '../models/Faq';

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
    console.log('Seeding database...');

    // Clear existing data
    await ServiceModel.deleteMany({});
    await ArtistModel.deleteMany({});
    await BookingModel.deleteMany({});
    await TestimonialModel.deleteMany({});
    await BeforeAfterModel.deleteMany({});
    await FaqModel.deleteMany({});
    console.log('Existing data cleared.');

    // Seed Services
    await ServiceModel.insertMany(INITIAL_SERVICES);
    console.log(`Seeded ${INITIAL_SERVICES.length} services.`);

    // Seed Artists
    await ArtistModel.insertMany(INITIAL_ARTISTS);
    console.log(`Seeded ${INITIAL_ARTISTS.length} artists.`);

    // Seed Bookings
    await BookingModel.insertMany(INITIAL_BOOKINGS);
    console.log(`Seeded ${INITIAL_BOOKINGS.length} bookings.`);

    // Seed Testimonials
    await TestimonialModel.insertMany(INITIAL_TESTIMONIALS);
    console.log(`Seeded ${INITIAL_TESTIMONIALS.length} testimonials.`);

    // Seed Before & After items
    await BeforeAfterModel.insertMany(INITIAL_BEFORE_AFTER);
    console.log(`Seeded ${INITIAL_BEFORE_AFTER.length} before/after items.`);

    // Seed FAQs
    const faqDocs = STUDIO_FAQS.map((faq: { q: string; a: string }, idx: number) => ({
      question: faq.q,
      answer: faq.a,
      order: idx,
    }));
    await FaqModel.insertMany(faqDocs);
    console.log(`Seeded ${faqDocs.length} FAQs.`);

    console.log('\nDatabase seeding complete!');
    console.log('Collections populated:');
    console.log(`  - services: ${INITIAL_SERVICES.length} records`);
    console.log(`  - artists: ${INITIAL_ARTISTS.length} records`);
    console.log(`  - bookings: ${INITIAL_BOOKINGS.length} records`);
    console.log(`  - testimonials: ${INITIAL_TESTIMONIALS.length} records`);
    console.log(`  - beforeAfters: ${INITIAL_BEFORE_AFTER.length} records`);
    console.log(`  - faqs: ${faqDocs.length} records`);

    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    await disconnectDB();
    process.exit(1);
  }
}

seedDatabase();
