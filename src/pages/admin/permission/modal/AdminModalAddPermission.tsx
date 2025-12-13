import { Modal, Select } from 'antd';
import { toast } from 'react-toastify';
import { Form, Input } from 'antd';
import type { ICreatePermissionReq } from '../../../../types/permission';
import { useAppDispatch } from '../../../../redux/hooks';
import { handleCreatePermission } from '../../../../redux/thunks/permissionThunks';
import { LIST_PERMISSION } from '../../../../utils/constants/permissions.constants';

interface IProps {
    openModalAddPermission: boolean;
    setOpenModalAddPermission: (v: boolean) => void;
}

const AdminModalAddPermission = (props: IProps) => {
    const { openModalAddPermission, setOpenModalAddPermission } = props;
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
