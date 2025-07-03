// src/routes/avatarRoutes.ts
import express, { Request, Response, NextFunction } from 'express';
import upload from '../middleware/upload';
import { uploadAvatar } from '../controllers/avatarController';

const router = express.Router();

// Explicitly declare middleware type so TS understands it
router.post(
  '/upload',
  (req: Request, res: Response, next: NextFunction) => {
    upload.single('avatar')(req, res, (err: any) => {
      if (err) return res.status(400).json({ message: 'Upload error', error: err.message });
      next();
    });
  },
  uploadAvatar
);

export default router;
