import { Request, Response } from 'express';
import User from '../models/User';

export const completeProfile = async (req: Request, res: Response): Promise<void> => {
  const { email, name, bio, location, website, username, avatar } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Update only if fields are provided
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (location) user.location = location;
    if (website) user.website = website;
    if (username) user.username = username;
    if (avatar) user.avatar = avatar;

    user.profileCompleted = true; // Optional flag for UI logic

    await user.save();

    res.status(200).json({ message: 'Profile completed successfully', user });
  } catch (err: any) {
    res.status(500).json({ message: 'Profile completion failed', error: err.message });
  }
};
