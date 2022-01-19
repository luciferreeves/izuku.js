import { data, header } from './lib/frame';
import { getSingleColumnDetails } from './lib/locate';
import { show, head, tail } from './lib/display';

class Izuku {
  rowdata: unknown[][] = [];
  columns: string[] = [];

  constructor(rowdata?: Array<unknown[]>, columns?: Array<string>) {
    this.rowdata = rowdata || [];
    this.columns = columns || [];
  }

  public data = data;
  public header = header;
  public show = show;
  public head = head;
  public tail = tail;
  public column = (column: number | string) => {
    const izSampler = getSingleColumnDetails(this, column);
    return new Izuku(izSampler.rowd, izSampler.rowh);
  };
}

export = Izuku;
