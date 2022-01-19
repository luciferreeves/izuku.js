export default class Izuku {
  constructor(rowdata?: Array<unknown[]>, header?: Array<string>) {
    this.rowdata = rowdata || [];
    this.header = header || [];
  }

  protected rowdata: Array<unknown[]> = [];
  protected header: Array<string> = [];
  /**
   * data sets the rowdata of the frame, it creates a new frame if the frame is undefined
   * @param rowdata: the rowdata to be sent to the frame
   * @returns a new frame with the rowdata or updates the current frame with new rowdata or returns the current rowdata if rowdata is present
   */
  data(rowdata?: Array<unknown[]>): Izuku | unknown[][] {
    if (rowdata) {
      this.rowdata = rowdata;
      return new Izuku(rowdata, this.header);
    } else if (this.rowdata) {
      return this.rowdata;
    } else {
      throw new Error('Frame has no rowdata.');
    }
  }

  /**
   * columns sets the header of the frame, it creates a new frame if the frame is undefined
   * @param header: the header to be sent to the frame
   * @returns a new frame with the header or updates the current frame with new header or returns the current header if header is present
   */
  columns(header?: Array<string>): Izuku | Array<string> {
    if (header) {
      this.header = header;
      return new Izuku(this.rowdata, header);
    } else if (this.header) {
      return this.header;
    } else {
      throw new Error('Frame has no header.');
    }
  }
}
