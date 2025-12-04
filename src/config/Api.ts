import type { IRegisterReq } from "../types/auth";
import type { ICreateProductReq } from "../types/product";
import type { ICreateUserReq, IUpdateUserReq } from "../types/user";
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