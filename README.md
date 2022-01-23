<p align="center">
  <img width="100%" src="./render/Izuku.png">
</p>

<p align="center">
  <img src="https://img.shields.io/github/workflow/status/luciferreeves/izuku.js/Node.js%20CI"> <img src="https://img.shields.io/github/license/luciferreeves/izuku.js"> <img src="https://img.shields.io/github/issues-raw/luciferreeves/izuku.js">
</p>

# Izuku

Izuku is a simple, fast, and powerful tabular data representation and manipulation library written in [TypeScript](https://www.typescriptlang.org/). It is designed to be used to view, manipulate and debug 2D data in NodeJS applications.

The core of Izuku is the `Frame` class that represents a 2D array of data. It is designed to be used as a data structure for tabular data. Izuku is heavily inspired by [Pandas](https://pandas.pydata.org/).

> **Note**: Izuku is not a replacement for Pandas and should not be used for data analysis. It is designed to be used for data visualization and debugging. It can, however, handle large datasets and help you understand your data better but comes at some cost in performance. Since, Pandas is based on NumPy, and NumPy is written in C, Pandas would be much faster than Izuku.

## Installation

Izuku is available on [npm](https://www.npmjs.com/package/izuku). To install Izuku, run the following command:

```bash
npm install izuku
```

## Basic Usage

As defined above, the basic usage of Izuku is to create a `Frame` object and manipulate it. You can use either an 2D array, a JSON Object, or a CSV File to create a `Frame`. The following example creates a `Frame` from a 2D array:

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

## Futher Documentation

For more documentation, please take a look at the [Project Wiki](https://github.com/luciferreeves/izuku.js/wiki).

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

## Contributing

To learn how to contribute to Izuku, please take a look at the [Contributing Guide](https://github.com/luciferreeves/izuku.js/blob/master/CONTRIBUTING.md). Make sure to also read the [Code of Conduct](https://github.com/luciferreeves/izuku.js/blob/master/CODE_OF_CONDUCT.md) before submitting a pull request.
