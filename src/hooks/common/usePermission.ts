// hooks/usePermission.ts

import { useAppSelector } from "../../redux/hooks";
import { hasPermission } from "../../utils/permission";

/**
 * usePermission giúp kiểm tra quyền của user.
 * @param required string hoặc array các permission cần thiết
 * @returns true nếu user có ít nhất 1 quyền, false nếu không
 */
export const usePermission = (required: string | string[]): boolean => {
    const profile = useAppSelector(state => state.profile.profile);
    return hasPermission(profile, required);
};
