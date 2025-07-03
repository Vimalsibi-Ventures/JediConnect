// src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import cors from 'cors';

// 🔹 NEW: Route imports
import authRoutes from './routes/authRoutes';
import otpRoutes from './routes/otpRoutes';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 NEW: API Routes
app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);

app.get('/', (_req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
