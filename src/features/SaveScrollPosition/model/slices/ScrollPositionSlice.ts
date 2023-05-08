import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SaveScrollSchema } from 'features/SaveScrollPosition/model/types/SaveScrollSchema';

const initialState: SaveScrollSchema = {
    scroll: {},
};

export const ScrollPositionSlice = createSlice({
    name: 'ScrollPositionSlice',
    initialState,
    reducers: {
        setScrollPosition: (state, { payload }: PayloadAction<{ path: string, position: number }>) => {
            state.scroll[payload.path] = payload.position;
        },
    },
});

export const { actions: scrollPositionActions } = ScrollPositionSlice;
export const { reducer: scrollPositionReducer } = ScrollPositionSlice;
