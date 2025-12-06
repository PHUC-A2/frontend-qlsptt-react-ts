import { useEffect } from "react";
import { toast } from "react-toastify";
import { getAllProducts } from "../../config/Api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { setClearProductsInfo } from "../../redux/features/productSlice";
import { fetchProducts } from "../../redux/thunks/productThunks";

export const useProductInit = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    useEffect(() => {
        const init = async () => {

            try {
                // nếu đã login
                if (isAuthenticated) {
                    const res = await getAllProducts();
                    if (res.data?.status === 200) {
                        await dispatch(fetchProducts()).unwrap();
                    }
                }

                // nếu logout thì xóa product
                // if (!isAuthenticated) {
                //     dispatch(setClearProductsInfo());
                // }

            } catch (error: any) {
                toast.error('Chưa đăng nhập')
            }
        }

        // gọi hàm
        init();
    }, [dispatch, isAuthenticated])
}