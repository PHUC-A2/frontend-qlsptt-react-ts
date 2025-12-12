import { Modal, Select } from 'antd';
import { Form } from 'antd';
import type { IAssignPermissionReq, IRole } from '../../../../types/role';
import { assignPermission } from '../../../../config/Api';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { permissionSelectors } from '../../../../redux/selectors/permissionSelectors';
import { fetchUsers } from '../../../../redux/thunks/userThunks';

interface IProps {
    openModalAssignPermisison: boolean;
    setOpenModalAssignPermisison: (v: boolean) => void;
    roleAssignPermission: IRole | null;
}

const AdminModalAssignPermission = (props: IProps) => {
    const { openModalAssignPermisison, setOpenModalAssignPermisison, roleAssignPermission } = props;
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();

    //Lấy list permission từ Redux
    const listPermission = useAppSelector(permissionSelectors.selectAll);

    const handleAssignPermission = async (data: IAssignPermissionReq) => {
        try {
            if (roleAssignPermission?.id) {
                await assignPermission(roleAssignPermission.id, data);

                await dispatch(fetchUsers()).unwrap();
                toast.success("Gắn quyền cho vai trò thành công");
                setOpenModalAssignPermisison(false);
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
        }
    };

    return (
        <Modal
            title="Gắn quyền hạn cho vai trò"
            maskClosable={false}
            closable={true}
            open={openModalAssignPermisison}
            okText="Save"
            onOk={() => form.submit()}
            onCancel={() => setOpenModalAssignPermisison(false)}
        >
            <hr />

            <Form
                form={form}
                onFinish={handleAssignPermission}
                layout='vertical'
                autoComplete="off"
            >
                <Form.Item
                    label="Chọn quyền"
                    name="permission_ids"
                    rules={[{ required: true, message: 'Vui lòng chọn quyền!' }]}
                >
                    <Select
                        mode="multiple"
                        placeholder="Chọn quyền"
                        style={{ width: "100%" }}
                        options={listPermission.map(p => ({
                            label: p.name,  // tên permission
                            value: p.id     // id gửi backend
                        }))}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AdminModalAssignPermission;
