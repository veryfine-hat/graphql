import {createPager} from './create-pager';

type TestType = { id: number, name: string };

it('should return the next page of items when count is positive', () => {
  const pager = createPager<TestType>('id', 2);
  const items = [{id: 1, name: 'Zoe'}, {id: 2, name: 'Amy'}, {id: 3, name: 'Bob'}];
  const pagedItems = pager(items);
  expect(pagedItems).toEqual([{id: 1, name: 'Zoe'}, {id: 2, name: 'Amy'}]);
});

it('should return the previous page of items when count is negative', () => {
  const pager = createPager<TestType>('id', -2, 3);
  const items = [{id: 1, name: 'Zoe'}, {id: 2, name: 'Amy'}, {id: 3, name: 'Bob'}];
  const pagedItems = pager(items);
  expect(pagedItems).toEqual([{id: 1, name: 'Zoe'}, {id: 2, name: 'Amy'}]);
});

it('should return an empty array when no items match the cursor', () => {
  const pager = createPager<TestType>('id', 2, 4);
  const items = [{id: 1, name: 'Zoe'}, {id: 2, name: 'Amy'}, {id: 3, name: 'Bob'}];
  const pagedItems = pager(items);
  expect(pagedItems).toEqual([]);
});

it('should return an empty array when items are empty', () => {
  const pager = createPager<TestType>('id', 2);
  const items: TestType[] = [];
  const pagedItems = pager(items);
  expect(pagedItems).toEqual([]);
});

it('should return whatever items are available if the page goes past the end of the list', () => {
  const pager = createPager<TestType>('id', 2, 2);
  const items = [{id: 1, name: 'Zoe'}, {id: 2, name: 'Amy'}, {id: 3, name: 'Bob'}];
  const pagedItems = pager(items);
  expect(pagedItems).toEqual([{id: 3, name: 'Bob'}]);
});

it('should return whatever items are available if the page goes past the beginning of the list', () => {
  const pager = createPager<TestType>('id', -2, 2);
  const items = [{id: 1, name: 'Zoe'}, {id: 2, name: 'Amy'}, {id: 3, name: 'Bob'}];
  const pagedItems = pager(items);
  expect(pagedItems).toEqual([{id: 1, name: 'Zoe'}]);
});