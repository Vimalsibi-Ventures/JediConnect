// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/authRoutes';
import otpRoutes from './routes/otpRoutes';
import profileRoutes from './routes/profileRoutes';
import avatarRoutes from './routes/avatarRoutes';
import missionRoutes from './routes/missionRoutes';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/avatar', avatarRoutes);

app.get('/', (_req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
