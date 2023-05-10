import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';
import { SortOrder } from 'shared/types/types';
import { ArticleSortField, ArticleTypes } from 'entities/Article/model/types/article';
import { TabItem } from 'shared/ui/Tabs/Tabs';

export interface ArticlePageSchema extends EntityState<Article> {
    isLoading?: boolean
    error?: string
    view: ArticleView

    // paginate
    page: number
    limit: number
    hasMore: boolean

    _inited: boolean

    // filter
    order: SortOrder
    sort: ArticleSortField
    search: string

    type: ArticleTypes
}
