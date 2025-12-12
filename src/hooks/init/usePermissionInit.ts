import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchPermissions } from "../../redux/thunks/permissionThunks";
import { usePermission } from "../common/usePermission";

export const usePermissionInit = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const canGetPermission = usePermission("GET_PERMISSION");

    useEffect(() => {
        const init = async () => {

            try {
                // nếu đã login
                if (isAuthenticated) {
                    // nêu có quyền GET_PERMISSION mới fetch
                    if (canGetPermission) {
                        await dispatch(fetchPermissions()).unwrap();
                    }
                }

                // nếu logout thì xóa permission
                // if (!isAuthenticated) {
                //     dispatch(setClearPermissionsInfo());
                // }

            } catch (error: any) {
                toast.error('Chưa đăng nhập')
            }
        }

        // gọi hàm
        init();
    }, [dispatch, isAuthenticated])
}