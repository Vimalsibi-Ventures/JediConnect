import mongoose, { Schema, Document } from 'mongoose';

export interface ILaunchedMission extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
}

const LaunchedMissionSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Optional: remove if you don't have a User model
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const LaunchedMission = mongoose.model<ILaunchedMission>(
  'LaunchedMission',
  LaunchedMissionSchema
);
