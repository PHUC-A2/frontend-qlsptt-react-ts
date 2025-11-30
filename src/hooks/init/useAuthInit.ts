import { useEffect } from "react";
import { toast } from "react-toastify";
import { getRefreshToken } from "../../config/Api";
import { setUserLoginInfo } from "../../redux/features/authSlice";
import { useAppDispatch } from "../../redux/hooks";

export const useAuthInit = () => {
    const dispatch = useAppDispatch();

    // xử lý khi F5 với Login (authSlice)
    // gọi getRefreshToken gắn vào localStorage

    useEffect(() => {
        const init = async () => {
            // kiểm tra nếu không có token thì bỏ qua
            const token = localStorage.getItem('access_token');
            if (!token) return;

            try {
                const res = await getRefreshToken();

                if (res?.data?.status) {
                    const newToken = res.data.access_token;

                    localStorage.setItem("access_token", newToken);

                    dispatch(setUserLoginInfo({
                        access_token: newToken,
                        message: res.data.message,
                        isAuthenticated: true
                    }));
                }

            } catch (error: any) {
                toast.error('Chưa đăng nhập')
            }

        }

        init(); // gọi hàm 
    }, [dispatch])
}