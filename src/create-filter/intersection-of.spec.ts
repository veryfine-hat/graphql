import { intersectionOf } from './intersection-of';
import {QueryData} from "../QueryData";
import {byPredicate} from "./by-predicate";
import {objectIs} from "./object-is";

interface TestType {
    id: string
    name: string
}
describe('intersectionOf rule', () => {
    it('should return intersection of results of the predicate filters', () => {
        const data = new Map<string, TestType>([
            ['id1', { id: 'id1', name: 'value1' }],
            ['id2', { id: 'id2', name: 'value2' }],
            ['id3', { id: 'id3', name: 'value3' }]
        ]);
        const collection = new QueryData(data);

        const result = intersectionOf<TestType>(
            byPredicate('id', objectIs('id2')),
            byPredicate('name', objectIs('value2'))
        )(collection);

        expect(result).toEqual(['id2']);
    });

    it('should return an empty array when no intersection is found', () => {
        const data = new Map<string, TestType>([
            ['id1', { id: 'id1', name: 'value1' }],
            ['id2', { id: 'id2', name: 'value2' }],
            ['id3', { id: 'id3', name: 'value3' }]
        ]);
        const collection = new QueryData(data);

        const result = intersectionOf<TestType>(
            byPredicate('id', objectIs('id1')),
            byPredicate('name', objectIs('value4'))
        )(collection);

        expect(result).toEqual([]);
    });

    it('should return an empty array when the collection is empty', () => {
        const collection = new QueryData(new Map<string, TestType>());

        const result = intersectionOf<TestType>(
            byPredicate('name', objectIs('value1')),
            byPredicate('name', objectIs('value2'))
        )(collection);

        expect(result).toEqual([]);
    });
});