interface Izuku {
  rowdata: unknown[][];
  columns: string[];
}

/**
 * checkIfColumnExists - check if a column exists in the frame
 * @param frame: the frame to be checked
 * @param column: the column index or name to be checked
 * @returns true if the column exists
 */
function checkIfColumnExists(frame: Izuku, column: number | string): boolean {
  if (typeof column === 'number') {
    return column < frame.columns.length;
  } else if (typeof column === 'string') {
    return frame.columns.includes(column);
  } else {
    throw new Error('column must be a number or a string');
  }
}

/**
 * checkIfRowExists - check if a row exists in the frame
 * @param frame: the frame to be checked
 * @param row: the row index to be checked
 * @returns true if the row exists
 */
function checkIfRowExists(frame: Izuku, row: number): boolean {
  return row < frame.rowdata.length;
}

/**
 * column returns a single column of the frame, option is either the column name or the column index
 * @param column: the column to be returned
 * @returns a single column of the frame as array of arrays
 */
export function getSingleColumnDetails(iz: Izuku, column: number | string) {
  if (checkIfColumnExists(iz, column)) {
    let extractedColumn: any[] = [];
    let columnName = '';
    if (typeof column === 'string') {
      extractedColumn = iz.rowdata.map((row) => {
        return row[iz.columns.indexOf(column)];
      });
      columnName = column;
    }
    if (typeof column === 'number') {
      extractedColumn = iz.rowdata.map((row) => {
        return row[column];
      });
      columnName = iz.columns[column]
        ? iz.columns[column]
        : `column${column + 1}`;
    }
    extractedColumn = extractedColumn.map((item) => [item]);
    return { rowd: extractedColumn, rowh: [columnName] };
  } else {
    throw new Error(`Column ${column} does not exist`);
  }
}

/**
 * getMultipleColumnDetails - returns multiple columns of the frame
 * @param columns: an array of column names or indexes
 * @returns an array of arrays containing the columns
 */
export function getMultipleColumnDetails(
  iz: Izuku,
  columns: Array<number | string>
) {
  const extractedColumns: any[][] = [];
  const columnNames: string[] = [];
  columns.forEach((column) => {
    const columnDetails = getSingleColumnDetails(iz, column);
    extractedColumns.push(columnDetails.rowd);
    columnNames.push(columnDetails.rowh[0]);
  });
  // transpose the columns
  const transposedColumns = extractedColumns[0].map((col, i) => {
    return extractedColumns.map((row) => row[i]);
  });
  return { rowd: transposedColumns, rowh: columnNames };
}

/**
 * getSingleRowDetails - returns a single row of the frame
 * @param row: the row to be returned
 * @returns a single row of the frame as array of arrays
 * @throws Error if the row does not exist
 * @throws Error if the row is not a number
 */
export function getSingleRowDetails(iz: Izuku, row: number) {
  if (checkIfRowExists(iz, row)) {
    return { rowd: [iz.rowdata[row]], rowh: iz.columns };
  } else {
    throw new Error(`Row ${row} does not exist`);
  }
}

/**
 * getMultipleRowDetails - returns multiple rows of the frame
 * @param rows: an array of row indexes
 * @returns an array of arrays containing the rows
 */
export function getMultipleRowDetails(iz: Izuku, rows: Array<number>) {
  const extractedRows: any[][] = [];
  rows.forEach((row) => {
    const rowDetails = getSingleRowDetails(iz, row);
    extractedRows.push(rowDetails.rowd[0]);
  });
  return { rowd: extractedRows, rowh: iz.columns };
}
