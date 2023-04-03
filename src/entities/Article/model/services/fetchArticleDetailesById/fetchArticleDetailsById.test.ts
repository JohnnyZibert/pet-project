import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchProfileData } from 'entities/Profile';
import {
    fetchArticleDetailsById,
} from 'entities/Article/model/services/fetchArticleDetailesById/fetchArticleDetailsById';

const data = {
    id: '1',
    title: 'Javascript news',
};
describe('fetchArticleDetailsById.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchArticleDetailsById);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));

        const result = await thunk.callThunk(data.id);

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error', async () => {
        const thunk = new TestAsyncThunk(fetchArticleDetailsById);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));

        const result = await thunk.callThunk(data.id);

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
    });
});
