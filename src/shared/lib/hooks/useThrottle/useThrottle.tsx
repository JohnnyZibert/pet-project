import { useCallback, useRef } from 'react';

export function useThrottle(callback:(...args: any[])=> void, delay: number) {
    const throttleRef = useRef(false);

    return useCallback((...args: any[]) => {
        if (!throttleRef.current) {
            console.log('scroll');

            callback(...args);
            throttleRef.current = true;

            setTimeout(() => {
                throttleRef.current = false;
                console.log(delay);
            }, delay);
        }
    }, [callback, delay]);
}
