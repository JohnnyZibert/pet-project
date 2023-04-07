import { AddCommentFormSchema } from '../types/addCommentFormSchema';
import { addCommentFormActions, addCommentFormReducer } from '../../model/slices/addCommentFormSlice';

describe('addCommentFormSlice tests', () => {
    test('test text', () => {
        const state: DeepPartial<AddCommentFormSchema> = { text: '' };
        expect(addCommentFormReducer(
            state as AddCommentFormSchema,
            addCommentFormActions.setText('Привет-Привет'),
        ))
            .toStrictEqual({ text: 'Привет-Привет' });
    });
    test('should work with empty state', () => {
        const state: DeepPartial<AddCommentFormSchema> = { text: '' };
        expect(addCommentFormReducer(
            state as AddCommentFormSchema,
            addCommentFormActions.setText(''),
        ))
            .toStrictEqual({ text: '' });
    });
});
