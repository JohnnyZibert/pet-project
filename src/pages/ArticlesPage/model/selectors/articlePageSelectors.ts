import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleSortField, ArticleTypes, ArticleView } from 'entities/Article';

export const getArticlesPageIsLoading = (state: StateSchema) => state.articlePage?.isLoading || false;
export const getArticlesPageError = (state: StateSchema) => state.articlePage?.error;
export const getArticlesPageView = (state: StateSchema) => state.articlePage?.view || ArticleView.SMALL;
export const getArticlesPageNum = (state: StateSchema) => state.articlePage?.page || 1;
export const getArticlesPageLimit = (state: StateSchema) => state.articlePage?.limit || 9;
export const getArticlesPageHasMore = (state: StateSchema) => state.articlePage?.hasMore;
export const getArticlePageOrder = (state: StateSchema) => state.articlePage?.order ?? 'asc';
export const getArticlePageSort = (state: StateSchema) => state.articlePage?.sort ?? ArticleSortField.CREATED;
export const getArticlePageSearch = (state: StateSchema) => state.articlePage?.search ?? '';
export const getArticlePageInit = (state: StateSchema) => state.articlePage?._inited;
export const getArticlePageType = (state: StateSchema) => state.articlePage?.type ?? ArticleTypes.ALL;
