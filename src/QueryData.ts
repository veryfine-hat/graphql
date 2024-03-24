/**
 * Collection of data and indexes that can be used to perform queries on in-memory data
 * @template T - The type of the data items.
 * @template K - The keys of the data items.
 */
export class QueryData<T, K extends keyof T = keyof T> {
  private readonly _data: Map<string, T>
  private readonly _indexes: Map<K, Map<T[K], string[]>> = new Map<K, Map<T[K], string[]>>()

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
  index(predicate: K): Map<T[K], string[]> {
    const index = this._indexes.get(predicate)

    if (index !== undefined) return index;

    const newIndex = new Map<T[K], string[]>()
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
   * Returns the list of items that are an exact match to the filter.
   * @param predicate - The key to filter the data items by.
   * @param object - The value to filter the data items by.
   * @return The IDs of the data items that match the filter.
   */
  filter(predicate: K, object: T[K]): string[] {
    return this.index(predicate).get(object) ?? []
  }

  /**
   * The data items as a list.
   */
  get list() {
    return [...this._data.values()]
  }
}
