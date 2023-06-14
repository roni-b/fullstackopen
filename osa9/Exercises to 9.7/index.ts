import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  const { height, weight } = _req.query;
  if (!(Number(height)) || !(Number(weight))) {
    return res.status(400).json({error: 'malformatted parameters'});
  }
  const bmi = calculateBmi(Number(height), Number(weight));
  return res.send({ weight: weight, height: height, bmi: bmi});
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if ( !daily_exercises || !target || isNaN(Number(target))) {
    return res.status(400).send({ error: 'malformatted parameters'});
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(daily_exercises, target);
  return res.send({ result });
});











const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
