import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from 'widgets/Page/Page';
import { fetchArticlesList } from 'pages/ArticlesPage/model/services/articlePageRequest/articlePageRequest';
import { fetchNextArticlesPage } from 'pages/ArticlesPage/model/services/fetchNextPage/fetchNextPage';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicLoaderModule/DynamicLoaderModule';
import {
    articlesPageActions, articlesPageReducer, getArticles,
} from 'pages/ArticlesPage/model/slice/ArticlesPageSlice';
import { ArticlesList, ArticleView } from 'entities/Article';
import { useInitialEffect } from 'shared/lib/hooks/initialUseEffect/initialUseEffect';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { ArticlePageFilters } from 'pages/ArticlesPage/ui/ArticlePageFilters/ArticlePageFilters';
import { useSearchParams } from 'react-router-dom';
import { initArticlesPage } from 'pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage';
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/articlePageSelectors';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlePage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesPageIsLoading);
    const view = useSelector(getArticlesPageView);
    const error = useSelector(getArticlesPageError);
    // хранит в себе query параметры из поисковой строки браузера
    const [searchParams, setSearchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    // передаю параметры в инициальный запрос к серверу
    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <ArticlePageFilters />
                <ArticlesList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                    className={cls.listArticle}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
