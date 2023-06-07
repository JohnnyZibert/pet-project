import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Article } from '../../types/article';

export const fetchArticleDetailsById = createAsyncThunk<Article,
    string,
    ThunkConfig<string>
    >(
        'articleDetailsSlice/fetchArticleDetailsById',
        async (articleId, { extra, rejectWithValue }) => {
            try {
                const response = await extra.api.get<Article>(`/articles/${articleId}`, {
                    params: {
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
