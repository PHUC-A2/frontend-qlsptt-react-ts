import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../adapters/productAdapter";
import { fetchProducts, handleCreateProduct, handleFindProductById, handleRemoveProduct, handleUpdateProduct } from "../thunks/productThunks";
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

            // --- REMOVE PRODUCT ---
            .addCase(handleRemoveProduct.fulfilled, (state, action) => {
                productsAdapter.removeOne(state, action.payload); // action.payload = id của product
            })
            .addCase(handleRemoveProduct.rejected, (state, action) => {
                state.error = action.payload as string ?? "Xóa sản phẩm thất bại";
            })

            // --- GET PRODUCT BY ID ---
            .addCase(handleFindProductById.fulfilled, (state, action) => {
                state.selectedProduct = action.payload; // lưu product chi tiết
            })
            .addCase(handleFindProductById.rejected, (state, action) => {
                state.error = action.payload as string ?? "Lấy product thất bại";
            })

            // --- PUT UPDATE PRODUCT ---
            .addCase(handleUpdateProduct.fulfilled, (state, action) => {
                // Cập nhật vào danh sách product
                productsAdapter.upsertOne(state, action.payload);

                // Nếu đang xem chi tiết product -> cập nhật luôn
                state.selectedProduct = action.payload;
            })
            .addCase(handleUpdateProduct.rejected, (state, action) => {
                state.error = (action.payload as string) ?? "Cập nhật sản phẩm thất bại";
            });
    }
});

export const { setClearProductsInfo } = productSlice.actions;
export default productSlice.reducer;
