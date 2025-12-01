import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IUsers } from '../../types/backend';
import { fetchUsers } from '../thunks/userThunks';

/*
{
    "status": true,
    "message": "Login successfully",
    "access_token": "47|7hDiJCpJkVRcuycCLsJzynwS9rCxGo6zXgP0KngAa8130a81"
}
*/
interface UserState {
    data: IUsers[] | [];
    loading: boolean;
    error?: string;
}


const initialState: UserState = {
    data: [],
    loading: false
};

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsersInfo: (state, action: PayloadAction<UserState>) => {
            // console.log(action.payload);
            state.data = action.payload.data;
        },
        setClearUsersInfo: (state) => {
            state.data = [];
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload ?? [];
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = (action.payload as string) ?? "Lỗi không xác định"; // đảm bảo cho rejected luôn trả string
            });
    }
});

export const { setUsersInfo, setClearUsersInfo } = authSlice.actions;
export default authSlice.reducer;