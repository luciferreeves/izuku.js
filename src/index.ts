import { data, generateHeader, setHeader, header, title } from './lib/frame';
import {
  getMultipleColumnDetails,
  getSingleColumnDetails,
  getSingleRowDetails,
  getMultipleRowDetails,
  rangeIndex
} from './lib/locate';
import { show, head, tail, showAll } from './lib/display';
import { getSize, info } from './lib/info';
import {
  flatten,
  fromJSON,
  fromCSV,
  searchValue,
  sort,
  removeDuplicates
} from './lib/data';
import { toJSON, toCSV } from './lib/export';
import { isArrayOfType, range, flattenJSON } from './helpers/arrayFunctions';

class Izuku {
  rowdata: unknown[][] = [];
  columns: string[];
  size = 0;
  shape = '0 x 0';
  tableTitle = '';

  constructor(
    rowdata?: Array<unknown[]>,
    columns?: Array<string>,
    tableTitle?: string
  ) {
    this.rowdata = rowdata || [];
    this.columns = columns
      ? setHeader(this.rowdata, columns)
      : generateHeader(this.rowdata);
    this.size = getSize(this.rowdata);
    this.shape = `${this.rowdata.length} x ${this.columns.length}`;
    this.tableTitle = tableTitle || '';
  }

  public data = data;
  public header = header;
  public show = show;
  public showAll = showAll;
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
  public fromJSON = fromJSON;
  public fromCSV = fromCSV;
  public find = (
    value: string | number,
    options?: {
      row?: number | Array<number>;
      column?: number | string | Array<number> | Array<string>;
      strict?: boolean;
    }
  ) => {
    const rowdata = searchValue(this, value, options);
    return new Izuku(rowdata, this.columns);
  };
  public title = title;
  public toJSON = toJSON;
  public toCSV = toCSV;
  public sort = sort;
  public removeDuplicates = removeDuplicates;
}

class Frame extends Izuku {
  constructor(rowdata?: Array<unknown[]>, columns?: Array<string>) {
    super(rowdata, columns);
  }
}

export { Frame, range, flattenJSON };
