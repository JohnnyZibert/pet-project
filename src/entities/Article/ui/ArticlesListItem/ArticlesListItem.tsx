import React, { HTMLAttributeAnchorTarget, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import EyeIcon from 'shared/assets/icons/ant-design_eye-outlined.svg';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import {
    ArticleBlockType, Article, ArticleTextBlock, ArticleView,
} from '../../model/types/article';
import cls from './ArticlesListItem.module.scss';

export interface ArticlesListItemProps {
    className?: string
    view: ArticleView
    article: Article
    target?: HTMLAttributeAnchorTarget
}

export const ArticlesListItem = (props: ArticlesListItemProps) => {
    const {
        className, view, article, target,
    } = props;
    const { t } = useTranslation('articles');

    const types = <Text text={article.type.join(', ')} className={cls.types} />;
    const views = (
        <>
            <Text text={String(article.views)} className={cls.views} />
            <Icon Svg={EyeIcon} />
        </>
    );

    if (view === ArticleView.BIG) {
        const textBlock = article.blocks
            .find((block) => block.type === ArticleBlockType.TEXT) as ArticleTextBlock;
        return (
            <div className={classNames(cls.ArticlesListItem, {}, [className, cls[view]])}>
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Avatar src={article.user.avatar} size={30} alt="avatar" />
                        <Text text={article.user.username} className={cls.username} />
                        <Text text={article.createdAt} className={cls.date} />
                    </div>
                    <Text title={article.title} className={cls.title} />
                    {types}
                    <img src={article.img} alt={article.title} className={cls.img} />
                    {textBlock && <ArticleTextBlockComponent block={textBlock} className={cls.articlesTextBlock} />}
                    <div className={cls.footer}>
                        <AppLink target={target} to={RoutePath.articles_details + article.id}>
                            <Button>{t('Читать далее...')}</Button>
                        </AppLink>
                        {views}
                    </div>
                </Card>
            </div>
        );
    }
    return (
        <AppLink
            target={target}
            to={RoutePath.articles_details + article.id}
            className={classNames(cls.ArticlesListItem, {}, [className, cls[view]])}
        >
            <Card className={cls.card}>
                <div className={cls.imgWrapper}>
                    <img src={article.img} className={cls.img} alt={article.title} />
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <div className={cls.wrapperInfo}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={cls.title} />
            </Card>
        </AppLink>
    );
};
