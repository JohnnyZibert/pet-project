import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { Text } from 'shared/ui/Text/Text';
import { CommentList } from 'entities/Comment';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicLoaderModule/DynamicLoaderModule';
import { useSelector } from 'react-redux';
import { useInitialUseEffect } from 'shared/lib/initialUseEffect/initialUseEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { AddCommentForm } from 'features/AddCommentForm';
import {
    fetchCommentsByArticleId,
} from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import {
    addCommentForArticles,
} from '../../model/services/addCommentForArticles/addCommentForArticles';
import {
    getArticleCommentsIsLoading,
} from '../../model/selectors/commentsSelectors';
import cls from './ArticleDetailsPage.module.scss';
import { ArticleDetailsCommentReducer, getArticleCommentSelector } from '../../model/slice/ArticleDetailsCommentSlice';

export interface ArticleDetailsPageProps {
    className?: string
}

const reducer: ReducersList = {
    articleDetailsComments: ArticleDetailsCommentReducer,
};

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { t } = useTranslation('articles-details');
    const dispatch = useAppDispatch();
    const { id } = useParams<{id: string}>();
    const comments = useSelector(getArticleCommentSelector.selectAll);
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading);

    useInitialUseEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    });

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticles(text));
    }, [dispatch]);

    if (!id) {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducer} removeAfterUnmount>
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <ArticleDetails id={id} />
                <Text title={t('Комментарии')} className={cls.commentTitle} />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);