import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchRoles } from "../../redux/thunks/roleThunks";

export const useRoleInit = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    useEffect(() => {
        const init = async () => {

            try {
                // nếu đã login
                if (isAuthenticated) {
                    await dispatch(fetchRoles()).unwrap();
                }

                // nếu logout thì xóa role
                // if (!isAuthenticated) {
                //     dispatch(setClearRolesInfo());
                // }

            } catch (error: any) {
                toast.error('Chưa đăng nhập')
            }
        }

        // gọi hàm
        init();
    }, [dispatch, isAuthenticated])
}