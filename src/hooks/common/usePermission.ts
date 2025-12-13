import { useAppSelector } from "../../redux/hooks";
import { hasPermission } from "../../utils/permission";
import type { PermissionKey } from "../../utils/constants/permissions.constants";

/**
 * usePermission giúp kiểm tra quyền của user.
 */
export const usePermission = (
    required: PermissionKey | PermissionKey[]
): boolean => {
    const profile = useAppSelector(state => state.profile.profile);
    return hasPermission(profile, required);
};
