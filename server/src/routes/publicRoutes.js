import { Router } from 'express';
import { getPublicPrograms } from '../controllers/programController.js';
import { getPublicMedia } from '../controllers/mediaController.js';
import { getPublicOffers } from '../controllers/offerController.js';
import { getPublicEvents } from '../controllers/eventController.js';
import { getPublicTestimonials } from '../controllers/testimonialController.js';
import { getSettings } from '../controllers/settingsController.js';
import { catchAsync } from '../middleware/errorHandler.js';

const router = Router();

router.get('/programs', catchAsync(getPublicPrograms));
router.get('/media', catchAsync(getPublicMedia));
router.get('/offers', catchAsync(getPublicOffers));
router.get('/events', catchAsync(getPublicEvents));
router.get('/testimonials', catchAsync(getPublicTestimonials));
router.get('/settings', catchAsync(getSettings));

export default router;
