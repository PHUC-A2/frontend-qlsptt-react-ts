import { useEffect } from "react";
import { toast } from "react-toastify";
import { profile } from "../../config/Api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setClearProfile, setProfile } from "../../redux/features/profileSlice";

export const useProfileInit = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    useEffect(() => {
        const init = async () => {

            try {
                // nếu đã login
                if (isAuthenticated) {
                    const res = await profile();
                    if (res.data?.status) {
                        dispatch(setProfile(res.data?.data));
                    }
                }

                // nếu logout thì xóa profile
                if (!isAuthenticated) {
                    dispatch(setClearProfile());
                }

            } catch (error: any) {
                toast.error('Chưa đăng nhập')
            }
        }

        // gọi hàm
        init();
    }, [dispatch, isAuthenticated])
}