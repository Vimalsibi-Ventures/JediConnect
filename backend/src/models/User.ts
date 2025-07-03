import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  verified: boolean;
  username?: string;
  bio?: string;
  location?: string;
  website?: string;
  avatar?: string;
  profileCompleted?: boolean;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  username: { type: String },
  bio: { type: String },
  location: { type: String },
  website: { type: String },
  avatar: { type: String },
  profileCompleted: { type: Boolean, default: false }
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
