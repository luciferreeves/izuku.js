import { Frame } from '../index';
import { getSize } from './info';
/**
 * data prints the data of the frame in console.table format. It also sets the new data to the frame if data is passed as a parameter
 * @param rowdata: the rowdata to be sent to the frame
 * @returns the current frame
 */
export function data(
  this: Frame,
  rowdata?: Array<unknown[]>
): unknown[][] | any {
  if (rowdata) {
    this.rowdata = rowdata;
    this.size = getSize(this.rowdata);
  }

  return this;
}

/**
 * header sets the names of the columns of the frame
 * @param header: the header to be attached to the frame
 * @returns the current frame
 */
export function header(
  this: Frame,
  header?: Array<string>
): Array<string> | any {
  if (!header?.length) {
    this.columns = generateHeader(this.rowdata);
  } else {
    this.columns = setHeader(this.rowdata, header);
  }
  return this;
}

/**
 * setHeader sets the names of the columns of the frame
 * @param rowdata: the rowdata to be sent to the frame
 * @param header: the header to be attached to the frame
 * @returns a new header
 */

export function setHeader(rowdata: any[][], header: any[]): Array<string> {
  const maxSizedArrayLength = rowdata.reduce((acc, curr) => {
    return acc.length > curr.length ? acc : curr;
  }).length;
  const newHeaderArray = Array(maxSizedArrayLength).fill('');
  for (let i = 0; i < maxSizedArrayLength; i++) {
    if (header[i]) {
      newHeaderArray[i] = header[i];
    } else {
      newHeaderArray[i] = `Column ${i + 1}`;
    }
  }
  return newHeaderArray;
}

/**
 * generateHeader generates the names of the columns of the frame
 * @param rowdata: the rowdata to be sent to the frame
 * @returns a new header
 */

export function generateHeader(rd: Array<any[]>): Array<string> {
  if (rd?.length) {
    const maxSizedArrayLength = rd.reduce((acc, curr) => {
      return acc.length > curr.length ? acc : curr;
    }).length;
    const header: Array<string> = [];
    for (let i = 0; i < maxSizedArrayLength; i++) {
      header.push(`Column ${i + 1}`);
    }
    return header;
  } else {
    return [];
  }
}
