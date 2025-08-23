import { calculateLevel } from '../LevelCalculator';

describe('calculateLevel', () => {
    test('level 0 with no xp', () => {
        expect(calculateLevel(0)).toEqual({ level: 0, xpLeft: 0, xpNeeded: 100 });
    });

    test('reach level 1 at 100 xp', () => {
        expect(calculateLevel(100)).toEqual({ level: 1, xpLeft: 0, xpNeeded: 155 });
    });

    test('xpLeft after hitting level 1 plus extra', () => {
        expect(calculateLevel(130)).toEqual({ level: 1, xpLeft: 30, xpNeeded: 155 });
    });

    test('progression increases xpNeeded for next level', () => {
        expect(calculateLevel(100 + 155)).toEqual({ level: 2, xpLeft: 0, xpNeeded: 220 });
    });

    test('higher level sample', () => {
        const r = calculateLevel(100000);
        expect(r.level).toBeGreaterThan(10);
    });
});
