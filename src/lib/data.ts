/**
 * flattenArray - flattens a 2D into a single array
 * @param array: the array to be flattened
 * @returns the flattened array
 */
export function flatten(array: any[][]): any[] {
  let flattenedArray: any[] = [];
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      flattenedArray = flattenedArray.concat(flatten(array[i]));
    } else {
      flattenedArray.push(array[i]);
    }
  }
  return flattenedArray;
}
