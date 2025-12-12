export interface IRole {
    id: number;
    name: string;
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