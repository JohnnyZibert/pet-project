import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { ArticleSortField, ArticleTypes } from 'entities/Article';
import { SortOrder } from 'shared/types/types';
import { getArticlePageInit } from '../../selectors/articlePageSelectors';
import { articlesPageActions } from '../../slice/ArticlesPageSlice';
import { fetchArticlesList } from '../../services/articlePageRequest/articlePageRequest';

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>
    >(
        'ArticlePageSlice/initArticlesPage',
        async (searchParams, { getState, dispatch }) => {
            const inited = getArticlePageInit(getState());
            if (!inited) {
                const orderFromUrl = searchParams.get('order') as SortOrder;
                const sortFromUrl = searchParams.get('sort') as ArticleSortField;
                const searchFromUrl = searchParams.get('search');
                const typeFromUrl = searchParams.get('type') as ArticleTypes;

                if (orderFromUrl) {
                    dispatch(articlesPageActions.setOrder(orderFromUrl));
                }
                if (sortFromUrl) {
                    dispatch(articlesPageActions.setSort(sortFromUrl));
                }
                if (searchFromUrl) {
                    dispatch(articlesPageActions.setSearch(searchFromUrl));
                }
                if (typeFromUrl) {
                    dispatch(articlesPageActions.setTypeArticle(typeFromUrl));
                }

                dispatch(articlesPageActions.initState());
                dispatch(fetchArticlesList({}));
            }
        },
    );
