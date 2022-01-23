import { data, generateHeader, setHeader, header } from './lib/frame';
import {
  getMultipleColumnDetails,
  getSingleColumnDetails,
  getSingleRowDetails,
  getMultipleRowDetails,
  rangeIndex
} from './lib/locate';
import { show, head, tail } from './lib/display';
import { getSize, info } from './lib/info';
import { flatten } from './lib/data';
import { isArrayOfType, range } from './helpers/arrayFunctions';

class Izuku {
  rowdata: unknown[][] = [];
  columns: string[];
  size = 0;
  shape = '0 x 0';

  constructor(rowdata?: Array<unknown[]>, columns?: Array<string>) {
    this.rowdata = rowdata || [];
    this.columns = columns
      ? setHeader(this.rowdata, columns)
      : generateHeader(this.rowdata);
    this.size = getSize(this.rowdata);
    this.shape = `${this.rowdata.length} x ${this.columns.length}`;
  }

  public data = data;
  public header = header;
  public show = show;
  public head = head;
  public tail = tail;
  public info = info;
  public column = (column: number | string | Array<number> | Array<string>) => {
    // if a number or string is passed, return a single column
    if (typeof column === 'number' || typeof column === 'string') {
      const izSampler = getSingleColumnDetails(this, column);
      return new Izuku(izSampler.rowd, izSampler.rowh);
    } else if (Array.isArray(column) || isArrayOfType(column, 'string')) {
      const izSampler = getMultipleColumnDetails(this, column);
      return new Izuku(izSampler.rowd, izSampler.rowh);
    } else {
      throw new Error('Unexpected type of column');
    }
  };
  public row = (row: number | Array<number>) => {
    if (typeof row === 'number') {
      const izSampler = getSingleRowDetails(this, row);
      return new Izuku(izSampler.rowd, izSampler.rowh);
    } else if (Array.isArray(row)) {
      const izSampler = getMultipleRowDetails(this, row);
      return new Izuku(izSampler.rowd, this.columns);
    } else {
      throw new Error('Row must be an integer or an array of integers');
    }
  };
  public flatten = () => {
    return flatten(this.rowdata);
  };
  public rangeIndex = (index: number) => {
    return rangeIndex(this, index);
  };
}

class Frame extends Izuku {
  constructor(rowdata?: Array<unknown[]>, columns?: Array<string>) {
    super(rowdata, columns);
  }
}

export { Frame, range };
