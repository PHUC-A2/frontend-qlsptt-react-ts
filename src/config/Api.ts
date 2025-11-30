import type { IRegisterReq } from "../types/backend";
import instance from "./customAxios";

/* api auth  */
export const login = (email: string, password: string) => instance.post("/api/v1/auth/login", { email, password });
export const logout = () => instance.post("/api/v1/auth/logout");
export const register = (data: IRegisterReq) => instance.post("/api/v1/auth/register",data);

export const getRefreshToken = () => instance.get("/api/v1/auth/refresh");
