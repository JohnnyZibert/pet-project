import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import {
    fetchCommentsByArticleId,
} from 'pages/AcrticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import {
    addCommentForArticles,
} from 'pages/AcrticleDetailsPage/model/services/addCommentForArticles/addCommentForArticles';

describe('fetchCommentsByArticleId', () => {
    const data = {
        isLoading: false,
        error: undefined,
        ids: ['1'],
        entities: {
            1: {
                id: '1',
                username: 'Eugen',
                avatar: '',
            },
        },
    };
    test('success', async () => {
        const thunk = new TestAsyncThunk(addCommentForArticles);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));

        const result = await thunk.callThunk('1');

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    // test('error', async () => {
    //     const thunk = new TestAsyncThunk(fetchArticleDetailsById);
    //     thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    //
    //     const result = await thunk.callThunk('awd');
    //
    //     expect(thunk.api.get).toHaveBeenCalled();
    //     expect(result.meta.requestStatus).toBe('rejected');
    // });
});
