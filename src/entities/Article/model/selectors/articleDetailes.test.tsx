import { StateSchema } from 'app/providers/StoreProvider';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsLoading,
} from 'entities/Article/model/selectors/articleSelectors';

describe('articleDetails', () => {
    test('should return data', () => {
        const data = {
            id: '1',
            title: 'Javascript news',
        };
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data,
            },
        };
        expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
    });
    test('should work without data', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
    });
    test('should return isLoading', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                isLoading: true,
            },
        };
        expect(getArticleDetailsLoading(state as StateSchema)).toBe(true);
    });
    test('should work with empty state isLoading', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleDetailsLoading(state as StateSchema)).toEqual(false);
    });
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                error: 'error',
            },
        };
        expect(getArticleDetailsError(state as StateSchema)).toBe('error');
    });
    test('should work with empty state error', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getArticleDetailsError(state as StateSchema)).toBe(undefined);
    });
});
