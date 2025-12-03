import { Descriptions, Drawer } from "antd";
import type { IUser } from "../../../../types/backend";
import dayjs from "dayjs";
interface IProps {
    setOpenModalGetUserDetails: (v: boolean) => void;
    openModalGetUserDetails: boolean;
    user: IUser | null;
}

const AdminModalGetUserDetails = (props: IProps) => {

    const { openModalGetUserDetails, setOpenModalGetUserDetails, user } = props;
    console.log(user);
    return (
        <Drawer
            title="User Details"
            placement="right"
            closable={false}
            onClose={() => setOpenModalGetUserDetails(false)}
            open={openModalGetUserDetails}
        >
            <Descriptions bordered column={1} size="small">
                <Descriptions.Item label="ID">{user?.id}</Descriptions.Item>
                <Descriptions.Item label="Name">{user?.name ?? "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Email">{user?.email ?? "N/A"}</Descriptions.Item>
                <Descriptions.Item label="Created At">
                    {user?.created_at ? dayjs(user.created_at).format("DD/MM/YYYY HH:mm:ss") : "N/A"}
                </Descriptions.Item>
                <Descriptions.Item label="Updated At">
                    {user?.updated_at ? dayjs(user.updated_at).format("DD/MM/YYYY HH:mm:ss") : "N/A"}
                </Descriptions.Item>
            </Descriptions>
        </Drawer>
    )
}

export default AdminModalGetUserDetails;