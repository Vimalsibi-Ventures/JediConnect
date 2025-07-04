import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed });

    res.status(201).json({ message: 'Signup successful' });
  } catch (err: any) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    if (!user.verified) {
      res.status(401).json({ message: 'Please verify your email via OTP' });
      return;
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id, // ✅ Send userId now
        name: user.name,
        email: user.email,
        profileCompleted: user.profileCompleted ?? false,
      },
    });
  } catch (err: any) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
