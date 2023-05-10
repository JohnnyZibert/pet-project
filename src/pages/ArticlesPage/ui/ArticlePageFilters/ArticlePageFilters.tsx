import React, { useCallback, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { useSelector } from 'react-redux';
import {
    ArticleSortField, ArticleSortSelector, ArticlesTypes, ArticleView,
} from 'entities/Article';
import { articlesPageActions } from 'pages/ArticlesPage/model/slice/ArticlesPageSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Card } from 'shared/ui/Card/Card';
import { SortOrder } from 'shared/types/types';
import { Input } from 'shared/ui/Input/Input';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/articlePageRequest/articlePageRequest';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { ArticleTypes } from 'entities/Article/model/types/article';
import {
    getArticlePageOrder, getArticlePageSearch,
    getArticlePageSort, getArticlePageType,
    getArticlesPageView,
} from '../../model/selectors/articlePageSelectors';
import cls from './ArticlePageFilters.module.scss';

export interface ArticlePageFiltersProps {
    className?: string
}

export const ArticlePageFilters = (props: ArticlePageFiltersProps) => {
    const { className } = props;
    const { t } = useTranslation('articles');
    const view = useSelector(getArticlesPageView);
    const order = useSelector(getArticlePageOrder);
    const sort = useSelector(getArticlePageSort);
    const search = useSelector(getArticlePageSearch);
    const articleType = useSelector(getArticlePageType);

    const dispatch = useAppDispatch();

    const fetchNewData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debounceFetchData = useDebounce(() => {
        fetchNewData();
    }, 500);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);

    const onChangeOrder = useCallback((newOrder: SortOrder) => {
        dispatch(articlesPageActions.setOrder(newOrder));
        dispatch(articlesPageActions.setPage(1));
        fetchNewData();
    }, [dispatch, fetchNewData]);

    const onChangeSort = useCallback((newSort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(newSort));
        dispatch(articlesPageActions.setPage(1));
        fetchNewData();
    }, [dispatch, fetchNewData]);

    const onChangeSearch = useCallback((newValue: string) => {
        dispatch(articlesPageActions.setSearch(newValue));
        dispatch(articlesPageActions.setPage(1));
        debounceFetchData();
    }, [dispatch, debounceFetchData]);

    const onChangeTypeArticle = useCallback((tab: TabItem<ArticleTypes>) => {
        dispatch(articlesPageActions.setTypeArticle(tab.value));
        dispatch(articlesPageActions.setPage(1));
        fetchNewData();
    }, [dispatch, fetchNewData]);

    return (
        <div className={classNames(cls.ArticlePageFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector
                    sort={sort}
                    order={order}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
            </div>
            <Card className={cls.search}>
                <Input
                    value={search}
                    onChange={onChangeSearch}
                    type="text"
                    placeholder={t('Поиск')}
                />
            </Card>
            <ArticlesTypes
                value={articleType}
                onChangeType={onChangeTypeArticle}
                className={cls.tabs}
            />
        </div>
    );
};
