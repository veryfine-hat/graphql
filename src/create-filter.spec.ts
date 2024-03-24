import {createFilter} from './create-filter';
import {QueryData} from "./QueryData";


type TestType = { name: string }

function toQueryData<T extends TestType>(items: T[]) {
  return new QueryData<T>(new Map(items.map(item => [item.name, item]) as [string, T][]));
}

it('should filter items based on single filter parameter', () => {
  const filter = createFilter({name: 'Amy'});
  const items = [{name: 'Zoe'}, {name: 'Amy'}, {name: 'Bob'}];
  const filteredItems = filter(toQueryData(items));
  expect(filteredItems).toEqual([{name: 'Amy'}]);
});

it('should filter items based on multiple filter parameters', () => {
  const filter = createFilter({name: 'Amy', age: 20});
  const items = [
    {name: 'Zoe', age: 30},
    {name: 'Amy', age: 20},
    {name: 'Bob', age: 20},
  ];
  const filteredItems = filter(toQueryData(items));
  expect(filteredItems).toEqual([{name: 'Amy', age: 20}]);
});

it('should return the same items when filter parameters are empty', () => {
  const filter = createFilter<TestType>({});
  const items = [{name: 'Zoe'}, {name: 'Amy'}, {name: 'Bob'}];
  const filteredItems = filter(toQueryData(items));
  expect(filteredItems).toEqual(items);
});

it('should return an empty array when no items match the filter parameters', () => {
  const filter = createFilter({name: 'Charlie'});
  const items = [{name: 'Zoe'}, {name: 'Amy'}, {name: 'Bob'}];
  const filteredItems = filter(toQueryData(items));
  expect(filteredItems).toEqual([]);
});

it('should return an empty array when items are empty', () => {
  const filter = createFilter({name: 'Amy'});
  const items: TestType[] = [];
  const filteredItems = filter(toQueryData(items));
  expect(filteredItems).toEqual([]);
});
