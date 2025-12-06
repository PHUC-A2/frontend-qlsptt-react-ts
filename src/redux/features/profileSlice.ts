import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IProfile } from '../../types/profile';

interface ProfielState {
    profile: IProfile | null;
}

const initialState: ProfielState = {
    profile: null
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<IProfile>) => {
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