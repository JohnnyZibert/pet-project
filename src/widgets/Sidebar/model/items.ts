import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile.svg';
import React from 'react';

export interface SidebarItemType {
    text?: string;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>
    path: string
}

export const sidebarItems: SidebarItemType[] = [
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
    {
        path: RoutePath.profile,
        text: 'Страница пользователя',
        Icon: ProfileIcon,
    },

];
