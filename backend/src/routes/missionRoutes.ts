import express from 'express';
import { acceptMission, launchMission } from '../controllers/missionController';

const router = express.Router();

router.post('/accept', acceptMission);   // expects { userId, missionId }
router.post('/launch', launchMission);   // expects { userId, prompt }

export default router;
