/**
 * Collection of data and indexes that can be used to perform queries on in-memory data
 * @template T - The type of the data items.
 * @template K - The keys of the data items.
 */
export class QueryData<ItemType, Predicate extends keyof ItemType = keyof ItemType> {
  private readonly _data: Map<string, ItemType>
  private readonly _indexes: Map<Predicate, Map<ItemType[Predicate], string[]>> = new Map<Predicate, Map<ItemType[Predicate], string[]>>()

  /**
   * Create a QueryData object.
   * @param data - The data items.
   */
  constructor(data: Map<string, ItemType>) {
    this._data = data
  }

  /**
   * Gets or creates an index the data items by a specific key.
   * @param {K} predicate - The key to index the data items by.
   * @return The indexed data items.
   */
  index(predicate: Predicate): Map<ItemType[Predicate], string[]> {
    const index = this._indexes.get(predicate)

    if (index !== undefined) return index;

    const newIndex = new Map<ItemType[Predicate], string[]>()
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
  get(id: string): ItemType | undefined {
    return this._data.get(id)
  }

  /**
   * Get all the items associated with the input list
   */
  getItems(ids: string[]): ItemType[] {
    return ids.map(id => this.get(id)).filter(item => item !== undefined) as ItemType[]
  }

  /**
   * The data items as a list.
   */
  get list() {
    return [...this._data.values()]
  }
}
