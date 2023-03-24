import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Profile } from '../../types/Profile';
import { getProfileForm } from '../../selectors/getFormData/getProfileForm';

export const fetchUpdateData = createAsyncThunk<Profile, void, ThunkConfig<string>
    >(
        'profileSlice/fetchUpdateData',
        async (_, { extra, rejectWithValue, getState }) => {
            const formData = getProfileForm(getState());

            try {
                const response = await extra.api.put<Profile>('/profile', formData);

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                console.log(e);
                return rejectWithValue('error');
            }
        },
    );
