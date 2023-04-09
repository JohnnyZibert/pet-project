import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleView } from 'entities/Article';

export const getArticleIsLoading = (state: StateSchema) => state.articlePage?.isLoading || false;
export const getArticleError = (state: StateSchema) => state.articlePage?.error;
export const getArticleView = (state: StateSchema) => state.articlePage?.view || ArticleView.SMALL;
