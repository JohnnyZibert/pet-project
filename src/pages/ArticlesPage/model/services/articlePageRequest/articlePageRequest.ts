import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Article, ArticleTypes } from 'entities/Article';
import {
    getArticlePageOrder, getArticlePageSearch,
    getArticlePageSort, getArticlePageType,
    getArticlesPageLimit, getArticlesPageNum,
} from 'pages/ArticlesPage/model/selectors/articlePageSelectors';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';

interface fetchArticlesListProps {
    replace?: boolean
}

export const fetchArticlesList = createAsyncThunk<Article[], fetchArticlesListProps, ThunkConfig<string>
    >(

        'ArticlePageSlice/fetchArticlesList',
        async (props, { extra, rejectWithValue, getState }) => {
            const limit = getArticlesPageLimit(getState());
            const order = getArticlePageOrder(getState());
            const sort = getArticlePageSort(getState());
            const search = getArticlePageSearch(getState());
            const page = getArticlesPageNum(getState());
            const type = getArticlePageType(getState());

            try {
                addQueryParams({
                    sort, order, search, type,
                });
                const response = await extra.api.get<Article[]>('/articles', {
                    params: {
                        _expand: 'user',
                        _limit: limit,
                        _page: page,
                        _order: order,
                        _sort: sort,
                        type: type === ArticleTypes.ALL ? undefined : type,
                        q: search,
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
