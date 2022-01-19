import { FrameInterface } from './interface/frameInterface';
import { Display } from './lib/display';

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
  data(rowdata?: Array<unknown[]>): this | unknown[][] {
    if (rowdata) {
      this.rowdata = rowdata;
    } else {
      new Display().table(this);
      return this;
    }

    return this;
  }

  /**
   * header sets the names of the columns of the frame
   * @param header: the header to be attached to the frame
   * @returns the current frame
   */
  header(header: Array<string>): this | Array<string> {
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
        return this;
      }
    }
  }

  /**
   * column returns a single column of the frame, option is either the column name or the column index
   * @param column: the column to be returned
   * @returns a single column of the frame
   * @example
   * const frame = new Izuku([
   * ['a', 'b', 'c'],
   * ['d', 'e', 'f'],
   * ['g', 'h', 'i']
   * ]);
   * frame.setheader(['a', 'b', 'c']);
   * console.log(frame.column('a'));
   * // ['a', 'd', 'g']
   * console.log(frame.column(1));
   * // ['b', 'e', 'h']
   */
  public column(column: string | number): Array<unknown> {
    if (typeof column === 'string') {
      return this.rowdata.map((row) => row[this.columns.indexOf(column)]);
    }
    return this.rowdata.map((row) => row[column]);
  }
}

export = Izuku;
