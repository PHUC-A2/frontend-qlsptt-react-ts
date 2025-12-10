import { createEntityAdapter, type EntityState } from "@reduxjs/toolkit";
import type { IPermission } from "../../types/permission";

// EntityState cần 2 generic: <T, Id>
export interface PermissionState extends EntityState<IPermission, number> {
    loading: boolean;
    error?: string;
    selectedPermission?: IPermission;
}

// Adapter chuẩn, bỏ selectId nếu field id là "id"
export const permissionsAdapter = createEntityAdapter<IPermission>();

// initialState chuẩn
export const initialState: PermissionState = permissionsAdapter.getInitialState({
    loading: false,
    error: undefined,
    selectedPermission: undefined
});
