import { Frame } from '../index';
import { writeFileSync } from 'fs';

/**
 * toJSON - converts frame to JSON file, takes a path to save the file. Path is optional. If no path is provided, the file is saved in the current directory
 * @param frame: the frame to be converted
 * @param path: @optional the path to save the file
 * @param filename: @optional the name of the file
 */
export function toJSON(this: Frame, path?: string, filename?: string): void {
  const data = this.rowdata;
  const header = this.columns;

  // create a json object, with keys as the header and values as the row data
  const json = data.map((row: any[]) => {
    const obj: any = {};
    for (let i = 0; i < header.length; i++) {
      if (row[i]) {
        obj[header[i]] = row[i];
      }
    }
    return obj;
  });

  // save the json object to a file
  if (path) {
    writeFileSync(
      `${path}/${filename ? `${filename}` : 'data'}.json`,
      JSON.stringify(json)
    );
  } else {
    writeFileSync(
      `${filename ? `${filename}` : 'data'}.json`,
      JSON.stringify(json)
    );
  }

  // console.log the file path
  console.log(
    `${filename ? `${filename}` : 'data'}.json saved at ${
      path ? path : 'root level'
    }.`
  );
}
