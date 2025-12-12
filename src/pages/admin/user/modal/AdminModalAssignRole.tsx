import { Modal, Select } from 'antd';
import { Form } from 'antd';
import { assignRole } from '../../../../config/Api';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import type { IAssignRoleReq, IUser } from '../../../../types/user';
import { roleSelectors } from '../../../../redux/selectors/roleSelectors';
import { fetchUsers } from '../../../../redux/thunks/userThunks';

interface IProps {
    openModalAssignRole: boolean;
    setOpenModalAssignRole: (v: boolean) => void;
    roleAssignRole: IUser | null;
}

const AdminModalAssignRole = (props: IProps) => {
    const { openModalAssignRole, setOpenModalAssignRole, roleAssignRole } = props;
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    //Lấy list role từ Redux
    const listRole = useAppSelector(roleSelectors.selectAll);

    const handleAssignRole = async (data: IAssignRoleReq) => {
        try {
            if (roleAssignRole?.id) {
                await assignRole(roleAssignRole.id, data);

                await dispatch(fetchUsers()).unwrap();
                toast.success("Gắn vai trò cho người dùng thành công");
                setOpenModalAssignRole(false);
                form.resetFields();
            }
        } catch (error: any) {
            const m = error?.response?.data?.message ?? "Lỗi không xác định";

            toast.error(
                <div>
                    <div><strong>Có lỗi xảy ra!</strong></div>
                    <div>{m}</div>
                </div>
            );
            console.log(error);
            console.log(m);
        }
    };

    return (
        <Modal
            title="Gắn quyền hạn cho vai trò"
            maskClosable={false}
            closable={true}
            open={openModalAssignRole}
            okText="Save"
            onOk={() => form.submit()}
            onCancel={() => setOpenModalAssignRole(false)}
        >
            <hr />

            <Form
                form={form}
                onFinish={handleAssignRole}
                layout='vertical'
                autoComplete="off"
            >
                <Form.Item
                    label="Chọn vai trò"
                    name="role_ids"
                    rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Chọn vai trò"
                        style={{ width: "100%" }}
                        options={listRole.map(p => ({
                            label: p.name,  // tên role
                            value: p.id     // id gửi backend
                        }))}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AdminModalAssignRole;
