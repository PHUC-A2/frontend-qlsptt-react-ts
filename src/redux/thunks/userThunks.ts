// src/redux/thunks/userThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../../config/Api";
import type { ICreateUserReq, IUpdateUserReq } from "../../types/backend";

export const fetchUsers = createAsyncThunk(
    'user/fetchUsers',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAllUsers();
            if (res.data?.status === 200) {
                return res.data?.data || [];
            }
            return rejectWithValue("Lấy người dùng thất bại");
        } catch (error: any) {
            console.log("Lỗi hệ thống: ", error);
            return rejectWithValue("Lỗi hệ thống");
        }
    }
)

export const handleCreateUser = createAsyncThunk(
    'user/createUser',
    async (data: ICreateUserReq, { rejectWithValue }) => {
        try {
            const res = await createUser(data);
            if (res.data?.status === 201) {
                return res.data?.data;
            }
            return rejectWithValue("Tạo người dùng thất bại");
        } catch (error: any) {
            console.log("Lỗi hệ thống: ", error);
            return rejectWithValue(error?.response?.data?.message);
        }
    }
)


export const handleRemoveUser = createAsyncThunk(
    'user/deleteUser',
    async (id: number, { rejectWithValue }) => {
        try {
            const res = await deleteUser(id);
            if (res.data?.status === 200) {
                return id;;
            }
            return rejectWithValue("Xóa người dùng thất bại");
        } catch (error: any) {
            console.log("Lỗi hệ thống: ", error);
            return rejectWithValue(error?.response?.data?.message);
        }
    }
)

export const handleFindUserById = createAsyncThunk(
    'user/findUserById',
    async (id: number, { rejectWithValue }) => {
        try {
            const res = await getUserById(id);
            if (res.data?.status === 200) {
                return res.data?.data;
            }
            return rejectWithValue("Lấy người dùng thất bại");
        } catch (error: any) {
            console.log("Lỗi hệ thống: ", error);
            return rejectWithValue(error?.response?.data?.message);
        }
    }
)

export const handleUpdateUser = createAsyncThunk(
    'user/updateUser',
    async ({ id, data }: { id: number; data: IUpdateUserReq }, { rejectWithValue }) => {
        try {
            const res = await updateUser(id, data);
            if (res.data?.status === 200) {
                return res.data?.data;
            }
            return rejectWithValue("Cập nhật người dùng thất bại");
        } catch (error: any) {
            console.log("Lỗi hệ thống: ", error);
            return rejectWithValue(error?.response?.data?.message);
        }
    }
)