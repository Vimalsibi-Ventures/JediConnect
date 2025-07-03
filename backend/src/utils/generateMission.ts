// src/utils/generateMission.ts
import axios from 'axios';

export const generateMissionFromPrompt = async (
  prompt: string
): Promise<{ title: string; description: string }> => {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: process.env.OPENROUTER_MODEL || 'meta-llama/llama-3-70b-instruct',
        messages: [
          {
            role: 'user',
            content: `Create a futuristic mission with a short title and a detailed description for: ${prompt}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000', // or your project domain
          'X-Title': 'JediConnect', // optional, can be your project name
        },
      }
    );

    const raw = response.data.choices?.[0]?.message?.content ?? '';

    const [titleLine, ...rest] = raw.split('\n');
    const title = titleLine.replace(/^#+\s*/, '').trim();
    const description = rest.join('\n').trim();

    return { title, description };
  } catch (error: any) {
    console.error('🔥 OpenRouter generation error:', error?.response?.data || error.message);
    throw new Error('Failed to generate mission from OpenRouter.');
  }
};
