import { Modal, Select } from 'antd';
import { toast } from 'react-toastify';
import { Form, Input } from 'antd';
import type { IPermission } from '../../../../types/permission';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../../redux/hooks';
import { handleUpdatePermission } from '../../../../redux/thunks/permissionThunks';

interface IProps {
    openModalUpdatePermission: boolean;
    setOpenModalUpdatePermission: (v: boolean) => void;
    permissionUpdate: IPermission | null;
}

const AdminModalUpdatePermission = (props: IProps) => {
    const { openModalUpdatePermission, setOpenModalUpdatePermission, permissionUpdate } = props;
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    // ====================== PERMISSION LIST ======================
    const LIST_PERMISSION = [
        {
            group: "Users",
            items: [
                { name: "GET_USER", description: "Xem tất cả user" },
                { name: "GET_USER_DETAIL", description: "Xem chi tiết user" },
                { name: "POST_USER", description: "Tạo user mới" },
                { name: "PUT_USER", description: "Cập nhật user" },
                { name: "DELETE_USER", description: "Xóa user" },
            ]
        },
        {
            group: "Products",
            items: [
                { name: "GET_PRODUCT", description: "Xem danh sách sản phẩm" },
                { name: "GET_PRODUCT_DETAIL", description: "Xem chi tiết sản phẩm" },
                { name: "POST_PRODUCT", description: "Tạo sản phẩm mới" },
                { name: "PUT_PRODUCT", description: "Cập nhật sản phẩm" },
                { name: "DELETE_PRODUCT", description: "Xóa sản phẩm" },
            ]
        },
    ];

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
