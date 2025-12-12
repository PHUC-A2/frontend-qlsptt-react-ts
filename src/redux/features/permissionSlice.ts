import { createSlice } from "@reduxjs/toolkit";
import { initialState, permissionsAdapter } from "../adapters/permissionAdapter";
import { fetchPermissions, handleCreatePermission, handleFindPermissionById, handleRemovePermissison, handleUpdatePermission } from "../thunks/permissionThunks";

const permissionSlice = createSlice({
    name: "permission",
    initialState,
    reducers: {
        setClearPermissionsInfo(state) {
            permissionsAdapter.removeAll(state); // xóa toàn bộ permissions trong state
            state.selectedPermission = undefined;
            state.loading = false;
            state.error = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            // --- FETCH ALL PERMISSISON ---
            .addCase(fetchPermissions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPermissions.fulfilled, (state, action) => {
                state.loading = false;
                permissionsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchPermissions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string ?? "Lỗi hệ thống";
            })

            // --- CREATE PERMISSION ---
            .addCase(handleCreatePermission.fulfilled, (state, action) => {
                permissionsAdapter.addOne(state, action.payload); // thêm product mới vào state
            })
            .addCase(handleCreatePermission.rejected, (state, action) => {
                state.error = action.payload as string ?? "Tạo permission thất bại";
            })

            // --- REMOVE PERMISSISON ---
            .addCase(handleRemovePermissison.fulfilled, (state, action) => {
                permissionsAdapter.removeOne(state, action.payload); // action.payload = id của product
            })
            .addCase(handleRemovePermissison.rejected, (state, action) => {
                state.error = action.payload as string ?? "Xóa permission thất bại";
            })

            // --- GET PERMISSION BY ID ---
            .addCase(handleFindPermissionById.fulfilled, (state, action) => {
                state.selectedPermission = action.payload; // lưu permission chi tiết
            })
            .addCase(handleFindPermissionById.rejected, (state, action) => {
                state.error = action.payload as string ?? "Lấy permission thất bại";
            })

            // --- PUT UPDATE PERMISSION ---
            .addCase(handleUpdatePermission.fulfilled, (state, action) => {
                // Cập nhật vào danh sách permission
                permissionsAdapter.upsertOne(state, action.payload);

                // Nếu đang xem chi tiết permission -> cập nhật luôn
                state.selectedPermission = action.payload;
            })
            .addCase(handleUpdatePermission.rejected, (state, action) => {
                state.error = (action.payload as string) ?? "Cập nhật permission thất bại";
            });
    }
});

export const { setClearPermissionsInfo } = permissionSlice.actions;
export default permissionSlice.reducer;
