import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Articles, ArticleView } from 'entities/Article';
import { ArticlePageSchema } from 'pages/ArticlesPage';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { fetchArticles } from '../services/articlePageRequest/articlePageRequest';

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
        page: 1,
        hasMore: true,
        _inited: false,
    }),
    reducers: {
        setView: (state, { payload }: PayloadAction<ArticleView>) => {
            state.view = payload;
            localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, payload);
        },
        setPage: (state, { payload }: PayloadAction<number>) => {
            state.page = payload;
        },
        setInitialView: (state) => {
            const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticleView;
            state.view = view;
            state.limit = view === ArticleView.BIG ? 4 : 12;
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
                articlePageAdapter.addMany(state, payload);
                state.hasMore = payload.length > 0;
                state._inited = true;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articlePageActions } = ArticlePageSlice;
export const { reducer: articlePageSliceReducer } = ArticlePageSlice;
