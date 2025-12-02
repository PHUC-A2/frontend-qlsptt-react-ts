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
    emailVerifiedAt: string | null;
    createdAt: string;
    createdBy: string;
}

// create user
export interface ICreateUserReq {
    name: string;
    email: string;
    password: string;
}