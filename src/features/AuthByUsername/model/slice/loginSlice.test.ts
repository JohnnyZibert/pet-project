import { LoginSchema } from 'features/AuthByUsername';
import { loginActions, loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';

describe('loginSlice.test', () => {
    test('test set username', () => {
        const state: DeepPartial<LoginSchema> = { username: '123' };
        expect(loginReducer(
            state as LoginSchema,
            loginActions.setUsername('12314124'),
        ))
            .toEqual({ username: '12314124' });
    });
    test('test set password', () => {
        const state: DeepPartial<LoginSchema> = { password: '123423' };
        expect(loginReducer(
            state as LoginSchema,
            loginActions.setPassword('654645645'),
        )).toEqual({ password: '654645645' });
    });
});
