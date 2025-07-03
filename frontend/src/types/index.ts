// User type returned from backend
export interface User {
  name: string;
  email: string;
  verified?: boolean;
}

// Auth-related form data
export interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

// OTP input data
export interface OtpPayload {
  email: string;
  otp: string;
}

// OTP send payload
export interface OtpSendPayload {
  email: string;
}
