interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
  }

export const calculateExercises = (hours: number[], target: number): Result => {
  const sum = hours.reduce((sum, currentValue) => sum + currentValue, 0);
  const average = sum / hours.length;

  const description = (): string => {
    switch(true) {
      case average >= target:
        return 'creat job, you reached the target value';
      case target > average /2:
        return 'not great, not terrible';
      case target < average / 2:
        return 'too far off the target';
      default:
        throw new Error('Something went wrong');
    }
  };

  return {
    periodLength: hours.length,
    trainingDays: hours.filter(d => d).length,
    success: average >= target ? true : false,
    rating: Math.round(average),
    ratingDescription: description(),
    target: target,
    average: average
  };
};

interface SortedValues {
  hours: number[]
  target: number
}

const parseArguments = (args: string[]): SortedValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (isNaN(Number(args[2]))) {
    throw new Error('Provided values were not numbers');
  }

  const argumentsArray: number[] = [];

  process.argv.forEach((val, index) => {
    if (index > 2 && !isNaN(Number(val))) {
      argumentsArray.push(Number(val));
    }
    if (index > 2 && isNaN(Number(val))) {
      throw new Error('Provided values were not numbers');
    }
  });

  return {
    hours: argumentsArray,
    target: Number(args[2])
  };

};


try {
  const { hours, target } = parseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}