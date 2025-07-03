import mongoose, { Schema, Document } from 'mongoose';

export interface IMatchedMission extends Document {
  title: string;
  recruiter?: string;
  score?: number;
  explanation?: string;
  description?: string; // optional, for flexibility
}

const MatchedMissionSchema = new Schema({
  title: { type: String, required: true },
  recruiter: { type: String },
  score: { type: Number },
  explanation: { type: String },
  description: { type: String },
}, { timestamps: true });

export const MatchedMission = mongoose.model<IMatchedMission>('MatchedMission', MatchedMissionSchema);
