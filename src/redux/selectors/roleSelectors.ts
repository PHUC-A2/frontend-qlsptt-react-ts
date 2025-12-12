// permissionSelectors.ts
import { rolesAdapter } from "../adapters/roleAdapter";
import type { RootState } from "../store";

export const roleSelectors = rolesAdapter.getSelectors<RootState>(
    (state) => state.role
);
