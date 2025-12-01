// src/redux/thunks/userThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers } from "../../config/Api";

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