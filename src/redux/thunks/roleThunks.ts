import { createAsyncThunk } from "@reduxjs/toolkit";
import { createRole, deleteRole, getAllRoles, getRoleById, updateRole } from "../../config/Api";
import type { ICreateRoleReq, IUpdateRoleReq } from "../../types/role";

export const fetchRoles = createAsyncThunk(
    'role/fetchRole',
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAllRoles();
            if (res.data?.status === 200) {
                return res.data?.data || [];
            }
            return rejectWithValue("Lấy role thất bại");
        } catch (error: any) {
            console.log("Lỗi hệ thống: ", error);
            return rejectWithValue(error?.response?.data?.message || "Lỗi hệ thống");
        }
    }
)

export const handleCreateRole = createAsyncThunk(
    'role/createRole',
    async (data: ICreateRoleReq, { rejectWithValue }) => {
        try {
            const res = await createRole(data);
            if (res.data?.status === 201) {
                return res.data?.data;
            }
            return rejectWithValue("Tạo role thất bại");
        } catch (error: any) {
            console.log("Lỗi hệ thống: ", error);
            return rejectWithValue(error?.response?.data?.message || "Lỗi hệ thống");
        }
    }
)


export const handleRemoveRole = createAsyncThunk(
    'role/deleteRole',
    async (id: number, { rejectWithValue }) => {
        try {
            const res = await deleteRole(id);
            if (res.data?.status === 200) {
                return id;;
            }
            return rejectWithValue("Xóa role thất bại");
        } catch (error: any) {
            console.log("Lỗi hệ thống: ", error);
            return rejectWithValue(error?.response?.data?.message || "Lỗi hệ thống");
        }
    }
)

export const handleFindRoleById = createAsyncThunk(
    'role/findRoleById',
    async (id: number, { rejectWithValue }) => {
        try {
            const res = await getRoleById(id);
            if (res.data?.status === 200) {
                return res.data?.data;
            }
            return rejectWithValue("Lấy role thất bại");
        } catch (error: any) {
            console.log("Lỗi hệ thống: ", error);
            return rejectWithValue(error?.response?.data?.message || "Lỗi hệ thống");
        }
    }
)

export const handleUpdateRole = createAsyncThunk(
    'role/updateRole',
    async ({ id, data }: { id: number; data: IUpdateRoleReq }, { rejectWithValue }) => {
        try {
            const res = await updateRole(id, data);
            if (res.data?.status === 200) {
                return res.data?.data;
            }
            return rejectWithValue("Cập nhật role thất bại");
        } catch (error: any) {
            console.log("Lỗi hệ thống: ", error);
            return rejectWithValue(error?.response?.data?.message || "Lỗi hệ thống");
        }
    }
)