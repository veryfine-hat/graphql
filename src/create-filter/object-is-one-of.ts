/**
 * Generates a filter that will return elements that match the input value
 * @param valueCollection
 */
export const objectIsOneOf = <ObjectType>(...valueCollection: ObjectType[]) => (collection:  Map<ObjectType, string[]>) => {
    let result: string[] = [];

    for (let value of valueCollection) {
        result = result.concat(collection.get(value) ?? []);
    }

    return result;
}