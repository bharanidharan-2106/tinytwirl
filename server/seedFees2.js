import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from the root of server
dotenv.config({ path: path.join(__dirname, '.env') });

import Program from './src/models/Program.js';

const feeUpdates = [
  {
    name: 'Tiny Twirler', // Changed from Tiny Twirlers
    fees: { threeMonths: 9500, sixMonths: 19000, twelveMonths: 29500, sibling: 14500 }
  },
  {
    name: 'Early Explorer',
    fees: { threeMonths: 10500, sixMonths: 20500, twelveMonths: 30500, sibling: 15500 }
  },
  {
    name: 'Future Flyer', // Changed from Future Players
    fees: { threeMonths: 12000, sixMonths: 22000, twelveMonths: 32000, sibling: 17000 }
  },
  {
    name: 'Elite Flyers', // Changed from Elite Players
    fees: { threeMonths: 14000, sixMonths: 24000, twelveMonths: 34000, sibling: 19000 }
  }
];

const run = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');
    
    for (const update of feeUpdates) {
      // Find program by name using case-insensitive regex
      const program = await Program.findOne({ name: { $regex: update.name, $options: 'i' } });
      if (program) {
        program.fees = update.fees;
        await program.save();
        console.log(`Updated fees for: ${program.name}`);
      } else {
        console.log(`Program not found: ${update.name}`);
      }
    }
    
    console.log('Done!');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

run();
