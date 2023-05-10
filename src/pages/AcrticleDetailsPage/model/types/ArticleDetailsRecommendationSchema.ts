import { EntityState } from '@reduxjs/toolkit';
import { CommentTypes } from 'entities/Comment';
import { Article } from 'entities/Article';

export interface ArticleDetailsRecommendationSchema extends EntityState<Article>{
    isLoading?: boolean
    error?: string
}
