import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_KEY } from '../config';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

const googleGeminiConfiguration = new GoogleGenerativeAI(API_KEY || '');

const generationConfig = {
  stopSequences: ['red'],
  maxOutputTokens: 800,
  temperature: 0.7,
  topP: 0.01,
  topK: 40,
};

const modelId = 'gemini-pro';
const model = googleGeminiConfiguration.getGenerativeModel({
  model: modelId,
  generationConfig,
});

export const history: string[] = [];

/**
 * Generates a response based on the given prompt.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise} - A promise that resolves when the response is sent.
 */

export const generateResponse = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { prompt } = req.body;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    history.push(text);
    res.status(200).send({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const checkHistory = (req: Request, res: Response): void => {
  res.status(200).send({ history });
};
