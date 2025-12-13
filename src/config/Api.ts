import type { IRegisterReq } from "../types/auth";
import type { ICreatePermissionReq, IUpdatePermissionReq } from "../types/permission";
import type { ICreateProductReq, IUpdateProductReq } from "../types/product";
import type { IAssignPermissionReq, ICreateRoleReq, IUpdateRoleReq } from "../types/role";
import type { IUploadFile, IUploadResponse } from "../types/upload";
import type { IAssignRoleReq, ICreateUserReq, IUpdateUserReq } from "../types/user";
import instance from "./customAxios";

/* api auth  */
export const login = (email: string, password: string) => instance.post("/api/v1/auth/login", { email, password });
export const logout = () => instance.post("/api/v1/auth/logout");
export const register = (data: IRegisterReq) => instance.post("/api/v1/auth/register", data);
export const profile = () => instance.get("/api/v1/auth/profile");
export const getRefreshToken = () => instance.get("/api/v1/auth/refresh");


/* api user */
export const getAllUsers = () => instance.get(`api/v1/users`);
export const createUser = (data: ICreateUserReq) => instance.post(`api/v1/users`, data);
export const deleteUser = (id: number) => instance.delete(`api/v1/users/${id}`);
export const getUserById = (id: number) => instance.get(`api/v1/users/${id}`);
export const updateUser = (id: number, data: IUpdateUserReq) => instance.put(`api/v1/users/${id}`, data);


/* api product */
export const getAllProducts = () => instance.get(`api/v1/products`);
export const createProduct = (data: ICreateProductReq) => instance.post(`api/v1/products`, data);
export const deleteProduct = (id: number) => instance.delete(`api/v1/products/${id}`);
export const getProductById = (id: number) => instance.get(`api/v1/products/${id}`);
export const updateProduct = (id: number, data: IUpdateProductReq) => instance.put(`api/v1/products/${id}`, data);

/* api permission */
export const getAllPermissions = () => instance.get(`api/v1/permissions`);
export const createPermission = (data: ICreatePermissionReq) => instance.post(`api/v1/permissions`, data);
export const updatePermission = (id: number, data: IUpdatePermissionReq) => instance.put(`api/v1/permissions/${id}`, data);
export const deletePermission = (id: number) => instance.delete(`api/v1/permissions/${id}`);
export const getPermissionById = (id: number) => instance.get(`api/v1/permissions/${id}`);

/* api role */
export const getAllRoles = () => instance.get(`api/v1/roles`);
export const createRole = (data: ICreateRoleReq) => instance.post(`api/v1/roles`, data);
export const updateRole = (id: number, data: IUpdateRoleReq) => instance.put(`api/v1/roles/${id}`, data);
export const deleteRole = (id: number) => instance.delete(`api/v1/roles/${id}`);
export const getRoleById = (id: number) => instance.get(`api/v1/roles/${id}`);

/* api gắn permission cho role */
// /api/v1/roles/roleId/assign-permissions
export const assignPermission = (id: number, data: IAssignPermissionReq) => instance.post(`api/v1/roles/${id}/assign-permissions`, data);

/* api gắn role cho user */
// /api/v1/users/userId/assign-roles
export const assignRole = (id: number, data: IAssignRoleReq) => instance.put(`api/v1/users/${id}/assign-roles`, data);

// client
export const getProductDetails = (id: number) => instance.get(`api/v1/products/${id}`);


/* upload */
export const uploadImageProduct = async (file: File): Promise<IUploadFile> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "products");

    const { data } = await instance.post<IUploadResponse>(
        "/api/v1/files/upload",
        formData,
        {
            headers: { "Content-Type": "multipart/form-data" }
        }
    );

    return data.data; // chỉ lấy phần data
};
