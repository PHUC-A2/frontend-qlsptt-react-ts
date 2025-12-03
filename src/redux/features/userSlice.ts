import { createSlice } from "@reduxjs/toolkit";
import { usersAdapter, initialState } from "../adapters/userAdapter";
import { fetchUsers, handleCreateUser, handleFindUserById, handleRemoveUser, handleUpdateUser } from "../thunks/userThunks";

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setClearUsersInfo(state) {
            usersAdapter.removeAll(state); // xóa toàn bộ users trong state
            state.selectedUser = undefined;
            state.loading = false;
            state.error = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            // --- FETCH ALL USERS ---
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                usersAdapter.setAll(state, action.payload); // set tất cả users
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string ?? "Lỗi hệ thống";
            })

            // --- CREATE USER ---
            .addCase(handleCreateUser.fulfilled, (state, action) => {
                usersAdapter.addOne(state, action.payload); // thêm user mới vào state
            })
            .addCase(handleCreateUser.rejected, (state, action) => {
                state.error = action.payload as string ?? "Tạo user thất bại";
            })

            // --- REMOVE USER ---
            .addCase(handleRemoveUser.fulfilled, (state, action) => {
                usersAdapter.removeOne(state, action.payload); // action.payload = id của user
            })
            .addCase(handleRemoveUser.rejected, (state, action) => {
                state.error = action.payload as string ?? "Xóa user thất bại";
            })

            // --- GET USER BY ID ---
            .addCase(handleFindUserById.fulfilled, (state, action) => {
                state.selectedUser = action.payload; // lưu user chi tiết
            })
            .addCase(handleFindUserById.rejected, (state, action) => {
                state.error = action.payload as string ?? "Lấy user thất bại";
            })

            // --- PUT UPDATE USER ---
            .addCase(handleUpdateUser.fulfilled, (state, action) => {
                // Cập nhật vào danh sách user
                usersAdapter.upsertOne(state, action.payload);

                // Nếu đang xem chi tiết user -> cập nhật luôn
                state.selectedUser = action.payload;
            })
            .addCase(handleUpdateUser.rejected, (state, action) => {
                state.error = (action.payload as string) ?? "Cập nhật người dùng thất bại";
            });
    }
});

export const { setClearUsersInfo } = userSlice.actions;
export default userSlice.reducer;
