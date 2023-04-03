import { Articles } from './article';

export interface ArticleDetailsSchema {
    data?: Articles
    isLoading: boolean
    error?: string
}
