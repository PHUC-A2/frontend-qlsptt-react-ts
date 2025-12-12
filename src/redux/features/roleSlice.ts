import { createSlice } from "@reduxjs/toolkit";
import { initialState, rolesAdapter } from "../adapters/roleAdapter";
import { fetchRoles, handleCreateRole, handleFindRoleById, handleRemoveRole, handleUpdateRole } from "../thunks/roleThunks";

const roleSlice = createSlice({
    name: "role",
    initialState,
    reducers: {
        setClearRolesInfo(state) {
            rolesAdapter.removeAll(state); // xóa toàn bộ roles trong state
            state.selectedRole = undefined;
            state.loading = false;
            state.error = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            // --- FETCH ALL ROLE ---
            .addCase(fetchRoles.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.loading = false;
                rolesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string ?? "Lỗi hệ thống";
            })

            // --- CREATE ROLE ---
            .addCase(handleCreateRole.fulfilled, (state, action) => {
                rolesAdapter.addOne(state, action.payload); // thêm role mới vào state
            })
            .addCase(handleCreateRole.rejected, (state, action) => {
                state.error = action.payload as string ?? "Tạo role thất bại";
            })

            // --- REMOVE ROLE ---
            .addCase(handleRemoveRole.fulfilled, (state, action) => {
                rolesAdapter.removeOne(state, action.payload); // action.payload = id của role
            })
            .addCase(handleRemoveRole.rejected, (state, action) => {
                state.error = action.payload as string ?? "Xóa role thất bại";
            })

            // --- GET ROLE BY ID ---
            .addCase(handleFindRoleById.fulfilled, (state, action) => {
                state.selectedRole = action.payload; // lưu role chi tiết
            })
            .addCase(handleFindRoleById.rejected, (state, action) => {
                state.error = action.payload as string ?? "Lấy role thất bại";
            })

            // --- PUT UPDATE ROLE ---
            .addCase(handleUpdateRole.fulfilled, (state, action) => {
                // Cập nhật vào danh sách role
                rolesAdapter.upsertOne(state, action.payload);

                // Nếu đang xem chi tiết role -> cập nhật luôn
                state.selectedRole = action.payload;
            })
            .addCase(handleUpdateRole.rejected, (state, action) => {
                state.error = (action.payload as string) ?? "Cập nhật role thất bại";
            });
    }
});

export const { setClearRolesInfo } = roleSlice.actions;
export default roleSlice.reducer;
