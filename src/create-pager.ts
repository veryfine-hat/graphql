export type Pager<T> = (items: T[]) => T[]

/**
 * Creates a method that will get the next/prev page of items
 * @param idParam - The property on the object which represents the id
 * @param count - The number of items to return.  If negative it will return the previous page otherwise the next page
 * @param cursor - The identifier of an object to start from if not the beginning
 */
export function createPager<T, K extends keyof T = keyof T, V extends T[K] = T[K]>(idParam: K, count: number, cursor?: V): Pager<T> {
  if (count < 0) {
    return function prevPage(items: T[]): T[] {
      let start = items.length;
      if (cursor !== undefined) {
        start = items.findIndex(item => item[idParam] === cursor);
      }

      if (start < 0) return [];
      return slice(items, start + count, start)
    }
  }

  return function nextPage(items: T[]): T[] {
    let start = -1;
    if (cursor !== undefined) {
      start = items.findIndex(item => item[idParam] === cursor);
      if (start < 0) return [];
    }
    start += 1;
    return slice(items, start, start + count)
  }

  function slice(items: T[], start: number, end: number) {
    return items.slice(Math.max(0, start), Math.min(end, items.length))
  }
}
