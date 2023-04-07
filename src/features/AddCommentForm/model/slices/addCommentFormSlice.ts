import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddCommentFormSchema } from '../../model/types/addCommentFormSchema';

const initialState: AddCommentFormSchema = {
    error: undefined,
    text: undefined,
};

export const addCommentFormSlice = createSlice({
    name: 'addCommentFormSlice',
    initialState,
    reducers: {
        setText: (state, { payload }: PayloadAction<string>) => {
            state.text = payload;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(sendCommentRequest.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(sendCommentRequest.fulfilled, (state, { payload }: PayloadAction<Articles>) => {
    //             state.isLoading = false;
    //             state.data = payload;
    //         })
    //         .addCase(sendCommentRequest.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
