import { Modal, Select } from 'antd';
import { toast } from 'react-toastify';
import { Form, Input } from 'antd';
import type { ICreatePermissionReq } from '../../../../types/permission';
import { useAppDispatch } from '../../../../redux/hooks';
import { handleCreatePermission } from '../../../../redux/thunks/permissionThunks';

interface IProps {
    openModalAddPermission: boolean;
    setOpenModalAddPermission: (v: boolean) => void;
}

const AdminModalAddPermission = (props: IProps) => {
    const { openModalAddPermission, setOpenModalAddPermission } = props;
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
    const handleAddPermission = async (data: ICreatePermissionReq) => {
        try {

            await dispatch(handleCreatePermission(data)).unwrap();
            toast.success("Tạo mới permission thành công");
            setOpenModalAddPermission(false);
            form.resetFields();
        } catch (error: any) {
            toast.error(error || "Lỗi khi tạo permisison");
        }
    };

    // ====================== UI ======================
    return (
        <Modal
            title="Tạo mới quyền hạn"
            maskClosable={false}
            closable={true}
            open={openModalAddPermission}
            okText="Save"
            onOk={() => form.submit()}
            onCancel={() => setOpenModalAddPermission(false)}
        >
            <hr />

            <Form
                form={form}
                onFinish={handleAddPermission}
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

export default AdminModalAddPermission;
