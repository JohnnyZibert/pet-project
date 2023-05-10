import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ArticleDetails, ArticlesList } from 'entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicLoaderModule/DynamicLoaderModule';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/initialUseEffect/initialUseEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/AddCommentForm';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Button } from 'shared/ui/Button/Button';
import { Page } from 'widgets/Page/Page';
import {
    getArticleRecommendationsError,
    getArticleRecommendationsIsLoading,
} from 'pages/AcrticleDetailsPage/model/selectors/RecommendationsSelectors';
import { articleDetailsPageReducer } from 'pages/AcrticleDetailsPage/model/slice';
import { getCommentTextSelector } from 'features/AddCommentForm/model/selectors/AddCommentSelector';
import {
    fetchRecommendationArticles,
} from '../../model/services/fetchRecommendationArticles/fetchRecommendationArticles';
import {
    articleDetailsRecommendationReducer,
    getArticleRecommendationSelector,
} from '../../model/slice/ArticleDetailsRecomendationSlice';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { addCommentForArticles } from '../../model/services/addCommentForArticles/addCommentForArticles';
import { getArticleCommentsIsLoading } from '../../model/selectors/commentsSelectors';
import cls from './ArticleDetailsPage.module.scss';
import { getArticleCommentSelector } from '../../model/slice/ArticleDetailsCommentSlice';

export interface ArticleDetailsPageProps {
    className?: string
}

const reducer: ReducersList = {
    articlesDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation('articles-details');
    const dispatch = useAppDispatch();
    const { id } = useParams<{id: string}>();
    const comments = useSelector(getArticleCommentSelector.selectAll);
    const recommendations = useSelector(getArticleRecommendationSelector.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);
    const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);
    const navigate = useNavigate();

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticles(text));
    }, [dispatch]);

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    useInitialEffect(() => {
        dispatch(fetchRecommendationArticles());
        dispatch(fetchCommentsByArticleId(id));
    });

    if (!id) {
        return (
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </Page>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducer} removeAfterUnmount>
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <Button onClick={onBackToList}>{t('Назад к списку')}</Button>
                <ArticleDetails id={id} />
                <Text
                    size={TextSize.L}
                    title={t('Рекомендуем')}
                    className={cls.commentTitle}
                />
                <ArticlesList
                    articles={recommendations}
                    isLoading={recommendationsIsLoading}
                    target="_blank"
                />
                <Text
                    size={TextSize.L}
                    title={t('Комментарии')}
                    className={cls.commentTitle}
                />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
