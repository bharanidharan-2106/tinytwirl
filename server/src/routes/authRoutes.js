import { Router } from 'express';
import { login, logout, getMe } from '../controllers/authController.js';
import { catchAsync } from '../middleware/errorHandler.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/login', catchAsync(login));
router.post('/logout', catchAsync(logout));
router.get('/me', protect, catchAsync(getMe));

export default router;
