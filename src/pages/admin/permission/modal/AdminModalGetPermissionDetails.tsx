import { Descriptions, Drawer } from "antd";
import dayjs from "dayjs";
import type { IPermission } from "../../../../types/permission";
interface IProps {
    setOpenModalGetPermissionDetails: (v: boolean) => void;
    openModalGetPermissionDetails: boolean;
    permission: IPermission | null;
    setPermission: React.Dispatch<React.SetStateAction<IPermission | null>>;
}

const AdminModalGetPermissionDetails = (props: IProps) => {

    const { openModalGetPermissionDetails, setOpenModalGetPermissionDetails, permission, setPermission } = props;
    const onClose = () => {
        setOpenModalGetPermissionDetails(false);
        setPermission(null);
    }
    return (
        <Drawer
            title="Chi tiết quyền hạn"
            placement="right"
            closable={false}
            onClose={onClose}
            open={openModalGetPermissionDetails}
        >
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
        </Drawer>
    )
}

export default AdminModalGetPermissionDetails;