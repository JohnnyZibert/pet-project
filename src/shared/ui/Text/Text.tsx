import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './Text.module.scss';

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
}

export enum AlignText {
    LEFT = 'left',
    RIGHT = 'right',
    CENTER = 'center',
}

export enum TextSize {
    M = 'size_m',
    L = 'size_l',
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: AlignText
    size?: TextSize
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        title,
        align = AlignText.LEFT,
        theme = TextTheme.PRIMARY,
        size = TextSize.M,
    } = props;

    return (
        <div className={classNames(cls.Text, {}, [className, cls[size], cls[align], cls[theme]])}>
            {title && <p className={cls.title}>{title}</p>}
            {text && <p className={cls.text}>{text}</p>}
        </div>
    );
});
