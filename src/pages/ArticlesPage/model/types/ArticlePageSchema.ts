import { EntityState } from '@reduxjs/toolkit';
import { Articles, ArticleView } from 'entities/Article';

export interface ArticlePageSchema extends EntityState<Articles>{
    isLoading?: boolean
    error?: string
    view: ArticleView
}
