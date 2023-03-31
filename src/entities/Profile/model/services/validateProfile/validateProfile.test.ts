import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ValidateProfileError } from 'entities/Profile';
import { validateProfile } from './validateProfile';

const data = {
    username: 'Jenya',
    age: 26,
    country: Country.RUSSIA,
    lastname: 'zgirdan',
    first: 'Eugen',
    city: 'NN',
    currency: Currency.RUB,
};

describe('validateProfile.test', () => {
    test('success', async () => {
        const result = validateProfile(data);

        expect(result).toEqual([
        ]);
    });

    test('without first and lastname', async () => {
        const result = validateProfile({ ...data, first: '', lastname: '' });

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
        ]);
    });

    test('without age', async () => {
        const result = validateProfile({ ...data, age: undefined });

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_AGE,
        ]);
    });

    test('without country', async () => {
        const result = validateProfile({ ...data, country: undefined });

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_COUNTRY,
        ]);
    });
    test('without all', async () => {
        const result = validateProfile({});

        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_USER_AGE,
            ValidateProfileError.INCORRECT_USER_COUNTRY,
        ]);
    });
});
