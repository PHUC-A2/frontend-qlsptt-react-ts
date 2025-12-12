import { createAsyncThunk } from "@reduxjs/toolkit";
import { createPermission, deletePermission,  getAllPermissions, getPermissionById, updatePermission } from "../../config/Api";
import type { ICreatePermissionReq, IUpdatePermissionReq } from "../../types/permission";

export const fetchPermissions = createAsyncThunk(
    'permission/fetchPermission',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAllPermissions();
            if (res.data?.status === 200) {
                return res.data?.data || [];
            }
            return rejectWithValue("Lấy permission thất bại");
        } catch (error: any) {
            console.log("Lỗi hệ thống: ", error);
            return rejectWithValue(error?.response?.data?.message || "Lỗi hệ thống");
        }
    }
)

export const handleCreatePermission = createAsyncThunk(
    'permission/createPermisison',
    async (data: ICreatePermissionReq, { rejectWithValue }) => {
        try {
            const res = await createPermission(data);
            if (res.data?.status === 201) {
                return res.data?.data;
            }
            return rejectWithValue("Tạo permission thất bại");
        } catch (error: any) {
            console.log("Lỗi hệ thống: ", error);
            return rejectWithValue(error?.response?.data?.message || "Lỗi hệ thống");
        }
    }
)


export const handleRemovePermissison = createAsyncThunk(
    'permission/deletePermission',
    async (id: number, { rejectWithValue }) => {
        try {
            const res = await deletePermission(id);
            if (res.data?.status === 200) {
                return id;;
            }
            return rejectWithValue("Xóa permission thất bại");
        } catch (error: any) {
            console.log("Lỗi hệ thống: ", error);
            return rejectWithValue(error?.response?.data?.message || "Lỗi hệ thống");
        }
    }
)

export const handleFindPermissionById = createAsyncThunk(
    'permission/findPermissionById',
    async (id: number, { rejectWithValue }) => {
        try {
            const res = await getPermissionById(id);
            if (res.data?.status === 200) {
                return res.data?.data;
            }
            return rejectWithValue("Lấy permission thất bại");
        } catch (error: any) {
            console.log("Lỗi hệ thống: ", error);
            return rejectWithValue(error?.response?.data?.message || "Lỗi hệ thống");
        }
    }
)

export const handleUpdatePermission = createAsyncThunk(
    'permission/updatepermission',
    async ({ id, data }: { id: number; data: IUpdatePermissionReq }, { rejectWithValue }) => {
        try {
            const res = await updatePermission(id, data);
            if (res.data?.status === 200) {
                return res.data?.data;
            }
            return rejectWithValue("Cập nhật permission thất bại");
        } catch (error: any) {
            console.log("Lỗi hệ thống: ", error);
            return rejectWithValue(error?.response?.data?.message || "Lỗi hệ thống");
        }
    }
)