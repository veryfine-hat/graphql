import {objectIsOneOf} from "./object-is-one-of";

/**
 * Generates a filter that will return elements that match the input value
 * @param value
 */
export const objectIs = <ObjectType>(value: ObjectType) => objectIsOneOf(value)