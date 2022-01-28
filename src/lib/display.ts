import { Frame } from '../index';
import { Table } from '../helpers/tableBuilder';

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
  indexRow?: any[],
  title?: any
): any {
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
  return {
    title: title ? title : '',
    data: [['Index', ...columns], ...frameRows]
  };
}

/**
 * displayTable prints the table to the console
 * @param rowdata the rowdata to be sent to the frame
 */
export function displayTable(rowdata: any): void {
  // Convert row data into object with keys and values, keys are the column names stored in rowdata[0]
  const headerObject: any = [];
  rowdata.data[0].forEach((column: any) => {
    headerObject.push({
      name: column,
      alignment: 'left',
      paddingLeft: 2,
      bold: true,
      paddingRight: 2
    });
  });
  const table = new Table({
    columns: headerObject,
    title: String(rowdata.title)
  });

  const rowdataObject = rowdata.data.map((row: any[]) => {
    const rowObject: any = {};
    row.forEach((value: any, index: string | number) => {
      rowObject[rowdata.data[0][index]] = value;
    });
    return rowObject;
  });

  // remove the first row from rowdataObject
  const rowdataObjectWithoutHeader = rowdataObject.slice(1);
  table.addRows(rowdataObjectWithoutHeader);
  table.printTable();
}

/**
 * show prints the frame in console.table format
 * @returns the current frame
 * @throws Error if the frame is empty
 */
export function show(this: Frame): void {
  if (this.rowdata.length === 0) {
    console.log('No data found');
  } else {
    const numberOfRows = this.rowdata.length;
    if (numberOfRows < 7) {
      displayTable(
        getTable(this.rowdata, this.columns, undefined, this.tableTitle)
      );
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
      displayTable(
        getTable(combinedRow, this.columns, indexRow, this.tableTitle)
      );
    }
  }
}

/**
 * showAll prints the frame without truncating
 * @returns the current frame
 */
export function showAll(this: Frame): void {
  if (this.rowdata.length === 0) {
    console.log('No data found');
  } else {
    displayTable(
      getTable(this.rowdata, this.columns, undefined, this.tableTitle)
    );
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
    console.log('No data found');
  } else {
    // Check if n is greater than the number of rows
    if (n > this.rowdata.length) {
      n = this.rowdata.length;
    }

    // Generate the index row
    const indexRow = this.rowdata.map((row, index) => index);
    const data = this.rowdata.slice(0, n);
    displayTable(getTable(data, this.columns, indexRow, this.tableTitle));
  }
}

/**
 * tail prints maximum last n rows of the frame
 * @param n: the number of rows to be returned
 * @returns the last n rows of the frame as array of arrays
 * @throws Error if the frame is empty
 */
export function tail(this: Frame, n = 5): void {
  if (this.rowdata.length === 0) {
    console.log('No data found');
  } else {
    // Check if n is greater than the number of rows
    if (n > this.rowdata.length) {
      n = this.rowdata.length;
    }

    // Generate the index row
    const indexRow = this.rowdata.map((row, index) => index);
    const data = this.rowdata.slice(this.rowdata.length - n);
    // Slice the index row to match the data
    const slicedIndexRow = indexRow.slice(indexRow.length - n);
    displayTable(getTable(data, this.columns, slicedIndexRow, this.tableTitle));
  }
}
