import { EntityState } from '@reduxjs/toolkit';
import { CommentTypes } from 'entities/Comment';

export interface ArticleDetailsCommentsSchema extends EntityState<CommentTypes>{
    isLoading?: boolean
    error?: string
}
