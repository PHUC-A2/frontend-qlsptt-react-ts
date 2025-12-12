import { Descriptions, Drawer, Tag } from "antd";
import dayjs from "dayjs";
import type { IRole } from "../../../../types/role";
interface IProps {
    setOpenModalGetRoleDetails: (v: boolean) => void;
    openModalGetRoleDetails: boolean;
    role: IRole | null;
    setRole: React.Dispatch<React.SetStateAction<IRole | null>>;
}

const AdminModalGetRoleDetails = (props: IProps) => {

    const { openModalGetRoleDetails, setOpenModalGetRoleDetails, role, setRole } = props;
    const onClose = () => {
        setOpenModalGetRoleDetails(false);
        setRole(null);
    }
    return (
        <Drawer
            title="Chi tiết vai trò"
            placement="right"
            closable={false}
            onClose={onClose}
            open={openModalGetRoleDetails}
        >
            <Descriptions bordered column={1} size="small">
                <Descriptions.Item label="ID">{role?.id}</Descriptions.Item>
                <Descriptions.Item label="Tên">{role?.name ?? "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Quyền">
                    {role?.permissions?.length ? (
                        role.permissions.map((p) => (
                            <Tag color="blue" key={p}>
                                {p}
                            </Tag>
                        ))
                    ) : (
                        "N/A"
                    )}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày tạo">
                    {role?.created_at ? dayjs(role.created_at).format("DD/MM/YYYY HH:mm:ss") : "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Ngày cập nhật">
                    {role?.updated_at ? dayjs(role.updated_at).format("DD/MM/YYYY HH:mm:ss") : "N/A"}
                </Descriptions.Item>
            </Descriptions>
        </Drawer>
    )
}

export default AdminModalGetRoleDetails;