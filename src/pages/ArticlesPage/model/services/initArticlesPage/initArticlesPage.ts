import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { getArticleHasInited } from '../../selectors/articlePageSelectors';
import { articlePageActions } from '../../slice/ArticlesPageSlice';
import { fetchArticles } from '../../services/articlePageRequest/articlePageRequest';

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>
    >(
        'ArticlePageSlice/initArticlesPage',
        async (_, { getState, dispatch }) => {
            const inited = getArticleHasInited(getState());
            if (!inited) {
                dispatch(articlePageActions.setInitialView());
                dispatch(fetchArticles({ page: 1 }));
            }
        },
    );
