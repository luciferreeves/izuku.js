interface Izuku {
  rowdata: unknown[][];
  columns: string[];
}
/**
 * column returns a single column of the frame, option is either the column name or the column index
 * @param column: the column to be returned
 * @returns a single column of the frame as array of arrays
 */
export function getSingleColumnDetails(iz: Izuku, column: number | string) {
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
}
