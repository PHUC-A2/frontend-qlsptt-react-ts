import { Descriptions, Drawer, Spin, Tag } from "antd";
import type { IUser } from "../../../../types/user";
import dayjs from "dayjs";
interface IProps {
    setOpenModalGetUserDetails: (v: boolean) => void;
    openModalGetUserDetails: boolean;
    user: IUser | null;
    loading: boolean;
}

const AdminModalGetUserDetails = (props: IProps) => {

    const { openModalGetUserDetails, setOpenModalGetUserDetails, user, loading } = props;

    return (
        <Drawer
            title="Chi tiết người dùng"
            placement="right"
            closable={false}
            onClose={() => setOpenModalGetUserDetails(false)}
            open={openModalGetUserDetails}
        >
            <Spin spinning={loading}>
                <Descriptions bordered column={1} size="small">
                    <Descriptions.Item label="ID">{user?.id}</Descriptions.Item>
                    <Descriptions.Item label="Tên">{user?.name ?? "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="Email">{user?.email ?? "N/A"}</Descriptions.Item>
                    <Descriptions.Item label="Vai trò">
                        {user?.roles?.length ? (
                            user?.roles.map((r) => (
                                <Tag color="orange" key={r}>
                                    {r}
                                </Tag>
                            ))
                        ) : (
                            "N/A"
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Quyền">
                        {user?.permissions?.length ? (
                            user.permissions.map((p) => (
                                <Tag color="blue" key={p}>
                                    {p}
                                </Tag>
                            ))
                        ) : (
                            "N/A"
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">
                        {user?.created_at ? dayjs(user.created_at).format("DD/MM/YYYY HH:mm:ss") : "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày cập nhật">
                        {user?.updated_at ? dayjs(user.updated_at).format("DD/MM/YYYY HH:mm:ss") : "N/A"}
                    </Descriptions.Item>
                </Descriptions>
            </Spin>
        </Drawer>
    )
}

export default AdminModalGetUserDetails;