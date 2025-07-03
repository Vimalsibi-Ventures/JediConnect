import { Request, Response } from 'express';
import User from '../models/User';

export const updateProfile = async (req: Request, res: Response) => {
  const { email, fullName, username, bio, location, website, avatar } = req.body;

  try {
    const updated = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          fullName,
          username,
          bio,
          location,
          website,
          avatar,
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'Profile updated', user: updated });
  } catch (err: any) {
    return res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
};
