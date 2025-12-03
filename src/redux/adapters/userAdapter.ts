import { createEntityAdapter, type EntityState } from "@reduxjs/toolkit";
import type { IUser } from "../../types/user";

// EntityState cần 2 generic: <T, Id>
export interface UserState extends EntityState<IUser, number> {
    loading: boolean;
    error?: string;
    selectedUser?: IUser;
}

// Adapter chuẩn, bỏ selectId nếu field id là "id"
export const usersAdapter = createEntityAdapter<IUser>();

// initialState chuẩn
export const initialState: UserState = usersAdapter.getInitialState({
    loading: false,
    error: undefined,
    selectedUser: undefined
});
