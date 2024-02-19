import { body } from 'express-validator';

export const generateResponseValidationRules = [
  body('prompt').notEmpty().withMessage('Prompt is required'),
];
