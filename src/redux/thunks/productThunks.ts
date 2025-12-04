import { createAsyncThunk } from "@reduxjs/toolkit";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../../config/Api";
import type { ICreateProductReq, IUpdateProductReq } from "../../types/product";

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAllProducts();
            if (res.data?.status === 200) {
                return res.data?.data || [];
            }
            return rejectWithValue("Lấy sản phẩm thất bại");
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
            return rejectWithValue("Tạo mới sản phẩm thất bại");
        } catch (error: any) {
            console.log("Lỗi hệ thống: ", error);
            return rejectWithValue(error?.response?.data?.message || "Lỗi hệ thống");
        }
    }
);

export const handleRemoveProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id: number, { rejectWithValue }) => {
        try {
            const res = await deleteProduct(id);
            if (res.data?.status === 200) {
                return id;
            }
            return rejectWithValue("Xóa sản phẩm thất bại");
        } catch (error: any) {
            console.log("Lỗi hệ thống: ", error);
            return rejectWithValue(error?.response?.data?.message || "Lỗi hệ thống");
        }
    }
);

export const handleFindProductById = createAsyncThunk(
    'product/findProductById',
    async (id: number, { rejectWithValue }) => {
        try {
            const res = await getProductById(id);
            if (res.data?.status === 200) {
                return res.data?.data;
            }
            return rejectWithValue("Lấy sản phẩm thất bại");
        } catch (error: any) {
            console.log("Lỗi hệ thống: ", error);
            return rejectWithValue(error?.response?.data?.message || "Lỗi hệ thống");
        }
    }
);


export const handleUpdateProduct = createAsyncThunk(
    'product/updateProduct',
    async ({id,data}:{id:number,data:IUpdateProductReq}, { rejectWithValue }) => {
        try {
            const res = await updateProduct(id,data);
            if (res.data?.status === 200) {
                return res.data?.data;
            }
            return rejectWithValue("Cập nhật sản phẩm thất bại");
        } catch (error: any) {
            console.log("Lỗi hệ thống: ", error);
            return rejectWithValue(error?.response?.data?.message || "Lỗi hệ thống");
        }
    }
);