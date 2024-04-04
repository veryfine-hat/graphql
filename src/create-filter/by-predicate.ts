import type {ObjectFilter} from "./FilterMethodTypes";
import {QueryData} from "../QueryData";

/**
 * Returns a method that will take a collection return the list of ids where the value of the predicate passes the filter method
 * @param predicate - Property to filter by
 * @param filter - Filter method to apply to the value collection
 */
export const byPredicate = <T>(predicate: keyof T, filter: ObjectFilter<T[keyof T]>) =>
    /**
     * Method which will filter the input data based on the predicate and filter method
     * @param collection - The raw collection of data
     */
    (collection: QueryData<T, keyof T>): string[] =>
        filter(collection.index(predicate)) ?? []