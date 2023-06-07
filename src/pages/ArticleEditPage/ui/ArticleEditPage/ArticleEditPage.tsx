import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page/Page';
import { useSelector } from 'react-redux';
import { getCanEditArticle } from 'pages/AcrticleDetailsPage/model/selectors/article';
import { useParams } from 'react-router-dom';
import cls from './ArticleEditPage.module.scss';

export interface ArticleEditPageProps {
    className?: string
}

const ArticleEditPage = (props: ArticleEditPageProps) => {
    const { className } = props;
    const { t } = useTranslation('articles-details');
    const { id } = useParams<{id: string}>();
    const isEdit = Boolean(id);
    return (
        <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
            {isEdit ? t('Редактирование статьи') : t('Создать статью')}
        </Page>
    );
};
export default ArticleEditPage;
