import axios from "axios";
import { refreshService } from "./securityAPI.js"; 

const axiosClient = axios.create({
    baseURL: "http://localhost:8084",
    headers: {
        "Content-Type": "application/json"
    }
});

// Request Interceptor - thêm access token
axiosClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// Response Interceptor - nếu lỗi 401 HOẶC 403 → refresh → retry
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // KIỂM TRA: Nếu lỗi là 401 HOẶC 403 và chưa retry
        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");

                // Gọi API refresh token
                const newAccessToken = await refreshService(refreshToken);

                // Lưu token mới
                localStorage.setItem("token", newAccessToken.data.newAccessToken);

                // Gắn token mới vào header
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // Gọi lại API ban đầu
                return axiosClient(originalRequest);
            } catch (err) {
                console.error("Refresh token failed", err);
                // Nên xóa token cũ nếu refresh thất bại để user đăng nhập lại
                localStorage.removeItem("access token");
                localStorage.removeItem("refresh token");
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;