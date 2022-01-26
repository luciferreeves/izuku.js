# Frame Methods

There are some methods attached to the frame class. You can tap into those methods by using the dot (.) notation. Most of the methods are [chainable](../chaining-methods).

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

### `title()` ![](https://img.shields.io/badge/chainable-green.svg?style=plastic)

The `title()` method is used to modify the title of the frame. Title is optional.

> **Note:** If you use title method without passing any argument, it will reset the title to default title (Remember: title is optional).

```js
// modify the title
const newTitle = 'New Title';
frame.title(newTitle);

// Reset the title to default
frame.title();
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

### `fromJSON()` ![](https://img.shields.io/badge/chainable-green.svg?style=plastic)

The `fromJSON()` method is used to create a frame from a JSON object. It takes the JSON object as an argument. `fromJSON()` method returns a new frame. You can chain other frame methods on the returned frame.

> **Note:** The `fromJSON()` method does not take nested JSON objects as an argument. If you have a nested JSON object, flatten it using the `flattenJSON()` helper function first.

```js
const json = [{...}, {...}, ...];
const frame = new Frame().fromJSON(json);

// ...continue with other frame methods
```

### `fromCSV()` ![](https://img.shields.io/badge/chainable-green.svg?style=plastic)

The `fromCSV()` method is used to create a frame from a CSV string. It takes the CSV string as an argument. `fromCSV()` method returns a new frame. You can chain other frame methods on the returned frame.

> **Note:** The `fromCSV()` automatically assigns the column names from the first row of the CSV string. If you do not want to use the column names, you can use the `header()` method to assign the column names first.

```js

const path = require('path');
const csvPath = path.join(__dirname, 'data.csv');

// Sets the column names from the first row of the CSV
const frame = new Frame().fromCSV(csvPath);

// Define the column names manually
const headers = [...];

// Set the header first (important) then read the CSV
const frame = new Frame().header(headers).fromCSV(csvPath);
```

### `find()` ![](https://img.shields.io/badge/chainable-green.svg?style=plastic)

The `find()` method is used to find the rows that match the given condition. It takes a string or a number as an argument which is needed to be found in the frame. Optionally, it also takes an `options` object as as the second argument.

The valid options are defined below:

  - `row`: The row index to seach in. Can also be an array of row indexes.
  - `column`: The column name or index to search in. Can also be an array of column names or indexes.
  - `strict`: If `true`, the search will be performed on the exact value. If `false`, the search will be performed on the value as a substring. Default is `false`.

> **Hint**: You can also combine the `range()` helper method to pass a range of rows or columns.

```js
// find all the rows with value 'John' in column 'Name'
const row = frame.find('John', {column: 'Name'});

// find all the rows with value 'John' in columns 0, 1 and 2. Perform a strict search
const row = frame.find('John', {column: [0, 1, 2], strict: true});

// find all the rows with value 'John' in columns 0, 1 and 2 and rows 3, 4 and 5.
// Perform a non-strict search
const row = frame.find('John', {column: [0, 1, 2], row: [3, 4, 5], strict: false});
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

If you run the `info()` method on the frame with [data defined in the Getting Started Section](https://github.com/luciferreeves/izuku.js/wiki/Getting-Started), it will print the following information:

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

### `rangeIndex()` ![](https://img.shields.io/badge/not%20chainable-red.svg?style=plastic)

The `rangeIndex()` method is used to get the element at a particular index if the complete data was flattened. It takes an index as an argument. Index is zero-based.

`rangeIndex()` does not return a new frame and therefore it is not chainable. It returns the element at the index and therefore a `console.log` is required to print the element.

```js
// get the element at index 2
console.log(frame.rangeIndex(2));
```

There are some helper methods which will make your workflow easier. Take a look at the [Helper Methods](../helper-methods) section.
