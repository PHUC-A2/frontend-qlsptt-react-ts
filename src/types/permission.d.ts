export interface IPermission {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface ICreatePermissionReq {
    id: number;
    name: string;
    description: string;
}

export interface IUpdatePermissionReq {
    id: number;
    name: string;
    description: string;
}