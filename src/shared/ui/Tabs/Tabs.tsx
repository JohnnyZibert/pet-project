import React, { ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { ArticleTypes } from 'entities/Article';
import cls from './Tabs.module.scss';

export interface TabItem<T extends ArticleTypes> {
    content: ReactNode
    value: T
}

export interface TabsProps<T extends ArticleTypes> {
    className?: string
    tabs: TabItem<T>[]
    value: string
    onClickTab: (tab: TabItem<T>) => void
}

export const Tabs = (props: TabsProps<ArticleTypes>) => {
    const {
        className, tabs, value, onClickTab,
    } = props;

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    className={cls.tab}
                    key={tab.value}
                    theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
                    onClick={() => onClickTab(tab)}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
};
