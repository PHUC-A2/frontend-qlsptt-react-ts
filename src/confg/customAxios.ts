import axios from "axios";
import { axiosRaw } from "./customRaw";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true, // bắt buộc nếu refresh_token nằm trong cookie
});

// Gắn access token vào request áp dụng cho mọi endpoint
// Thêm Authorization trong request interceptor
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token && config.headers) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
});

// Response interceptor: xử lý khi token hết hạn
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Nếu API trả về 401 (token hết hạn) và chưa retry
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const token = localStorage.getItem("access_token");

                // Gọi API refresh token
                // const res = await instance.get("/api/v1/auth/refresh", {
                //     headers: { Authorization: `Bearer ${token}` },
                // });

                // Dùng axiosRaw (NO interceptor)
                const res = await axiosRaw.get("/api/v1/auth/refresh", {
                    headers: { Authorization: `Bearer ${token}` },
                });


                const newToken = res.data?.access_token;
                if (newToken) {
                    // Lưu lại token mới
                    localStorage.setItem("access_token", newToken);

                    // Gắn vào header và gọi lại request cũ
                    originalRequest.headers = {
                        ...originalRequest.headers,
                        Authorization: `Bearer ${newToken}`,
                    };
                    return instance(originalRequest);
                }
            } catch (err) {
                console.error("Refresh token failed", err);
                // Nếu refresh cũng fail thì logout
                localStorage.removeItem("access_token");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);


export default instance;
