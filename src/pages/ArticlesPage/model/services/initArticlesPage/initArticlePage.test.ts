// import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
// import { ArticleView } from 'entities/Article';
// import { initArticlesPage } from 'pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage';
// import { fetchArticlesList } from '../../services/articlePageRequest/articlePageRequest';
//
// jest.mock('../../services/articlePageRequest/articlePageRequest');
//
// describe('initArticlePage', () => {
//     test('success', async () => {
//         const thunk = new TestAsyncThunk(initArticlesPage, {
//             articlePage: {
//                 page: 2,
//                 ids: [],
//                 entities: {},
//                 hasMore: true,
//                 isLoading: false,
//                 limit: 5,
//                 view: ArticleView.SMALL,
//                 _inited: true,
//             },
//
//         });
//
//         await thunk.callThunk();
//
//         expect(thunk.dispatch).toBeCalledTimes(2);
//         expect(fetchArticlesList).not.toBeCalledWith();
//     });
//     test('fetch article not called', async () => {
//         const thunk = new TestAsyncThunk(initArticlesPage, {
//             articlePage: {
//                 page: 2,
//                 ids: [],
//                 entities: {},
//                 hasMore: false,
//                 isLoading: false,
//                 limit: 5,
//                 view: ArticleView.SMALL,
//                 _inited: true,
//             },
//
//         });
//
//         await thunk.callThunk();
//
//         expect(thunk.dispatch).toBeCalledTimes(2);
//         expect(fetchArticlesList).not.toHaveBeenCalled();
//     });
//     test('fetch article not called', async () => {
//         const thunk = new TestAsyncThunk(initArticlesPage, {
//             articlePage: {
//                 page: 2,
//                 ids: [],
//                 entities: {},
//                 hasMore: false,
//                 isLoading: true,
//                 limit: 5,
//                 view: ArticleView.SMALL,
//                 _inited: false,
//             },
//
//         });
//
//         await thunk.callThunk();
//
//         expect(thunk.dispatch).toBeCalledTimes(4);
//         expect(fetchArticlesList).toHaveBeenCalled();
//     });
// });
