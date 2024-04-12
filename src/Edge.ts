import {define, SchemaDefinition} from "@byaga/graphql-schema"

/**
 * Edge is a type that contains a single item in a list of data.
 */
export interface Edge<T> {
  /**
   * The cursor/identifier of the item.
   */
  cursor: string,
  /**
   * The item itself.
   */
  node: T
}

/**
 * Will transform an item into an edge
 * @param item - The items to transform into edges
 * @param id - The name of the field to use to get the cursor
 */
export function toEdge<T, K extends keyof T = keyof T>(item: T, id: K): Edge<T, K> {
  return {
    cursor: item[id]?.toString() || "",
    node: item
  }
}

/**
 * Will transform an array of items into an array of Edges
 * @param page - The items to transform into edges
 * @param id - The name of the field to use to get the cursor
 */
export function listToEdges<T, K extends keyof T = keyof T>(page: T[], id: K) {
  return page.map(item => toEdge(item, id))
}

/**
 * Defined the GraphQL schema for an Edge of a given type of nodes
 * @param type - The type of nodes that this edge will contain
 */
export const createEdgeSchema = (type: SchemaDefinition): SchemaDefinition => define`type ${`${type.name}Edge`} {
  cursor: ID
  node: ${type}
}`
