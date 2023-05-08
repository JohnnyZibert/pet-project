import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { getArticleHasInited } from '../../selectors/articlePageSelectors';
import { articlesPageActions } from '../../slice/ArticlesPageSlice';
import { fetchArticlesList } from '../../services/articlePageRequest/articlePageRequest';

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>
    >(
        'ArticlePageSlice/initArticlesPage',
        async (_, { getState, dispatch }) => {
            const inited = getArticleHasInited(getState());
            if (!inited) {
                dispatch(articlesPageActions.initState());
                dispatch(fetchArticlesList({ page: 1 }));
            }
        },
    );
