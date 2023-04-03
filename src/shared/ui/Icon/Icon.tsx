import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

export interface IconProps {
    className?: string
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>
}

export const Icon = ({ className, Svg }: IconProps) => (
    <Svg className={classNames(cls.Icon, {}, [className])} />
);
