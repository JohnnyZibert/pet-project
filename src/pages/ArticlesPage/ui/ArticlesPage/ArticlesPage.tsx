import React, { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticlesList, ArticleView } from 'entities/Article';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicLoaderModule/DynamicLoaderModule';
import { useSelector } from 'react-redux';
import { useInitialUseEffect } from 'shared/lib/initialUseEffect/initialUseEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { fetchArticles } from 'pages/ArticlesPage/model/services/articlePageRequest/articlePageRequest';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { Page } from 'shared/ui/Page/Page';
import { fetchNextPage } from 'pages/ArticlesPage/model/services/fetchNextPage/fetchNextPage';
import { initArticlesPage } from 'pages/ArticlesPage/model/services/initArticlesPage/initArticlesPage';
import {
    getArticleHasInited,
    getArticleIsLoading,
    getArticleView,
} from '../../model/selectors/articlePageSelectors';
import cls from './ArticlesPage.module.scss';
import {
    articlePageActions, articlePageSliceReducer,
    getArticle,
} from '../../model/slice/ArticlesPageSlice';

export interface ArticlePageProps {
    className?: string
}

const reducer: ReducersList = {
    articlePage: articlePageSliceReducer,
};

const ArticlesPage = ({ className }: ArticlePageProps) => {
    const articles = useSelector(getArticle.selectAll);
    const isLoading = useSelector(getArticleIsLoading);
    const view = useSelector(getArticleView);
    const inited = useSelector(getArticleHasInited);
    const dispatch = useAppDispatch();
    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlePageActions.setView(view));
    }, [dispatch]);

    const onLoadedNextPat = useCallback(() => {
        dispatch(fetchNextPage());
    }, [dispatch]);

    useInitialUseEffect(() => {
        dispatch(initArticlesPage());
    });

    return (
        <DynamicModuleLoader reducers={reducer} removeAfterUnmount={false}>
            <Page
                onScrollEnd={onLoadedNextPat}
                className={classNames(cls.ArticlePage, {}, [className])}
            >
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
                <ArticlesList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
