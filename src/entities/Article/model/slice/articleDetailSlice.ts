import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchArticleDetailsById,
} from 'entities/Article/model/services/fetchArticleDetailesById/fetchArticleDetailsById';
import { Article } from '../types/article';
import { ArticleDetailsSchema } from '../types/articleDetailsSchema';

const initialState: ArticleDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const articleDetailsSlice = createSlice({
    name: 'articleDetailsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleDetailsById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticleDetailsById.fulfilled, (state, { payload }: PayloadAction<Article>) => {
                state.isLoading = false;
                state.data = payload;
            })
            .addCase(fetchArticleDetailsById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articleDetailsActions } = articleDetailsSlice;
export const { reducer: articleDetailsReducer } = articleDetailsSlice;
