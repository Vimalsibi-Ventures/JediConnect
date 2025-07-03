// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5050/api', // Update if your backend uses a different port
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
