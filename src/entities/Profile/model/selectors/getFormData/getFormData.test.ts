import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entities/Country/model/types/country';
import { Currency } from 'entities/Currency';
import { getProfileForm } from 'entities/Profile';

describe('getProfileFormData.test', () => {
    test('should return form data', () => {
        const data = {
            username: 'Jenya',
            age: 26,
            country: Country.RUSSIA,
            lastname: 'zgirdan',
            first: 'Eugen',
            city: 'NN',
            currency: Currency.RUB,
        };
        const state: DeepPartial<StateSchema> = {
            profile: {
                form: data,
            },
        };
        expect(getProfileForm(state as StateSchema)).toEqual(data);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileForm(state as StateSchema)).toEqual(undefined);
    });
});
