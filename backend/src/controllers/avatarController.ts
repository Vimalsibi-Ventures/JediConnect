// src/controllers/avatarController.ts
import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary';
import User from '../models/User';
import streamifier from 'streamifier';

export const uploadAvatar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;

    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const streamUpload = () => {
      return new Promise<{ secure_url: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'avatars' },
          (error, result) => {
            if (result) resolve(result as { secure_url: string });
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file!.buffer).pipe(stream);
      });
    };

    const result = await streamUpload();

    user.avatar = result.secure_url;
    await user.save();

    res.status(200).json({
      message: 'Avatar uploaded successfully',
      avatarUrl: result.secure_url,
      user
    });
  } catch (error: any) {
    console.error('Avatar Upload Error:', error);
    res.status(500).json({ message: 'Avatar upload failed', error: error.message });
  }
};
