import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { CommentTypes } from 'entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<CommentTypes[], string | undefined, ThunkConfig<string>
    >(
        'articleDetailsCommentSlice/fetchCommentsByArticleId',
        async (articleId, { extra, rejectWithValue }) => {
            try {
                if (!articleId) {
                    return rejectWithValue('error');
                }

                const response = await extra.api.get<CommentTypes[]>('/comments', {
                    params: {
                        articleId,
                        _expand: 'user',
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