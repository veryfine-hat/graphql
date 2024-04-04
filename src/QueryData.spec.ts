import {QueryData} from './QueryData';

type TestType = { id: string, name: string, group: string }
let data: Map<string, TestType>;
let queryData: QueryData<TestType>;

beforeEach(() => {
  data = new Map<string, TestType>([
    ['1', {id: '1', name: 'Item 1', group: '1'}],
    ['2', {id: '2', name: 'Item 2', group: '1'}],
    ['3', {id: '3', name: 'Item 3', group: '2'}],
  ]);
  queryData = new QueryData(data);
});

it('should return the correct item when getting by id', () => {
  const item = queryData.get('1');
  expect(item).toEqual({id: '1', name: 'Item 1', group: '1'});
});

it('should return undefined when getting by non-existent id', () => {
  const item = queryData.get('4');
  expect(item).toBeUndefined();
});

it('should return the correct items when getting by ids', () => {
    const items = queryData.getItems(['1', '2']);
    expect(items).toEqual([
        {id: '1', name: 'Item 1', group: '1'},
        {id: '2', name: 'Item 2', group: '1'},
    ]);
})

it('should return the correct index when indexing by group', () => {
  const index = queryData.index('group');
  expect(index).toEqual(new Map([
    ['1', ['1', '2']],
    ['2', ['3']]
  ]));
});

it('should return the correct index when indexing by name', () => {
  const index = queryData.index('name');
  expect(index).toEqual(new Map([
    ['Item 1', ['1']],
    ['Item 2', ['2']],
    ['Item 3', ['3']],
  ]));
});
