import { property } from './property';
import {QueryData} from "../QueryData";
import {is} from "./is";

interface TestType {
    key: string
}
describe('byPredicate rule', () => {
    it('should return all ids where the value of the predicate passes the filter method', () => {
        const data = new Map<string, TestType>([
            ['id1', { key: 'value1' }],
            ['id2', { key: 'value2' }],
        ]);
        const collection = new QueryData(data);

        const result = property('key', is('value1'))(collection);

        expect(result).toEqual(['id1']);
    });

    it('should return an empty array when no values pass the filter method', () => {
        const data = new Map<string, TestType>([
            ['id1', { key: 'value1' }],
            ['id2', { key: 'value2' }],
        ]);
        const collection = new QueryData(data);

        const result = property('key', is('value5'))(collection);

        expect(result).toEqual([]);
    });

    it('should return an empty array when the collection is empty', () => {
        const collection = new QueryData<TestType>(new Map());

        const result = property('key', is('value1'))(collection);

        expect(result).toEqual([]);
    });
});