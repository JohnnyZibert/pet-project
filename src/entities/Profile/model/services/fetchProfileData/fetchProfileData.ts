import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Profile } from '../../types/profileErrors';

export const fetchProfileData = createAsyncThunk<Profile, string, ThunkConfig<string>
    >(
        'profileSlice/fetchProfileData',
        async (profileId, { extra, rejectWithValue }) => {
            try {
                const response = await extra.api.get<Profile>(`/profile/${profileId}`);

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                return rejectWithValue('error');
            }
        },
    );
