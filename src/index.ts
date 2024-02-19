import express from 'express';
import { PORT } from './config';
import bodyParser from 'body-parser';
import geminiRouter from './routes/gemini';

const app = express();
app.use(bodyParser.json());

app.use('/gemini', geminiRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
