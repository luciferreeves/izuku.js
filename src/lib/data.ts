import { Frame } from '../index';
import { isValidJSONObject } from '../helpers/arrayFunctions';

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

/**
 * fromJSON - converts a JSON string into a rowdata - framedata is a 2D array
 * @param json: the JSON string to be converted
 * @returns the rowdata
 */
export function fromJSON(this: Frame, json: any): Frame {
  if (isValidJSONObject(json)) {
    const header: string[] = [];
    const rowdata: any[][] = [];
    // loop through each row
    for (let i = 0; i < json.length; i++) {
      // get all the keys and store them in the header
      for (const key in json[i]) {
        if (!header.includes(key)) {
          header.push(key);
        }
      }
    }
    // loop through each row
    for (let i = 0; i < json.length; i++) {
      // get the values of the keys present in the header, if the values are not present in the row, add null
      const row: any[] = [];
      for (let j = 0; j < header.length; j++) {
        if (json[i][header[j]] !== undefined) {
          row.push(json[i][header[j]]);
        } else {
          row.push(null);
        }
      }
      rowdata.push(row);
    }
    this.rowdata = rowdata;
    this.columns = header;
    return this;
  } else {
    throw new Error('Invalid JSON');
  }
}
