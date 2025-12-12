import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchRoles } from "../../redux/thunks/roleThunks";
import { usePermission } from "../common/usePermission";

export const useRoleInit = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const canGetRole = usePermission("GET_ROLE");
    useEffect(() => {
        const init = async () => {

            try {
                // nếu đã login
                if (isAuthenticated) {
                    // nếu có quyền GET_ROLE mới fetch
                    if (canGetRole) {
                        await dispatch(fetchRoles()).unwrap();
                    }
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