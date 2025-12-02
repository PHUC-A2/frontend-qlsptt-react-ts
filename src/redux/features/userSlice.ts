import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IUsers } from '../../types/backend';
import { fetchUsers, handleCreateUser, handleFindUserById, handleRemoveUser } from '../thunks/userThunks';

interface UserState {
    data: IUsers[];
    selecedUser?: IUsers;
    loading: boolean;
    error?: string;
}


const initialState: UserState = {
    data: [] as IUsers[],
    selecedUser: undefined,
    loading: false,
    error: undefined
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

            // fetch
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
            })

            // create
            .addCase(handleCreateUser.fulfilled, (state, action) => {
                state.data.push(action.payload);  // thêm user mới
            })
            // nếu lỗi
            .addCase(handleCreateUser.rejected, (state, action) => {
                state.error = (action.payload as string) ?? "Lỗi không xác định";
            })

            // delete
            .addCase(handleRemoveUser.fulfilled, (state, action) => {
                state.data = state.data.filter(user => user.id !== action.payload);  // xáo user theo id
            })
            // nếu lỗi
            .addCase(handleRemoveUser.rejected, (state, action) => {
                state.error = (action.payload as string) ?? "Lỗi không xác định";
            })
            // find by ID
            .addCase(handleFindUserById.fulfilled, (state, action) => {
                state.selecedUser = action.payload;
            })
            // nếu lỗi
            .addCase(handleFindUserById.rejected, (state, action) => {
                state.error = (action.payload as string) ?? "Lỗi không xác định";
            })
    }
});

export const { setUsersInfo, setClearUsersInfo } = authSlice.actions;
export default authSlice.reducer;