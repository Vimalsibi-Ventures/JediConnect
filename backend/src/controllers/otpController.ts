// backend/src/controllers/otpController.ts

import { Request, Response } from 'express';
import Otp from '../models/Otp';
import User from '../models/User';
import sendEmail from '../utils/sendEmail'; // ✅ Use email utility

export const sendOtp = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: 'Email is required' });
    return;
  }

  try {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await Otp.findOneAndDelete({ email }); // 🔄 clear any previous OTPs
    await Otp.create({ email, otp: otpCode, expiresAt: expiry });

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 1rem;">
        <h2 style="color: #4a90e2;">Welcome to JediConnect 👋</h2>
        <p>Your OTP is:</p>
        <h1 style="letter-spacing: 2px;">${otpCode}</h1>
        <p>This code will expire in 5 minutes.</p>
        <hr />
        <p style="font-size: 12px; color: #999;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `;

    await sendEmail(email, 'Your JediConnect OTP', emailHtml);

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (err: any) {
    console.error('OTP sending error:', err); // 🐛 Log server-side
    res.status(500).json({ message: 'Failed to send OTP', error: err?.message || 'Unknown error' });
  }
};

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400).json({ message: 'Email and OTP are required' });
    return;
  }

  try {
    const record = await Otp.findOne({ email });
    if (!record) {
      res.status(404).json({ message: 'OTP not found' });
      return;
    }

    if (record.otp !== otp) {
      res.status(400).json({ message: 'Incorrect OTP' });
      return;
    }

    if (record.expiresAt < new Date()) {
      await Otp.deleteOne({ email });
      res.status(400).json({ message: 'OTP expired' });
      return;
    }

    await User.updateOne({ email }, { $set: { verified: true } });
    await Otp.deleteOne({ email });

    res.status(200).json({ message: 'OTP verified successfully', success: true });
  } catch (err: any) {
    console.error('OTP verification error:', err); // 🐛 Server-side logging
    res.status(500).json({ message: 'OTP verification failed', error: err?.message || 'Unknown error' });
  }
};
