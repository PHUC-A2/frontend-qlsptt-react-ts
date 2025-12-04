// ============= FILE===========
export interface IUploadFile {
    fileName: string;
    uploadedAt: string;
    url: string;
}

export interface IUploadResponse {
    status: number;
    message: string;
    data: IUploadFile;
}
