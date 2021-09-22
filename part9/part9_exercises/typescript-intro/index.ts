import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import express from 'express';
const app = express();

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if(!req.query.height || !req.query.weight){
    res.json({ error: 'malformatted parameters' });
  }

  if(req.query.height && req.query.weight) {
    const height: number = +req.query.height;
    const weight: number = +req.query.weight;

    const bmiResult = calculateBmi(height, weight);

    const resObj = {
      weight,
      height,
      bmi: bmiResult
    };

    res.json(resObj);
  }
})

app.post('/exercises', (req, res) => {
  const dailyExercises: Array<number> = req.body['daily_exercises']
  const target: number = req.body.target

  const result = calculateExercises(dailyExercises, target);

  res.json(result)
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});