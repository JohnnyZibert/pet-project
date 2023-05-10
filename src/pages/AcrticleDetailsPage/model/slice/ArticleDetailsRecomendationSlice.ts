import {
    createEntityAdapter,
    createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import {
    fetchRecommendationArticles,
} from 'pages/AcrticleDetailsPage/model/services/fetchRecommendationArticles/fetchRecommendationArticles';
import {
    ArticleDetailsRecommendationSchema,
} from '../types/ArticleDetailsRecommendationSchema';

export const recommendationAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

export const getArticleRecommendationSelector = recommendationAdapter.getSelectors<StateSchema>(
    (state) => state.articlesDetailsPage?.recommendations || recommendationAdapter.getInitialState(),
);
const articleDetailsRecommendationSlice = createSlice({
    name: 'articleDetailsRecommendationSlice',
    initialState: recommendationAdapter.getInitialState<ArticleDetailsRecommendationSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecommendationArticles.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchRecommendationArticles.fulfilled, (state, action) => {
                state.isLoading = false;
                recommendationAdapter.setAll(state, action.payload);
            })
            .addCase(fetchRecommendationArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: articleDetailsRecommendationReducer } = articleDetailsRecommendationSlice;
