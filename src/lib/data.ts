import { Frame } from '../index';
import { isValidJSONObject } from '../helpers/arrayFunctions';
import { readFileSync } from 'fs';

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

/**
 * fromCSV - converts a CSV string into a rowdata - framedata is a 2D array
 * @param csv: the CSV string to be converted
 * @returns the rowdata
 */
export function fromCSV(this: Frame, csvpath: string): Frame {
  // read the csv file
  const csv = readFileSync(csvpath, 'utf8');
  const rowdata: any[][] = [];
  const rows: string[] = csv.split('\n');
  for (let i = 0; i < rows.length; i++) {
    const row: string[] = rows[i].split(',');
    rowdata.push(row);
  }
  this.rowdata = rowdata;
  if (this.columns.length === 0) {
    this.columns = rowdata[0];
    // remove the first row
    this.rowdata.shift();
  }

  // if last row contains only empty values, remove it
  if (this.rowdata[this.rowdata.length - 1].every((item) => item === '')) {
    this.rowdata.pop();
  }
  return this;
}

/**
 * searchValue = searchValue all the rows that contain the passed string or number
 * @param value: the value to be searched
 * @returns the rowdata that contains the value
 */
export function searchValue(
  iz: Frame,
  value: string | number,
  options?: {
    row?: number | Array<number>;
    column?: number | string | Array<number> | Array<string>;
    strict?: boolean;
  }
): any[][] {
  options = options || {};
  if (!options?.strict) {
    options['strict'] = false;
  }
  // if no options are passed search everything
  if (!options || (!options.row && !options.column)) {
    const rowdata: any[][] = [];
    for (let i = 0; i < iz.rowdata.length; i++) {
      for (let j = 0; j < iz.rowdata[i].length; j++) {
        if (options.strict) {
          if (String(iz.rowdata[i][j]) === String(value)) {
            rowdata.push(iz.rowdata[i]);
            break;
          }
        } else {
          if (String(iz.rowdata[i][j]).includes(String(value))) {
            rowdata.push(iz.rowdata[i]);
            break;
          }
        }
      }
    }
    return rowdata;
  } else if (options.row && !options.column) {
    // if only row is passed, search the row
    const rowdata: any[][] = [];
    // get those particular rows
    const rows = iz.row(options.row).rowdata;
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows[i].length; j++) {
        if (options.strict) {
          if (String(rows[i][j]) === String(value)) {
            rowdata.push(rows[i]);
            break;
          }
        } else {
          if (String(rows[i][j]).includes(String(value))) {
            rowdata.push(rows[i]);
            break;
          }
        }
      }
    }
    return rowdata;
  } else if (options.column && !options.row) {
    // if only column is passed, search the column
    const columnIndexes: number[] = [];
    // get those particular columns
    const columns = iz.column(options.column).rowdata;
    console.log(columns);
    for (let i = 0; i < columns.length; i++) {
      for (let j = 0; j < columns[i].length; j++) {
        if (options.strict) {
          if (String(columns[i][j]) === String(value)) {
            columnIndexes.push(i);
            break;
          }
        } else {
          if (String(columns[i][j]).includes(String(value))) {
            columnIndexes.push(i);
            break;
          }
        }
      }
    }
    console.log(columnIndexes);
    return iz.row(columnIndexes).rowdata;
  } else if (options.column && options.row) {
    // if both row and column are passed, search the row and column
    // get those particular rows
    const rows = iz.row(options.row);
    const columns = rows.column(options.column).rowdata;
    const columnIndexes: number[] = [];
    for (let i = 0; i < columns.length; i++) {
      for (let j = 0; j < columns[i].length; j++) {
        if (options.strict) {
          if (String(columns[i][j]) === String(value)) {
            columnIndexes.push(i);
            break;
          }
        } else {
          if (String(columns[i][j]).includes(String(value))) {
            columnIndexes.push(i);
            break;
          }
        }
      }
    }
    return rows.row(columnIndexes).rowdata;
  } else {
    throw new Error('Invalid options');
  }
}

/**
 * sort - sorts the rowdata based on the column index
 * @param column: the column index or column name to be sorted
 * @param order: the order of the sort
 * @returns the sorted rowdata
 */
export function sort(
  this: Frame,
  column: number | string,
  ord?: 'accending' | 'descending'
) {
  const order = ord ? ord : 'ascending';
  const colums = this.columns;
  const rowdata = this.rowdata;
  const columnIndex =
    typeof column === 'number' ? column : colums.indexOf(column);
  if (columnIndex === -1) {
    throw new Error('Invalid column index');
  }
  const sorted = rowdata.sort((a: any, b: any) => {
    if (order === 'ascending') {
      return a[columnIndex] > b[columnIndex] ? 1 : -1;
    } else {
      return a[columnIndex] > b[columnIndex] ? -1 : 1;
    }
  });
  this.rowdata = sorted;
  return this;
}
