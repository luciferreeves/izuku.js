import { FrameInterface } from '../interface/frameInterface';

export class Display implements FrameInterface {
  rowdata: unknown[][] = [];
  columns!: string[];
  table(frame: FrameInterface): void {
    const maxSizedArrayLength = frame.rowdata.reduce((acc, curr) => {
      return acc.length > curr.length ? acc : curr;
    }).length;
    console.table(
      frame.rowdata.map((row) => {
        const rowobj: any = {};
        for (let i = 0; i < maxSizedArrayLength; i++) {
          rowobj[frame.columns[i]] = row[i] ? row[i] : null;
        }
        return rowobj;
      })
    );
  }
}
