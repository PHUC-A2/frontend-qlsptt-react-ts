import { useEffect } from "react";
import { toast } from "react-toastify";
import { getAllUsers } from "../../config/Api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUsers } from "../../redux/thunks/userThunks";
import { setClearUsersInfo } from "../../redux/features/userSlice";

export const useUserInit = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    useEffect(() => {
        const init = async () => {

            try {
                // nếu đã login
                if (isAuthenticated) {
                    const res = await getAllUsers();
                    if (res.data?.status === 200) {
                        dispatch(fetchUsers());
                    }
                }

                // nếu logout thì xóa user
                if (!isAuthenticated) {
                    dispatch(setClearUsersInfo());
                }

            } catch (error: any) {
                toast.error('Chưa đăng nhập, giỏ hàng rỗng')
            }
        }

        // gọi hàm
        init();
    }, [dispatch, isAuthenticated])
}