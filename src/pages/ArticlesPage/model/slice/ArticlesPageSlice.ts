import {
    createEntityAdapter,
    createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Articles, ArticleView } from 'entities/Article';
import { ArticlePageSchema } from 'pages/ArticlesPage';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { fetchArticles } from '../../model/services/articlePageRequest';

export const articlePageAdapter = createEntityAdapter<Articles>({
    selectId: (article) => article.id,
});

export const getArticle = articlePageAdapter.getSelectors<StateSchema>(
    (state) => state.articlePage || articlePageAdapter.getInitialState(),
);
const ArticlePageSlice = createSlice({
    name: 'ArticlePageSlice',
    initialState: articlePageAdapter.getInitialState<ArticlePageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ArticleView.SMALL,
    }),
    reducers: {
        setView: (state, { payload }: PayloadAction<ArticleView>) => {
            state.view = payload;
            localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, payload);
        },
        setInitialView: (state) => {
            state.view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticles.fulfilled, (state, { payload }
                    : PayloadAction<Articles[]>) => {
                state.isLoading = false;
                articlePageAdapter.setAll(state, payload);
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articlePageActions } = ArticlePageSlice;
export const { reducer: articlePageSliceReducer } = ArticlePageSlice;
