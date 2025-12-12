import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { Form, Input } from 'antd';
import { useAppDispatch } from '../../../../redux/hooks';
import type { ICreateRoleReq } from '../../../../types/role';
import { handleCreateRole } from '../../../../redux/thunks/roleThunks';

interface IProps {
    openModalAddRole: boolean;
    setOpenModalAddRole: (v: boolean) => void;
}

const AdminModalAddRole = (props: IProps) => {
    const { openModalAddRole, setOpenModalAddRole } = props;
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const handleAddRole = async (data: ICreateRoleReq) => {
        try {

            await dispatch(handleCreateRole(data)).unwrap();
            toast.success("Tạo mới role thành công");
            setOpenModalAddRole(false);
            form.resetFields();
        } catch (error: any) {
            toast.error(error || "Lỗi khi tạo role");
        }
    };

    return (
        <Modal
            title="Tạo mới vai trò"
            maskClosable={false}
            closable={true}
            open={openModalAddRole}
            okText="Save"
            onOk={() => form.submit()}
            onCancel={() => setOpenModalAddRole(false)}
        >
            <hr />

            <Form
                form={form}
                onFinish={handleAddRole}
                layout='vertical'
                autoComplete="off"
            >
                <Form.Item
                    label="Tên vai trò"
                    name="name"
                    rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AdminModalAddRole;
