import React, { useCallback, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select, SelectOptions } from 'shared/ui/Select/Select';
import { SortOrder } from 'shared/types/types';
import { ArticleSortField } from 'entities/Article';
import cls from './ArticleSortSelector.module.scss';

export interface ArticleSortSelectorProps {
    className?: string
    order: SortOrder
    sort: ArticleSortField
    onChangeSort: (newSort:ArticleSortField) => void
    onChangeOrder: (newSort:SortOrder) => void
}

export const ArticleSortSelector = (props: ArticleSortSelectorProps) => {
    const {
        className,
        onChangeSort,
        sort,
        onChangeOrder,
        order,
    } = props;
    const { t } = useTranslation('articles');
    const orderOption = useMemo<SelectOptions<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: t('возрастанию'),
        },
        {
            value: 'desc',
            content: t('убыванию'),
        },
    ], [t]);

    const sortFieldOption = useMemo<SelectOptions<ArticleSortField>[]>(() => [
        {
            value: ArticleSortField.CREATED,
            content: t('дате создания'),
        },
        {
            value: ArticleSortField.TITLE,
            content: t('названию'),
        },
        {
            value: ArticleSortField.VIEWS,
            content: t('просмотрам'),
        },
    ], [t]);

    // КОСТЫЛЬНЫЙ СПОСОБ, В КОМПОНЕНТЕ СЕЛЕКТА СДЕЛАН GENERIC
    // const onHandleChangeSort = useCallback((newSort: string) => {
    //     onChangeSort(newSort as ArticleSortField);
    // }),[onChangeSort];
    // const onHandleChangeOrder = useCallback((newOrder: string) => {
    //     onChangeOrder(newOrder as SortOrder);
    // }),[onChangeSort];

    return (
        <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
            <Select
                label={t('Сортировать по')}
                options={sortFieldOption}
                value={sort}
                onChange={onChangeSort}
            />
            <Select
                label={t('по')}
                options={orderOption}
                value={order}
                onChange={onChangeOrder}
                className={cls.order}
            />

        </div>
    );
};
