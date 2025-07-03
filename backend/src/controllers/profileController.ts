// src/controllers/profileController.ts
import { Request, Response } from 'express';
import User from '../models/User';

// ✅ Get Profile
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const email = req.query.email as string;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({
      name: user.name,
      username: user.username,
      bio: user.bio,
      location: user.location,
      avatar: user.avatar,
      email: user.email // Read-only on frontend
    });
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
  }
};

// ✅ Update Profile
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  const { email, name, username, bio, location, avatar } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (name) user.name = name;
    if (username) user.username = username;
    if (bio) user.bio = bio;
    if (location) user.location = location;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (err: any) {
    res.status(500).json({ message: 'Profile update failed', error: err.message });
  }
};
