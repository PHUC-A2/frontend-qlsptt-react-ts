export interface IProduct {
    id: number;
    name: string;
    image_url: string;
    description: string;
    type: string;
    price: number;
    quantity: number;
    created_at: string;
    updated_at: string;
}

export interface ICreateProductReq {
    name: string;
    image_url: string;
    description: string;
    type: string;
    price: number;
    quantity: number;
}

export interface IUpdateProductReq {
    name: string;
    image_url: string;
    description: string;
    type: string;
    price: number;
    quantity: number;
}