// utils/permission.ts
import type { IProfile } from "../types/profile";

export const hasPermission = (
    profile: IProfile | null,
    required: string | string[]
): boolean => {

    if (!profile) return false;

    //ADMIN hoặc SUPER_ADMIN → full quyền từ backend
    if (profile.is_full_access) return true;

    const requiredPerms = Array.isArray(required) ? required : [required];

    const userPerms = new Set<string>();

    // Permissions gán trực tiếp
    profile.permissions?.forEach(p => userPerms.add(p));

    // Permissions từ roles_detail
    profile.roles_detail?.forEach(role =>
        role.permissions?.forEach(p => userPerms.add(p))
    );

    return requiredPerms.some(p => userPerms.has(p));
};
