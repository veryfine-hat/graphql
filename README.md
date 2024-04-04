# @byaga/graphql

This library provides a set of utilities to filter data stored in a `QueryData` object. One of the key features is the `intersectionOf` function, which allows you to apply multiple filters and get the intersection of the results.

## Installation

This library is written in TypeScript and can be used in any JavaScript or TypeScript project. To install, use npm:

```bash
npm install @byaga/graphql
```

## Usage

### intersectionOf

The `intersectionOf` function takes one or more predicate filters and returns a function that, when called with a `QueryData` object, returns the intersection of the results of the predicate filters.

Here is an example of how to use `intersectionOf`:

```typescript
import { intersectionOf } from 'querydata-filtering-library';
import { QueryData } from 'querydata-filtering-library';

interface YourType { 
    id: string, 
    name: string 
}
// Define your data
const data = new Map<string, YourType>([
    ['id1', { id: 'id1', name: 'value1' }],
    ['id2', { id: 'id2', name: 'value2' }],
    ['id3', { id: 'id3', name: 'value3' }]
]);

// Create a QueryData object
const collection = new QueryData(data);

// Define your filters
const filter1 = values => values.get('id1');
const filter2 = values => values.get('value2');

// Get the intersection of the results of the filters
const result = intersectionOf<YourType>(filter1, filter2)(collection);

console.log(result); // Outputs: ['id1', 'id2']
console.log(collection.getItems(result)); // Outputs: [{ id: 'id1', name: 'value1' }, { id: 'id2', name: 'value2' }]
```

In this example, `filter1` and `filter2` are functions that take a `QueryData` object and return an array of keys that pass the filter. The `intersectionOf` function then returns the intersection of these arrays.

Please note that the `intersectionOf` function returns a new function that takes a `QueryData` object. This allows you to define your filters once and then apply them to different `QueryData` objects.

## Testing

This library includes a comprehensive set of unit tests to ensure its functionality. You can run these tests using npm:

```bash
npm test
```

## Contributing

Contributions are welcome! Please submit a pull request with any improvements.

## License

This library is licensed under the MIT License.