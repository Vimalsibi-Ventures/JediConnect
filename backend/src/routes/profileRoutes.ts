// src/routes/profileRoutes.ts
import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';

const router = express.Router();

// ✅ Fetch Profile (GET)
router.get('/get', getProfile);

// ✅ Update Profile (PUT)
router.put('/update', updateProfile);

export default router;
