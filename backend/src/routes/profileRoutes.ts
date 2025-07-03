import express from 'express';
import { completeProfile } from '../controllers/profileController';

const router = express.Router();

router.post('/complete', completeProfile);

export default router;
