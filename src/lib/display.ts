import { Frame } from '../index';
import { table } from 'table';

/**
 * getTable returns the data compatible with table.table
 * @param rowdata the rowdata to be sent to the frame
 * @param columns the header columns to be sent to the frame
 * @param indexRow index of the row to be printed
 * @returns Array of arrays
 */
function getTable(
  rowdata: unknown[][],
  columns: string[],
  indexRow?: any[]
): any[] {
  const maxSizedArrayLength = rowdata.reduce((acc, curr) => {
    return acc.length > curr.length ? acc : curr;
  }).length;
  const frameRows: unknown[][] = [];
  for (let i = 0; i < rowdata.length; i++) {
    const row = rowdata[i];
    const rowLength = row.length;
    const rowArray = [];
    rowArray.push(indexRow ? indexRow[i] : i);
    for (let j = 0; j < maxSizedArrayLength; j++) {
      if (j < rowLength) {
        rowArray.push(row[j]);
      } else {
        rowArray.push('');
      }
    }
    frameRows.push(rowArray);
  }
  return [['Index', ...columns], ...frameRows];
}

/**
 * show prints the frame in console.table format
 * @returns the current frame
 * @throws Error if the frame is empty
 */
export function show(this: Frame): void {
  if (this.rowdata.length === 0) {
    throw new Error('Set data before printing');
  }
  const numberOfRows = this.rowdata.length;
  if (numberOfRows < 7) {
    console.log(table(getTable(this.rowdata, this.columns)));
  } else {
    const firstThreeRows = this.rowdata.slice(0, 3);
    const lastThreeRows = this.rowdata.slice(numberOfRows - 3);
    const middleRow = [];
    for (let i = 0; i < this.columns.length; i++) {
      middleRow.push('...');
    }
    const indexRow = [
      0,
      1,
      2,
      '...',
      numberOfRows - 3,
      numberOfRows - 2,
      numberOfRows - 1
    ];
    const combinedRow = [...firstThreeRows, [...middleRow], ...lastThreeRows];
    console.log(table(getTable(combinedRow, this.columns, indexRow)));
  }
}

/**
 * head prints maximum first n rows of the frame
 * @param n: the number of rows to be returned
 * @returns the first n rows of the frame as array of arrays
 * @throws Error if the frame is empty
 */
export function head(this: Frame, n = 5): void {
  if (this.rowdata.length === 0) {
    throw new Error('Set data before printing');
  }
  // Check if n is greater than the number of rows
  if (n > this.rowdata.length) {
    n = this.rowdata.length;
  }

  // Generate the index row
  const indexRow = this.rowdata.map((row, index) => index);
  const data = this.rowdata.slice(0, n);
  console.log(table(getTable(data, this.columns, indexRow)));
}

/**
 * tail prints maximum last n rows of the frame
 * @param n: the number of rows to be returned
 * @returns the last n rows of the frame as array of arrays
 * @throws Error if the frame is empty
 */
export function tail(this: Frame, n = 5): void {
  if (this.rowdata.length === 0) {
    throw new Error('Set data before printing');
  }
  // Check if n is greater than the number of rows
  if (n > this.rowdata.length) {
    n = this.rowdata.length;
  }

  // Generate the index row
  const indexRow = this.rowdata.map((row, index) => index);
  const data = this.rowdata.slice(this.rowdata.length - n);
  // Slice the index row to match the data
  const slicedIndexRow = indexRow.slice(indexRow.length - n);
  console.log(table(getTable(data, this.columns, slicedIndexRow)));
}
