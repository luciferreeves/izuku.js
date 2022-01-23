
# Helper Methods

Helper methods are methods that are used to help you with some common tasks. They are not chainable. They are not required to use the frame methods.

### `range()`

`range()` is a helper method that is used to create a an array of numbers. Here are the arguments and their default values:

| Argument | Description                                                   | Default Value |
| -------- | ------------------------------------------------------------- | ------------- |
| `start`  | The start of the range                                        | Required      |
| `end`    | The end of the range                                          | Required      |
| `step`   | The step size of the range                                    | 1             |
| `remove` | An array of numbers which should not be included in the range | `undefined`   |

> Note: The `step` and `remove` arguments are optional. If you do not provide it, `step` will be set to 1 and `remove` will be set to `undefined`.

#### Example

```js
range(0, 10);
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

range(0, 10, 2);
// [0, 2, 4, 6, 8, 10]

range(0, 10, 1, [1, 3, 5, 7, 9]);
// [0, 2, 4, 6, 8, 10]
```

#### Example with frame

```js
// Import Frame and range
import { Frame, range } from 'izuku';

// create a frame
const frame = new Frame([[...], [...], ...]);

// Get all columns from 2 to 6
const columns = frame.column(range(2, 6));
```

### `flattenJSON()`

`flattenJSON()` is a helper method that is used to flatten a JSON object. Here are the arguments and their default values:

| Argument | Description                                                   | Default Value |
| -------- | ------------------------------------------------------------- | ------------- |
| `json`   | The JSON object to flatten                                   | Required      |

#### Example

```js
import { flattenJSON } from 'izuku';
const flattened = flattenJSON({
  a: {
    b: {
      c: 'hello'
    }
  }
});

// flattened is [ a.b.c: 'hello' ]
```

In order to see how to chain methods, take a look at the [Chaining Methods](../chaining-methods) section.
