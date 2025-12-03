import { createEntityAdapter, type EntityState } from "@reduxjs/toolkit";
import type { IProduct } from "../../types/product";

export interface ProductState extends EntityState<IProduct, number> {
    loading: boolean;
    error?: string;
    selectedProduct?: IProduct;
}

export const productsAdapter = createEntityAdapter<IProduct>();
export const initialState: ProductState = productsAdapter.getInitialState({
    loading: false,
    error: undefined,
    selectedProduct: undefined
});
