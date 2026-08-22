import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../src/models/User.js';
import Program from '../src/models/Program.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const programs = [
  {
    name: 'Tiny Twirler',
    slug: 'tiny-twirler',
    ageRange: '1–3',
    stage: 'Foundation movement',
    shortObjective: 'Building early movement foundations through guided play and exploration.',
    description:
      'Tiny Twirler introduces children aged 1–3 to foundation movement in a joyful, structured environment. Sessions focus on early physical literacy, balance, coordination and body awareness through age-appropriate gymnastics, games and creative activities.',
    objectives: [
      'Early physical literacy',
      'Balance and coordination',
      'Body awareness',
      'Confidence through guided play',
    ],
    order: 1,
  },
  {
    name: 'Early Explorer',
    slug: 'early-explorer',
    ageRange: '3–5',
    stage: 'Fundamental movement',
    shortObjective: 'Developing fundamental movement skills with structure and encouragement.',
    description:
      'Early Explorer supports children aged 3–5 in developing fundamental movement skills. The programme combines gymnastics with fitness, yoga, dance, creative activities and games to build coordination, flexibility, strength and confidence.',
    objectives: [
      'Fundamental movement skills',
      'Flexibility and strength',
      'Following instructions',
      'Social participation',
    ],
    order: 2,
  },
  {
    name: 'Future Flyer',
    slug: 'future-flyer',
    ageRange: '6–10',
    stage: 'Foundation gymnastics',
    shortObjective: 'Building foundation gymnastics skills with progressive, child-centred coaching.',
    description:
      'Future Flyer introduces children aged 6–10 to foundation gymnastics within a holistic development programme. Children develop balance, coordination, flexibility, strength and body control while learning through structured skill blocks and enrichment activities.',
    objectives: [
      'Foundation gymnastics skills',
      'Body control and strength',
      'Problem-solving through movement',
      'Teamwork and communication',
    ],
    order: 3,
  },
  {
    name: 'Elite Flyers',
    slug: 'elite-flyers',
    ageRange: '10–14',
    stage: 'Progressive gymnastics',
    shortObjective: 'Progressive gymnastics development with discipline, creativity and perseverance.',
    description:
      'Elite Flyers supports children aged 10–14 in progressive gymnastics development. The programme builds on foundation skills with structured progression, focusing on discipline, teamwork, creativity, perseverance and continued holistic development.',
    objectives: [
      'Progressive gymnastics skills',
      'Advanced coordination and strength',
      'Discipline and perseverance',
      'Creative expression through movement',
    ],
    order: 4,
  },
];

const seed = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is required');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || 'Admin';

    if (adminEmail && adminPassword) {
      const existingAdmin = await User.findOne({ email: adminEmail.toLowerCase() });
      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(adminPassword, 12);
        await User.create({
          name: adminName,
          email: adminEmail.toLowerCase(),
          password: hashedPassword,
          role: 'ADMIN',
        });
        console.log(`Admin user created: ${adminEmail}`);
      } else {
        console.log('Admin user already exists.');
      }
    } else {
      console.log('Skipping admin creation. Set ADMIN_EMAIL and ADMIN_PASSWORD in .env');
    }

    for (const program of programs) {
      await Program.findOneAndUpdate({ slug: program.slug }, program, { upsert: true, new: true });
    }
    console.log('Programmes seeded successfully.');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seed();
