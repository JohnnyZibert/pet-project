import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import ArticlesPage from 'pages/ArticlesPage/ui/ArticlesPage/ArticlesPage';
import { ArticleDetailsPage } from 'pages/AcrticleDetailsPage';
import { ArticleEditPage } from 'pages/ArticleEditPage';

export type AppRouterProps = RouteProps & {
    authOnly?: boolean
}

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'articles_details',
    ARTICLE_CREATE = 'articles_create',
    ARTICLE_EDIT = 'articles_edit',
    // последний
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile/', // +id
    [AppRoutes.ARTICLES]: '/articles',
    [AppRoutes.ARTICLE_DETAILS]: '/articles/', // + id
    [AppRoutes.ARTICLE_CREATE]: '/articles/new',
    [AppRoutes.ARTICLE_EDIT]: '/articles/:id/edit',
    // последний
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRouterProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
        path: `${RoutePath.profile}:id`,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLES]: {
        path: RoutePath.articles,
        element: <ArticlesPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: `${RoutePath.articles_details}:id`,
        element: <ArticleDetailsPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_CREATE]: {
        path: RoutePath.articles_create,
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_EDIT]: {
        path: RoutePath.articles_edit,
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
