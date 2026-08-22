import cron from 'node-cron';
import Offer from '../models/Offer.js';
import Event from '../models/Event.js';
import { deleteFromCloudinary } from '../services/cloudinaryService.js';

/**
 * Clean up expired Offers and Events.
 * Deletes them from the database and removes associated images from Cloudinary.
 */
const cleanupExpiredItems = async () => {
  try {
    const now = new Date();
    
    // 1. Find and delete expired Offers
    const expiredOffers = await Offer.find({ endDate: { $lt: now } });
    for (const offer of expiredOffers) {
      if (offer.cloudinaryPublicId) {
        await deleteFromCloudinary(offer.cloudinaryPublicId, 'image');
      }
      await offer.deleteOne();
      console.log(`[Job] Deleted expired offer: ${offer.title}`);
    }

    // 2. Find and delete expired Events
    // Note: If an event spans multiple days, endDate is used. If single day, eventDate is used.
    // For safety, we check if endDate is present and expired, OR if no endDate, check if eventDate is expired by a day.
    const expiredEvents = await Event.find({
      $or: [
        { endDate: { $lt: now, $exists: true, $ne: null } },
        { endDate: { $exists: false }, eventDate: { $lt: new Date(now.getTime() - 24 * 60 * 60 * 1000) } },
        { endDate: null, eventDate: { $lt: new Date(now.getTime() - 24 * 60 * 60 * 1000) } }
      ]
    });
    
    for (const event of expiredEvents) {
      if (event.cloudinaryPublicId) {
        await deleteFromCloudinary(event.cloudinaryPublicId, 'image');
      }
      await event.deleteOne();
      console.log(`[Job] Deleted expired event: ${event.title}`);
    }

  } catch (error) {
    console.error('[Job Error] Failed to cleanup expired items:', error);
  }
};

/**
 * Initialize all scheduled background jobs.
 */
export const initJobs = () => {
  console.log('[Job] Initializing background jobs...');
  
  // Run daily at midnight: '0 0 * * *'
  cron.schedule('0 0 * * *', () => {
    console.log('[Job] Running daily cleanup of expired items...');
    cleanupExpiredItems();
  });

  // Optionally, we could run it immediately on startup once for safety
  cleanupExpiredItems();
};
