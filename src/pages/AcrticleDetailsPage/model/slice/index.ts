import { combineReducers } from '@reduxjs/toolkit';
import { ArticlePageSchema } from 'pages/ArticlesPage';
import { articleDetailsRecommendationReducer } from '../slice/ArticleDetailsRecomendationSlice';
import { ArticlesDetailsPageSchema } from '../types/index';
import { articleDetailsCommentReducer } from '../slice/ArticleDetailsCommentSlice';

export const articleDetailsPageReducer = combineReducers<ArticlesDetailsPageSchema>({
    recommendations: articleDetailsRecommendationReducer,
    comments: articleDetailsCommentReducer,
});
