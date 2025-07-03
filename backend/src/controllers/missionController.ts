import { Request, Response, NextFunction } from 'express';
import { MatchedMission } from '../models/MatchedMission';
import { LaunchedMission } from '../models/LaunchedMission';
import { generateMissionFromPrompt } from '../utils/generateMission';

// ✅ Accept a matched mission
export const acceptMission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, missionId } = req.body;

    const mission = await MatchedMission.findById(missionId);
    if (!mission) {
      res.status(404).json({ message: 'Mission not found' });
      return;
    }

    const newAccepted = new LaunchedMission({
      userId,
      title: mission.title,
      description: mission.description || mission.explanation || 'No description available.',
    });

    await newAccepted.save();
    res.status(201).json({ message: 'Mission accepted', mission: newAccepted });
  } catch (error) {
    console.error('Error accepting mission:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// 🚀 Launch a mission using Gemini
export const launchMission = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, prompt } = req.body;

    if (!prompt) {
      res.status(400).json({ message: 'Prompt is required' });
      return;
    }

    const { title, description } = await generateMissionFromPrompt(prompt);

    const newMission = new LaunchedMission({
      userId,
      title,
      description,
    });

    await newMission.save();
    res.status(201).json({ message: 'Mission launched successfully', mission: newMission });
  } catch (error) {
    console.error('Error launching mission:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
