import {
    fetchUpdateData,
    profileActions, profileReducer, ProfileSchema, ValidateProfileError,
} from 'entities/Profile';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

describe('profile.test', () => {
    const data = {
        username: 'Jenya',
        age: 26,
        country: Country.RUSSIA,
        lastname: 'zgirdan',
        first: 'Eugen',
        city: 'NN',
        currency: Currency.RUB,
    };
    test('test set readonly', () => {
        const state: DeepPartial<ProfileSchema> = { readonly: false };
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.setReadonly(true),
        ))
            .toEqual({ readonly: true });
    });
    test('test set cancelEdit', () => {
        const state: DeepPartial<ProfileSchema> = {
            data, form: { first: '' },
        };
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.cancelEdit(),
        ))
            .toEqual({
                readonly: true, validateErrors: undefined, data, form: data,
            });
    });
    test('test set updateProfile', () => {
        const state: DeepPartial<ProfileSchema> = {
            form: { first: '123' },
        };
        expect(profileReducer(
            state as ProfileSchema,
            profileActions.updateProfileData({ first: '1234556' }),
        ))
            .toEqual({
                form: { first: '1234556' },
            });
    });
    test('test set fetchProfileData pending', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: false, validateErrors: [ValidateProfileError.SERVER_ERROR],
        };
        expect(profileReducer(
            state as ProfileSchema,
            fetchUpdateData.pending,
        ))
            .toEqual({
                isLoading: true, validateErrors: undefined,
            });
    });
    test('test set fetchProfileData fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
        };
        expect(profileReducer(
            state as ProfileSchema,
            fetchUpdateData.fulfilled(data, ''),
        ))
            .toEqual({
                isLoading: false, validateErrors: undefined, form: data, data, readonly: true,
            });
    });
    test('test set fetchProfileData fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = {
            isLoading: true,
            validateErrors: undefined,
        };
        expect(profileReducer(
            state as ProfileSchema,
            fetchUpdateData.rejected,
        ))
            .toEqual({
                isLoading: false,
                validateErrors: undefined,
            });
    });
});
