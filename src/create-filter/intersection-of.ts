import type {PredicateFilter} from "./FilterMethodTypes";
import type {QueryData} from "../QueryData";

/**
 * Returns a method that will take a collection of data and return the intersection of the results of the predicate filters
 * @param predicateFilters - Filters to apply to the data
 */
export const intersectionOf = <T>(...predicateFilters: PredicateFilter<T>[]) => (data: QueryData<T, keyof T>): string[] => {
    const results = predicateFilters.map(filter => filter(data));
    const intersection = new Map<string, number>();
    results.flat().forEach(value => intersection.set(value, (intersection.get(value) ?? 0) + 1))

    return [...intersection.entries()]
        .filter(([, count]) => count === results.length)
        .map(([id]) => id)
}