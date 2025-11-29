import instance from "./customAxios";

/* api auth  */
export const login = (email: string, password: string) =>
    instance.post("/api/v1/auth/login", { email, password });
