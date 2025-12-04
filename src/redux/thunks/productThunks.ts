import { createAsyncThunk } from "@reduxjs/toolkit";
import { createProduct, getAllProducts } from "../../config/Api";
import type { ICreateProductReq } from "../../types/product";

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
            return rejectWithValue(error?.response?.data?.message || "Lỗi hệ thống");
        }
    }
);

export const handleCreateProduct = createAsyncThunk(
    'product/createProduct',
    async (data: ICreateProductReq, { rejectWithValue }) => {
        try {
            const res = await createProduct(data);
            if (res.data?.status === 201) {
                return res.data?.data;
            }
            return rejectWithValue("Lấy người dùng thất bại");
        } catch (error: any) {
            console.log("Lỗi hệ thống: ", error);
            return rejectWithValue(error?.response?.data?.message || "Lỗi hệ thống");
        }
    }
);