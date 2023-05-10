import { getQueryParams } from '../addQueryParams/addQueryParams';

describe('shared/url/addQueryParams', () => {
    test('with one param', () => {
        const params = getQueryParams({ name: 'value' });
        expect(params).toBe('?name=value');
    });

    test('with more one params', () => {
        const params = getQueryParams({ name: 'value', name1: 'value1' });
        expect(params).toBe('?name=value&name1=value1');
    });

    test('with no params', () => {
        const params = getQueryParams({ name: 'value', name1: undefined });
        expect(params).toBe('?name=value');
    });
});
