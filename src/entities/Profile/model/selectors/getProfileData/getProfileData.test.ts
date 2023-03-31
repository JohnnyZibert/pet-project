import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entities/Country/model/types/country';
import { Currency } from 'entities/Currency';
import { getProfileData } from 'entities/Profile';

describe('getProfileData.test', () => {
    test('should return data', () => {
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
                data,
            },
        };
        expect(getProfileData(state as StateSchema)).toEqual(data);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileData(state as StateSchema)).toEqual(undefined);
    });
});
