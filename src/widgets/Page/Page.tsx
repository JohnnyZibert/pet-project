import { classNames } from 'shared/lib/classNames/classNames';
import {
    memo, MutableRefObject, ReactNode, UIEvent, useEffect, useLayoutEffect, useRef,
} from 'react';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { scrollPositionActions, getScrollByPath } from 'features/SaveScrollPosition';
import { useLocation } from 'react-router-dom';
import { useInitialEffect } from 'shared/lib/hooks/initialUseEffect/initialUseEffect';
import { useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { loginActions } from 'features/AuthByUsername/model/slice/loginSlice';
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle';
import cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
    const { className, children, onScrollEnd } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector((state: StateSchema) => getScrollByPath(state, pathname));

    useInfiniteScroll({
        wrapperRef,
        triggerRef,
        callback: onScrollEnd,
    });

    useEffect(() => {
        if (wrapperRef.current) {
            wrapperRef.current.scrollTop = scrollPosition;
        }
    }, [wrapperRef.current]);

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(scrollPositionActions.setScrollPosition(
            {
                position: e.currentTarget.scrollTop,
                path: pathname,
            },
        ));
    }, 1000);

    return (
        <section
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
            onScroll={onScroll}
        >
            {children}
            <div ref={triggerRef} className={cls.triggerEl}>triggerScroll</div>
        </section>
    );
});
