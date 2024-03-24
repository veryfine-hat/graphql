import {define} from "@byaga/graphql-schema";
import {Edge, listToEdges, createEdgeSchema} from "./Edge";
import {PageInfo, schema} from "./PageInfo";

/**
 * Interface to represent a paginated resource that connects together with others to represent a complete set
 */
export interface Connection<T> {
  /**
   * The edges contained in this portion of the paginated list
   */
  edges: Edge<T>[],
  /**
   * Information about where this portion of the list fits in the complete set
   */
  pageInfo: PageInfo
}

/**
 * Convert a list of items to a connection
 * @param page - this portion of the list
 * @param filterResult - the complete list
 * @param idParam - the name of the field that uniquely identifies each item in the list
 */
export function listToConnection<T, K extends keyof T = keyof T>(page: T[], filterResult: T[], idParam: K) {
  const edges = listToEdges(page, idParam)
  const firstItem = filterResult.length > 0 ? filterResult[0] : undefined
  const lastItem = filterResult.length > 0 ? filterResult[filterResult.length - 1] : undefined
  return {
    edges,
    pageInfo: {
      startCursor: edges[0]?.cursor,
      endCursor: edges[edges.length - 1]?.cursor,
      hasPreviousPage: !!firstItem && edges[0].cursor != firstItem[idParam],
      hasNextPage: !!lastItem && edges[edges.length - 1].cursor != lastItem[idParam],
    }
  };
}

/**
 * Defines the gql schema for a Connection representing a specific type of data
 * @param typeName - Name of the type that this connection will contain
 */
export const createConnectionSchema = (typeName: string) => {
  const schemaName = `${typeName}Connection`
  const edgeSchemaName = createEdgeSchema(typeName)
  define(schemaName, `
  type ${schemaName} {
    edges: [${edgeSchemaName}]
    pageInfo: ${schema.name}
  }`, [edgeSchemaName, schema.name])
  return schemaName
}
