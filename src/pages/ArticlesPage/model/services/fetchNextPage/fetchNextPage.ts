import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import {
    getArticleHasMore,
    getArticleIsLoading,
    getArticlePage,
} from '../../selectors/articlePageSelectors';
import { articlePageActions } from '../../slice/ArticlesPageSlice';
import { fetchArticles } from '../../services/articlePageRequest/articlePageRequest';

export const fetchNextPage = createAsyncThunk<void, void, ThunkConfig<string>
    >(
        'ArticlePageSlice/fetchNextPage',
        async (_, {
            extra, rejectWithValue, getState, dispatch,
        }) => {
            const page = getArticlePage(getState());
            const hasMore = getArticleHasMore(getState());
            const isLoading = getArticleIsLoading(getState());

            if (hasMore && !isLoading) {
                dispatch(articlePageActions.setPage(page + 1));
                dispatch(fetchArticles({ page: page + 1 }));
            }
        },
    );
