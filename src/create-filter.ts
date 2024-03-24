import { QueryData } from "./QueryData";

export type Filter<T> = (data: QueryData<T>) => T[]

/**
 * Creates a Filter from the supplied parameters
 * @param filterBy - predicate: object pairs to filter the data by
 * @return A function that will filter the input data based on the supplied parameters
 */
export function createFilter<T>(filterBy: Partial<Record<keyof T, T[keyof T]>>): Filter<T> {
  /**
   * Method which will filter the input data based on predefined parameters
   * @param data - The data to filter
   * @return An array of items that meet the filter criteria
   */
  return function filter(data: QueryData<T>): T[] {
    const indexes = [];
    for (const predicate in filterBy) {
      const value = filterBy[predicate]
      if (value === undefined) continue;
      indexes.push(data.filter(predicate, value as T[keyof T]))
    }
    if (indexes.length === 0) return data.list;

    const intersection = new Map<string, number>();
    indexes.flat().forEach(value => intersection.set(value, (intersection.get(value) ?? 0) + 1))

    return [...intersection.entries()]
      .filter(([, count]) => count === indexes.length)
      .map(([id]) => data.get(id)!)
  }
}
