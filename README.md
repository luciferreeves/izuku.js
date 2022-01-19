# Izuku

Izuku is a simple, fast, and powerful tabular data representation and manipulation library written in [TypeScript](https://www.typescriptlang.org/). It is designed to be used to view, manipulate and debug 2D data in NodeJS applications.

The core of Izuku is a `frame` class that represents a 2D array of data. It is designed to be used as a data structure for tabular data. Izuku is heavily inspired by [Pandas](https://pandas.pydata.org/).

## Using Izuku

```js
import Izuku from 'izuku';
const data = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const columns = ['a', 'b', 'c'];
const frame = new Izuku(data, columns);
console.log(frame.data());
// [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ]

console.log(frame.columns());
// ['a', 'b', 'c']
```

## Cloing and Building this Repository

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

