import { StateSchema } from 'app/providers/StoreProvider';
import {
    getCommentErrorSelector,
    getCommentTextSelector,
} from 'features/AddCommentForm/model/selectors/AddCommentSelector';

describe('addCommentFormSelector test', () => {
    test('should return new text', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: { text: 'hello' },
        };
        expect(getCommentTextSelector(state as StateSchema)).toStrictEqual('hello');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getCommentTextSelector(state as StateSchema)).toEqual(undefined);
    });
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            addCommentForm: { error: 'error' },
        };
        expect(getCommentErrorSelector(state as StateSchema)).toEqual('error');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getCommentTextSelector(state as StateSchema)).toEqual(undefined);
    });
});
