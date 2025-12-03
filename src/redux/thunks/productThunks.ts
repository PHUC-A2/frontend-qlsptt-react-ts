import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "../../config/Api";

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAllProducts();
            if (res.data?.status === 200) {
                return res.data?.data || [];
            }
            return rejectWithValue("Lấy người dùng thất bại");
        } catch (error: any) {
            console.log("Lỗi hệ thống: ", error);
            return rejectWithValue("Lỗi hệ thống");
        }
    }
);