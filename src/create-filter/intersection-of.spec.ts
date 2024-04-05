import { intersectionOf } from './intersection-of';
import {QueryData} from "../QueryData";
import {property} from "./property";
import {is} from "./is";

interface TestType {
    id: string
    name: string
    amount: number
}
describe('intersectionOf rule', () => {
    it('should return intersection of results of the predicate filters', () => {
        const data = new Map<string, TestType>([
            ['id1', { id: 'id1', name: 'value1', amount: 10 }],
            ['id2', { id: 'id2', name: 'value2', amount: 10 }],
            ['id3', { id: 'id3', name: 'value3', amount: 10 }]
        ]);
        const collection = new QueryData(data);

        const result = intersectionOf<TestType>(
            property('id', is('id2')),
            property('amount', is(10))
        )(collection);

        expect(result).toEqual(['id2']);
    });

    it('should return an empty array when no intersection is found', () => {
        const data = new Map<string, TestType>([
            ['id1', { id: 'id1', name: 'value1', amount: 10 }],
            ['id2', { id: 'id2', name: 'value2', amount: 10 }],
            ['id3', { id: 'id3', name: 'value3', amount: 10 }]
        ]);
        const collection = new QueryData(data);

        const result = intersectionOf<TestType>(
            property<TestType, 'id'>('id', is('id1')),
            property<TestType, 'name'>('name', is('value4'))
        )(collection);

        expect(result).toEqual([]);
    });

    it('should return an empty array when the collection is empty', () => {
        const collection = new QueryData(new Map<string, TestType>());

        const result = intersectionOf<TestType>(
            property<TestType, 'name'>('name', is('value1')),
            property<TestType, 'name'>('name', is('value2'))
        )(collection);

        expect(result).toEqual([]);
    });

    it('should allow passing a null to enable "optional" filters', () => {
        const data = new Map<string, TestType>([
            ['id1', { id: 'id1', name: 'value1', amount: 10 }],
            ['id2', { id: 'id2', name: 'value2', amount: 10 }],
            ['id3', { id: 'id3', name: 'value3', amount: 10 }]
        ]);
        const collection = new QueryData(data);

        const result = intersectionOf<TestType>(
            property<TestType, 'id'>('id', is('id1')),
            null
        )(collection);

        expect(result).toEqual(['id1']);
    });
});