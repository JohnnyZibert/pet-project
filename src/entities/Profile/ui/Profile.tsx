import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Profile.module.scss';

export interface ProfileProps {
    className?: string
}

export const Profile = ({ className }:ProfileProps) => <div className={classNames(cls.Profile, {}, [className])} />;
