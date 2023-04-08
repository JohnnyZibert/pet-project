import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ArticlesListSkeleton } from '../../ui/ArticlesListItem/ArticlesListSkeleton';
import { ArticlesListItem } from '../../ui/ArticlesListItem/ArticlesListItem';
import { Articles, ArticleView } from '../../model/types/article';
import cls from './ArticlesList.module.scss';

export interface ArticlesListProps {
    className?: string
    articles: Articles[]
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
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <div className={classNames(cls.ArticlesList, {}, [className, cls[view]])}>
                {getSkeletons(view)}
            </div>
        );
    }

    const renderArticle = (article: Articles) => (
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
        </div>
    );
};
