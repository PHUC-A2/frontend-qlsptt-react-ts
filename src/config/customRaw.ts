import axios from "axios";

// axios KHÔNG có interceptor
export const axiosRaw = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
});
