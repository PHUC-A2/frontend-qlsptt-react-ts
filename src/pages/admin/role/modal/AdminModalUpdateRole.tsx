import { Modal } from 'antd';
import { toast } from 'react-toastify';
import { Form, Input } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../../redux/hooks';
import type { IRole } from '../../../../types/role';
import { handleUpdateRole } from '../../../../redux/thunks/roleThunks';

interface IProps {
    openModalUpdateRole: boolean;
    setOpenModalUpdateRole: (v: boolean) => void;
    roleUpdate: IRole | null;
}

const AdminModalUpdateRole = (props: IProps) => {
    const { openModalUpdateRole, setOpenModalUpdateRole, roleUpdate } = props;
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    const handleEditRole = async () => {
        try {
            if (!roleUpdate?.id) {
                toast.error("ID role không hợp lệ");
                return;
            }
            const values = form.getFieldsValue();
            await dispatch(handleUpdateRole({
                id: roleUpdate.id,
                data: values
            })).unwrap();

            toast.success("Cập role thành công");
            setOpenModalUpdateRole(false);
            form.resetFields();
        } catch (error: any) {
            toast.error(error || "Lỗi khi cập nhật role");
        }
    };

    useEffect(() => {
        if (openModalUpdateRole && roleUpdate) {
            form.setFieldsValue({
                name: roleUpdate.name,
            });
        }
    }, [openModalUpdateRole, roleUpdate]);

    return (
        <Modal
            title="Cập nhật vai trò"
            maskClosable={false}
            closable={true}
            open={openModalUpdateRole}
            okText="Save"
            onOk={() => form.submit()}
            onCancel={() => setOpenModalUpdateRole(false)}
        >
            <hr />

            <Form
                form={form}
                onFinish={handleEditRole}
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

export default AdminModalUpdateRole;
