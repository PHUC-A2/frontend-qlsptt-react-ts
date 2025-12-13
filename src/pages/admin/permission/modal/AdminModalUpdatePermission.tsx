import { Modal, Select } from 'antd';
import { toast } from 'react-toastify';
import { Form, Input } from 'antd';
import type { IPermission } from '../../../../types/permission';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../../redux/hooks';
import { handleUpdatePermission } from '../../../../redux/thunks/permissionThunks';
import { LIST_PERMISSION } from '../../../../utils/constants/permissions.constants';

interface IProps {
    openModalUpdatePermission: boolean;
    setOpenModalUpdatePermission: (v: boolean) => void;
    permissionUpdate: IPermission | null;
}

const AdminModalUpdatePermission = (props: IProps) => {
    const { openModalUpdatePermission, setOpenModalUpdatePermission, permissionUpdate } = props;
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    // ====================== AUTO FILL DESCRIPTION ======================
    const findPermissionByName = (name: string) => {
        for (const group of LIST_PERMISSION) {
            const found = group.items.find((item) => item.name === name);
            if (found) return found;
        }
        return null;
    };

    const onPermissionChange = (value: string) => {
        const p = findPermissionByName(value);
        if (p) {
            form.setFieldsValue({
                description: p.description ?? ""
            });
        }
    };

    // ====================== SUBMIT ======================
    const handleEditPermission = async () => {
        try {
            if (!permissionUpdate?.id) {
                toast.error("ID permission không hợp lệ");
                return;
            }
            const values = form.getFieldsValue();
            await dispatch(handleUpdatePermission({
                id: permissionUpdate.id,
                data: values
            })).unwrap();

            toast.success("Cập permission thành công");
            setOpenModalUpdatePermission(false);
            form.resetFields();
        } catch (error: any) {
            toast.error(error || "Lỗi khi cập nhật permision");
        }
    };

    useEffect(() => {
        if (openModalUpdatePermission && permissionUpdate) {
            form.setFieldsValue({
                name: permissionUpdate.name,
                description: permissionUpdate.description
            });
        }
    }, [openModalUpdatePermission, permissionUpdate]);

    // ====================== UI ======================
    return (
        <Modal
            title="Cập nhật quyền hạn"
            maskClosable={false}
            closable={true}
            open={openModalUpdatePermission}
            okText="Save"
            onOk={() => form.submit()}
            onCancel={() => setOpenModalUpdatePermission(false)}
        >
            <hr />

            <Form
                form={form}
                onFinish={handleEditPermission}
                layout='vertical'
                autoComplete="off"
            >
                {/* PERMISSION SELECT */}
                <Form.Item
                    label="Tên"
                    name="name"
                    rules={[{ required: true }]}
                >
                    <Select placeholder="Chọn quyền" onChange={onPermissionChange}>
                        {LIST_PERMISSION.map((group) => (
                            <Select.OptGroup key={group.group} label={group.group}>
                                {group.items.map((p) => (
                                    <Select.Option key={p.name} value={p.name}>
                                        {p.name}
                                    </Select.Option>
                                ))}
                            </Select.OptGroup>
                        ))}
                    </Select>
                </Form.Item>

                {/* AUTO DESCRIPTION */}
                <Form.Item
                    label="Mô tả"
                    name="description"
                    rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AdminModalUpdatePermission;
