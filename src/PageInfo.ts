import { define } from "@byaga/graphql-schema";

/**
 * PageInfo is a type that contains information about the current page of data.
 */
export interface PageInfo {
  /**
   * The cursor of the first item in the current page.
   */
  startCursor?: string
  /**
   * The cursor of the last item in the current page.
   */
  endCursor?: string
  /**
   * Whether there is a next page of data.
   */
  hasNextPage: boolean
  /**
   * Whether there is a previous page of data.
   */
  hasPreviousPage: boolean
}

define('PageInfo', `type PageInfo {
  startCursor: String
  endCursor: String
  hasNextPage: Boolean
  hasPreviousPage: Boolean
}`)
