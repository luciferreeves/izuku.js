import { data, generateHeader, setHeader, header } from './lib/frame';
import { getSingleColumnDetails } from './lib/locate';
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
    } else if (Array.isArray(column)) {
      // check if each element is an integer
      if (isArrayOfType(column, 'number')) {
        // TODO
      } else if (isArrayOfType(column, 'string')) {
        // TODO
      } else {
        throw new Error('Columns must be an array of integers or column names');
      }
    } else {
      throw new Error('Unexpected type of column');
    }
  };
  public flatten = () => {
    return flatten(this.rowdata);
  };
}

class Frame extends Izuku {
  constructor(rowdata?: Array<unknown[]>, columns?: Array<string>) {
    super(rowdata, columns);
  }
}

export { Frame, range };
