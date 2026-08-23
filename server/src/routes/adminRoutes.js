import { Router } from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { getMe } from '../controllers/authController.js';
import { catchAsync } from '../middleware/errorHandler.js';
import {
  getAdminMedia,
  createMedia,
  updateMedia,
  deleteMedia,
  getDashboardStats,
} from '../controllers/mediaController.js';
import {
  getAdminPrograms,
  createProgram,
  updateProgram,
  deleteProgram,
} from '../controllers/programController.js';
import {
  getAdminOffers,
  createOffer,
  updateOffer,
  deleteOffer,
} from '../controllers/offerController.js';
import {
  getAdminEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventController.js';
import {
  getAdminTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { getSettings, updateSettings } from '../controllers/settingsController.js';

const router = Router();

router.use(protect, adminOnly);

router.get('/me', catchAsync(getMe));
router.get('/dashboard/stats', catchAsync(getDashboardStats));

router.get('/settings', catchAsync(getSettings));
router.put('/settings', catchAsync(updateSettings));

router.get('/media', catchAsync(getAdminMedia));
router.post('/media', upload.single('file'), catchAsync(createMedia));
router.put('/media/:id', catchAsync(updateMedia));
router.delete('/media/:id', catchAsync(deleteMedia));

router.get('/programs', catchAsync(getAdminPrograms));
router.post('/programs', catchAsync(createProgram));
router.put('/programs/:id', catchAsync(updateProgram));
router.delete('/programs/:id', catchAsync(deleteProgram));

router.get('/offers', catchAsync(getAdminOffers));
router.post('/offers', upload.single('file'), catchAsync(createOffer));
router.put('/offers/:id', upload.single('file'), catchAsync(updateOffer));
router.delete('/offers/:id', catchAsync(deleteOffer));

router.get('/events', catchAsync(getAdminEvents));
router.post('/events', upload.single('file'), catchAsync(createEvent));
router.put('/events/:id', upload.single('file'), catchAsync(updateEvent));
router.delete('/events/:id', catchAsync(deleteEvent));

router.get('/testimonials', catchAsync(getAdminTestimonials));
router.post('/testimonials', catchAsync(createTestimonial));
router.put('/testimonials/:id', catchAsync(updateTestimonial));
router.delete('/testimonials/:id', catchAsync(deleteTestimonial));

export default router;
