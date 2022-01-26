import { Frame } from '../index';
import { sizeof } from '../helpers/memorySize';
import { flatten } from './data';
import { displayTable } from './display';
/**
 * size returns the total number of elements in the frame
 * @returns the total number of elements in the frame
 * @returns 0 if the frame is empty
 */
export function getSize(rowdata: any[]): number {
  // Get the number of elements in 2D array, do not count nulls
  return flatten(rowdata).length;
}

/**
 * info returns the type of data present in each column of the frame
 * @returns the type of data present in each column of the frame
 */
export function info(this: Frame): void {
  if (this.rowdata.length === 0) {
    console.log('Frame is empty');
  } else {
    const info: Array<any[]> = [];
    info.push(['#', 'Column Name', 'Types', 'Empty Values']);
    let counter = 0;
    const countDataTypes = {} as any;
    this.columns.forEach((column: string, index: number) => {
      // get all the types of data in the column, do not repeat the same type
      let nullValuesPresentInRow = false;
      const columnDataTypes = this.rowdata.map((row: any[]) => {
        if (
          row[index] === null ||
          row[index] === undefined ||
          row[index] === ''
        ) {
          nullValuesPresentInRow = true;
        }
        const currentType = String(typeof row[index]);
        if (!Object.keys(countDataTypes).includes(currentType)) {
          Object.assign(countDataTypes, { [currentType]: 1 });
        } else {
          const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] =>
            obj[key];
          const currentValue = getKeyValue(countDataTypes, currentType);
          Object.assign(countDataTypes, { [currentType]: currentValue + 1 });
        }
        return typeof row[index];
      });
      const uniqueDataTypes = [...new Set(columnDataTypes)];
      info.push([
        counter,
        column,
        [...uniqueDataTypes],
        nullValuesPresentInRow
      ]);
      counter++;
    });
    let dataTypesString = '';
    // Iterate through the countDataTypes object and create a string of the data types
    Object.keys(countDataTypes).forEach((key: string) => {
      dataTypesString += `${key}(${countDataTypes[key]})`;
      // check if the key is not the last key in the object
      if (
        Object.keys(countDataTypes).indexOf(key) !==
        Object.keys(countDataTypes).length - 1
      ) {
        dataTypesString += ', ';
      }
    });

    console.log(`RangeIndex: ${this.size} elements, 0 to ${this.size - 1}`);
    console.log(
      `Shape: ${this.shape.split(' x ')[0].trim()} rows, ${this.shape
        .split(' x ')[1]
        .trim()} columns`
    );
    displayTable(info);
    console.log(`Data Types: ${dataTypesString}`);
    console.log(`Memory Usage: ${sizeof(this)} bytes`);
  }
}
