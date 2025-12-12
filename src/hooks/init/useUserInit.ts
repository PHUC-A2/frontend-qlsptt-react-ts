import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUsers } from "../../redux/thunks/userThunks";
import { setClearUsersInfo } from "../../redux/features/userSlice";
import { usePermission } from "../common/usePermission";

export const useUserInit = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
   const canGetUser = usePermission("GET_USER");
    useEffect(() => {
        const init = async () => {

            try {
                // nếu đã login
                if (isAuthenticated) {
                    // nếu có quyền GET_USER thì mới fetch
                    if (canGetUser) {
                        await dispatch(fetchUsers()).unwrap();
                    }
                }

                // nếu logout thì xóa user
                if (!isAuthenticated) {
                    dispatch(setClearUsersInfo());
                }

            } catch (error: any) {
                const m = error?.response?.data?.message;
                console.log(m);
                toast.error(m || "Chưa đăng nhập");
            }
        }

        // gọi hàm
        init();
    }, [dispatch, isAuthenticated])
}