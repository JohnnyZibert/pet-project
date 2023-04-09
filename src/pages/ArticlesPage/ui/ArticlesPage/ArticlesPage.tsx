import React, { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticlesList, ArticleView } from 'entities/Article';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicLoaderModule/DynamicLoaderModule';
import { useSelector } from 'react-redux';
import { useInitialUseEffect } from 'shared/lib/initialUseEffect/initialUseEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { fetchArticles } from 'pages/ArticlesPage/model/services/articlePageRequest';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { getArticleIsLoading, getArticleView } from '../../model/selectors/articlePageSelectors';
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
    const dispatch = useAppDispatch();
    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlePageActions.setView(view));
    }, [dispatch]);

    useInitialUseEffect(() => {
        dispatch(fetchArticles());
        dispatch(articlePageActions.setInitialView());
    });

    return (
        <DynamicModuleLoader reducers={reducer}>
            <div className={classNames(cls.ArticlePage, {}, [className])}>
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
                <ArticlesList
                    isLoading={isLoading}
                    view={view}
                    articles={articles}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
