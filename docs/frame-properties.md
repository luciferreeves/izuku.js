# Frame Properties

There are some properties attached to the frame class. You can tap into those properties by using the dot (.) notation.

> **Note:** Frame methods are not available on the properties. You need to `console.log(propertyName)` to see the property values.

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

Now that you have a frame, you can use the frame methods to manipulate the data. Take a look at the [frame methods](../frame-methods).
