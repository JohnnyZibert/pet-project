import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Articles } from 'entities/Article';

export const fetchArticles = createAsyncThunk<Articles[], void, ThunkConfig<string>
    >(
        'ArticlePageSlice/fetchArticles',
        async (articleId, { extra, rejectWithValue }) => {
            try {
                const response = await extra.api.get<Articles[]>('/articles', {
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
