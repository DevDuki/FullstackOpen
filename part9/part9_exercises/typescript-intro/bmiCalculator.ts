const calculateBmi = (height: number, weight: number): string => {
  const heightInM: number = height / 100;
  const bmi: number = weight / (heightInM*heightInM);

  if (bmi < 18.5) {
    return 'Underweight (Unhealthy)';
  } else if (bmi < 23) {
    return 'Normal range (Healthy)';
  } else if (bmi < 25) {
    return 'Overweight I (At risk)';
  } else if (bmi < 30) {
    return 'Overweight II (Moderatley obese)';
  } else {
    return 'Overweight III (Severely obese)';
  }
};

console.log(calculateBmi(180, 74));

export default calculateBmi;