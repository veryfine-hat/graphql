import {define} from "@byaga/graphql-schema";
import {createConnectionSchema, listToConnection} from './Connection';
import {PageInfo} from "./PageInfo";

type TestType = { id: string, name: string }

jest.mock("@byaga/graphql-schema", () => ({
  define: jest.fn()
}))

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
  const typeName = 'TestType';
  // Assuming that the `getSchema` function exists and it returns the schema for a given name
  const schemaName = createConnectionSchema(typeName);
  const expectedSchema = `
  type TestTypeConnection {
    edges: [TestTypeEdge]
    pageInfo: PageInfo
  }`;
  expect(define).toHaveBeenCalledWith(schemaName, expectedSchema, [`${typeName}Edge`, 'PageInfo']);
});
