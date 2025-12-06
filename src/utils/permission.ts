// utils/permission.ts
import type { IProfile } from "../types/profile";

// Danh sách các role luôn full quyền
const FULL_ACCESS_ROLES = ["ADMIN", "SUPER_ADMIN"];

export const hasPermission = (profile: IProfile | null, required: string | string[]): boolean => {
    if (!profile) return false;

    // Nếu user có ít nhất 1 role full quyền → full quyền
    if (profile.roles?.some(role => FULL_ACCESS_ROLES.includes(role))) return true;

    // Chuyển required thành mảng nếu chỉ là string
    const requiredPerms = Array.isArray(required) ? required : [required];

    // Lấy tất cả permissions của user (từ profile.permissions và roles_detail)
    const userPerms = new Set<string>();

    // Thêm permissions trực tiếp từ user
    profile.permissions?.forEach(p => userPerms.add(p));

    // Thêm permissions từ roles_detail
    profile.roles_detail?.forEach(role => role.permissions?.forEach(p => userPerms.add(p)));

    // Check nếu có ít nhất 1 permission trùng với required
    return requiredPerms.some(p => userPerms.has(p));
};
