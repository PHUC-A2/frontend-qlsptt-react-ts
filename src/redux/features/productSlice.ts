import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../adapters/productAdapter";
import { fetchProducts, handleCreateProduct } from "../thunks/productThunks";
import { productsAdapter } from "../adapters/productAdapter";

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setClearProductsInfo(state) {
            productsAdapter.removeAll(state); // xóa toàn bộ products trong state
            state.selectedProduct = undefined;
            state.loading = false;
            state.error = undefined;
        }
    },
    extraReducers: (builder) => {
        builder
            // --- FETCH ALL PRODUCTS ---
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                productsAdapter.setAll(state, action.payload); // set tất cả products
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string ?? "Lỗi hệ thống";
            })

            // --- CREATE PRODUCT ---
            .addCase(handleCreateProduct.fulfilled, (state, action) => {
                productsAdapter.addOne(state, action.payload); // thêm product mới vào state
            })
            .addCase(handleCreateProduct.rejected, (state, action) => {
                state.error = action.payload as string ?? "Tạo sản phẩm thất bại";
            })

        // // --- REMOVE USER ---
        // .addCase(handleRemoveUser.fulfilled, (state, action) => {
        //     usersAdapter.removeOne(state, action.payload); // action.payload = id của user
        // })
        // .addCase(handleRemoveUser.rejected, (state, action) => {
        //     state.error = action.payload as string ?? "Xóa user thất bại";
        // })

        // // --- GET USER BY ID ---
        // .addCase(handleFindUserById.fulfilled, (state, action) => {
        //     state.selectedUser = action.payload; // lưu user chi tiết
        // })
        // .addCase(handleFindUserById.rejected, (state, action) => {
        //     state.error = action.payload as string ?? "Lấy user thất bại";
        // })

        // // --- PUT UPDATE USER ---
        // .addCase(handleUpdateUser.fulfilled, (state, action) => {
        //     // Cập nhật vào danh sách user
        //     usersAdapter.upsertOne(state, action.payload);

        //     // Nếu đang xem chi tiết user -> cập nhật luôn
        //     state.selectedUser = action.payload;
        // })
        // .addCase(handleUpdateUser.rejected, (state, action) => {
        //     state.error = (action.payload as string) ?? "Cập nhật người dùng thất bại";
        // });
    }
});

export const { setClearProductsInfo } = productSlice.actions;
export default productSlice.reducer;
