import { Descriptions, Drawer, Spin, Tag } from "antd";
import dayjs from "dayjs";
import type { IRole } from "../../../../types/role";
interface IProps {
    setOpenModalGetRoleDetails: (v: boolean) => void;
    openModalGetRoleDetails: boolean;
    role: IRole | null;
    loading: boolean;
}

const AdminModalGetRoleDetails = (props: IProps) => {

    const { openModalGetRoleDetails, setOpenModalGetRoleDetails, role, loading } = props;

    return (
        <Drawer
            title="Chi tiết vai trò"
            placement="right"
            closable={false}
            onClose={() => setOpenModalGetRoleDetails(false)}
            open={openModalGetRoleDetails}
        >
            <Spin spinning={loading}>
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
            </Spin>
        </Drawer>
    )
}

export default AdminModalGetRoleDetails;