![GitHub Workflow Status](https://img.shields.io/github/workflow/status/luciferreeves/izuku.js/Node.js%20CI) ![Lines of code](https://img.shields.io/tokei/lines/github/luciferreeves/izuku.js?label=lines%20of%20code) ![GitHub](https://img.shields.io/github/license/luciferreeves/izuku.js) ![GitHub issues](https://img.shields.io/github/issues-raw/luciferreeves/izuku.js)
# Izuku

Izuku is a simple, fast, and powerful tabular data representation and manipulation library written in [TypeScript](https://www.typescriptlang.org/). It is designed to be used to view, manipulate and debug 2D data in NodeJS applications.

The core of Izuku is the `Frame` class that represents a 2D array of data. It is designed to be used as a data structure for tabular data. Izuku is heavily inspired by [Pandas](https://pandas.pydata.org/).

> **Note**: Izuku is not a replacement for Pandas and should not be used for data analysis. It is designed to be used for data visualization and debugging. It can, however, handle large datasets and help you understand your data better but comes at some cost in performance. Since, Pandas is based on NumPy, and NumPy is written in C, Pandas would be much faster than Izuku.

## Frames

```js
import { Frame } from 'izuku';
// alternatively, const { Frame } = require('izuku');

// define some column names as an array
const header = ['Name', 'Age', 'Gender', 'Country'];

// define some data as a 2D array
const data = [
  ['Arthur', 21, 'Male', 'USA'],
  ['Betty', 20, 'Female', 'Canada'],
  ['Victor', 25, 'Male'],
  ['Dodger', 30, 'Male', 'Canada'],
  ['Rayan', 21, 'Male', 'Russia'],
  ['Skitley', 29, 'Female', 'Germany'],
  ['Victoria', 89, 'Female', 'UK'],
  ['Tiger', 23, 'Male', 'India'],
  ['Killjoy', null, 'Female', 'Riot']
];

// create a frame, header is optional
const frame = new Frame(data, header);

// print the frame
frame.show();
```

The above code creates a frame and prints it to the console. It looks like this:

```
╔═══════╤══════════╤══════╤════════╤═════════╗
║ Index │ Name     │ Age  │ Gender │ Country ║
╟───────┼──────────┼──────┼────────┼─────────╢
║ 0     │ Arthur   │ 21   │ Male   │ USA     ║
╟───────┼──────────┼──────┼────────┼─────────╢
║ 1     │ Betty    │ 20   │ Female │ Canada  ║
╟───────┼──────────┼──────┼────────┼─────────╢
║ 2     │ Victor   │ 25   │ Male   │         ║
╟───────┼──────────┼──────┼────────┼─────────╢
║ ...   │ ...      │ ...  │ ...    │ ...     ║
╟───────┼──────────┼──────┼────────┼─────────╢
║ 6     │ Victoria │ 89   │ Female │ UK      ║
╟───────┼──────────┼──────┼────────┼─────────╢
║ 7     │ Tiger    │ 23   │ Male   │ India   ║
╟───────┼──────────┼──────┼────────┼─────────╢
║ 8     │ Killjoy  │ null │ Female │ Riot    ║
╚═══════╧══════════╧══════╧════════╧═════════╝
```

## Frame Properties
There are some properties attached to the frame class. You can tap into those properties by using the dot (.) notation.

> **Note:** Frame methods are not available on the properties. You need to `console.log(propername)` to see the property values.

### `rowdata`
The `rowdata` property is an array of arrays that represents the data in the frame.

> **Note:** The `rowdata` property is read-only. If you want to modify the data in the frame, you can use the `data()` method.

```js
const rowdata = frame.rowdata;
console.log(rowdata); // prints "data" array
```

### `columns`
The `columns` property is an array of strings that represents the column names in the frame.

> **Note:** The `columns` property is read-only. If you want to modify the column names in the frame, you can use the `header()` method.

```js
const columns = frame.columns;
console.log(columns); // prints "header" array
```

### `size`
The `size` property gives the number of elements present in the frame.

> **Note:** The `size` property is read-only and is automatically generated when the frame is created. Size can change if data is modified.

```js
const size = frame.size;
console.log(size); // prints size. ex: 9
```

### `shape`
The `shape` property gives the number of rows and columns present in the frame.

> **Note:** The `shape` property is read-only and is automatically generated when the frame is created. Shape can change if data is modified.

```js
const shape = frame.shape;
console.log(shape); // prints shape. ex: 9 x 4
```

## Frame Methods
There are some methods attached to the frame class. You can tap into those methods by using the dot (.) notation. Most of the methods are chainable.

### `data()` ![](https://img.shields.io/badge/chainable-green.svg?style=plastic)
The `data()` method is used to modify the data in the frame. It takes the same data argument as the constructor – which is an array of arrays.

> **Note:** If you use data method without passing any argument, it will simply return the frame.

```js
const data = [[...], [...], ...];
const frame = new Frame();
frame.data(data);

// modify the data
const newData = [[...], [...], [...], [...], ...];
frame.data(newData);
```

### `header()` ![](https://img.shields.io/badge/chainable-green.svg?style=plastic)

The `header()` method is used to modify the column names in the frame. It takes the same header argument as the constructor – which is an array of strings.

> **Note:** If you use header method without passing any argument, it will reset the column names to default header (Remember: header is optional).

```js
// modify the header
const newHeader = [...];
frame.header(newHeader);

// Reset the header to default
frame.header();

// You can use any empty value to reset the header to default, for example:
// frame.header('');
// frame.header(null);
// frame.header(undefined);
// frame.header([]);
```

### `column()` ![](https://img.shields.io/badge/chainable-green.svg?style=plastic)

The `column()` method is used to get the column data of a particular column. It takes the column name or the index as an argument. It can also take an array of column names or indexes as an argument to get multiple columns.

The `column()` method returns a new frame with extracted column data as the data of the frame. You can chain other frame methods on the returned frame.

#### Get a single column

```js
// get a single column on Index 2 (Index starts from 0)
const column = frame.column(2);

// Alternatively, you can use the column name
const column = frame.column('Name');

// print the column
column.show();
```

#### Get multiple columns

```js
// get multiple columns on Index 2 and 3 (Index starts from 0)
const columns = frame.column([2, 3]);

// Alternatively, you can use the column names
const columns = frame.column(['Name', 'Age']);

// print the columns
columns.show();
```

### `row()` ![](https://img.shields.io/badge/chainable-green.svg?style=plastic)

The `row()` method is used to get the row data of a particular row. It takes the row index as an argument. It can also take an array of row indexes as an argument to get multiple rows.

The `row()` method returns a new frame with extracted row data as the data of the frame. You can chain other frame methods on the returned frame.

#### Get a single row
```js
// get a single row on Index 2 (Index starts from 0)
const row = frame.row(2);

// print the row
row.show();
```

#### Get multiple rows
```js
// get multiple rows on Index 2 and 3 (Index starts from 0)
const rows = frame.row([2, 3]);

// print the rows
rows.show();
```

### `head()` ![](https://img.shields.io/badge/not%20chainable-red.svg?style=plastic)

The `head()` method is used to get the first `n` rows of the frame. It takes the number of rows as an argument. If no argument is passed, it will return the first 5 rows. If the argument is greater than the number of rows in the frame, it will return the entire frame.

`head()` is a print method and it does not return a new frame and therefore it is not chainable.

```js
// get the first 5 rows
frame.head();

// get the first 10 rows
frame.head(10);
```

### `tail()` ![](https://img.shields.io/badge/not%20chainable-red.svg?style=plastic)

The `tail()` method is used to get the last `n` rows of the frame. It takes the number of rows as an argument. If no argument is passed, it will return the last 5 rows. If the argument is greater than the number of rows in the frame, it will return the entire frame.

`tail()` is a print method and it does not return a new frame and therefore it is not chainable.

```js
// get the last 5 rows
frame.tail();

// get the last 10 rows
frame.tail(10);
```

### `show()` ![](https://img.shields.io/badge/not%20chainable-red.svg?style=plastic)

The `show()` method is used to print the frame. It takes no argument.

`show()` is a print method and it does not return a new frame and therefore it is not chainable.

```js
// print the frame
frame.show();
```

### `info()` ![](https://img.shields.io/badge/not%20chainable-red.svg?style=plastic)

The `info()` method is used to print the frame information. It takes no argument.

`info()` is a print method and it does not return a new frame and therefore it is not chainable.

```js
// print the frame information
frame.info();
```

If you run the `info()` method on the frame with [data defined](https://github.com/luciferreeves/izuku.js#using-izuku) at the start of this readme, it will print the following information:

```
RangeIndex: 35 elements, 0 to 34
Shape: 9 rows, 4 columns
╔═══╤═════════════╤══════════════════╤══════════════╗
║ # │ Column Name │ Types            │ Empty Values ║
╟───┼─────────────┼──────────────────┼──────────────╢
║ 0 │ Name        │ string           │ false        ║
╟───┼─────────────┼──────────────────┼──────────────╢
║ 1 │ Age         │ number,object    │ true         ║
╟───┼─────────────┼──────────────────┼──────────────╢
║ 2 │ Gender      │ string           │ false        ║
╟───┼─────────────┼──────────────────┼──────────────╢
║ 3 │ Country     │ string,undefined │ true         ║
╚═══╧═════════════╧══════════════════╧══════════════╝
Data Types: string(26), number(8), object(1), undefined(1)
Memory Usage: 550 bytes
```

## Chaining Methods

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

## Cloning and Building this Repository

Clone the repository:

```bash
git clone https://github.com/luciferreeves/izuku.js.git
```

Run the build script:
```bash
cd izuku.js && npm install && npm run build
```

Run tests:
```bash
cd izuku.js && npm test
```
