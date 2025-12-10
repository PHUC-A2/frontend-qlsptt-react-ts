// permissionSelectors.ts
import { permissionsAdapter } from "../adapters/permissionAdapter";
import type { RootState } from "../store";

export const permissionSelectors = permissionsAdapter.getSelectors<RootState>(
    (state) => state.permission
);
