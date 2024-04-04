import { is } from './is';

describe('objectIs rule', () => {
    it('should return elements that match the input value', () => {
        const collection = new Map<string, string[]>();
        collection.set('key1', ['value1', 'value2']);
        collection.set('key2', ['value3', 'value4']);

        const result = is('key1')(collection);

        expect(result).toEqual(['value1', 'value2']);
    });

    it('should return an empty array when no elements match the input value', () => {
        const collection = new Map<string, string[]>();
        collection.set('key1', ['value1', 'value2']);
        collection.set('key2', ['value3', 'value4']);

        const result = is('key3')(collection);

        expect(result).toEqual([]);
    });
});