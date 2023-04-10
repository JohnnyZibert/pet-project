import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Articles } from 'entities/Article';
import { getArticleLimit } from 'pages/ArticlesPage/model/selectors/articlePageSelectors';

interface fetchArticlesListProps {
    page: number
}

export const fetchArticles = createAsyncThunk<Articles[], fetchArticlesListProps, ThunkConfig<string>
    >(
        'ArticlePageSlice/fetchArticles',
        async (props, { extra, rejectWithValue, getState }) => {
            const { page = 1 } = props;
            const limit = getArticleLimit(getState());

            try {
                const response = await extra.api.get<Articles[]>('/articles', {
                    params: {
                        _expand: 'user',
                        _page: page,
                        _limit: limit,
                    },
                });

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                return rejectWithValue('error');
            }
        },
    );
