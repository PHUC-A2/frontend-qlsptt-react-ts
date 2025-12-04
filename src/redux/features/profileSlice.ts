import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '../../types/user';

interface ProfielState {
    profile: IUser | null;
}

const initialState: ProfielState = {
    profile: null
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<IUser>) => {
            // console.log(action.payload);
            state.profile = action.payload;
        },
        setClearProfile: (state) => {
            state.profile = null
        },
    },
});

export const { setProfile, setClearProfile } = profileSlice.actions;
export default profileSlice.reducer;