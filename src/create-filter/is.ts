import {isOneOf} from "./is-one-of";

/**
 * Generates a filter that will return elements that match the input value
 * @param value
 */
export const is = <ObjectType>(value: ObjectType) => isOneOf(value)