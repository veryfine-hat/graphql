/**
 * Collection of data and indexes that can be used to perform queries on in-memory data
 * @template T - The type of the data items.
 * @template K - The keys of the data items.
 */
export class QueryData<T> {
  private readonly _data: Map<string, T>
  private readonly _indexes = new Map<keyof T, Map<T[keyof T], string[]>>()

  /**
   * Create a QueryData object.
   * @param data - The data items.
   */
  constructor(data: Map<string, T>) {
    this._data = data
  }

  /**
   * Gets or creates an index the data items by a specific key.
   * @param {K} predicate - The key to index the data items by.
   * @return The indexed data items.
   */
  index<P extends keyof T>(predicate: P): Map<T[P], string[]> {
    const index = this._indexes.get(predicate) as Map<T[P], string[]> | undefined;

    if (index !== undefined) return index;

    const newIndex = new Map<T[P], string[]>()
    this._data.forEach((item, id) => {
      const key = item[predicate]
      const list = newIndex.get(key) ?? []
      list.push(id)
      newIndex.set(key, list)
    })
    this._indexes.set(predicate, newIndex)
    return newIndex;
  }

  /**
   * Get a data item by its ID.
   * @param id - The ID of the data item.
   * @return The data item, or undefined if it does not exist.
   */
  get(id: string): T | undefined {
    return this._data.get(id)
  }

  /**
   * Get all the items associated with the input list
   */
  getItems(ids: string[]): T[] {
    return ids.map(id => this.get(id)).filter(item => item !== undefined) as T[]
  }

  /**
   * The data items as a list.
   */
  get list() {
    return [...this._data.values()]
  }
}
