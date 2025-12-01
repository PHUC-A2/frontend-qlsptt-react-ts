// src/redux/thunks/userThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUser, getAllUsers } from "../../config/Api";
import type { ICreateUserReq } from "../../types/backend";
import { toast } from "react-toastify";

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
            return rejectWithValue("Lỗi hệ thống");
            console.log("Lỗi hệ thống: ", error);
        }
    }
)

export const handleCreateUser = createAsyncThunk(
    'user/createUser',
    async (data: ICreateUserReq, { rejectWithValue }) => {
        try {
            const res = await createUser(data);
            if (res.data?.status === 201) {
                toast.success(res.data?.message);
                return res.data?.data;
            }
            return rejectWithValue("Tạo người dùng thất bại");
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data?.message);
            console.log("Lỗi hệ thống: ", error);
        }
    }
)