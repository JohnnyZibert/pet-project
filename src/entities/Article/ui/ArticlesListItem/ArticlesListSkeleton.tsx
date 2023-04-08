import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/ui/Card/Card';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Articles, ArticleView } from '../../model/types/article';
import cls from './ArticlesListItem.module.scss';

export interface ArticlesListSkeletonProps {
    className?: string
    view: ArticleView
    article?: Articles
}

export const ArticlesListSkeleton = (props: ArticlesListSkeletonProps) => {
    const { className, view, article } = props;
    const { t } = useTranslation('articles');

    if (view === ArticleView.BIG) {
        return (
            <div className={classNames(cls.ArticlesListItem, {}, [className, cls[view]])}>
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Skeleton border="50%" width={30} height={30} />
                        <Skeleton width={150} height={16} className={cls.username} />
                        <Skeleton width={150} height={16} className={cls.date} />
                    </div>
                    <Skeleton width={250} height={24} className={cls.title} />
                    <Skeleton width="100%" height={200} className={cls.img} />
                    <div className={cls.footer}>
                        <Skeleton width={200} height={36} />
                    </div>
                </Card>
            </div>
        );
    }
    return (
        <div className={classNames(cls.ArticlesListItem, {}, [className, cls[view]])}>
            <Card className={cls.card}>
                <div className={cls.imgWrapper}>
                    <Skeleton width={200} height={200} className={cls.img} />
                </div>
                <div className={cls.wrapperInfo}>
                    <Skeleton width={130} height={16} className={cls.img} />
                </div>
                <Skeleton width={150} height={16} className={cls.title} />
            </Card>
        </div>
    );
};
