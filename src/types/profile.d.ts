/**
 * {
    "status": true,
    "message": "Profile information",
    "data": {
        "id": 2,
        "name": "user_01",
        "email": "user_01@gmail.com",
        "roles": [
            "STAFF"
        ],
        "permissions": [
            "GET_PRODUCT",
            "GET_PRODUCT_DETAIL",
            "CREATE_PRODUCT",
            "PUT_PRODUCT",
            "DELETE_PRODUCT"
        ],
        "roles_detail": [
            {
                "id": 3,
                "name": "STAFF",
                "permissions": [
                    "GET_PRODUCT",
                    "GET_PRODUCT_DETAIL",
                    "CREATE_PRODUCT",
                    "PUT_PRODUCT",
                    "DELETE_PRODUCT"
                ]
            }
        ]
    }
}
 * 
 */


export interface IRoleDetail {
    id: number;
    name: string;
    permissions: string[];
}

export interface IProfile {
    id: number;
    name: string;
    email: string;
    roles?: string[];
    permissions?: string[];
    roles_detail?: IRoleDetail[];
    created_at?: string;
    updated_at?: string;
}
