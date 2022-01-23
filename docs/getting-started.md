# Getting Started

## Installation

Izuku is available on [npm](https://www.npmjs.com/package/izuku). To install Izuku, run the following command:

```bash
npm install izuku
```

## Basic Usage

As defined in [Home](../), the basic usage of Izuku is to create a `Frame` object and manipulate it. You can use either an 2D array, a JSON Object, or a CSV File to create a `Frame`. The following example creates a `Frame` from a 2D array:

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

Now that you have created a frame, take a look at the [frame properties](../frame-properties).
