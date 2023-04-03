import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Articles } from '../../types/article';

export const fetchArticleDetailsById = createAsyncThunk<Articles, string, ThunkConfig<string>
    >(
        'articleDetailsSlice/fetchArticleDetailsById',
        async (articleId, { extra, rejectWithValue }) => {
            try {
                const response = await extra.api.get<Articles>(`/articles/${articleId}`);

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                console.log(e);
                return rejectWithValue('error');
            }
        },
    );
