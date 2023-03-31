import { StateSchema } from 'app/providers/StoreProvider';
import { getValidateError, ValidateProfileError } from 'entities/Profile';

describe('getValidateErrors.test', () => {
    test('should return validate errors', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors: [
                    ValidateProfileError.SERVER_ERROR,
                    ValidateProfileError.NO_DATA,
                ],
            },
        };
        expect(getValidateError(state as StateSchema)).toEqual(
            [
                ValidateProfileError.SERVER_ERROR,
                ValidateProfileError.NO_DATA,
            ],
        );
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getValidateError(state as StateSchema)).toEqual(undefined);
    });
});
