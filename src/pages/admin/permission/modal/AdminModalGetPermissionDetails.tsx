import { Descriptions, Drawer, Spin } from "antd";
import dayjs from "dayjs";
import type { IPermission } from "../../../../types/permission";
interface IProps {
    setOpenModalGetPermissionDetails: (v: boolean) => void;
    openModalGetPermissionDetails: boolean;
    permission: IPermission | null;
    loading: boolean;
}

const AdminModalGetPermissionDetails = (props: IProps) => {

    const { openModalGetPermissionDetails, setOpenModalGetPermissionDetails, permission, loading } = props;

    return (
        <Drawer
            title="Chi tiết quyền hạn"
            placement="right"
            closable={false}
            onClose={() => setOpenModalGetPermissionDetails(false)}
            open={openModalGetPermissionDetails}
        >
            <Spin spinning={loading}>
                <Descriptions bordered column={1} size="small">
                    <Descriptions.Item label="ID">{permission?.id}</Descriptions.Item>
                    <Descriptions.Item label="Tên">{permission?.name ?? "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="Mô tả">{permission?.description ?? "N/A"}</Descriptions.Item>

                    <Descriptions.Item label="Ngày tạo">
                        {permission?.created_at ? dayjs(permission.created_at).format("DD/MM/YYYY HH:mm:ss") : "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày cập nhật">
                        {permission?.updated_at ? dayjs(permission.updated_at).format("DD/MM/YYYY HH:mm:ss") : "N/A"}
                    </Descriptions.Item>
                </Descriptions>
            </Spin>
        </Drawer>
    )
}

export default AdminModalGetPermissionDetails;