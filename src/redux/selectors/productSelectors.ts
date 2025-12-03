// productSelectors.ts
import { productsAdapter } from "../adapters/productAdapter";
import type { RootState } from "../store";

export const productSelectors = productsAdapter.getSelectors<RootState>(
    (state) => state.product
);
