export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height**2) * 10000;
  switch (true) {
    case bmi < 18.5:
      return 'underweight';
    case bmi >= 18.5 && bmi < 25:
      return 'normal weight';
    case bmi >= 25 && bmi < 30:
      return 'overweight';
    case bmi >= 30:
      return 'obese';
    default:
      throw new Error('Something went wrong');
  }
};


interface ReturnValues {
  height: number
  weight: number
}

const solveArguments = (args: string[]): ReturnValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error('Provided values were not numbers');
  }

  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
};

try {
  const { height, weight } = solveArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}