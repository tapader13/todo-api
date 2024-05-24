import express from 'express';
import {
  authUser,
  logoutUser,
  registerUser,
  updateProfile,
  userProfile,
} from '../controllers/userControllers.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();
router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, userProfile);
router.post('/profile', protect, updateProfile);

export default router;
