import { createEntityAdapter, type EntityState } from "@reduxjs/toolkit";
import type { IRole } from "../../types/role";

// EntityState cần 2 generic: <T, Id>
export interface RoleState extends EntityState<IRole, number> {
    loading: boolean;
    error?: string;
    selectedRole?: IRole;
}

// Adapter chuẩn, bỏ selectId nếu field id là "id"
export const rolesAdapter = createEntityAdapter<IRole>();

// initialState chuẩn
export const initialState: RoleState = rolesAdapter.getInitialState({
    loading: false,
    error: undefined,
    selectedRole: undefined
});
