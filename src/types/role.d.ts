export interface IRole {
    id: number;
    name: string;
    // danh sách tên permissions
    permissions: string[];
    created_at: string;
    updated_at: string;
}


export interface ICreateRoleReq {
    id: number;
    name: string;
}

export interface IUpdateRoleReq {
    id: number;
    name: string;
}

export interface IAssignPermissionReq {
    permission_ids: number[];
}