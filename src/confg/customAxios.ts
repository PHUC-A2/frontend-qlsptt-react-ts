import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true, // bắt buộc nếu refresh_token nằm trong cookie
});

// Gắn access token vào request
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Intercept response
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                //  DÙNG instance thay vì axios
                const res = await instance.get("/api/v1/auth/refresh");

                const newToken = res.data?.access_token;

                if (newToken) {
                    localStorage.setItem("access_token", newToken);

                    originalRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newToken}`;

                    return instance(originalRequest);
                }
            } catch (err) {
                console.error("Refresh failed", err);
            }
        }

        return Promise.reject(error);
    }
);

export default instance;
