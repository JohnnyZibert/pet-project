import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'entities/Article';

export const getArticleIsLoading = (state: StateSchema) => state.articlePage?.isLoading || false;
export const getArticleError = (state: StateSchema) => state.articlePage?.error;
export const getArticleView = (state: StateSchema) => state.articlePage?.view || ArticleView.SMALL;
export const getArticlePage = (state: StateSchema) => state.articlePage?.page || 1;
export const getArticleLimit = (state: StateSchema) => state.articlePage?.limit || 12;
export const getArticleHasMore = (state: StateSchema) => state.articlePage?.hasMore;
export const getArticleHasInited = (state: StateSchema) => state.articlePage?._inited;
