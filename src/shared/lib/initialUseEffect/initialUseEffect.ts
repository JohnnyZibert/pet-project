import { useEffect } from 'react';

export function useInitialUseEffect(callback: ()=> void) {
    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            callback();
        }
        // eslint-disable-next-line
    }, []);
}
