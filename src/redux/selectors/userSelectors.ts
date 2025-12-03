// userSelectors.ts
import { usersAdapter } from "../adapters/userAdapter";
import type { RootState } from "../store";

export const userSelectors = usersAdapter.getSelectors<RootState>(
    (state) => state.user
);
