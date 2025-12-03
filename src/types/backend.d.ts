// login
export interface ILogin {
    email: string;
    password: string;
}

export interface IRegisterReq {
    name: string;
    email: string;
    password: string;
}

// user
export interface IUser {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

// create user
export interface ICreateUserReq {
    name: string;
    email: string;
    password: string;
}

// update user
export interface IUpdateUserReq {
    name: string;
    email: string;
}