import {define} from "@byaga/graphql-schema";
import {createConnectionSchema, listToConnection} from './Connection';
import {PageInfoSchema} from "./PageInfo";
import {createEdgeSchema} from "./Edge";

type TestType = { id: string, name: string }

it('should convert a list of items to a connection with correct edges and pageInfo', () => {
  const page: TestType[] = [{id: '1', name: 'Amy'}, {id: '2', name: 'Bob'}];
  const filterResult: TestType[] = [{id: '1', name: 'Amy'}, {id: '2', name: 'Bob'}, {id: '3', name: 'Charlie'}];
  const idParam: keyof TestType = 'id';
  const connection = listToConnection(page, filterResult, idParam);

  expect(connection.edges).toEqual([
    {node: {id: '1', name: 'Amy'}, cursor: '1'},
    {node: {id: '2', name: 'Bob'}, cursor: '2'}
  ]);
  expect(connection.pageInfo).toEqual({
    startCursor: '1',
    endCursor: '2',
    hasPreviousPage: false,
    hasNextPage: true
  });
});

it('should return an empty connection when the list of items is empty', () => {
  const page: TestType[] = [];
  const filterResult: TestType[] = [];
  const idParam: keyof TestType = 'id';
  const connection = listToConnection(page, filterResult, idParam);
  expect(connection.edges).toEqual([]);
  expect(connection.pageInfo).toEqual({
    startCursor: undefined,
    endCursor: undefined,
    hasPreviousPage: false,
    hasNextPage: false
  });
});

it('should define a gql schema for a Connection representing a specific type of data', () => {
  const type = define`type ${'TestType'} {} `;
  // Assuming that the `getSchema` function exists and it returns the schema for a given name
  const schema = createConnectionSchema(type);
  expect(schema.schema).toEqual(`
  type TestTypeConnection {
    edges: [TestTypeEdge]
    pageInfo: PageInfo
  }`);
  expect(schema.dependsOn).toEqual(expect.arrayContaining([PageInfoSchema, createEdgeSchema(type)]));
});

describe("createConnectionSchema", () => {
    it('should define the GraphQL schema for a Connection representing a specific type of data', () => {
        const type = define`type ${'TestType'} {} `;
        const schema = createConnectionSchema(type);
        expect(schema.name).toEqual(`TestTypeConnection`);
        expect(schema.schema).toEqual(`
  type TestTypeConnection {
    edges: [TestTypeEdge]
    pageInfo: PageInfo
  }`);
        expect(schema.dependsOn).toEqual(expect.arrayContaining([PageInfoSchema, createEdgeSchema(type)]));
    });
})