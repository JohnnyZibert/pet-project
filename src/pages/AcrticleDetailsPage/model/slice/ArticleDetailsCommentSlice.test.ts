import { ArticleDetailsCommentsSchema } from 'pages/AcrticleDetailsPage';
import { articleDetailsCommentReducer } from 'pages/AcrticleDetailsPage/model/slice/ArticleDetailsCommentSlice';
import {
    fetchCommentsByArticleId,
} from 'pages/AcrticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';

describe('Article details comment slice tests', () => {
    const articleId = [{
        id: '1',
        text: 'Привет',
        user: {
            avatar: '',
            id: '1',
            username: 'Eugen',
        },
    }];

    const entities = {
        1: {
            id: '1',
            text: 'Привет',
            user: {
                avatar: '',
                id: '1',
                username: 'Eugen',
            },
        },
    };

    test('article details pending', () => {
        const state: DeepPartial<ArticleDetailsCommentsSchema> = {
            isLoading: false, error: undefined, ids: [], entities: {},
        };
        expect(articleDetailsCommentReducer(
            state as ArticleDetailsCommentsSchema,
            fetchCommentsByArticleId.pending,
        ))
            .toEqual({
                isLoading: true, error: undefined, ids: [], entities: {},
            });
    });
    test('fulfilled', () => {
        const state: DeepPartial<ArticleDetailsCommentsSchema> = {
            isLoading: true, error: undefined, ids: [], entities: {},
        };
        expect(articleDetailsCommentReducer(
            state as ArticleDetailsCommentsSchema,
            fetchCommentsByArticleId.fulfilled(articleId, 'user', ''),
        ))
            .toEqual({
                isLoading: false,
                error: undefined,
                ids: ['1'],
                entities,
            });
    });
    test('rejected', () => {
        const state: DeepPartial<ArticleDetailsCommentsSchema> = {
            isLoading: true, error: undefined, ids: [], entities: {},
        };
        expect(articleDetailsCommentReducer(
            state as ArticleDetailsCommentsSchema,
            fetchCommentsByArticleId.rejected,
        ))
            .toEqual({
                isLoading: false,
                error: undefined,
                ids: [],
                entities: {},
            });
    });
});
