interface exerciseData {
  numDays: number,
  numTrainingDays: number,
  targetAvg: number,
  calcAvg: number,
  targetReached: boolean,
  rating: number,
  ratingDesc: string
}

const calculateExercises = (dailyExerciseTimes: Array<number>, targetAvg: number): exerciseData => {
  const numDays: number = dailyExerciseTimes.length;
  const numTrainingDays: number = dailyExerciseTimes.filter(time => time !== 0).length;

  const totalHours: number = dailyExerciseTimes.reduce((sum, cur) => {
    return sum + cur;
  }, 0);
  const calcAvg: number = totalHours / numDays;

  const targetReached = calcAvg === targetAvg;

  let rating = 1;
  let ratingDesc = 'You can do it better!';
  if (targetReached) {
    rating = 3;
    ratingDesc = 'Perfect! You reached your goal';
  } else if (calcAvg - targetAvg > -0.3) {
    rating = 2;
    ratingDesc = 'Almost reached your goal';
  } else if (calcAvg - targetAvg > 0) {
    rating = 3;
    ratingDesc = 'You have overreached your goal!';
  }

  return {
    numDays,
    numTrainingDays,
    targetAvg,
    calcAvg,
    targetReached,
    rating,
    ratingDesc
  };
};

export default calculateExercises;
