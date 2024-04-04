import { isOneOf } from './is-one-of';

describe('objectIsOneOf rule', () => {
    it('should return all elements that match the input value', () => {
        const collection = new Map<string, string[]>();
        collection.set('key1', ['value1', 'value2']);
        collection.set('key2', ['value3', 'value4']);

        const result = isOneOf('key1','key2')(collection);

        expect(result).toEqual(['value1', 'value2', 'value3', 'value4']);
    });

    it('should return elements not that do match the input value', () => {
        const collection = new Map<string, string[]>();
        collection.set('key1', ['value1', 'value2']);
        collection.set('key2', ['value3', 'value4']);

        const result = isOneOf('key2')(collection);

        expect(result).toEqual(['value3', 'value4']);
    });

    it('should return an empty array when the collection is empty', () => {
        const collection = new Map<string, string[]>();

        const result = isOneOf('key1')(collection);

        expect(result).toEqual([]);
    });
});