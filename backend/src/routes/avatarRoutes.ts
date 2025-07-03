// src/routes/avatarRoutes.ts
import express from 'express';
import uploadCloudinary from '../middleware/uploadCloudinary';
import { uploadAvatar } from '../controllers/avatarController';

const router = express.Router();

router.post('/upload', uploadCloudinary.single('avatar'), uploadAvatar);

export default router;
