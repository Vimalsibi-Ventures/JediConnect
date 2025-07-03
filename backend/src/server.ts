// src/server.ts
import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const app: Application = express();

// Read PORT from environment, fallback to 5000 if not found
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Example Route
app.get('/', (req, res) => {
  res.send('Welcome to JediConnect Backend 🚀');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
