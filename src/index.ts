import { data, generateHeader, setHeader, header } from './lib/frame';
import { getSingleColumnDetails } from './lib/locate';
import { show, head, tail } from './lib/display';
import { getSize, info } from './lib/info';

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
  public column = (column: number | string) => {
    const izSampler = getSingleColumnDetails(this, column);
    return new Izuku(izSampler.rowd, izSampler.rowh);
  };
}

export = Izuku;
