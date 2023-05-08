import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { fetchArticlesList } from 'pages/ArticlesPage/model/services/articlePageRequest/articlePageRequest';
import { articlesPageActions } from 'pages/ArticlesPage/model/slice/ArticlesPageSlice';
import {
    getArticlesPageHasMore, getArticlesPageNum, getArticlesPageIsLoading,
} from 'pages/ArticlesPage/model/selectors/articlePageSelectors';

export const fetchNextArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
    >(
        'ArticlePageSlice/fetchNextArticlesPage',
        async (_, thunkApi) => {
            const { getState, dispatch } = thunkApi;
            const hasMore = getArticlesPageHasMore(getState());
            const page = getArticlesPageNum(getState());
            const isLoading = getArticlesPageIsLoading(getState());

            if (hasMore && !isLoading) {
                dispatch(articlesPageActions.setPage(page + 1));
                dispatch(fetchArticlesList({
                    page: page + 1,
                }));
            }
        },
    );
