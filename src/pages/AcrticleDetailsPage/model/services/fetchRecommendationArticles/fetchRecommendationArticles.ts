import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Article } from 'entities/Article';

export const fetchRecommendationArticles = createAsyncThunk<Article[], void, ThunkConfig<string>
    >(

        'articleDetailsRecommendationSlice/fetchRecommendationArticles',
        async (_, { extra, rejectWithValue }) => {
            try {
                const response = await extra.api.get<Article[]>('/articles', {
                    params: {
                        _limit: 4,
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
