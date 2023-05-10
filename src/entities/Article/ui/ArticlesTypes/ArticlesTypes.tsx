import React, { useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { ArticleTypes } from 'entities/Article';

export interface ArticlesTypesProps {
    className?: string
    value: ArticleTypes
    onChangeType:(type: TabItem<ArticleTypes>) => void

}

export const ArticlesTypes = (props: ArticlesTypesProps) => {
    const { className, value, onChangeType } = props;
    const { t } = useTranslation();
    const tabsItem = useMemo<TabItem<ArticleTypes>[]>(() => [
        {
            value: ArticleTypes.ALL,
            content: t('Все'),
        },
        {
            value: ArticleTypes.IT,
            content: t('Айти'),
        },
        {
            value: ArticleTypes.ECONOMICS,
            content: t('Экономика'),
        },
        {
            value: ArticleTypes.SCIENCE,
            content: t('Наука'),
        },
    ], [t]);
    return (
        <Tabs
            className={classNames('', {}, [className])}
            tabs={tabsItem}
            onClickTab={onChangeType}
            value={value}
        />
    );
};
