import Izuku from '../index';
/**
 * data prints the data of the frame in console.table format. It also sets the new data to the frame if data is passed as a parameter
 * @param rowdata: the rowdata to be sent to the frame
 * @returns the current frame
 */
export function data(
  this: Izuku,
  rowdata?: Array<unknown[]>
): unknown[][] | any {
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
export function header(
  this: Izuku,
  header: Array<string>
): Array<string> | any {
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
