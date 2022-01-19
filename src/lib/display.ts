function getTable(
  rowdata: unknown[][],
  columns: string[],
  indexRow?: any[]
): any[] {
  const maxSizedArrayLength = rowdata.reduce((acc, curr) => {
    return acc.length > curr.length ? acc : curr;
  }).length;
  const frameRows: unknown[][] = [];
  for (let i = 0; i < rowdata.length; i++) {
    const row = rowdata[i];
    const rowLength = row.length;
    const rowArray = [];
    rowArray.push(indexRow ? indexRow[i] : i);
    for (let j = 0; j < maxSizedArrayLength; j++) {
      if (j < rowLength) {
        rowArray.push(row[j]);
      } else {
        rowArray.push('');
      }
    }
    frameRows.push(rowArray);
  }
  return [['Index', ...columns], ...frameRows];
}

export { getTable };
