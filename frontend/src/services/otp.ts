// src/services/otp.ts
import api from './api';

export const sendOtp = async (email: string) => {
  const response = await api.post('/otp/send', { email });
  return response.data;
};

export const verifyOtp = async (email: string, otp: string) => {
  const response = await api.post('/otp/verify', { email, otp });
  return response.data;
};
