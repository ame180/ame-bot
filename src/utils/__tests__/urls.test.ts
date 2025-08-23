// Need to mock config BEFORE importing the module under test
jest.mock('../../config/configLoader', () => ({
    config: { APP_PROTOCOL: 'https', APP_HOST: 'example.com' }
}));

import { url } from '../urls';

describe('url', () => {
    test('joins protocol host and path', () => {
        expect(url('path/segment')).toBe('https://example.com/path/segment');
    });

    test('handles leading and trailing slashes', () => {
        expect(url('/one/two')).toBe('https://example.com/one/two');
        expect(url('/')).toBe('https://example.com/');
        expect(url('')).toBe('https://example.com/');
    });

    test('trims trailing slash on protocol', async () => {
        jest.resetModules();
        jest.doMock('../../config/configLoader', () => ({
            config: { APP_PROTOCOL: 'https/', APP_HOST: 'example.com' }
        }));
        const { url } = await import('../urls');
        
        expect(url('abc')).toBe('https://example.com/abc');
    });
});
