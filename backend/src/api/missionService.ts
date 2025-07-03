import http from './httpService';
import API from './api';

export const fetchMatchedMissions = async () => {
  const { data } = await http.get(API.MATCHED_MISSIONS);
  return data;
};

export const fetchLaunchedMissions = async () => {
  const { data } = await http.get(API.LAUNCHED_MISSIONS);
  return data;
};

export const acceptMission = async (userId: string, missionId: string) => {
  const { data } = await http.post(API.ACCEPT_MISSION, { userId, missionId });
  return data;
};

export const launchMission = async (userId: string, prompt: string) => {
  const { data } = await http.post(API.LAUNCH_MISSION, { userId, prompt });
  return data;
};
