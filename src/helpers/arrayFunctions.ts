/**
 * isArrayOfType check if the array contains only the specified type
 * @param array: the array to be checked
 * @param type: the type to be checked
 * @returns true if the array contains only the specified type
 */

export function isArrayOfType(array: any[], type: string): boolean {
  return array.filter((i) => typeof i === type).length === array.length;
}

/**
 * range - returns an array of numbers from start to end
 * @param start: the start of the range
 * @param end: the end of the range
 * @param step: the step of the range
 * @returns an array of numbers from start to end
 */

export function range(
  start: number,
  end: number,
  step = 1,
  remove?: Array<number>
): Array<number> {
  // Check if start, end and step are integers
  if (
    !Number.isInteger(start) ||
    !Number.isInteger(end) ||
    !Number.isInteger(step)
  ) {
    throw new Error('range parameters must be integers');
  }
  const rangeArray: Array<number> = [];
  // Start must be less than end
  if (start > end) {
    throw new Error('starting value must be less than end value');
  }

  // Step must be greater than 0
  if (step <= 0) {
    throw new Error('step must be greater than 0');
  }

  // Generate an array from start to end
  for (let i = start; i <= end; i += step) {
    if (remove) {
      if (!remove.includes(i)) {
        rangeArray.push(i);
      }
    } else {
      rangeArray.push(i);
    }
  }
  return rangeArray;
}
