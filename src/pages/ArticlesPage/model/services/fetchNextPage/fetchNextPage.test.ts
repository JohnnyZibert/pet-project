import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { ArticleView } from 'entities/Article';
import { fetchArticlesList } from '../../services/articlePageRequest/articlePageRequest';
import { fetchNextArticlesPage } from './fetchNextPage';

jest.mock('../../services/articlePageRequest/articlePageRequest');

describe('fetchArticlesList', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlePage: {
                page: 2,
                ids: [],
                entities: {},
                hasMore: true,
                isLoading: false,
                limit: 5,
                view: ArticleView.SMALL,
            },

        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(4);
        expect(fetchArticlesList).toBeCalledWith({ page: 3 });
    });
    test('fetch article con called', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlePage: {
                page: 2,
                ids: [],
                entities: {},
                hasMore: false,
                isLoading: false,
                limit: 5,
                view: ArticleView.SMALL,
            },

        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });
    test('fetch article con called', async () => {
        const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
            articlePage: {
                page: 2,
                ids: [],
                entities: {},
                hasMore: true,
                isLoading: true,
                limit: 5,
                view: ArticleView.SMALL,
            },

        });

        await thunk.callThunk();

        expect(thunk.dispatch).toBeCalledTimes(2);
        expect(fetchArticlesList).not.toHaveBeenCalled();
    });
});
