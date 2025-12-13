// src/utils/constants/permissions.constants.ts

export const LIST_PERMISSION = [
    {
        group: "Users",
        items: [
            { name: "GET_USER", description: "Xem tất cả user" },
            { name: "GET_USER_DETAIL", description: "Xem chi tiết user" },
            { name: "POST_USER", description: "Tạo user mới" },
            { name: "PUT_USER", description: "Cập nhật user" },
            { name: "DELETE_USER", description: "Xóa user" },
            { name: "PUT_ASSIGN_ROLE", description: "Gán role cho user" },
        ],
    },
    {
        group: "Roles",
        items: [
            { name: "GET_ROLE", description: "Xem danh sách role" },
            { name: "GET_ROLE_DETAIL", description: "Xem chi tiết role" },
            { name: "POST_ROLE", description: "Tạo role mới" },
            { name: "PUT_ROLE", description: "Cập nhật role" },
            { name: "DELETE_ROLE", description: "Xóa role" },
            { name: "POST_ASSIGN_PERMISSION", description: "Gán permission cho role" },
        ],
    },
    {
        group: "Permissions",
        items: [
            { name: "GET_PERMISSION", description: "Xem danh sách permission" },
            { name: "GET_PERMISSION_DETAIL", description: "Xem chi tiết permission" },
            { name: "POST_PERMISSION", description: "Tạo permission mới" },
            { name: "PUT_PERMISSION", description: "Cập nhật permission" },
            { name: "DELETE_PERMISSION", description: "Xóa permission" },
        ],
    },
    {
        group: "Products",
        items: [
            { name: "GET_PRODUCT", description: "Xem danh sách sản phẩm" },
            { name: "GET_PRODUCT_DETAIL", description: "Xem chi tiết sản phẩm" },
            { name: "POST_PRODUCT", description: "Tạo sản phẩm mới" },
            { name: "PUT_PRODUCT", description: "Cập nhật sản phẩm" },
            { name: "DELETE_PRODUCT", description: "Xóa sản phẩm" },
        ],
    },
] as const;

// Tạo type-safe PermissionKey từ LIST_PERMISSION
export type PermissionKey =
    typeof LIST_PERMISSION[number]['items'][number]['name'];

// Optional: helper lấy permission theo group
export const getPermissionsByGroup = (
    group: typeof LIST_PERMISSION[number]['group']
): PermissionKey[] =>
    LIST_PERMISSION.find(g => g.group === group)?.items.map(i => i.name) ?? [];
