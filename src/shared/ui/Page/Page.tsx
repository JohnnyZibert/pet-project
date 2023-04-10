import React, { MutableRefObject, ReactNode, useRef } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { IseInfiniteScroll } from 'shared/lib/hooks/iseInfiniteScroll';
import cls from './Page.module.scss';

export interface PageProps {
    className?: string
    children: ReactNode
    onScrollEnd?: ()=> void
}

export const Page = (props: PageProps) => {
    const { className, children, onScrollEnd } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    IseInfiniteScroll({
        wrapperRef,
        triggerRef,
        callback: onScrollEnd,
    });

    return (
        <section ref={wrapperRef} className={classNames(cls.Page, {}, [className])}>
            {children}
            <div ref={triggerRef} />
        </section>
    );
};
