import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './SaveScrollPosition.module.scss';

export interface SaveScrollPositionProps {
    className?: string
}

export const SaveScrollPosition = (props: SaveScrollPositionProps) => {
    const { className } = props;
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.SaveScrollPosition, {}, [className])}>
            SaveScrollPosition
        </div>
    );
};
