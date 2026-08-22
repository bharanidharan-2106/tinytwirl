import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';
import { configureCloudinary } from './config/cloudinary.js';
import { initJobs } from './jobs/cleanupJobs.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is required. Set it in your environment variables.');
    process.exit(1);
  }

  configureCloudinary();

  try {
    await connectDB();
    
    // Initialize background jobs
    initJobs();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
