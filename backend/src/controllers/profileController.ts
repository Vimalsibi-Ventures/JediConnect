import { Request, Response } from 'express';
import User from '../models/User';

// ✅ Fetch Profile by userId
export const getProfileByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
  }
};

// ✅ Update Profile by userId
export const updateProfile = async (req: Request, res: Response) => {
  const { userId, name, username, bio, location, avatar } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        name,
        username,
        bio,
        location,
        avatar,
        profileCompleted: true,
      },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (err: any) {
    res.status(500).json({ message: 'Profile update failed', error: err.message });
  }
};
