export type Sorter<T> = (items: T[]) => T[]

/**
 * Class that will apply the requested sort rules to a list of items.
 * @template T - The type of the items.
 * @template K - The keys of the items.
 */
export function createSorter<T, K extends keyof T = keyof T>(sortParam: string[]): Sorter<T> {
  const sortBy: [K, string][] = sortParam.map(param => {
    const parts = param.split(" ")
    return [parts[0] as K, parts[1] ?? "asc"]
  })

  /**
   * Sort the items based on the provided sort criteria.
   * @param items - The items to sort.
   * @return The sorted items.
   */
  return function sort(items: T[]): T[] {
    return items.sort((a: T, b: T) => {
      for (let i = 0; i < sortBy.length; i++) {
        const [key, order] = sortBy[i];
        if (a[key] < b[key]) {
          return order === 'asc' ? -1 : 1;
        } else if (a[key] > b[key]) {
          return order === 'asc' ? 1 : -1;
        }
      }
      return 0;
    });
  }
}
