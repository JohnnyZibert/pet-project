import { MutableRefObject, useEffect } from 'react';

interface IseInfiniteScrollProps {
    callback?: () => void
    triggerRef: MutableRefObject<HTMLElement>
    wrapperRef: MutableRefObject<HTMLElement>
}

export const IseInfiniteScroll = (props: IseInfiniteScrollProps) => {
    const { callback, wrapperRef, triggerRef } = props;

    useEffect(() => {
        const wrapperElement = wrapperRef.current;
        const triggerRefElement = triggerRef.current;
        let observer: IntersectionObserver | null = null;

        if (callback) {
            const options = {
                root: wrapperElement,
                rootMargin: '0px',
                threshold: 1.0,
            };

            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    callback();
                }
            }, options);

            observer.observe(triggerRefElement);
        }

        return () => {
            if (observer && triggerRefElement) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(triggerRefElement);
            }
        };
    }, [callback, triggerRef, wrapperRef]);
};
