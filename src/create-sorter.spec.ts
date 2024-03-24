import {createSorter} from './create-sorter';

it('should sort items in ascending order when sort parameter is asc', () => {
  const sorter = createSorter(['name asc']);
  const items = [{name: 'Zoe'}, {name: 'Amy'}, {name: 'Bob'}];
  const sortedItems = sorter(items);
  expect(sortedItems).toEqual([{name: 'Amy'}, {name: 'Bob'}, {name: 'Zoe'}]);
});

it('should sort items in descending order when sort parameter is desc', () => {
  const sorter = createSorter(['name desc']);
  const items = [{name: 'Zoe'}, {name: 'Amy'}, {name: 'Bob'}];
  const sortedItems = sorter(items);
  expect(sortedItems).toEqual([{name: 'Zoe'}, {name: 'Bob'}, {name: 'Amy'}]);
});

it('should sort items based on multiple sort parameters', () => {
  const sorter = createSorter(['age asc', 'name desc']);
  const items = [
    {name: 'Zoe', age: 30},
    {name: 'Amy', age: 20},
    {name: 'Bob', age: 20},
  ];
  const sortedItems = sorter(items);
  expect(sortedItems).toEqual([
    {name: 'Bob', age: 20},
    {name: 'Amy', age: 20},
    {name: 'Zoe', age: 30},
  ]);
});

it('should return the same items when sort parameters are empty', () => {
  const sorter = createSorter([]);
  const items = [{name: 'Zoe'}, {name: 'Amy'}, {name: 'Bob'}];
  const sortedItems = sorter(items);
  expect(sortedItems).toEqual(items);
});

it('should return the same items when items are empty', () => {
  const sorter = createSorter(['name asc']);
  const items: {name: string}[] = [];
  const sortedItems = sorter(items);
  expect(sortedItems).toEqual(items);
});

it('shout default to ascending order when no order is specified', () => {
  const sorter = createSorter(['name']);
  const items = [{name: 'Zoe'}, {name: 'Amy'}, {name: 'Bob'}];
  const sortedItems = sorter(items);
  expect(sortedItems).toEqual([{name: 'Amy'}, {name: 'Bob'}, {name: 'Zoe'}]);
})
