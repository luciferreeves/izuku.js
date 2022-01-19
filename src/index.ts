import { table } from 'table';
import { FrameInterface } from './interface/frameInterface';
import { getTable } from './lib/display';

class Izuku implements FrameInterface {
  rowdata: unknown[][] = [];
  columns!: string[];

  constructor(rowdata?: Array<unknown[]>, header?: Array<string>) {
    this.rowdata = rowdata || [];
    this.columns = header || [];
  }
  /**
   * data prints the data of the frame in console.table format. It also sets the new data to the frame if data is passed as a parameter
   * @param rowdata: the rowdata to be sent to the frame
   * @returns the current frame
   */
  data(rowdata?: Array<unknown[]>): this | unknown[][] | any {
    if (rowdata) {
      this.rowdata = rowdata;
    }

    return this;
  }

  /**
   * header sets the names of the columns of the frame
   * @param header: the header to be attached to the frame
   * @returns the current frame
   */
  header(header: Array<string>): this | Array<string> | any {
    if (!this.rowdata.length) {
      throw new Error('Set data before setting header');
    } else {
      const passedHeaderLength = header.length;
      const maxSizedArrayLength = this.rowdata.reduce((acc, curr) => {
        return acc.length > curr.length ? acc : curr;
      }).length;
      if (passedHeaderLength !== maxSizedArrayLength) {
        throw new Error('Header length does not match data length');
      } else {
        this.columns = header;
      }
    }

    return this;
  }

  /**
   * column returns a single column of the frame, option is either the column name or the column index
   * @param column: the column to be returned
   * @returns a single column of the frame as array of arrays
   */
  public column(column: number | string): Array<unknown> | any {
    let extractedColumn: any[] = [];
    let columnName = '';
    if (typeof column === 'string') {
      extractedColumn = this.rowdata.map((row) => {
        return row[this.columns.indexOf(column)];
      });
      columnName = column;
    }
    if (typeof column === 'number') {
      extractedColumn = this.rowdata.map((row) => {
        return row[column];
      });
      columnName = this.columns[column]
        ? this.columns[column]
        : `column${column + 1}`;
    }
    extractedColumn = extractedColumn.map((item) => [item]);
    return new Izuku(extractedColumn, [columnName]);
  }

  /**
   * show prints the frame in console.table format
   * @returns the current frame
   * @throws Error if the frame is empty
   */
  public show(): void {
    if (!this.rowdata.length) {
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
  public head(n = 5): void {
    if (!this.rowdata.length) {
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
  public tail(n = 5): void {
    if (!this.rowdata.length) {
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
}

export = Izuku;
