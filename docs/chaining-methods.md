# Chaining Methods

Since, the row and column methods return a new frame, you can chain them together to get the data of multiple rows and columns. The following example shows how to get the data of multiple rows and columns.

The returned data is also a new frame and you can continue chaining other frame methods on it.

```js
const data = [[...], [...], ...];
const header = [...];
const frame = new Frame(data, header);

// 1. get multiple rows on Index 2 and 3
// 2. then get the 'Name' and 'Age' columns of those rows
// 3. finally print the data
frame.row([2, 3]).column(['Name', 'Age']).show();
```
