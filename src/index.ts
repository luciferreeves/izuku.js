export default class Izuku {
  constructor(data?: Array<unknown[]>, header?: Array<string>) {
    this.data = data || [];
    this.header = header || [];
  }

  protected data: Array<unknown[]> = [];
  protected header: Array<string> = [];
  /**
   * frame creates a new frame
   * @param data: the data to be sent to the frame
   * @returns a new frame with the data or updates the current frame with new data or returns the current data if data is present
   */
  frame(data?: Array<unknown[]>): Izuku | unknown[][] {
    if (data) {
      this.data = data;
      return new Izuku(data, this.header);
    } else if (this.data) {
      return this.data;
    } else {
      throw new Error('Frame has no data.');
    }
  }

  /**
   * columns creates a new header for the current data
   * @param header: the header to be sent to the frame
   * @returns a new frame with the header or updates the current frame with new header or returns the current header if header is present
   */
  columns(header?: Array<string>): Izuku | Array<string> {
    if (header) {
      this.header = header;
      return new Izuku(this.data, header);
    } else if (this.header) {
      return this.header;
    } else {
      throw new Error('Frame has no header.');
    }
  }
}
