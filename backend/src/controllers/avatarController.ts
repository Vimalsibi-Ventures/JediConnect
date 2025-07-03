// src/controllers/avatarController.ts
import { Request, Response } from 'express';
import User from '../models/User';

export const uploadAvatar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const avatarFile = req.file;

    if (!email) {
      res.status(400).json({ message: 'Email is required' });
      return;
    }

    if (!avatarFile) {
      res.status(400).json({ message: 'No avatar file uploaded' });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const fileUrl = `/uploads/${avatarFile.filename}`;
    user.avatar = fileUrl;
    await user.save();

    res.status(200).json({
      message: 'Avatar uploaded successfully',
      avatarUrl: fileUrl,
    });
  } catch (err: any) {
    res.status(500).json({ message: 'Avatar upload failed', error: err.message });
  }
};
