import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { validateProfile } from '../validateProfile/validateProfile';
import { Profile, ValidateProfileError } from '../../types/profileErrors';
import { getProfileForm } from '../../selectors/getFormData/getProfileForm';

export const fetchUpdateData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>
    >(
        'profileSlice/fetchUpdateData',
        async (_, { extra, rejectWithValue, getState }) => {
            const formData = getProfileForm(getState());

            const error = validateProfile(formData);

            if (error.length) {
                return rejectWithValue(error);
            }

            try {
                const response = await extra.api.put<Profile>('/profile', formData);

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
            }
        },
    );
