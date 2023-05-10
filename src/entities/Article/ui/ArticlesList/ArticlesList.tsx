import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { ArticlesListSkeleton } from '../../ui/ArticlesListItem/ArticlesListSkeleton';
import { ArticlesListItem } from '../../ui/ArticlesListItem/ArticlesListItem';
import { Article, ArticleView } from '../../model/types/article';
import cls from './ArticlesList.module.scss';

export interface ArticlesListProps {
    className?: string
    articles: Article[]
    isLoading?: boolean
    view: ArticleView
}

const getSkeletons = (view: ArticleView) => (new Array(view === ArticleView.SMALL ? 10 : 4)
    .fill(0)
    .map((item, index) => <ArticlesListSkeleton view={view} key={index} className={cls.card} />)
);

export const ArticlesList = (props: ArticlesListProps) => {
    const {
        className,
        articles,
        view,
        isLoading,
    } = props;
    const { t } = useTranslation('articles');

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(
                cls.articlesNotFound,
                {},
                [className, cls[view]],
            )}
            >
                <Text title={t('Статьи не найдены')} size={TextSize.L} />
            </div>
        );
    }

    const renderArticle = (article: Article) => (
        <ArticlesListItem
            key={`${article.id}${article.createdAt}`}
            article={article}
            view={view}
            className={cls.card}
        />
    );

    return (
        <div className={classNames(
            cls.ArticlesList,
            {},
            [className, cls[view]],
        )}
        >
            {articles.length > 0 ? articles.map(renderArticle) : null}
            {isLoading && getSkeletons(view)}
        </div>
    );
};
