import { getRandomElement } from '../random';

describe('getRandomElement', () => {
    test('returns an element from the array', () => {
        const arr = [1,2,3,4,5];
        const val = getRandomElement(arr);
        expect(arr).toContain(val);
    });

    test('distribution is roughly uniform over many samples', () => {
        const arr = ['a','b','c'];
        const counts: { [key: string]: number } = { a: 0, b: 0, c: 0 };
        const samples = 3000;
        for (let i = 0;i < samples;i++) counts[getRandomElement(arr)]++;
        const expected = samples / arr.length;
        const tolerance = expected * 0.25; // 25% tolerance
        Object.values(counts).forEach(c => {
            expect(Math.abs(c - expected)).toBeLessThanOrEqual(tolerance);
        });
    });
});
