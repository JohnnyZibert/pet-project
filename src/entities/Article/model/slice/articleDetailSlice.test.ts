import { ArticleBlock, ArticleDetailsSchema, ArticleTypes } from 'entities/Article';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailSlice';
import {
    fetchArticleDetailsById,
} from 'entities/Article/model/services/fetchArticleDetailesById/fetchArticleDetailsById';

describe('articleDetail.test', () => {
    const data = {
        id: '1',
        user: {
            id: '1',
            username: 'Eugen',
        },
        title: 'Javascript news',
        subtitle: 'Что нового в JS за 2022 год?',
        img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
        views: 1022,
        createdAt: '26.02.2022',
        type: [ArticleTypes.IT],
        blocks: [] as ArticleBlock[],

    };
    test('test fetch articles details pending', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: false,
            error: undefined,
        };
        expect(articleDetailsReducer(
            state as ArticleDetailsSchema,
            fetchArticleDetailsById.pending,
        )).toEqual({ isLoading: true, error: undefined });
    });
    test('test fetchArticle Details By Id fulfilled', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: true,
            data: undefined,
        };
        expect(articleDetailsReducer(
            state as ArticleDetailsSchema,
            fetchArticleDetailsById.fulfilled(data, '', data.id),
        ))
            .toEqual({
                isLoading: false, data,
            });
    });
    test('test fetchArticle Details By Id rejected', () => {
        const state: DeepPartial<ArticleDetailsSchema> = {
            isLoading: true,
            error: undefined,
        };
        expect(articleDetailsReducer(
            state as ArticleDetailsSchema,
            fetchArticleDetailsById.rejected,
        ))
            .toEqual({
                isLoading: false, error: undefined,
            });
    });
});
