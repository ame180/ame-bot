import { parseTimeInput } from '../time';

describe('parseTimeInput', () => {
    const valid: [string, {hour:number, minute:number}][] = [
        ['12', { hour: 12, minute: 0 }],
        ['9', { hour: 9, minute: 0 }],
        ['12:30', { hour: 12, minute: 30 }],
        ['9:05', { hour: 9, minute: 5 }],
        ['12.30', { hour: 12, minute: 30 }],
        ['12-30', { hour: 12, minute: 30 }],
        ['12 30', { hour: 12, minute: 30 }],
        ['1200', { hour: 12, minute: 0 }],
        ['0930', { hour: 9, minute: 30 }],
        ['930', { hour: 9, minute: 30 }],
        ['1200am', { hour: 0, minute: 0 }],
        ['9pm', { hour: 21, minute: 0 }],
        ['9:30pm', { hour: 21, minute: 30 }],
        ['9.30 pm', { hour: 21, minute: 30 }],
    ];

    test.each(valid)('parses %s', (raw, expected) => {
        expect(parseTimeInput(raw)).toEqual(expected);
    });

    const invalid = ['', 'abc', '25:00', '1260', '2400', '13pm', '0am', '99', '12:75'];
    test.each(invalid)('returns null for invalid %s', (raw) => {
        expect(parseTimeInput(raw)).toBeNull();
    });

    test('midnight edge case 12am → 00:00', () => {
        expect(parseTimeInput('12am')).toEqual({ hour: 0, minute: 0 });
    });

    test('noon edge case 12pm → 12:00', () => {
        expect(parseTimeInput('12pm')).toEqual({ hour: 12, minute: 0 });
    });
});
