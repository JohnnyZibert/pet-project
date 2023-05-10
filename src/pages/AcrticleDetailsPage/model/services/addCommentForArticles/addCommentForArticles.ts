import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { CommentTypes } from 'entities/Comment';
import { getUserAuthData } from 'entities/User';
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleSelectors';
import { getCommentTextSelector } from 'features/AddCommentForm/model/selectors/AddCommentSelector';
import {
    fetchCommentsByArticleId,
} from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticles = createAsyncThunk<
    CommentTypes,
    string,
    ThunkConfig<string>
    >(
        'articleDetailsCommentSlice/addCommentForArticles',
        async (_, {
            extra, rejectWithValue, getState, dispatch,
        }) => {
            const userData = getUserAuthData(getState());
            const article = getArticleDetailsData(getState());
            const text = getCommentTextSelector(getState());

            if (!userData || !text || !article) {
                return rejectWithValue('no data');
            }

            try {
                const response = await extra.api.post<CommentTypes>('/comments', {
                    articleId: article.id,
                    userId: userData.id,
                    text,

                });

                if (!response.data) {
                    throw new Error();
                }
                dispatch(fetchCommentsByArticleId(article.id));

                return response.data;
            } catch (e) {
                return rejectWithValue('error');
            }
        },
    );
