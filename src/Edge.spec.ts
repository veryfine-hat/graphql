import {define} from '@byaga/graphql-schema';
import {createEdgeSchema, listToEdges} from './Edge';

type TestType = { id: number, name: string };

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
    const type = define`type ${'TestType'} { }`;
    const schema = createEdgeSchema(type);
    expect(schema.name).toEqual(`${type.name}Edge`);
    expect(schema.schema).toEqual(`type ${type.name}Edge {\n  cursor: ID\n  node: ${type.name}\n}`);
    expect(schema.dependsOn).toEqual([type.name]);
  })
})
