import express from 'express';
import { getProfileByUserId, updateProfile } from '../controllers/profileController';

const router = express.Router();

router.get('/get/:userId', getProfileByUserId);
router.put('/update', updateProfile);

export default router;
