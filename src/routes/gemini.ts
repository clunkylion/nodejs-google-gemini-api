import { Router } from 'express';
import { checkHistory, generateResponse } from '../controllers/gemini';
import { generateResponseValidationRules } from '../middleware/gemini';

const router = Router();

router.post('/generate', generateResponseValidationRules, generateResponse);

router.get('/history', checkHistory);
export default router;
