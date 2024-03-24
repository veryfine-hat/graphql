import {define} from '@byaga/graphql-schema';
import {createEdgeSchema, listToEdges} from './Edge';

type TestType = { id: number, name: string };

jest.mock("@byaga/graphql-schema", () => ({
  define: jest.fn()
}))

describe("toEdge", () => {
  it('should transform an item into an edge', () => {
    const item: TestType = {id: 1, name: 'Zoe'};
    const edge = listToEdges([item], "id");
    expect(edge).toEqual([{cursor: 1, node: item}]);
  });
})

describe("listToEdges", () => {
  it('should transform an array of items into an array of Edges', () => {
    const items: TestType[] = [{id: 1, name: 'Zoe'}, {id: 2, name: 'Amy'}];
    const edges = listToEdges(items, "id");
    expect(edges).toEqual([
      {cursor: 1, node: items[0]},
      {cursor: 2, node: items[1]},
    ]);
  });

  it('should return an empty array when items are empty', () => {
    const items: TestType[] = [];
    const edges = listToEdges(items, "id");
    expect(edges).toEqual([]);
  });
})

describe("createEdgeSchema", () => {
  it('should define the GraphQL schema for an Edge of a given type of nodes', () => {
    const typeName = 'TestType';
    const schemaName = createEdgeSchema(typeName);
    expect(schemaName).toEqual(`${typeName}Edge`);
    expect(define).toHaveBeenCalledWith(schemaName, `type ${schemaName} {
    cursor: ID
    node: ${typeName}
  }`, [typeName]);
  });
})
