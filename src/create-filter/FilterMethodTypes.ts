import {QueryData} from "../QueryData";

export type PredicateFilter<T> = (data: QueryData<T>) => string[]
export type ObjectFilter<T> = (collection: Map<T, string[]>) => string[];