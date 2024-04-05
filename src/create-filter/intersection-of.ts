import type {PredicateFilter} from "./FilterMethodTypes";
import type {QueryData} from "../QueryData";

type OptionalFilter<T> = PredicateFilter<T> | null;
/**
 * Returns a method that will take a collection of data and return the intersection of the results of the predicate filters
 * @param predicateFilters - Filters to apply to the data
 */
export const intersectionOf = <T>(...predicateFilters: OptionalFilter<T>[]) => {
    return (data: QueryData<T>): string[] => {
        const results = predicateFilters
            .filter((hasFilter): hasFilter is PredicateFilter<T> => !!hasFilter)
            .map(filter => filter(data));
        const intersection = new Map<string, number>();
        results.flat().forEach(value => intersection.set(value, (intersection.get(value) ?? 0) + 1))

        return [...intersection.entries()]
            .filter(([, count]) => count === results.length)
            .map(([id]) => id)
    }
}