import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import ArticlesIcon from 'shared/assets/icons/articles.svg';
import { SidebarItemType } from 'widgets/Sidebar/model/types/SidebarItemType';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItems: SidebarItemType[] = [
        {
            path: RoutePath.main,
            text: 'Главная',
            Icon: MainIcon,
        },
        {
            path: RoutePath.about,
            text: 'О сайте',
            Icon: AboutIcon,
        },
    ];
    if (userData) {
        sidebarItems.push(
            {
                path: RoutePath.profile + userData.id,
                text: 'Страница пользователя',
                Icon: ProfileIcon,
                authOnly: true,
            },
            {
                path: RoutePath.articles,
                text: 'Статьи',
                Icon: ArticlesIcon,
                authOnly: true,
            },
        );
    }
    return sidebarItems;
});
