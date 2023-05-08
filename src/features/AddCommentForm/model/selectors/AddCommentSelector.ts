import { StateSchema } from 'app/providers/StoreProvider';

export const getCommentTextSelector = (state: StateSchema) => state.addCommentForm?.text ?? '';
export const getCommentErrorSelector = (state: StateSchema) => state.addCommentForm?.error;
